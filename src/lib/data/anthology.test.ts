import { describe, it, expect } from 'vitest';
import { anthology } from './anthology';
import { decoys } from './eval-decoys';
import { normalizeUrdu } from '../normalize';

describe('anthology integrity', () => {
	it('has 40-50 entries', () => {
		expect(anthology.length).toBeGreaterThanOrEqual(40);
		expect(anthology.length).toBeLessThanOrEqual(50);
	});
	it('slugs are unique and url-safe', () => {
		const slugs = anthology.map((e) => e.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
		for (const s of slugs) expect(s).toMatch(/^[a-z0-9-]+$/);
	});
	it('every entry has two lines and a real source URL', () => {
		for (const e of anthology) {
			expect(e.urduScript.split('\n')).toHaveLength(2);
			expect(e.romanUrdu.split('\n')).toHaveLength(2);
			expect(e.sourceUrl).toMatch(/^https:\/\//);
			expect(e.referenceExplanation.split(/\s+/).length).toBeGreaterThanOrEqual(80);
		}
	});
	it('no two entries normalize to the same sher (dataset would ambiguate matching)', () => {
		const keys = anthology.map((e) => normalizeUrdu(e.urduScript));
		expect(new Set(keys).size).toBe(keys.length);
	});
	it('spans at least 10 distinct poets', () => {
		expect(new Set(anthology.map((e) => e.poet)).size).toBeGreaterThanOrEqual(10);
	});
});

describe('decoys', () => {
	it('has 5-8 entries, none overlapping the anthology', () => {
		expect(decoys.length).toBeGreaterThanOrEqual(5);
		expect(decoys.length).toBeLessThanOrEqual(8);
		const anth = new Set(anthology.map((e) => normalizeUrdu(e.urduScript)));
		for (const d of decoys) expect(anth.has(normalizeUrdu(d.urduScript))).toBe(false);
	});
});
