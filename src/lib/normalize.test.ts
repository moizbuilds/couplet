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
