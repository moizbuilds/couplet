import { describe, it, expect } from 'vitest';
import { explainWithClaude, LlmError } from './llm';

const validAnalysis = {
	isValidSher: true, invalidReason: null,
	urduScript: 'ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے\nبہت نکلے مرے ارمان لیکن پھر بھی کم نکلے',
	romanUrdu: 'hazaron khwahishen aisi\nbahut nikle mere armaan',
	translation: 'Thousands of desires...', interpretation: 'deep', context: 'Mughal Delhi',
	themes: ['desire'], devices: [{ urduTerm: 'takrar', english: 'repetition', explanation: 'nikle recurs' }],
	poetGuess: 'Mirza Ghalib', attributionConfidence: 'high'
};

// Fake client factory: returns the given content blocks.
// Typed with an index signature (not `unknown[]`) so fixture blocks can carry
// extra fields (thinking/name/text) beyond MessagesClient's minimal shape
// without an excess-property error, while still structurally satisfying
// MessagesClient under TS strict mode.
const clientReturning = (content: Array<{ type: string; input?: unknown; [key: string]: unknown }>) => ({
	messages: { create: async () => ({ content }) }
});

describe('explainWithClaude', () => {
	it('reads the tool_use block even when a thinking block comes first (Landmine #4)', async () => {
		const client = clientReturning([
			{ type: 'thinking', thinking: '...' },
			{ type: 'tool_use', name: 'analyze_sher', input: validAnalysis }
		]);
		const out = await explainWithClaude(client, 'hazaron khwahishen aisi');
		expect(out.poetGuess).toBe('Mirza Ghalib');
	});
	it('throws LlmError when no tool_use block exists', async () => {
		await expect(explainWithClaude(clientReturning([{ type: 'text', text: 'hi' }]), 'x'))
			.rejects.toBeInstanceOf(LlmError);
	});
	it('throws LlmError on shape violations (missing attributionConfidence)', async () => {
		const bad = { ...validAnalysis } as Record<string, unknown>;
		delete bad.attributionConfidence;
		await expect(explainWithClaude(clientReturning([{ type: 'tool_use', input: bad }]), 'x'))
			.rejects.toBeInstanceOf(LlmError);
	});
	it('throws LlmError when a devices[] element is missing fields (english, explanation)', async () => {
		const bad = { ...validAnalysis, devices: [{ urduTerm: 'x' }] };
		await expect(explainWithClaude(clientReturning([{ type: 'tool_use', input: bad }]), 'x'))
			.rejects.toBeInstanceOf(LlmError);
	});
	it('throws LlmError when invalidReason is a number instead of string | null', async () => {
		const bad = { ...validAnalysis, invalidReason: 123 };
		await expect(explainWithClaude(clientReturning([{ type: 'tool_use', input: bad }]), 'x'))
			.rejects.toBeInstanceOf(LlmError);
	});
});
