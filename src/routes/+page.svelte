<script lang="ts">
	/*
	 * Home — input + result + (Task 11 adds the card studio here).
	 * The result is keyed by the sher's identity so a new sher fully
	 * rebuilds the view (pre-flight rule #8: identity-keyed components).
	 */
	import type { SherExplanationResult } from '$lib/types';
	import SherInput from '$lib/components/SherInput.svelte';
	import ExplanationView from '$lib/components/ExplanationView.svelte';
	import CardStudio from '$lib/components/CardStudio.svelte';
	let result = $state<SherExplanationResult | null>(null);
</script>

<svelte:head>
	<title>Couplet — every sher, explained</title>
	<meta
		name="description"
		content="Paste any Urdu sher — get the meaning, the craft, and a share card worth posting."
	/>
</svelte:head>

<main>
	<header class="masthead">
		<h1 class="display">Couplet</h1>
		<p class="tagline">Every sher carries a world. Open it.</p>
	</header>

	<SherInput onresult={(r) => (result = r)} />

	{#if result}
		{#key result.analysis.urduScript}
			<div class="reveal">
				<ExplanationView {result} />
				<CardStudio {result} />
			</div>
		{/key}
	{/if}
</main>

<style>
	main {
		max-width: 46rem;
		margin-inline: auto;
		padding: var(--space-5) var(--space-3) var(--space-5);
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
	}

	.masthead {
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}
	.masthead h1 {
		margin: 0;
		font-size: var(--t-display);
		color: var(--c-ink);
	}
	.tagline {
		margin: 0;
		font-family: var(--font-body);
		font-style: italic;
		font-size: var(--t-roman);
		color: var(--c-ink-soft);
	}

	/* Quiet fade+rise on a fresh result (design-direction.md "Motion").
	   prefers-reduced-motion is handled globally in tokens.css, which
	   zeroes animation-duration for every element — no extra guard needed. */
	.reveal {
		animation: reveal 240ms ease-out both;
	}
	@keyframes reveal {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
