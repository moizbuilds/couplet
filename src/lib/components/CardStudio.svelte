<script lang="ts">
	/*
	 * CardStudio — the app's growth engine: theme picker, format toggle, an
	 * editable one-liner, and a PNG export button. This is the ONLY
	 * interactive layer; the actual card markup lives in the pure
	 * <ShareCard> so Task 13's OG route can reuse it unchanged.
	 *
	 * Export is gated on fontsReady() (src/lib/fonts-ready.ts) — the shared
	 * readiness check that also drives the "loading"/"failed" messages
	 * below. This is the global structural rule for async-gated actions:
	 * one check, shared by everything it blocks, with a visible message on
	 * failure — never a silent degraded export (spec §12 Landmine #3).
	 */
	import { toPng } from 'html-to-image';
	import type { SherExplanationResult } from '$lib/types';
	import { themes, type CardFormat } from '$lib/themes';
	import { fontsReady } from '$lib/fonts-ready';
	import ShareCard from './ShareCard.svelte';

	let { result }: { result: SherExplanationResult } = $props();

	// CONCEPT: $state() makes a variable reactive — changing it re-renders
	// whatever reads it (the preview below, the disabled state of buttons).
	let theme = $state(themes[0]);
	let format = $state<CardFormat>('square');
	let fontState = $state<'loading' | 'ready' | 'failed'>('loading');
	let exporting = $state(false);
	let exportError = $state(false);
	let cardWrap = $state<HTMLElement | null>(null);

	// One source of truth for the one-liner's length cap: the HTML
	// `maxlength` attribute below AND the derived-default truncation both
	// read this constant, so the two can never drift apart.
	const ONE_LINER_MAX_LENGTH = 140;

	function firstSentence(text: string): string {
		return text.split(/(?<=[.!?])\s/)[0] ?? '';
	}

	// Pre-flight rule #3 (bad input): `maxlength` on an <input> only stops
	// the USER from typing past the cap — it does nothing to a value set
	// programmatically via bind:value. Some translations (e.g. the Ghalib
	// verified fixture) have no sentence-ending punctuation until the very
	// end, so `firstSentence()` alone can return a string longer than
	// ONE_LINER_MAX_LENGTH — that string would sit in the input silently
	// over the cap until the user happened to edit it. Truncating the
	// default here closes that gap instead of relying on the input's own
	// (typing-only) enforcement.
	function truncate(text: string, max: number): string {
		return text.length > max ? text.slice(0, max - 1).trimEnd() + '…' : text;
	}

	// Default one-liner: the first sentence of the translation (spec §7),
	// capped to the same length the card studio enforces on manual edits.
	// WHY $derived + a synced $state instead of `$state(firstSentence(...))`
	// directly: a plain $state initializer only reads `result` ONCE, at
	// creation — svelte-check flags this (state_referenced_locally) because
	// if this same component instance ever received a *different* `result`
	// prop without being remounted (home always remounts via {#key}, but the
	// component shouldn't silently rely on that), the one-liner would keep
	// showing the OLD sher's default forever. Deriving the default and
	// re-syncing it in an $effect means the field still stays user-editable
	// (the $effect only fires again when `result` itself changes), but it
	// can never go stale.
	let defaultOneLiner = $derived(truncate(firstSentence(result.analysis.translation), ONE_LINER_MAX_LENGTH));
	let oneLiner = $state('');
	$effect(() => {
		oneLiner = defaultOneLiner;
	});

	// CONCEPT: $effect() runs side effects (things with no return value that
	// touch the outside world) after render. This one has no reactive reads,
	// so it runs exactly once when the studio mounts — checking font
	// readiness is a one-time gate, not something that reruns per keystroke.
	$effect(() => {
		fontsReady().then((ok) => {
			fontState = ok ? 'ready' : 'failed';
		});
	});

	async function download() {
		// The rendered .card element is ShareCard's root — toPng needs the
		// actual DOM node, not the Svelte component instance.
		const el = cardWrap?.firstElementChild as HTMLElement | null;
		if (!el || fontState !== 'ready') return;
		exporting = true;
		exportError = false;
		try {
			// pixelRatio 2 → 1080px-wide output for square, crisp even after
			// WhatsApp/Instagram's own re-compression on upload.
			const dataUrl = await toPng(el, { pixelRatio: 2 });
			const a = document.createElement('a');
			a.download = `couplet-${theme.id}-${format}.png`;
			a.href = dataUrl;
			a.click();
		} catch (err) {
			// Pre-flight rule #2: a failed export must surface with a retry,
			// never fail silently and never destroy the user's edits above.
			console.error('[couplet] card export failed:', err);
			exportError = true;
		} finally {
			exporting = false;
		}
	}
</script>

