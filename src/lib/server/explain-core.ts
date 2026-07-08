/*
 * explain-core.ts — THE pipeline: cache → LLM → code-side attribution → cache.
 * Shared by the API route, the anthology seed script, and the eval, so all
 * three can never disagree about how a sher gets processed.
 *
 * WHY this imports from ./db-core and NOT ./db: ./db pulls in
 * `$env/dynamic/private`, a SvelteKit-only import alias that only resolves
 * inside a Vite/SvelteKit build. The seed script and the eval run as plain
 * Node scripts via `tsx`, which is not a SvelteKit build — importing ./db
 * from here would crash them. ./db-core has the same cache functions with
 * no SvelteKit dependency, so this pipeline stays usable from all three
 * callers (API route, seed script, eval).
 */
import type { Client } from '@libsql/client';
import type { Attribution, SherExplanationResult } from '../types';
import { normalizeKey } from '../normalize';
import { matchAnthology } from '../match';
import { getCached, putCached } from './db-core';
import { explainWithClaude, type MessagesClient } from './llm';

/** Attribution decision (spec §5). Tries the raw input AND the LLM's own
 *  urduScript/romanUrdu renderings — a misspelt Roman paste often only
 *  matches after the LLM has normalized it to proper Urdu script. */
function decideAttribution(rawInput: string, analysis: { urduScript: string; romanUrdu: string; poetGuess: string | null; attributionConfidence: string }): Attribution {
	const hit = matchAnthology(rawInput) ?? matchAnthology(analysis.urduScript) ?? matchAnthology(analysis.romanUrdu);
	if (hit) return { tier: 'verified', poet: hit.poet, slug: hit.slug };
	if (analysis.attributionConfidence === 'high' && analysis.poetGuess) {
		return { tier: 'attributed', poet: analysis.poetGuess };
	}
	return { tier: 'unknown' };
}

export async function processSher(
	deps: { db: Client; client: MessagesClient },
	rawInput: string
): Promise<SherExplanationResult> {
	const key = normalizeKey(rawInput);
	const cached = await getCached(deps.db, key);
	if (cached) return cached;

	const analysis = await explainWithClaude(deps.client, rawInput);
	const attribution: Attribution = analysis.isValidSher
		? decideAttribution(rawInput, analysis)
		: { tier: 'unknown' };
	const result: SherExplanationResult = { analysis, attribution, cachedAt: null };

	// Only cache real shers — garbage input shouldn't occupy cache rows.
	if (analysis.isValidSher) await putCached(deps.db, key, rawInput, result);
	return result;
}
