/*
 * match.ts — decides the 'verified' attribution tier IN CODE (spec §5).
 * WHY: LLMs confidently misattribute poetry (everything becomes Ghalib's).
 * A displayed "✓ Verified" must come from OUR curated data, matched by
 * normalized text similarity — never from the model's opinion.
 */
import { anthology } from './data/anthology';
import type { AnthologyEntry } from './types';
import { isUrduScript, normalizeUrdu, normalizeRoman, isMatch } from './normalize';

// Precompute normalized forms once at module load (41 entries — cheap).
// WHY precompute: normalizing on every call would re-run the same regex
// folds over the same 41 strings on every keystroke/request; since the
// anthology is static data, doing it once at import time trades a tiny
// amount of startup work for O(1) lookups thereafter.
const index = anthology.map((entry) => ({
	entry,
	urdu: normalizeUrdu(entry.urduScript),
	roman: normalizeRoman(entry.romanUrdu)
}));

/** Match raw user text (either script) against the anthology, best match wins. */
export function matchAnthology(text: string): AnthologyEntry | null {
	const urduInput = isUrduScript(text);
	const norm = urduInput ? normalizeUrdu(text) : normalizeRoman(text);
	if (norm.length === 0) return null;
	for (const { entry, urdu, roman } of index) {
		if (isMatch(norm, urduInput ? urdu : roman)) return entry;
	}
	return null;
}
