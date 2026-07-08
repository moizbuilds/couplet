/*
 * db-core.ts — the PURE database helpers: cache reads/writes and the
 * hourly rate limiter. "Pure" here means every function takes its `db`
 * client as a parameter (dependency injection) instead of reaching out to
 * grab one itself, and this file imports nothing that only exists inside a
 * SvelteKit build.
 *
 * WHY this file is separate from db.ts: `db.ts` needs `$env/dynamic/private`
 * to read the Turso connection secrets, and that import path is a SvelteKit
 * alias — it only resolves when Vite/SvelteKit builds the app. Plain Node
 * scripts run via `tsx` (scripts/migrate.ts now, and seed/eval later) are
 * NOT a SvelteKit build, so they crash on `import ... from '$env/...'`. By
 * keeping the actual cache/rate-limit logic here with no `$env` import, both
 * the live app AND standalone scripts can call these functions directly —
 * and by extension, so can this file's own tests, which construct an
 * in-memory `Client` themselves instead of going through `getDb()`.
 *
 * CONCEPT: dependency injection — passing a resource (here, the DB client)
 * into a function as an argument, rather than the function fetching it via
 * a global or singleton. This is what lets tests run against a fast
 * in-memory database instead of a real network connection (a global CLAUDE.md
 * standard: inject external clients so core logic is testable without the
 * network).
 */
import type { Client } from '@libsql/client';
import { DDL } from './schema';
import type { SherExplanationResult } from '../types';

/** Creates both tables if they don't exist yet. Safe to call on every request. */
export async function ensureSchema(db: Client): Promise<void> {
	for (const ddl of DDL) await db.execute(ddl);
}

/**
 * Looks up a cached explanation by its normalized key (see the normalizer
 * task — Urdu script and its Roman-Urdu transliteration share one cache
 * key so both spellings hit the same cached row).
 * Returns null on a cache miss; on a hit, stamps `cachedAt` from the row's
 * `created_at` so the UI can show "served from cache" honestly instead of
 * claiming every response is freshly generated.
 */
export async function getCached(db: Client, key: string): Promise<SherExplanationResult | null> {
	const rs = await db.execute({
		sql: 'SELECT result_json, created_at FROM explanations WHERE normalized_key = ?',
		args: [key]
	});
	if (rs.rows.length === 0) return null;
	const stored = JSON.parse(String(rs.rows[0].result_json)) as SherExplanationResult;
	return { ...stored, cachedAt: String(rs.rows[0].created_at) };
}

/**
 * Stores (or refreshes) a cached explanation.
 * WHY an UPSERT (INSERT ... ON CONFLICT DO UPDATE) instead of a plain
 * INSERT: `normalized_key` is a natural key with a UNIQUE constraint, so a
 * second write for the same sher — e.g. two requests racing in, or a retry
 * after a dropped response — must overwrite the one row rather than throw a
 * constraint violation or create a duplicate (global standard #8: key
 * writes by natural identity so races/reloads can't double-write).
 */
export async function putCached(
	db: Client,
	key: string,
	raw: string,
	result: SherExplanationResult
): Promise<void> {
	await db.execute({
		sql: `INSERT INTO explanations (normalized_key, input_raw, result_json) VALUES (?, ?, ?)
		      ON CONFLICT(normalized_key) DO UPDATE SET result_json = excluded.result_json`,
		args: [key, raw, JSON.stringify(result)]
	});
}

const HOURLY_LIMIT = 10;

/**
 * Enforces a fixed-window rate limit: at most HOURLY_LIMIT requests per IP
 * per calendar hour.
 *
 * CONCEPT: DB-backed rate limiting — a naive rate limiter keeps counts in an
 * in-memory `Map`. That works on a long-lived server, but this app deploys
 * to serverless functions, and each invocation can be a brand-new process
 * with an empty memory space — a `Map` would reset on almost every request,
 * making the limit meaningless. Storing counts as rows in the shared Turso
 * database means every invocation, on any machine, sees the same counter.
 *
 * The window is keyed by (ip, hour-string), so "hour" here means a fixed
 * wall-clock hour (e.g. 14:00–14:59), not a rolling 60 minutes — simpler to
 * reason about and cheap to prune.
 *
 * Trust boundary note: `ip` is caller-supplied by the API route from a
 * request header, which is attacker-controlled in principle (a spoofed or
 * rotated X-Forwarded-For could dodge the limit) — but the DB-side pruning
 * below stops a rotating attacker from making this table grow forever, which
 * is the concern this function itself can actually defend.
 */
export async function checkRateLimit(db: Client, ip: string): Promise<boolean> {
	// Prune windows older than 24h on every call. Without this, an attacker
	// rotating IPs (or just organic traffic over time) would leave behind an
	// ever-growing pile of stale rows — an unbounded-memory-growth landmine.
	await db.execute(
		`DELETE FROM rate_limits WHERE window_start < strftime('%Y-%m-%dT%H', datetime('now', '-24 hours'))`
	);
	const rs = await db.execute({
		sql: `INSERT INTO rate_limits (ip, window_start, count)
		      VALUES (?, strftime('%Y-%m-%dT%H', 'now'), 1)
		      ON CONFLICT(ip, window_start) DO UPDATE SET count = count + 1
		      RETURNING count`,
		args: [ip]
	});
	return Number(rs.rows[0].count) <= HOURLY_LIMIT;
}
