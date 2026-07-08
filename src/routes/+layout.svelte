<script lang="ts">
	// Root layout: loads fonts + global tokens once for every page.
	// CONCEPT: a "layout" in SvelteKit wraps every route's page — global CSS and fonts go here.
	import '@fontsource/noto-nastaliq-urdu/400.css';
	import '@fontsource/noto-nastaliq-urdu/700.css';
	import '@fontsource-variable/fraunces';
	import '@fontsource-variable/newsreader'; // upright commentary body
	import '@fontsource-variable/newsreader/wght-italic.css'; // italic glosses / romanization
	import '../lib/styles/tokens.css';
	let { children } = $props();
</script>

{@render children()}
