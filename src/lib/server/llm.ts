/*
 * llm.ts — the one Claude call: sher in, structured analysis out.
 * WHY forced tool use: asking for "JSON please" gets markdown fences and
 * prose in the wild; a forced tool call gives schema-validated input.
 * WHY the client is a parameter: core logic must be testable with a fake
 * client, no network (Moiz's global structural rule).
 */
import Anthropic from '@anthropic-ai/sdk';
import type { LlmSherAnalysis } from '../types';

// CONCEPT: dependency injection — instead of creating its network client
// internally, the function receives it, so tests can hand in a fake.
export type MessagesClient = {
	messages: {
		create(params: Record<string, unknown>): Promise<{ content: Array<{ type: string; input?: unknown }> }>;
	};
};

export class LlmError extends Error {}

let singleton: Anthropic | null = null;
/** One SDK client per process (AI rule #2): explicit timeout, capped retries. */
export function makeAnthropic(apiKey: string): Anthropic {
	singleton ??= new Anthropic({ apiKey, timeout: 30_000, maxRetries: 2 });
	return singleton;
}

const MODEL = 'claude-sonnet-5';

const SYSTEM = `You are an expert commentator on classical and modern Urdu poetry (a writer of "tashreeh").
The user gives you a sher (couplet) in Urdu script or Roman Urdu. Analyze it honestly.

Attribution rules (CRITICAL — misattribution is the classic failure of your kind; the internet credits everything to Ghalib):
- Set attributionConfidence to "high" ONLY for genuinely famous, well-documented ashaar you are certain of.
- If you are not certain, set it to "low" or "none" and let poetGuess reflect your best guess or null. Never bluff.
- Never invent a ghazal/divan/collection citation. If you don't know where it's from, say so in context.

Other rules:
- Always return urduScript (convert Roman input to correct Urdu script yourself) and romanUrdu, each as exactly two lines separated by \\n when the input is a sher.
- If the input is not an Urdu/Hindi-Urdu couplet (prose, another language, gibberish), set isValidSher=false with a friendly one-sentence invalidReason, and leave other fields as empty strings/arrays.
- translation: plain modern English, line by line. interpretation: the deeper reading — imagery, ambiguity, why it lands. Keep Urdu poetic terms (tashbeeh, husn-e-taleel, radif...) in devices[], each glossed in plain English.`;

// The tool's input schema IS our output contract — mirrors LlmSherAnalysis field-for-field.
const ANALYZE_TOOL = {
	name: 'analyze_sher',
	description: 'Return the structured analysis of the sher.',
	input_schema: {
		type: 'object',
		properties: {
			isValidSher: { type: 'boolean' },
			invalidReason: { type: ['string', 'null'] },
			urduScript: { type: 'string' },
			romanUrdu: { type: 'string' },
			translation: { type: 'string' },
			interpretation: { type: 'string' },
			context: { type: 'string' },
			themes: { type: 'array', items: { type: 'string' } },
			devices: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						urduTerm: { type: 'string' }, english: { type: 'string' }, explanation: { type: 'string' }
					},
					required: ['urduTerm', 'english', 'explanation']
				}
			},
			poetGuess: { type: ['string', 'null'] },
			attributionConfidence: { type: 'string', enum: ['high', 'low', 'none'] }
		},
		required: [
			'isValidSher', 'invalidReason', 'urduScript', 'romanUrdu', 'translation',
			'interpretation', 'context', 'themes', 'devices', 'poetGuess', 'attributionConfidence'
		]
	}
} as const;

/** Runtime shape check — the API validates against the schema, but we still
 *  verify before trusting (never assume response shape: AI rule #1). */
function assertAnalysis(x: unknown): asserts x is LlmSherAnalysis {
	const o = x as Record<string, unknown>;
	const ok =
		o && typeof o.isValidSher === 'boolean' &&
		typeof o.urduScript === 'string' && typeof o.romanUrdu === 'string' &&
		typeof o.translation === 'string' && typeof o.interpretation === 'string' &&
		typeof o.context === 'string' && Array.isArray(o.themes) && Array.isArray(o.devices) &&
		(o.poetGuess === null || typeof o.poetGuess === 'string') &&
		['high', 'low', 'none'].includes(o.attributionConfidence as string);
	if (!ok) throw new LlmError('LLM returned an unexpected shape');
}

export async function explainWithClaude(client: MessagesClient, input: string): Promise<LlmSherAnalysis> {
	let msg;
	try {
		msg = await client.messages.create({
			model: MODEL,
			max_tokens: 3000, // covers adaptive thinking tokens too
			system: SYSTEM,
			tools: [ANALYZE_TOOL],
			tool_choice: { type: 'tool', name: 'analyze_sher' },
			messages: [{ role: 'user', content: input }]
		});
	} catch (err) {
		throw new LlmError(`Anthropic API failure: ${err instanceof Error ? err.message : String(err)}`);
	}
	// Landmine #4: a thinking block may precede the tool_use block — iterate, never content[0].
	const block = msg.content.find((b) => b.type === 'tool_use');
	if (!block?.input) throw new LlmError('No tool_use block in response');
	assertAnalysis(block.input);
	return block.input;
}
