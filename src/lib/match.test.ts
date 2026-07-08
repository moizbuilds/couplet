import { describe, it, expect } from 'vitest';
import { matchAnthology } from './match';
import { anthology } from './data/anthology';

// anthology[0] is 'mir-patta-patta' (Mir Taqi Mir) — kept generic via
// anthology[0] rather than a hardcoded slug so this test stays correct
// even if curation reorders/adds entries.
const first = anthology[0];

describe('matchAnthology', () => {
	it('matches exact urdu script', () => {
		expect(matchAnthology(first.urduScript)?.slug).toBe(first.slug);
	});

	it('matches roman with variant spellings', () => {
		// Genuine common Roman-Urdu variant spellings of first.romanUrdu —
		// each one exercises a specific fold in normalizeRoman():
		//   patta -> pata   (doubled-consonant collapse, (.)\1+)
		//   boota -> buta   (the 'oo' -> 'u' digraph fold)
		//   jaane -> jane   (doubled-vowel collapse, (.)\1+ on 'aa')
		// If the misspelling weren't foldable, this test would only be
		// re-checking exact-match and would never prove variant-spelling
		// robustness.
		const misspelt = first.romanUrdu
			.replace(/\n/g, ' ')
			.replace(/patta/g, 'pata')
			.replace(/boota/g, 'buta')
			.replace(/jaane/g, 'jane');
		expect(matchAnthology(misspelt)?.slug).toBe(first.slug);
	});

	it('matches a single pasted line of a two-line sher', () => {
		expect(matchAnthology(first.urduScript.split('\n')[0])?.slug).toBe(first.slug);
	});

	it('returns null for an unknown sher', () => {
		expect(matchAnthology('yeh bilkul naya misra hai jo kahin nahi milta kisi kitab mein')).toBeNull();
	});
});
