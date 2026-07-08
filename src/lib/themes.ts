/*
 * themes.ts — card themes as DATA (id, colors, art direction). One source
 * of truth for the share-card studio, the PNG export, AND the future OG
 * route (Task 13) — so a color can never drift between what a user sees
 * in the studio and what actually gets exported.
 *
 * WHY data instead of four near-identical Svelte components: the four
 * themes share one structure (sher, poet line, meaning, watermark) and
 * differ only in color/ornament. Encoding the differences as data keeps
 * ShareCard a single component that reads `theme.*`, instead of four
 * components whose markup could quietly drift apart over time.
 *
 * Colors are the exact values from docs/design-direction.md's "Card
 * themes" table (Task 9) — do not hardcode card colors anywhere else.
 */

export type CardFormat = 'square' | 'story' | 'og';

export interface CardTheme {
	id: string;
	name: string;
	bg: string; // CSS background (color or layered gradient)
	ink: string; // sher + poet text color
	accent: string; // meaning line + rules/ornaments/watermark color
	watermark: string; // watermark color (usually accent at lower alpha)
	mood: string; // one-line art-direction note, shown in the theme picker
}

export const themes: CardTheme[] = [
	{
		id: 'ivory',
		name: 'Ivory',
		bg: '#F1EADA',
		ink: '#211D17',
		accent: '#9B7A2F',
		watermark: '#9B7A2FA0',
		mood: 'Classic manuscript folio'
	},
	{
		id: 'mehfil',
		name: 'Mehfil',
		bg: '#12232E',
		ink: '#EEE3CC',
		accent: '#C9A227',
		watermark: '#C9A227A0',
		mood: 'The candlelit evening gathering'
	},
	{
		id: 'safha',
		name: 'Safha',
		bg: '#FBFAF6',
		ink: '#211D17',
		accent: '#6A6151',
		watermark: '#211D1799',
		mood: 'Gallery-minimal — the type is the design'
	},
	{
		id: 'raat',
		name: 'Raat',
		// A deep lapis wash rising from the base, fading up into warm-black —
		// explicitly NEVER purple (design-direction.md is emphatic about this).
		bg: 'linear-gradient(to top, #1E2E4A 0%, transparent 62%), #14100E',
		ink: '#EDE4D2',
		accent: '#C9A227',
		watermark: '#C9A227A6',
		mood: 'Moody, made for a phone screen at night'
	}
];

/** Card pixel sizes (CSS px). PNG export = CSS size × pixelRatio 2 in
 *  CardStudio, so `square` exports at 1080×1080. `og` is reserved for
 *  Task 13's server-rendered OG-image route, not exported via
 *  html-to-image here (Playwright screenshots it instead). */
export const FORMATS: Record<CardFormat, { w: number; h: number }> = {
	square: { w: 540, h: 540 },
	story: { w: 540, h: 960 },
	og: { w: 1200, h: 630 }
};
