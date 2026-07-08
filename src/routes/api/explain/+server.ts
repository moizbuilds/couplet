/*
 * /api/explain — the ONE paid endpoint. Order of gates matters:
 * cheap validation first (no secrets needed, testable without a key),
 * then the fail-closed config check, then rate limit, only then the
 * expensive LLM call.
 * CONCEPT: an API route is server-only code the browser calls with fetch();
 * secrets like the API key exist only here, never in the client bundle.
 */
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { getDb, checkRateLimit } from '$lib/server/db';
import { makeAnthropic, LlmError } from '$lib/server/llm';
import { processSher } from '$lib/server/explain-core';
import type { ExplainResponse } from '$lib/types';

const MAX_INPUT_CHARS = 500; // spec §6.6

const reply = (body: ExplainResponse, status: number) => json(body, { status });

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	// 1. Cheap validation first — no secrets, no DB, no network needed, so
	// this gate works (and is testable) even before ANTHROPIC_API_KEY exists.
	const body = await request.json().catch(() => null);
	const text = typeof body?.text === 'string' ? body.text.trim() : '';
	if (!text || text.length > MAX_INPUT_CHARS) {
		return reply({ ok: false, error: 'invalid_input' }, 400);
	}

	// 2. Fail closed (503): missing secrets are an outage, never a fake answer.
	const db = getDb();
	if (!db || !env.ANTHROPIC_API_KEY) {
		return reply({ ok: false, error: 'server_error' }, 503);
	}

	// 3. Rate limit next, before spending on the LLM. IP from the platform,
	// never from a raw header (spec §6.5 / trust boundary) — headers like
	// X-Forwarded-For are attacker-controlled and can be rotated to bypass
	// a per-IP limit.
	if (!(await checkRateLimit(db, getClientAddress()))) {
		return reply({ ok: false, error: 'rate_limited' }, 429);
	}

	// 4. Only now the expensive call.
	try {
		const result = await processSher({ db, client: makeAnthropic(env.ANTHROPIC_API_KEY) }, text);
		return reply({ ok: true, result }, 200);
	} catch (err) {
		// Model outage surfaces as 5xx — visible, never swallowed (AI rule #2).
		console.error('[couplet] explain failed:', err);
		return reply({ ok: false, error: 'server_error' }, err instanceof LlmError ? 502 : 500);
	}
};