<section class="card-studio">
	<h2 class="eyebrow">Share this sher</h2>

	<div class="controls">
		<div class="theme-picker" role="radiogroup" aria-label="Card theme">
			{#each themes as t (t.id)}
				<button
					type="button"
					class="swatch"
					class:active={t.id === theme.id}
					style="--swatch-bg: {t.bg}; --swatch-ink: {t.ink};"
					role="radio"
					aria-checked={t.id === theme.id}
					title={t.mood}
					onclick={() => (theme = t)}
				>
					<span class="swatch-fill" aria-hidden="true"></span>
					{t.name}
				</button>
			{/each}
		</div>

		<div class="format-toggle" role="radiogroup" aria-label="Card format">
			<button
				type="button"
				class:active={format === 'square'}
				role="radio"
				aria-checked={format === 'square'}
				onclick={() => (format = 'square')}
			>
				Square
			</button>
			<button
				type="button"
				class:active={format === 'story'}
				role="radio"
				aria-checked={format === 'story'}
				onclick={() => (format = 'story')}
			>
				Story
			</button>
		</div>

		<label class="one-liner">
			<span class="label">One-line meaning on the card</span>
			<input
				type="text"
				bind:value={oneLiner}
				maxlength={ONE_LINER_MAX_LENGTH}
				placeholder="A short line of meaning…"
			/>
		</label>
	</div>

	{#if fontState === 'loading'}
		<p class="status">Loading Urdu type…</p>
	{:else if fontState === 'failed'}
		<p class="status error" role="alert">
			The Urdu font failed to load, so export is disabled — a card made now would ship broken
			letterforms. Reload the page to retry.
		</p>
	{/if}

	<div class="preview">
		<div bind:this={cardWrap} class="preview-frame" class:dim={fontState !== 'ready'}>
			<ShareCard {result} {theme} {format} {oneLiner} />
		</div>
	</div>

	<div class="actions">
		<button type="button" class="download" onclick={download} disabled={fontState !== 'ready' || exporting}>
			{exporting ? 'Rendering…' : 'Download PNG'}
		</button>
		{#if exportError}
			<p class="status error" role="alert">
				Export failed — nothing was saved. <button type="button" class="retry" onclick={download}
					>Retry</button
				>
			</p>
		{/if}
	</div>
</section>

<style>
	.card-studio {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		padding-block-start: var(--space-3);
		border-top: 1px solid var(--rule-ink);
	}

	.controls {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		gap: var(--space-3);
	}

	.theme-picker,
	.format-toggle {
		display: flex;
		gap: 0.5rem;
	}

	/* Theme buttons carry a small swatch of the theme's own background so
	   the picker doubles as a preview, not just a label list. */
	.swatch {
		display: flex;
		align-items: center;
		gap: 0.5em;
		min-height: 2.75rem; /* quality floor: ≥44px hit target */
		padding: 0.4em 0.9em 0.4em 0.4em;
		border: 1px solid var(--rule-ink);
		border-radius: var(--radius);
		background: var(--c-surface);
		color: var(--c-ink);
		font-family: var(--font-body);
		font-size: 0.92rem;
		cursor: pointer;
		transition:
			border-color 160ms ease,
			background-color 160ms ease;
	}
	.swatch-fill {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		background: var(--swatch-bg);
		border: 1px solid color-mix(in srgb, var(--swatch-ink) 40%, transparent);
	}
	.swatch:hover {
		border-color: var(--c-lapis);
	}
	.swatch.active {
		border-color: var(--c-lapis);
		background: color-mix(in srgb, var(--c-lapis) 8%, transparent);
		font-weight: 600;
	}

	.format-toggle button {
		min-height: 2.75rem;
		padding: 0.4em 1.2em;
		border: 1px solid var(--rule-ink);
		border-radius: var(--radius);
		background: var(--c-surface);
		color: var(--c-ink);
		font-family: var(--font-body);
		font-size: 0.92rem;
		cursor: pointer;
		transition:
			border-color 160ms ease,
			background-color 160ms ease;
	}
	.format-toggle button:hover {
		border-color: var(--c-lapis);
	}
	.format-toggle button.active {
		border-color: var(--c-lapis);
		background: color-mix(in srgb, var(--c-lapis) 8%, transparent);
		font-weight: 600;
	}

	.one-liner {
		flex: 1 1 16rem;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}
	.one-liner .label {
		font-family: var(--font-display);
		font-size: var(--t-caption);
		color: var(--c-ink-soft);
	}
	.one-liner input {
		min-height: 2.75rem;
		padding: 0.5em 0.85em;
		border: 1px solid var(--rule-ink);
		border-radius: var(--radius);
		background: var(--c-surface);
		color: var(--c-ink);
		font-family: var(--font-body);
		font-size: 0.95rem;
	}

	.status {
		margin: 0;
		font-family: var(--font-body);
		font-style: italic;
		font-size: 0.9rem;
		color: var(--c-ink-soft);
	}
	.status.error {
		font-style: normal;
		color: var(--c-madder);
	}

	/* The preview scrolls horizontally within ITS OWN box on narrow
	   screens rather than ever widening the page — the card's pixel size
	   is fixed (it must match the exported PNG exactly), so on a small
	   phone it's better to let this one region scroll than to shrink the
	   card and risk the export looking different from what was previewed. */
	.preview {
		display: flex;
		justify-content: center;
		overflow-x: auto;
		padding-block: var(--space-2);
	}
	.preview-frame {
		flex: none;
		transition: opacity 200ms ease;
	}
	.preview-frame.dim {
		opacity: 0.5;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-2);
	}

	.download {
		min-height: 2.75rem;
		padding: 0.6em 1.6em;
		border: 1px solid var(--c-lapis);
		border-radius: var(--radius);
		background: var(--c-lapis);
		color: var(--c-surface);
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 1rem;
		letter-spacing: 0.01em;
		cursor: pointer;
		transition:
			background-color 160ms ease,
			opacity 160ms ease;
	}
	.download:hover:not(:disabled) {
		background: color-mix(in srgb, var(--c-lapis) 85%, black);
	}
	.download:disabled {
		opacity: 0.55;
		cursor: not-allowed;
	}

	.retry {
		min-height: 2.25rem;
		padding: 0.35em 1em;
		border: 1px solid var(--c-madder);
		border-radius: var(--radius);
		background: transparent;
		color: var(--c-madder);
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 0.85rem;
		cursor: pointer;
	}
	.retry:hover {
		background: color-mix(in srgb, var(--c-madder) 10%, transparent);
	}
</style>
