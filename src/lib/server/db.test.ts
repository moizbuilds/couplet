/*
 * db.test.ts — tests the pure DB helpers (cache + rate limit) against an
 * in-memory libsql database (`:memory:`). No network, no real Turso needed:
 * libsql's in-memory mode speaks the exact same SQL dialect as the hosted
 * DB, so these tests exercise real SQL behavior (UPSERT, RETURNING, etc.)
 * without any of the flakiness or cost of hitting a live database.
 *
 * CONCEPT: Test Driven Development (TDD) — this file is written BEFORE the
 * implementation exists. It's expected to fail first (red), then pass once
 * db-core.ts is implemented (green). That order proves the test actually
 * catches bugs instead of just rubber-stamping whatever the code does.
 *
 * Imports come from './db-core', not './db' — the pure helpers (no env
 * lookups) live in db-core.ts so plain Node scripts (migrate/seed/eval,
 * run via `tsx`) can import them too. `./db` additionally pulls in
 * `$env/dynamic/private`, which only resolves inside SvelteKit's build and
 * would crash a bare tsx script on import.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { createClient, type Client } from '@libsql/client';
import { ensureSchema, getCached, putCached, checkRateLimit } from './db-core';
import type { SherExplanationResult } from '../types';

const fakeResult: SherExplanationResult = {
	analysis: {
		isValidSher: true, invalidReason: null, urduScript: 'ا\nب', romanUrdu: 'a\nb',
		translation: 't', interpretation: 'i', context: 'c', themes: [], devices: [],
		poetGuess: null, attributionConfidence: 'none'
	},
	attribution: { tier: 'unknown' },
	cachedAt: null
};

let db: Client;
beforeEach(async () => {
	db = createClient({ url: ':memory:' });
	await ensureSchema(db);
});

describe('explanations cache', () => {
	it('miss → null, put → hit with cachedAt stamped', async () => {
		expect(await getCached(db, 'r:xyz')).toBeNull();
		await putCached(db, 'r:xyz', 'raw input', fakeResult);
		const hit = await getCached(db, 'r:xyz');
		expect(hit?.analysis.translation).toBe('t');
		expect(hit?.cachedAt).toBeTruthy();
	});
	it('put is an upsert — same key twice does not throw or duplicate', async () => {
		await putCached(db, 'r:xyz', 'raw', fakeResult);
		await putCached(db, 'r:xyz', 'raw', fakeResult);
		const rows = await db.execute('SELECT COUNT(*) AS n FROM explanations');
		expect(Number(rows.rows[0].n)).toBe(1);
	});
});

describe('rate limit (10/hour/ip, in DB because serverless has no shared memory)', () => {
	it('allows 10 then blocks the 11th', async () => {
		for (let i = 0; i < 10; i++) expect(await checkRateLimit(db, '1.2.3.4')).toBe(true);
		expect(await checkRateLimit(db, '1.2.3.4')).toBe(false);
	});
	it('different IPs are independent', async () => {
		for (let i = 0; i < 10; i++) await checkRateLimit(db, '1.2.3.4');
		expect(await checkRateLimit(db, '5.6.7.8')).toBe(true);
	});
});
