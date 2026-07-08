import { describe, it, expect, beforeEach } from 'vitest';
import { createClient, type Client } from '@libsql/client';
import { ensureSchema } from './db-core';
import { processSher } from './explain-core';
import { anthology } from '../data/anthology';

const first = anthology[0];
const analysisFor = (over: Record<string, unknown>) => ({
	isValidSher: true, invalidReason: null, urduScript: 'ا\nب', romanUrdu: 'a\nb',
	translation: 't', interpretation: 'i', context: 'c', themes: [], devices: [],
	poetGuess: null, attributionConfidence: 'none', ...over
});
const clientWith = (analysis: unknown, calls = { n: 0 }) => ({
	messages: { create: async () => { calls.n++; return { content: [{ type: 'tool_use', input: analysis }] }; } }
});

let db: Client;
beforeEach(async () => { db = createClient({ url: ':memory:' }); await ensureSchema(db); });

describe('processSher', () => {
	it('anthology sher → verified tier from CODE, regardless of what the LLM guessed', async () => {
		const client = clientWith(analysisFor({ urduScript: first.urduScript, poetGuess: 'Wrong Poet', attributionConfidence: 'high' }));
		const r = await processSher({ db, client }, first.romanUrdu.replace('\n', ' '));
		expect(r.attribution).toEqual({ tier: 'verified', poet: first.poet, slug: first.slug });
	});
	it('unknown sher + high LLM confidence → attributed tier', async () => {
		const client = clientWith(analysisFor({ poetGuess: 'Ahmad Faraz', attributionConfidence: 'high' }));
		const r = await processSher({ db, client }, 'koi bilkul anokha misra jo anthology mein nahi hai yaar');
		expect(r.attribution).toEqual({ tier: 'attributed', poet: 'Ahmad Faraz' });
	});
	it('low/none confidence → unknown tier (never guesses)', async () => {
		const client = clientWith(analysisFor({ poetGuess: 'Mirza Ghalib', attributionConfidence: 'low' }));
		const r = await processSher({ db, client }, 'ek aur naya misra bina kisi pehchan ke yahan likha');
		expect(r.attribution).toEqual({ tier: 'unknown' });
	});
	it('second call is served from cache — LLM called exactly once', async () => {
		const calls = { n: 0 };
		const client = clientWith(analysisFor({}), calls);
		await processSher({ db, client }, 'dohraya hua sher cache se aana chahiye dobara nahi');
		const again = await processSher({ db, client }, 'dohraya hua sher cache se aana chahiye dobara nahi');
		expect(calls.n).toBe(1);
		expect(again.cachedAt).toBeTruthy();
	});
	it('matches the anthology via the LLM-returned urduScript when raw input was roman and misspelt', async () => {
		// Correction 2: anthology[0] is now Mir, not Ghalib. This test must
		// prove attribution is recovered from the LLM's Urdu-script conversion
		// (not the raw roman input), so it looks up the Ghalib entry by slug
		// explicitly rather than relying on array position.
		const ghalib = anthology.find((e) => e.slug === 'ghalib-hazaron-khwahishen')!;
		const client = clientWith(analysisFor({ urduScript: ghalib.urduScript, attributionConfidence: 'none' }));
		// Raw input deliberately does NOT normalize-match anything in the
		// anthology by roman spelling — so matchAnthology(rawInput) is null,
		// and the only way to reach 'verified' is via the LLM's urduScript.
		const r = await processSher({ db, client }, 'yeh koi aisa misra jo roman se match nahi karega bilkul');
		expect(r.attribution).toEqual({ tier: 'verified', poet: ghalib.poet, slug: ghalib.slug });
	});
	it('invalid input (isValidSher: false) → unknown tier, and no cache row is written', async () => {
		const client = clientWith(analysisFor({ isValidSher: false, invalidReason: 'This looks like prose, not a sher.' }));
		const r = await processSher({ db, client }, 'yeh sirf aam nasar hai, sher nahi hai bilkul bhi');
		expect(r.attribution).toEqual({ tier: 'unknown' });
		const { rows } = await db.execute('SELECT COUNT(*) as count FROM explanations');
		expect(Number(rows[0].count)).toBe(0);
	});
});
