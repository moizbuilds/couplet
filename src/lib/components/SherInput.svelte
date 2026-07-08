<script lang="ts">
	/*
	 * SherInput — textarea accepting Urdu script OR Roman Urdu, posts to
	 * /api/explain, surfaces every failure state with a retry. The pasted
	 * text is NEVER cleared on failure (pre-flight rule #2) — the network
	 * or server can fail, but the user's typing never gets destroyed.
	 */
	import type { ExplainResponse, SherExplanationResult } from '$lib/types';

	let { onresult }: { onresult: (r: SherExplanationResult) => void } = $props();

	// CONCEPT: $state() makes a variable reactive — the UI re-renders when it changes.
	let text = $state('');
	let busy = $state(false);
	let error = $state<null | 'invalid_input' | 'rate_limited' | 'server_error' | 'network'>(null);

	const MAX = 500; // mirror of the server cap, for UX only — server still enforces
	// CONCEPT: $derived() recomputes automatically from other reactive values.
	// The Urdu block range (؀–ۿ) covers Arabic-script Urdu; Roman Urdu falls
	// through to the Latin/body styling instead.
	const isUrdu = $derived(/[؀-ۿ]/.test(text));

	async function submit() {
		if (!text.trim() || busy) return;
		busy = true;
		error = null;
		try {
			const res = await fetch('/api/explain', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ text: text.trim() })
			});
			const data: ExplainResponse = await res.json();
			if (data.ok) onresult(data.result);
			else error = data.error;
		} catch {
			error = 'network';
		} finally {
			busy = false;
		}
	}
</script>

<div class="sher-input">
	<textarea
		bind:value={text}
		maxlength={MAX}
		dir={isUrdu ? 'rtl' : 'ltr'}
		lang={isUrdu ? 'ur' : 'en'}
		class:urdu={isUrdu}
		placeholder="Paste a sher — Urdu script or Roman Urdu…"
		aria-label="Sher to explain"
	></textarea>
	{#if isUrdu}<span class="script-hint" dir="ltr">Urdu script detected</span>{/if}
	<button onclick={submit} disabled={busy || !text.trim()}>
		{busy ? 'Reading the sher…' : 'Explain'}
	</button>
	{#if error}
		<p class="error" role="alert">
			{#if error === 'rate_limited'}You've hit the hourly limit — try again in a bit.
			{:else if error === 'invalid_input'}That looks empty or too long (500 characters max).
			{:else}Something failed on our side — your sher is untouched.
			{/if}
			{#if error !== 'invalid_input'}<button class="retry" onclick={submit}>Retry</button>{/if}
		</p>
	{/if}
</div>

<style>
	.sher-input {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		max-width: var(--measure);
		margin-inline: auto;
	}

	textarea {
		background: var(--c-surface);
		color: var(--c-ink);
		border: 1px solid var(--rule-ink);
		border-radius: var(--radius);
		padding: var(--space-3);
		font-family: var(--font-body);
		font-size: var(--t-roman);
		line-height: 1.7;
		min-height: 8rem;
		resize: vertical;
	}
	textarea::placeholder {
		color: var(--c-ink-soft);
	}
	/* Roman Urdu is typed here; once real Urdu script is detected the field
	   switches to Nastaliq, right-aligned, with the 2.1 line-height floor
	   (design-direction.md landmine: without it, descenders clip). */
	textarea.urdu {
		font-family: var(--font-urdu);
		font-size: clamp(1.35rem, 1.05rem + 1.2vw, 1.75rem);
		line-height: 2.1;
		text-align: right;
	}

	.script-hint {
		align-self: flex-end;
		font-family: var(--font-body);
		font-size: var(--t-caption);
		font-style: italic;
		color: var(--c-ink-soft);
	}

	button {
		align-self: flex-start;
		min-height: 2.75rem; /* quality floor: ≥44px hit target */
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
	button:hover:not(:disabled) {
		background: color-mix(in srgb, var(--c-lapis) 85%, black);
	}
	button:disabled {
		opacity: 0.55;
		cursor: not-allowed;
	}

	.error {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin: 0;
		color: var(--c-madder);
		font-family: var(--font-body);
		font-size: 0.95rem;
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
