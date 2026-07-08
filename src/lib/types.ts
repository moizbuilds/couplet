/*
 * types.ts — every contract that crosses a boundary (LLM ↔ server ↔ UI ↔ data)
 * lives HERE and only here. Both sides import it.
 * WHY: redeclaring a shape on each side lets them drift apart silently —
 * this bit Moiz in a real build (spec: one shared type per contract).
 */

/** What the LLM returns via a forced tool call. */
export interface LlmSherAnalysis {
	isValidSher: boolean;
	invalidReason: string | null;
	urduScript: string;   // both lines, '\n'-separated — always present when valid
	romanUrdu: string;
	translation: string;
	interpretation: string;
	context: string;
	themes: string[];
	devices: { urduTerm: string; english: string; explanation: string }[];
	poetGuess: string | null;
	attributionConfidence: 'high' | 'low' | 'none';
}

/** Attribution is decided in CODE (spec §5), never displayed straight from the LLM. */
export type Attribution =
	| { tier: 'verified'; poet: string; slug: string }
	| { tier: 'attributed'; poet: string }
	| { tier: 'unknown' };

export interface SherExplanationResult {
	analysis: LlmSherAnalysis;
	attribution: Attribution;
	cachedAt: string | null; // non-null when served from the explanations cache
}

/** One curated sher. This dataset is the anthology, the attribution
 *  ground truth, AND the eval gold set — one file, three jobs (spec §4). */
export interface AnthologyEntry {
	slug: string;
	urduScript: string;
	romanUrdu: string;
	poet: string;
	poetUrdu: string;
	era: string;
	referenceExplanation: string;
	themes: string[];
	sourceUrl: string; // Rekhta (or equivalent) URL that verifies attribution — REQUIRED
}

/** Eval-only trap: a line the internet misattributes. The system passes by
 *  NOT confirming the popular (wrong) attribution. */
export interface DecoyEntry {
	id: string;
	urduScript: string;
	romanUrdu: string;
	popularButWrongPoet: string;    // what the internet says
	actualPoet: string | null;      // null = genuinely unknown/contested
	sourceUrl: string;              // where the misattribution is documented/debunked
}

/** Wire shape of POST /api/explain. */
export type ExplainResponse =
	| { ok: true; result: SherExplanationResult }
	| { ok: false; error: 'invalid_input' | 'rate_limited' | 'server_error' };
