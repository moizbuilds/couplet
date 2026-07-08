/*
 * schema.ts — the database's DDL (Data Definition Language: the SQL that
 * creates tables, as opposed to DML which reads/writes rows), kept as plain
 * exported data with NO framework imports.
 *
 * WHY this file exists on its own: both the running app (db.ts, via
 * SvelteKit) and standalone Node scripts (migrate.ts, and later seed/eval,
 * run via `tsx` outside of SvelteKit) need to create the same two tables.
 * If the CREATE TABLE strings lived only in db.ts, migrate.ts would have to
 * either import db.ts (which drags in `$env/dynamic/private` — an alias
 * SvelteKit's Vite plugin resolves, but a bare tsx process cannot) or
 * duplicate the SQL by hand, which is exactly the "one fact in two places"
 * trap the project's standards warn about (a schema tweak in one copy and
 * not the other silently breaks migrations). Putting the DDL here, with zero
 * dependencies beyond plain TypeScript, lets every caller share one source
 * of truth.
 */

export const DDL: string[] = [
	`CREATE TABLE IF NOT EXISTS explanations (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		normalized_key TEXT UNIQUE NOT NULL,
		input_raw TEXT NOT NULL,
		result_json TEXT NOT NULL,
		created_at TEXT NOT NULL DEFAULT (datetime('now'))
	)`,
	`CREATE TABLE IF NOT EXISTS rate_limits (
		ip TEXT NOT NULL,
		window_start TEXT NOT NULL,
		count INTEGER NOT NULL,
		PRIMARY KEY (ip, window_start)
	)`
];
