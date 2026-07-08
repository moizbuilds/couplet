/*
 * fonts-ready.ts — the shared readiness gate for anything that rasterizes
 * Nastaliq: the share-card preview AND the PNG export both call this ONE
 * function (global rule: one readiness check gates every action an async
 * resource blocks — never a copy-pasted check per caller).
 *
 * WHY this matters (spec §12 Landmine #3): html-to-image's toPng() draws
 * whatever is on screen at the instant it's called. If the Nastaliq
 * webfont hasn't finished loading yet, the browser is still painting the
 * sher in a fallback serif, and the exported PNG silently ships broken,
 * disconnected Urdu letterforms — a completely unusable card that LOOKS
 * fine in the dev tools network tab. There is no error to catch; it just
 * looks wrong. So export must never even attempt to run until we've
 * positively confirmed the real font is usable.
 */
export async function fontsReady(): Promise<boolean> {
	// CONCEPT: document.fonts is the browser's FontFaceSet API. `.ready` is a
	// promise that resolves once all currently-requested fonts have settled
	// (loaded OR failed) — but it resolves either way, so it can't tell us
	// WHICH fonts succeeded.
	await document.fonts.ready;

	// CONCEPT: document.fonts.check(cssFontString) asks the browser "is this
	// exact font, at this size/weight, actually available to render text
	// right now?" — this is the positive confirmation `.ready` can't give us.
	return document.fonts.check("16px 'Noto Nastaliq Urdu'");
}
