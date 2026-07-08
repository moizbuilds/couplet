/*
 * normalize.ts — the ONE text normalizer for the whole app.
 * Used for: anthology matching, the explanations cache key, and eval scoring.
 * WHY one module: Roman Urdu has no canonical spelling and Urdu script has
 * optional diacritics; if two parts of the app normalized differently, a
 * sher could be "verified" in one place and "unknown" in another.
 */

// Harakat/combining marks (U+064B-065F), superscript alef (U+0670), and
// tatweel (U+0640) — decorative for matching, safe to strip.
// Written with explicit \u escapes rather than literal Arabic characters in
// a range: a right-to-left character range typed as "first - last" can
// visually look identical while silently parsing to a different, wider
// codepoint span depending on typing/paste order. That exact RTL-bidi trap
// is how a previous version of this regex ended up spanning U+064B-0670,
// which silently deleted Arabic-Indic digits (٠-٩, U+0660-0669) and
// two real letters, dotless beh (U+066E) and dotless qaf (U+066F), along
// with the actual diacritics.
const URDU_DIACRITICS = /[\u064B-\u065F\u0670\u0640]/g;
// Urdu + Latin punctuation, incl. ۔ ؟ ،
const PUNCT = /[۔؟،٬!?.,;:'"“”‘’…()[\]{}«»\-—_]/g;

// Arabic-typed chars → their Urdu-keyboard equivalents, plus fold alef forms.
const URDU_CHAR_FOLDS: [RegExp, string][] = [
	[/ي/g, 'ی'], [/ك/g, 'ک'], [/ة/g, 'ہ'],
	[/[أإٱآ]/g, 'ا'], [/ے/g, 'ی'], [/ؤ/g, 'و'], [/ئ/g, 'ی'], [/ء/g, ''],
];

// CONCEPT: normalize('NFC') = Unicode's "combine characters into their
// canonical single-codepoint form" step — e.g. a base letter + a separately
// typed accent mark become one composed character, so visually-identical
// text compares equal even if it was typed/encoded differently.
export function normalizeUrdu(s: string): string {
	let out = s.normalize('NFC').replace(URDU_DIACRITICS, '').replace(PUNCT, '');
	for (const [re, to] of URDU_CHAR_FOLDS) out = out.replace(re, to);
	return out.replace(/\s+/g, '');
}

// Digraphs first (order matters: 'ee'→'i' must run before repeat-collapse
// turns 'ee' into 'e'), then single-char folds, then collapse repeats.
const ROMAN_DIGRAPHS: [RegExp, string][] = [
	[/ee/g, 'i'], [/oo/g, 'u'], [/a[iye]/g, 'e'], [/ei/g, 'e'],
];
const ROMAN_CHARS: [RegExp, string][] = [[/q/g, 'k'], [/w/g, 'v'], [/z/g, 'j']];

export function normalizeRoman(s: string): string {
	// BUG (fixed): stripping spaces before folding digraphs let a digraph
	// regex span two originally-separate words — e.g. "sada ishq" became
	// "sadaishq" and /a[iye]/g then folded the injected "a"+"i" seam into
	// "e", changing a character that would NOT have changed had line 1
	// ("...sada") been normalized alone. That silently broke the
	// containment path in isMatch() for a user pasting only one line of a
	// two-line sher. Fix: mirror normalizeUrdu — keep spaces present as
	// word-boundary markers WHILE folding (so no digraph can cross a
	// boundary that existed in the original text), and only strip
	// whitespace as the LAST step.
	//
	// BUG (fixed): punctuation used to be replaced with a SPACE, not deleted.
	// Apostrophes in Roman Urdu sit INSIDE a word, standing in for hamza/ain —
	// "ma'ani", "she'r", "qur'an". Turning that apostrophe into a space split
	// the word into two tokens before the digraph/repeat-collapse folds ever
	// ran, so "ma'ani" ended up as "maani" while the no-apostrophe spelling
	// "maani" folded further to "mani" — two spellings of the same word
	// diverged. Fix: delete non-letter, non-space characters instead of
	// spacing them out. The character class still excludes \s, so real word
	// boundaries (actual spaces) are untouched and the digraph word-boundary
	// fix above still holds.
	let out = s.toLowerCase().replace(/[^a-z\s]/g, '');
	for (const [re, to] of ROMAN_DIGRAPHS) out = out.replace(re, to);
	for (const [re, to] of ROMAN_CHARS) out = out.replace(re, to);
	out = out.replace(/(.)\1+/g, '$1'); // 'dilll'→'dil', 'aa'→'a'
	return out.replace(/\s+/g, '');
}

// CONCEPT: this is a Unicode "character class" regex — ؀-ۿ is the block of
// codepoints reserved for Arabic-script letters (which Urdu is written in).
// If any character in the string falls in that range, treat the whole string
// as Urdu script rather than Roman Urdu.
export function isUrduScript(s: string): boolean {
	return /[؀-ۿ]/.test(s);
}

/** Cache/matching key. Script prefix keeps urdu & roman keyspaces separate. */
export function normalizeKey(input: string): string {
	return isUrduScript(input) ? 'u:' + normalizeUrdu(input) : 'r:' + normalizeRoman(input);
}

// CONCEPT: Levenshtein distance = minimum number of single-character edits
// (insert/delete/replace) to turn one string into another.
export function levenshtein(a: string, b: string): number {
	const m = a.length, n = b.length;
	if (m === 0) return n;
	if (n === 0) return m;
	let prev = Array.from({ length: n + 1 }, (_, j) => j);
	for (let i = 1; i <= m; i++) {
		const cur = [i];
		for (let j = 1; j <= n; j++) {
			cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
		}
		prev = cur;
	}
	return prev[n];
}

export function similarity(a: string, b: string): number {
	const max = Math.max(a.length, b.length);
	return max === 0 ? 1 : 1 - levenshtein(a, b) / max;
}

const MATCH_THRESHOLD = 0.8;   // spec §5
const MIN_CONTAIN_LEN = 12;    // containment only counts for substantial strings

/** True if a and b are "the same sher" — high similarity, or one line of a
 *  two-line sher pasted alone (containment). Inputs must already be normalized. */
export function isMatch(a: string, b: string): boolean {
	if (similarity(a, b) >= MATCH_THRESHOLD) return true;
	const [short, long] = a.length <= b.length ? [a, b] : [b, a];
	return short.length >= MIN_CONTAIN_LEN && long.includes(short);
}
