// SvelteKit build config.
// CONCEPT: an "adapter" tells SvelteKit which hosting platform to package the
// build for (Vercel, Node, static, etc). We pin adapter-vercel explicitly
// instead of adapter-auto so the local `npm run build` output always matches
// what actually deploys to prod — adapter-auto silently guesses per-environment.
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: { adapter: adapter() }
};
export default config;
