<script lang="ts">
	/*
	 * AttributionBadge — renders the three honesty tiers (spec §5).
	 * WHY a dedicated component: the tier display is a product promise;
	 * one component means it can never render differently on two pages.
	 * Reused as-is by Task 12's anthology/sher pages.
	 */
	import type { Attribution } from '$lib/types';
	let { attribution }: { attribution: Attribution } = $props();
</script>

{#if attribution.tier === 'verified'}
	<a class="badge verified" href="/sher/{attribution.slug}">
		<span class="tick" aria-hidden="true">✓</span> Verified · {attribution.poet}
	</a>
{:else if attribution.tier === 'attributed'}
	<span class="badge attributed">Commonly attributed to {attribution.poet} — not independently verified</span>
{:else}
	<span class="badge unknown">Poet unknown or uncertain — we'd rather say so than guess</span>
{/if}

<style>
	/* Base shape shared by all three tiers — the differences below are what
	   carry the meaning (confident vs. quiet vs. honest), never a color swap
	   on an otherwise identical chip. */
	.badge {
		display: inline-flex;
		align-items: center;
		gap: 0.45em;
		min-height: 2.75rem; /* quality floor: ≥44px hit target on the one clickable tier */
		padding: 0.5em 1em;
		border-radius: var(--radius);
		font-family: var(--font-body);
		font-size: 0.95rem;
		line-height: 1.4;
	}

	/* Verified — confident: lapis + a small gold tick, styled as a real link
	   (it goes somewhere: the anthology's sher page). */
	.verified {
		color: var(--c-lapis);
		background: color-mix(in srgb, var(--c-lapis) 8%, transparent);
		border: 1px solid color-mix(in srgb, var(--c-lapis) 38%, transparent);
		text-decoration: none;
		font-weight: 600;
		transition: background-color 160ms ease;
	}
	.verified:hover {
		background: color-mix(in srgb, var(--c-lapis) 15%, transparent);
	}
	.tick {
		color: var(--c-gold);
		font-weight: 700;
	}

	/* Attributed — neutral/quiet: no border color, no accent, italic prose
	   voice. It reads like a careful footnote, not a claim. */
	.attributed {
		color: var(--c-ink-soft);
		background: transparent;
		border: 1px solid var(--rule-ink);
		font-style: italic;
	}

	/* Unknown — honest, not apologetic: madder is used ONLY here in the whole
	   app (design-direction.md), and it's a warm statement, not an alert. */
	.unknown {
		color: var(--c-madder);
		background: color-mix(in srgb, var(--c-madder) 7%, transparent);
		border: 1px solid color-mix(in srgb, var(--c-madder) 32%, transparent);
		font-weight: 500;
	}
</style>
