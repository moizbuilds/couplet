/*
 * db.ts — the app's entry point into the Turso (libsql) database.
 * This file's only job beyond re-exporting is `getDb()`: turning the
 * environment variables into a connected client. The actual cache and
 * rate-limit logic lives in `./db-core` (see that file's header for why it's
 * split out) — app code should still import cache/rate-limit helpers from
 * `$lib/server/db` as usual; the re-exports below make that transparent.
 */
import { createClient, type Client } from '@libsql/client';
// CONCEPT: $env/dynamic/private is SvelteKit's server-only environment
// variable accessor — "dynamic" because it reads process.env at request
// time (not baked in at build time), and "private" because SvelteKit
// refuses to let client-side code import it, which prevents secrets like
// TURSO_AUTH_TOKEN from ever being bundled into JS sent to the browser.
import { env } from '$env/dynamic/private';

export {
	ensureSchema,
	getCached,
	putCached,
	checkRateLimit
} from './db-core';

/**
 * Builds a Turso client from environment variables, or returns null if the
 * configuration is unusable.
 *
 * WHY fail-closed (return null) instead of throwing or guessing: a missing
 * or malformed DB config must surface to the caller as "the database is
 * unavailable" — which the API route turns into a clean 503 — never as a
 * client that silently no-ops, serves stale fabricated data, or connects to
 * the wrong place. Global standard #4: secrets are required, and missing
 * ones must fail closed, not degrade silently.
 */
export function getDb(): Client | null {
	const url = env.TURSO_DATABASE_URL;
	if (!url) return null;
	// A local file: URL (dev/tests) needs no auth token. Any non-file: URL is
	// assumed to be a real hosted Turso database, which always requires one —
	// treat "remote URL, no token" as misconfiguration rather than connecting
	// unauthenticated.
	if (!url.startsWith('file:') && !env.TURSO_AUTH_TOKEN) return null;
	return createClient({ url, authToken: env.TURSO_AUTH_TOKEN });
}
