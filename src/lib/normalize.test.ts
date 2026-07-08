import { describe, it, expect } from 'vitest';
import {
	normalizeUrdu, normalizeRoman, normalizeKey, isUrduScript, similarity, isMatch
} from './normalize';

describe('normalizeUrdu', () => {
	// NOTE: never assert a hand-typed literal as the expected output — the fold
	// tables (ے→ی etc.) transform it too. Assert EQUIVALENCE between variant forms.
	it('strips harakat/diacritics, punctuation, and spaces', () => {
		expect(normalizeUrdu('دِل سے، نکلے گی!')).toBe(normalizeUrdu('دل سے نکلے گی'));
		expect(normalizeUrdu('دل سے')).not.toContain(' ');
	});
	it('folds Arabic character variants to Urdu forms', () => {
		expect(normalizeUrdu('يك')).toBe(normalizeUrdu('یک')); // ي→ی, ك→ک
	});
	it('folds ye variants so ے and ی spellings match', () => {
		expect(normalizeUrdu('نکلے')).toBe(normalizeUrdu('نکلی'));
	});

	// REGRESSION (review finding, narrowed URDU_DIACRITICS range): the old
	// regex range ً-ٰ (U+064B-0670) accidentally swallowed Arabic-Indic
	// digits (U+0660-0669) and two real letters, dotless beh (U+066E) and
	// dotless qaf (U+066F), because it was typed as a single wide range
	// instead of the actual harakat block plus the two standalone marks.
	// REGRESSION (review finding, important): the previous version of this
	// test used '۱۲۳' — U+06F1-06F3 (Extended Arabic-Indic / Urdu-keyboard
	// digits) — which were NEVER inside the old buggy U+064B-0670 range, so
	// this assertion would have passed even before the fix and guarded
	// nothing. The digits the old regex actually deleted are U+0660-0669
	// (Arabic-Indic ٠١٢٣٤٥٦٧٨٩), because that block sits inside U+064B-0670.
	// Assert on THAT block so this test would fail on the old code.
	it('does not delete Arabic-Indic digits U+0660-0669 (the actual vulnerable block)', () => {
		const digits = String.fromCodePoint(
			0x0660, 0x0661, 0x0662, 0x0663, 0x0664, 0x0665, 0x0666, 0x0667, 0x0668, 0x0669
		); // ٠١٢٣٤٥٦٧٨٩
		expect(normalizeUrdu(digits)).toBe(digits);
		expect(normalizeUrdu(digits)).toHaveLength(10);
	});
	it('does not delete Extended Arabic-Indic (Urdu-keyboard) digits U+06F1-06F3 either', () => {
		expect(normalizeUrdu('۱۲۳')).toBe('۱۲۳');
		expect(normalizeUrdu('۱۲۳')).not.toBe('');
	});
	it('does not delete dotless beh / dotless qaf letters', () => {
		expect(normalizeUrdu('ٮ')).toBe('ٮ'); // U+066E, not a diacritic
		expect(normalizeUrdu('ٯ')).toBe('ٯ'); // U+066F, not a diacritic
	});
	it('still strips harakat (fatha/zabar etc.) to bare letters', () => {
		// دَل (with fatha over د) and دل (bare) must normalize identically —
		// confirms the narrowed range still covers the actual vowel marks.
		expect(normalizeUrdu('دَل')).toBe(normalizeUrdu('دل'));
	});
});

describe('normalizeRoman', () => {
	it('lowercases and strips non-letters', () => {
		expect(normalizeRoman('Dil Se, Niklegi!')).toBe(normalizeRoman('dil se niklegi'));
	});
	it('treats common variant spellings as equal', () => {
		expect(normalizeRoman('mein')).toBe(normalizeRoman('main'));
		expect(normalizeRoman('nikle gi')).toBe(normalizeRoman('niklegi'));
		expect(normalizeRoman('wafa')).toBe(normalizeRoman('vafa'));
		expect(normalizeRoman('qismat')).toBe(normalizeRoman('kismat'));
		expect(normalizeRoman('dilll')).toBe(normalizeRoman('dil'));
	});

	// REGRESSION (review finding, critical): normalizeRoman used to strip
	// spaces BEFORE folding digraphs, so two originally-separate words could
	// fuse into a phantom digraph — 'sada ishq' → 'sadaishq' → the a[iye]
	// rule then folds the injected 'ai' seam, changing a character that
	// would NOT change if line 1 were normalized alone. That silently broke
	// the isMatch() containment path for a user pasting only line 1 of a
	// two-line sher. Fix: fold digraphs while spaces are still present as
	// word boundaries, strip whitespace last (mirrors normalizeUrdu).
	it('does not fold digraphs across a word boundary (single-line paste containment)', () => {
		const line1 = normalizeRoman('mera pyar hai sada');
		const full = normalizeRoman('mera pyar hai sada ishq mein bhi tera mera');
		expect(isMatch(line1, full)).toBe(true);
	});

	// REGRESSION (review finding, important): punctuation used to be replaced
	// with a space instead of deleted, so an apostrophe standing in for
	// hamza/ain mid-word ("ma'ani", "she'r") split the word into two tokens
	// before folding ran, diverging from the no-apostrophe spelling of the
	// same word. Fix: delete intra-word punctuation, keep real spaces as the
	// only fold boundary.
	it('treats apostrophe transliterations (hamza/ain) as equal to the plain spelling', () => {
		expect(normalizeRoman("ma'ani")).toBe(normalizeRoman('maani'));
		expect(normalizeRoman("she'r")).toBe(normalizeRoman('sher'));
	});
});

describe('isUrduScript / normalizeKey', () => {
	it('detects Arabic-range chars', () => {
		expect(isUrduScript('دل')).toBe(true);
		expect(isUrduScript('dil se')).toBe(false);
	});
	it('prefixes keys by script so urdu/roman keys never collide', () => {
		expect(normalizeKey('دل سے')).toMatch(/^u:/);
		expect(normalizeKey('dil se')).toMatch(/^r:/);
	});
});

describe('similarity / isMatch', () => {
	it('identical → 1, disjoint → low', () => {
		expect(similarity('abcdef', 'abcdef')).toBe(1);
		expect(similarity('abcdef', 'zzzzzz')).toBeLessThan(0.2);
	});
	it('matches at >= 0.80 similarity', () => {
		// 1 edit in 20 chars ≈ 0.95
		expect(isMatch('a'.repeat(19) + 'b', 'a'.repeat(20))).toBe(true);
	});
	it('matches when one string contains the other (single-line paste), min length guard', () => {
		const full = normalizeRoman('hazaron khwahishen aisi ke har khwahish pe dam nikle bahut nikle mere armaan lekin phir bhi kam nikle');
		const oneLine = normalizeRoman('hazaron khwahishen aisi ke har khwahish pe dam nikle');
		expect(isMatch(oneLine, full)).toBe(true);
		expect(isMatch('ab', 'absolutely unrelated text')).toBe(false); // too short to count
	});
});
