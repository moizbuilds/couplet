<script lang="ts">
	/*
	 * ExplanationView — the typeset commentary page: sher in Nastaliq inside
	 * the "katba" panel (the app's signature element, design-direction.md §
	 * "Signature element"), then translation → interpretation → context →
	 * devices, in that order (spec §9).
	 */
	import type { SherExplanationResult } from '$lib/types';
	import AttributionBadge from './AttributionBadge.svelte';
	let { result }: { result: SherExplanationResult } = $props();
	const a = $derived(result.analysis);
</script>

{#if !a.isValidSher}
	<div class="not-a-sher">
		<p>{a.invalidReason}</p>
	</div>
{:else}
	<article class="explanation">
		<!-- The katba: a centered manuscript cartouche around the sher itself —
		     double-rule border (gold outer, ink inner) + a small gold ornament,
		     reused (quieter) as the base of Task 11's share cards. -->
		<div class="katba">
			<span class="ornament" aria-hidden="true">؎</span>
			<div class="sher urdu" dir="rtl" lang="ur">
				{#each a.urduScript.split('\n') as line}<p>{line}</p>{/each}
			</div>
			<p class="roman">{a.romanUrdu.replace('\n', ' / ')}</p>
		</div>

		<div class="attribution-row">
			<AttributionBadge attribution={result.attribution} />
		</div>

		<section>
			<h2 class="eyebrow">Meaning</h2>
			<p>{a.translation}</p>
		</section>
		<section>
			<h2 class="eyebrow">The deeper reading</h2>
			<p>{a.interpretation}</p>
		</section>
		{#if a.context}
			<section>
				<h2 class="eyebrow">Context</h2>
				<p>{a.context}</p>
			</section>
		{/if}
		{#if a.devices.length}
			<section>
				<h2 class="eyebrow">Craft</h2>
				<dl class="devices">
					{#each a.devices as d}
						<dt><span class="tick" aria-hidden="true">✓</span> <span class="urdu-term urdu" dir="rtl" lang="ur">{d.urduTerm}</span> — {d.english}</dt>
						<dd>{d.explanation}</dd>
					{/each}
				</dl>
			</section>
		{/if}
		{#if a.themes.length}
			<ul class="themes">
				{#each a.themes as t}<li>{t}</li>{/each}
			</ul>
		{/if}
	</article>
{/if}

<style>
	.explanation {
		max-width: var(--measure);
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	/* ── The katba: sher lives inside a double-rule cartouche on raised paper. ── */
	.katba {
		position: relative;
		max-width: 42rem;
		margin-inline: auto;
		padding: var(--space-5) var(--space-4) var(--space-4);
		background: var(--c-surface);
		border: 1px solid var(--rule-gold);
		text-align: center;
	}
	/* The inner ink hairline sits inset from the outer gold border, forming
	   the double rule described in design-direction.md — a pseudo-element
	   rather than a second nested div, so no extra markup is needed. */
	.katba::before {
		content: '';
		position: absolute;
		inset: 10px;
		border: 1px solid var(--rule-ink);
		pointer-events: none;
	}
	.ornament {
		display: block;
		font-family: var(--font-urdu);
		font-size: 1.4rem;
		color: var(--c-gold);
		margin-block-end: var(--space-2);
	}
	.sher {
		font-size: var(--t-sher);
		color: var(--c-ink);
	}
	.sher p {
		margin: 0;
	}
	.roman {
		margin: var(--space-3) 0 0;
		font-family: var(--font-body);
		font-style: italic;
		font-size: var(--t-roman);
		color: var(--c-ink-soft);
	}

	.attribution-row {
		display: flex;
		justify-content: center;
	}

	/* Scoped to direct children of .explanation (not a bare `section`
	   selector) so this rhythm can never collide with padding rules a
	   nested component defines for its own <section> — the specificity
	   landmine called out in the task brief. */
	.explanation > section {
		padding-block-start: var(--space-3);
		border-top: 1px solid var(--rule-ink);
	}
	.explanation > section h2 {
		margin: 0 0 var(--space-1);
	}
	.explanation > section p {
		margin: 0;
		font-size: var(--t-body);
		line-height: 1.7;
	}

	.devices {
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}
	.devices dt {
		display: flex;
		align-items: baseline;
		gap: 0.4em;
		font-family: var(--font-body);
		font-weight: 600;
		color: var(--c-ink);
	}
	.devices dt .tick {
		color: var(--c-gold);
	}
	.urdu-term {
		font-size: 1.2rem;
	}
	.devices dd {
		margin: 0 0 0 1.6em;
		color: var(--c-ink-soft);
		font-size: 0.98rem;
		line-height: 1.6;
	}

	.themes {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-1);
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.themes li {
		padding: 0.3em 0.85em;
		border: 1px solid var(--rule-ink);
		border-radius: var(--radius);
		font-family: var(--font-display);
		font-size: var(--t-caption);
		color: var(--c-ink-soft);
		letter-spacing: 0.02em;
	}

	.not-a-sher {
		max-width: var(--measure);
		margin-inline: auto;
		padding: var(--space-4);
		border: 1px dashed var(--rule-ink);
		border-radius: var(--radius);
		color: var(--c-ink-soft);
		font-style: italic;
		text-align: center;
	}
</style>
