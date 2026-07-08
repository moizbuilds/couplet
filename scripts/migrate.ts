/*
 * migrate.ts — one-off Node script that creates the schema on whatever DB
 * `.env` points at (file:local.db for local dev, a libsql://... URL for
 * production Turso). Run with `npm run migrate`.
 *
 * This is a plain Node script, run via `tsx` outside of SvelteKit, so it
 * reads secrets from `process.env` directly (via the `dotenv` package,
 * loaded below) instead of `$env/dynamic/private` — that alias is a
 * SvelteKit build-time feature and does not exist under bare tsx. It
 * imports the shared `DDL` array from `src/lib/server/schema.ts` — the same
 * table definitions the running app uses via `ensureSchema` — so the schema
 * can never drift between "what migrate.ts created" and "what the app
 * expects".
 */
import 'dotenv/config';
import { createClient } from '@libsql/client';
import { DDL } from '../src/lib/server/schema';

const url = process.env.TURSO_DATABASE_URL;
if (!url) throw new Error('Set TURSO_DATABASE_URL in .env (file:local.db works for dev)');
if (!url.startsWith('file:') && !process.env.TURSO_AUTH_TOKEN) {
	throw new Error('Remote Turso needs TURSO_AUTH_TOKEN in .env');
}

const db = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });

for (const ddl of DDL) {
	await db.execute(ddl);
}

console.log('schema ready on', url.startsWith('file:') ? url : 'remote turso');
