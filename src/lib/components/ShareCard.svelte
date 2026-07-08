<script lang="ts">
	/*
	 * ShareCard — the visual card itself: a PURE render with no state and no
	 * buttons. WHY pure: this exact markup gets reused verbatim by the
	 * OG-image route (Task 13), which renders it server-side with
	 * Playwright — any interactivity baked in here would break that reuse.
	 *
	 * Every color comes from `theme` (src/lib/themes.ts) via CSS custom
	 * properties set on the root element — this component hardcodes no
	 * card color itself, so editing themes.ts is the ONLY place a card's
	 * look can change (the "one source of truth" structural rule).
	 *
	 * LAYOUT CONTRACT (why the watermark is in normal flow, not absolute):
	 * an absolutely-positioned watermark does not reserve vertical space, so
	 * tall content (a long sher that wraps + a long one-liner) silently
	 * slides underneath it and the two overlap in the exported PNG. Instead
	 * the card is a flex column: `.card-body` grows to fill and centers the
	 * sher, and the watermark sits after it as a flow child — so there is
	 * ALWAYS clear space between them, at every theme and format.
	 */
	import type { SherExplanationResult } from '$lib/types';
	import { FORMATS, type CardFormat, type CardTheme } from '$lib/themes';

	let {
		result,
		theme,
		format,
		oneLiner
	}: {
		result: SherExplanationResult;
		theme: CardTheme;
		format: CardFormat;
		oneLiner: string;
	} = $props();

	const size = $derived(FORMATS[format]);

	// Attribution is decided in code (spec §5), never guessed by the card:
	// the `unknown` tier shows NO poet line at all — honesty over decoration,
	// even though a blank line is less "finished"-looking than a guess would be.
	const poetLine = $derived(
		result.attribution.tier === 'verified' || result.attribution.tier === 'attributed'
			? result.attribution.poet
			: null
	);
</script>

<div
	class="card card-{theme.id} card-{format}"
	style="
		--card-bg: {theme.bg};
		--card-ink: {theme.ink};
		--card-accent: {theme.accent};
		--card-watermark: {theme.watermark};
		width: {size.w}px;
		height: {size.h}px;
	"
>
	<div class="card-body">
		<span class="ornament" aria-hidden="true">؎</span>

		<div class="sher urdu" dir="rtl" lang="ur">
			{#each result.analysis.urduScript.split('\n') as line}
				<p>{line}</p>
			{/each}
		</div>

		{#if poetLine}
			<p class="poet">— {poetLine}</p>
		{/if}

		{#if oneLiner.trim()}
			<p class="meaning">{oneLiner}</p>
		{/if}
	</div>

	<p class="watermark">couplet.moizbuilds.com</p>
</div>

<style>
	.card {
		position: relative;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding: 2.6rem 2.4rem 1.5rem;
		overflow: hidden;
		background: var(--card-bg);
		color: var(--card-ink);
		text-align: center;
		font-family: var(--font-body, serif);
	}

	/* The body grows to fill the card and centers the sher; because it is
	   `flex: 1`, the watermark after it is always pushed to the bottom edge
	   with guaranteed clearance — no overlap is structurally possible. */
	.card-body {
		flex: 1 1 auto;
		min-height: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.1rem;
	}

	/* Nastaliq is the hero of every card. Sized per-format so a long misra
	   (e.g. the Ghalib verified fixture) fits the frame without dominating:
	   the tight 540² square gets the smallest size, the tall 9:16 story can
	   afford larger. line-height 2.3 (above the 2.1 app floor) keeps deep
	   descenders off the line below once flattened to a PNG (Landmine #2). */
	.sher {
		font-size: 1.55rem;
		line-height: 2.3;
		margin: 0;
	}
	.sher p {
		margin: 0;
	}

	.ornament {
		font-family: var(--font-urdu, serif);
		font-size: 1.5rem;
		line-height: 1;
		color: var(--card-accent);
	}

	.poet {
		margin: 0;
		font-family: var(--font-display, serif);
		font-size: 1.02rem;
		font-style: italic;
		color: var(--card-accent);
	}

	.meaning {
		margin: 0;
		max-width: 86%;
		font-family: var(--font-display, serif);
		font-size: 1.08rem;
		font-weight: 460;
		line-height: 1.5;
		color: var(--card-accent);

		/* Clamp a long default one-liner to 2 lines with an ellipsis rather
		   than letting it grow the body unbounded. The layout can't overlap
		   the watermark anymore (it's in flow), but a 4-line meaning would
		   still crowd the sher — 2 lines keeps the sher the clear hero. */
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		overflow: hidden;
	}

	.watermark {
		margin: 0.6rem 0 0;
		flex: 0 0 auto;
		font-family: var(--font-display, serif);
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--card-watermark);
	}

	/* ── Ivory: gold double-rule border — classic manuscript folio. The
	   inner ink hairline is a pseudo-element (like the app's own "katba"
	   panel) so no extra markup is needed just to draw a second rule. ── */
	.card-ivory {
		border: 2px solid var(--card-accent);
	}
	.card-ivory::before {
		content: '';
		position: absolute;
		inset: 12px;
		border: 1px solid color-mix(in srgb, var(--card-ink) 35%, transparent);
		pointer-events: none;
	}

	/* ── Mehfil: a single thicker antique-gold border — the candlelit
	   evening gathering. No inner rule; the border itself is the ornament. ── */
	.card-mehfil {
		border: 3px solid var(--card-accent);
	}

	/* ── Safha: gallery-minimal. No border at all — the type IS the
	   design — just a single hairline under the one-liner. ── */
	.card-safha .meaning {
		padding-bottom: 0.9rem;
		border-bottom: 1px solid var(--card-accent);
	}

	/* ── Raat: no border either — the lapis→transparent wash baked into
	   theme.bg carries the mood, kept deliberately quiet at night. ── */

	/* Story format (9:16): a taller canvas, so the sher can be larger and
	   the one-liner can afford a more generous clamp. */
	.card-story {
		padding: 4.5rem 2.6rem 3.5rem;
	}
	.card-story .sher {
		font-size: 1.9rem;
	}
	.card-story .meaning {
		-webkit-line-clamp: 4;
		line-clamp: 4;
	}

	/* OG format (Task 13, wide 1200×630): tighter vertical padding and a
	   larger sher so it still reads as dominant in a short, wide frame. */
	.card-og {
		padding: 2.25rem 3rem;
	}
	.card-og .sher {
		font-size: 1.75rem;
	}
</style>
