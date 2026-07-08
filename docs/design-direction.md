# Couplet — Design Direction (locked by Task 9)

This is the binding visual system. Every later task styles FROM this file. Components reference the CSS custom properties in `src/lib/styles/tokens.css`; never hardcode a hex or font name outside that file.

## The idea in one line

Couplet is a **reading room for the ghazal** — a beautifully typeset critical edition, not a web tool. The sher is treated the way an illuminated Urdu *divan* treats it: ink on tinted paper, framed by a fine gold-and-lapis rule, with the explanation reading beneath like a scholar's *tashreeh*.

## Why this direction (and what it deliberately rejects)

The templated answer for an Urdu-poetry app is cream `#F4F1EA` + a high-contrast Playfair-style serif + a terracotta accent. That is the AI default and it appears regardless of subject. We reject the terracotta outright and instead take the accent system from the **real material world of the Mughal/Persian manuscript**: *lajward* (lapis blue) and *tazhib* (gold illumination), with *siyahi* — warm sepia-black reed-pen ink — instead of pure `#000`. That pairing is specific to this subject and is the thing the design will be remembered by.

## Palette (light theme — the app)

| Token | Hex | Name / role |
|---|---|---|
| `--c-paper` | `#F1EADA` | Haldi-tinted parchment — the app background. Warmer/wheatier than the default cream, less grey/pink. |
| `--c-surface` | `#F8F2E5` | Raised paper — cards, the katba panel, input surfaces. |
| `--c-ink` | `#211D17` | *Siyahi* — warm sepia-black. All primary text (Urdu + Latin). Never `#000`. |
| `--c-ink-soft` | `#6A6151` | Muted brown-grey — romanization, captions, secondary prose. |
| `--c-lapis` | `#2C4A6E` | *Lajward* — links, focus rings, the "verified" accent, key interactive marks. |
| `--c-gold` | `#9B7A2F` | *Tazhib* — hairline rules, ornaments, the verified tick, section eyebrows. Antique, never shiny yellow. |
| `--c-madder` | `#9C4A3B` | Faded madder red — used ONLY for the "poet unknown / uncertain" honesty state. Warm and honest, not an alarm. |

Hairlines use gold or ink at low alpha (`color-mix` or rgba), never a flat grey border.

## Typography — three roles, two Latin families

Discipline: only **two** Latin faces plus Nastaliq. Each has one job.

| Role | Family | Use |
|---|---|---|
| **Sher (hero)** | `Noto Nastaliq Urdu` (`--font-urdu`) | Every line of Urdu. Large, `line-height: 2.1` minimum (Landmine #2), `dir="rtl" lang="ur"`. |
| **Display** | `Fraunces` variable (`--font-display`) | Wordmark, headings, section eyebrows (caps + tracked), the card's English one-liner. High optical contrast that rhymes with Nastaliq's thick/thin ductus. Used with restraint. |
| **Commentary / body** | `Newsreader` variable (`--font-body`) | Translation, interpretation, context prose, and romanization (in italic). A literary reading face with excellent italics for glosses. |

Rejected: Inter / Roboto / system, and IBM Plex Sans (swapped out — too neutral for a critical-edition voice).

### Type scale (fluid)

| Token | clamp | Role |
|---|---|---|
| `--t-sher` | `clamp(1.9rem, 1.3rem + 3vw, 3.1rem)` | Sher on the reading page. |
| `--t-display` | `clamp(2.4rem, 1.6rem + 3.5vw, 4rem)` | Wordmark / h1. |
| `--t-h2` | `clamp(1.15rem, 1rem + 0.6vw, 1.4rem)` | Section headings (also often set as gold caps eyebrow). |
| `--t-body` | `1.15rem` (line-height 1.7) | Commentary prose. |
| `--t-roman` | `1rem` | Romanization, Newsreader italic, `--c-ink-soft`. |
| `--t-eyebrow` | `0.78rem` | Fraunces caps, letter-spacing `0.18em`, `--c-gold`. |
| `--t-caption` | `0.75rem` | Watermark, meta, badges. |

## Signature element — the *katba* (calligraphic panel)

The sher sits in a centered panel on `--c-surface` with a **double rule**: a hairline gold outer frame and a finer ink inner line (like a manuscript cartouche). A single small gold ornament (a stylized *gul*/floral dot, or a gold `؎` poetry mark) sits above the sher as a division mark. Below the panel, the *tashreeh* unfolds: translation → interpretation → context → craft, with each Urdu term in the Craft section called out and marked with a small gold tick. This katba is reused (quieter) as the base of the share cards.

## Layout principles

- Single reading column, generous margins, max-width ~ 68ch for prose, wider for the katba.
- RTL-aware: Urdu blocks get `dir="rtl"`; the katba centers the sher.
- Not a card grid: the anthology is an **index of a critical edition** — a numbered/ruled list of first-lines (matla) with the poet in the margin, not tiles.
- Mobile-first (the sharing audience is on phones): the katba and cards scale down cleanly; controls stack.

## Motion (restrained)

- Sher reveal on result: a quiet fade+rise (~240ms), respecting `prefers-reduced-motion`.
- Verified tick: a subtle gold draw-in. Nothing else animates. (Chanel's rule — one accessory removed.)

## Card themes (art direction — Task 11 builds these)

Each is a distinct paper/mood; all keep Nastaliq the hero, `line-height ≥ 2.1`, and the small `couplet.moizbuilds.com` watermark. Poet line omitted entirely in the `unknown` tier.

| Theme | Ground | Ink | Accent | Mood |
|---|---|---|---|---|
| **Ivory** | `#F1EADA` parchment | `#211D17` siyahi | gold double-rule border, gold watermark | Classic manuscript folio, letterpress calm. |
| **Mehfil** | `#12232E` deep night-teal | `#EEE3CC` warm ivory | antique gold border + gold one-liner | The candlelit evening gathering. |
| **Safha** | `#FBFAF6` near-white | `#211D17` ink | single hairline under the one-liner, no border | Gallery-minimal; the type IS the design. |
| **Raat** | `#14100E` warm-black | `#EDE4D2` soft parchment | a deep lapis→transparent wash at the base (`#1E2E4A`, never purple), gold watermark | Moody, made for a phone screen at night. |

## Quality floor (non-negotiable, per web-interface-guidelines)

Responsive to mobile; visible keyboard focus (lapis ring); `prefers-reduced-motion` respected; color contrast AA on all text; hit targets ≥ 44px.
