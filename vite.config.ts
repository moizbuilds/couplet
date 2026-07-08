// Vite build config for the SvelteKit app.
// CONCEPT: Vitest (the "test" block below) reuses this same Vite config to run
// unit tests, so test files get the same TypeScript/Svelte transforms as the app.
// NOTE: passing no options to sveltekit() here means kit config (adapter, etc.)
// is read from svelte.config.js instead — see that file for the adapter choice.
// The reference below adds Vitest's "test" option to Vite's config type, since
// plain "vite" doesn't know about it.
/// <reference types="vitest/config" />
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.test.ts'],
		environment: 'node'
	}
});
