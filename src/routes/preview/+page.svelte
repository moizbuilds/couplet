<script lang="ts">
	/*
	 * /preview — a DEV/DESIGN PREVIEW ROUTE, not a user-facing page.
	 * It exists because there is no ANTHROPIC_API_KEY in local dev: this is
	 * how the katba panel, all three attribution tiers, and SherInput get
	 * visually verified without a live LLM call. Renders the three fixtures
	 * from $lib/fixtures.ts stacked, plus the input at the top so the whole
	 * component family is checkable on one screen.
	 */
	import SherInput from '$lib/components/SherInput.svelte';
	import ExplanationView from '$lib/components/ExplanationView.svelte';
	import { verifiedFixture, attributedFixture, unknownFixture } from '$lib/fixtures';

	const fixtures = [
		{ label: 'Tier 1 — verified', result: verifiedFixture },
		{ label: 'Tier 2 — attributed', result: attributedFixture },
		{ label: 'Tier 3 — unknown', result: unknownFixture }
	];
</script>

<svelte:head>
	<title>Couplet — design preview</title>
</svelte:head>

<main>
	<h1 class="display">Design preview</h1>
	<p class="note">SherInput + all three attribution tiers, rendered from fixtures (no API key needed).</p>

	<section class="block">
		<h2 class="eyebrow">SherInput</h2>
		<SherInput onresult={() => {}} />
	</section>

	{#each fixtures as f (f.label)}
		<section class="block">
			<h2 class="eyebrow">{f.label}</h2>
			<ExplanationView result={f.result} />
		</section>
	{/each}
</main>

<style>
	main {
		max-width: 50rem;
		margin-inline: auto;
		padding: var(--space-4) var(--space-3) var(--space-5);
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
	}
	h1 {
		margin: 0;
		font-size: var(--t-h2);
	}
	.note {
		margin: 0;
		color: var(--c-ink-soft);
		font-size: 0.95rem;
	}
	.block {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		padding-block-start: var(--space-3);
		border-top: 1px dashed var(--rule-ink);
	}
</style>
