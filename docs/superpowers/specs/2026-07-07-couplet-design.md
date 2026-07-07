# Couplet — Sher Explainer & Share-Card Studio

**Spec status:** Approved by Moiz on 2026-07-07 after brainstorming. This document is **binding**: where this spec and implementation convenience conflict, the spec wins. Where the spec is genuinely silent, stop and ask Moiz rather than guessing.

---

## 0. How to execute this spec (read this first)

This spec was written by Claude Fable 5 and is designed to be executed by a **different model with zero memory of the design conversation**. Everything you need is in this file plus Moiz's global `~/.claude/CLAUDE.md`. Do not assume any context beyond these two documents.

Execution rules (from Moiz's global standards — treat as a literal checklist, not judgment calls):

1. Read `~/.claude/CLAUDE.md` in full before writing any code. Its standards (design tier, teaching comments, pre-flight checklist, AI feature rules) apply to every file in this project.
2. Invoke the `superpowers:writing-plans` skill on this spec before implementation; then execute the plan with the `builder` subagent for well-specified tasks, keeping judgment (architecture, review, debugging) in the main model.
3. Invoke `superpowers:frontend-design` **before** writing any UI code. Invoke `superpowers:webapp-testing` before claiming anything works. Run `/code-review` after each implementation step.
4. Every file gets teaching comments: a top-of-file plain-English block, 1–2 lines before major functions, and `// CONCEPT:` one-liners the first time a novice-unfamiliar concept appears.
5. Section 12 (Landmines) contains hard-won facts that are **not derivable from documentation**. Believing documentation over Section 12 will break the build.

Who this is for: Moiz (@moizbuilds) is a sales professional teaching himself to code — app ~17 of a 30-apps-in-30-days challenge. He is a smart novice: use real technical terms, explain them plainly on first use.

---

## 1. What Couplet is

A web app where a user pastes or picks an Urdu sher (a two-line ghazal couplet) and gets back:

1. **Meaning** — a plain-English translation plus a deeper interpretation.
2. **Poetic context** — poet (with honest attribution, see §5), era, themes, and poetic devices used (Urdu terms like *tashbeeh*, *radif* kept, glossed inline in English).
3. **A gorgeous share card** — the sher in Nastaliq typography + a one-line meaning, in 3–4 themes × 2 formats, downloadable as PNG. **The card is the growth engine** — people posting cards to Instagram/WhatsApp is how the app spreads. It must be genuinely beautiful, never an afterthought.

Plus a browsable **anthology** of 40–50 famous ashaar (plural of sher), each with a permalink page whose explanation is pre-generated and whose link preview (OG image) is its actual card.

Input works in **Urdu script AND Roman Urdu** ("dil se niklegi na mar kar bhi..."). Explanations are in **English with Urdu poetic terms kept and glossed** — the target audience is the huge diaspora + subcontinent audience that feels the poetry but can't unpack classical Urdu.

### Product decisions already made (do not re-litigate)

| Decision | Choice |
|---|---|
| Shape | Explainer + curated anthology (no accounts/community in v1) |
| Explanation language | English, Urdu terms kept + glossed |
| Card scope | 3–4 themes × 2 formats (square + 9:16 story). Not one card; not a full studio |
| Name | **Couplet** — watermark on every card: `couplet.moizbuilds.com` |
| Stack | SvelteKit + Turso, browser-rendered cards (Approach A, §3) |

---

## 2. Non-negotiables

1. **Attribution honesty.** Poet attribution is famously wrong on the internet (everything gets attributed to Ghalib). If we are not confident of attribution, the app says so — it never guesses. Enforced structurally via the three-tier system in §5, not via prompt vibes.
2. **Card quality.** Tier A Nastaliq typography. If the card wouldn't make an Urdu poetry lover stop scrolling, it's not done.
3. **No quality claims without the eval.** §8's eval must run and pass its thresholds before telling Moiz explanation quality is good.
4. **Data honesty.** Every anthology entry's poet, era, and reference explanation traces to a named source (Rekhta.org URL per entry). Never overstate.

---

## 3. Stack and architecture

**SvelteKit (Svelte 5) + TypeScript + Turso (libsql) + Anthropic SDK + `@fontsource/noto-nastaliq-urdu` + `html-to-image`. Deployed on Vercel at `couplet.moizbuilds.com`.**

Why this stack: it is a deliberate reuse of Moiz's **Likhai** app (`/Users/moizrana/30 in 30 apps/likhai` — a Roman-Urdu→Urdu converter, same author). Likhai already solved Nastaliq font loading, DOM→PNG card export, the Anthropic call pattern, the Turso setup, and has an `npm run eval` harness pattern (`scripts/run-eval.ts`). **Study Likhai's implementations of these before writing your own — copy the patterns, adapt the specifics.** The naive alternative (Next.js + `@vercel/og` for cards) fails outright — see Landmine #1.

### Routes

| Route | What |
|---|---|
| `/` | Input box (Urdu or Roman Urdu) → explanation view + card studio. Also shows a few featured anthology cards below the fold |
| `/anthology` | Browsable grid of the 40–50 curated ashaar |
| `/sher/[slug]` | Permalink page per curated sher: full explanation (pre-generated), card studio, OG meta tags pointing at its pre-rendered card PNG |
| `/card/[slug]` | Bare card render (no chrome), used only by the OG pre-render script (§7). Accepts `?theme=&format=` |
| `POST /api/explain` | The one paid endpoint. Rate-limited + length-capped (§6) |

### Data model (Turso)

```sql
-- Cached explanations, keyed by normalized input so famous shers cost ONE LLM call ever.
CREATE TABLE explanations (
  id INTEGER PRIMARY KEY,
  normalized_key TEXT UNIQUE NOT NULL,   -- normalize() of the input (§5)
  input_raw TEXT NOT NULL,
  result_json TEXT NOT NULL,             -- serialized SherExplanationResult
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Rate limiting (serverless functions have no shared memory — counters live in the DB).
CREATE TABLE rate_limits (
  ip TEXT NOT NULL,
  window_start TEXT NOT NULL,
  count INTEGER NOT NULL,
  PRIMARY KEY (ip, window_start)
);
```

The anthology itself is **not** in the DB — it is a versioned TypeScript file (§4), because it is hand-curated content that should live in git and ship with the code.

### Shared types — one source of truth

Every contract crossing API ↔ UI lives in `src/lib/types.ts` and is imported by both sides — **never redeclared**. Core types (binding; field names exact):

```ts
// What the LLM returns (via forced tool call — §6):
export interface LlmSherAnalysis {
  isValidSher: boolean;          // gates garbage input
  invalidReason: string | null;  // shown to user when isValidSher is false
  urduScript: string;            // both lines in Urdu script, '\n'-separated — ALWAYS present when valid (LLM converts Roman input)
  romanUrdu: string;             // both lines in Roman Urdu, '\n'-separated
  translation: string;           // plain-English, line-by-line
  interpretation: string;        // the deeper reading: imagery, ambiguity, why it lands
  context: string;               // era, poet's world, ghazal context if known
  themes: string[];              // e.g. ["mortality", "defiant love"]
  devices: { urduTerm: string; english: string; explanation: string }[];
  poetGuess: string | null;
  attributionConfidence: 'high' | 'low' | 'none';
}

// What the API returns to the UI (server wraps LLM output with code-determined attribution):
export type Attribution =
  | { tier: 'verified'; poet: string; slug: string }  // matched the anthology in CODE
  | { tier: 'attributed'; poet: string }              // LLM high-confidence, NOT in anthology
  | { tier: 'unknown' };                              // LLM unsure → we say so

export interface SherExplanationResult {
  analysis: LlmSherAnalysis;
  attribution: Attribution;
  cachedAt: string | null;  // non-null when served from the explanations table
}
```

---

## 4. The anthology — one dataset, three jobs

`src/lib/data/anthology.ts`: 40–50 famous ashaar. Each entry:

```ts
export interface AnthologyEntry {
  slug: string;              // e.g. "ghalib-hazaron-khwahishen"
  urduScript: string;        // '\n'-separated two lines
  romanUrdu: string;
  poet: string;              // verified — this is ground truth
  poetUrdu: string;
  era: string;               // e.g. "1797–1869 · Mughal Delhi"
  referenceExplanation: string;  // 120–200 words, the gold answer for the eval
  themes: string[];
  sourceUrl: string;         // Rekhta.org (or equivalent) URL verifying attribution — REQUIRED per entry
}
```

This single file is simultaneously: **(a)** the browsable anthology, **(b)** the attribution ground truth for the `verified` tier, **(c)** the eval gold set. One source of truth by construction — it cannot drift.

Curation rules: span poets (Ghalib, Mir, Faiz, Iqbal, Faraz, Parveen Shakir, Jaun Elia, Momin, Dagh, Bashir Badr...), span eras, only genuinely famous ashaar, and **verify every attribution against the sourceUrl before committing** — famous ≠ correctly attributed. Reference explanations are written fresh (checked against the source for factual claims), not copied.

Additionally `src/lib/data/eval-decoys.ts`: 5–8 **trap entries** for the eval only — lines popularly *mis*attributed (e.g. widely credited to Ghalib but actually someone else's, or of genuinely unknown origin), with the popular-but-wrong attribution recorded and the truth (or `null` for unknown) recorded. The system passes a decoy by NOT confirming the popular misattribution.

---

## 5. Attribution — three tiers, enforced in code

The LLM is **never** trusted as the source of a displayed attribution on its own. Flow inside `POST /api/explain`:

1. `normalize()` the input (see below) and try to match against every anthology entry's normalized `urduScript` AND normalized `romanUrdu`.
2. **Match found → `{ tier: 'verified', poet, slug }`.** UI shows "✓ Verified · Ghalib" and links to the permalink.
3. No match, LLM `attributionConfidence === 'high'` and `poetGuess` non-null → `{ tier: 'attributed', poet }`. UI shows "Commonly attributed to Faiz — attribution not independently verified."
4. Otherwise → `{ tier: 'unknown' }`. UI shows "Poet unknown or uncertain — we'd rather say so than guess." **The share card omits the poet line entirely in this tier.**

`normalize()` (in `src/lib/normalize.ts`, pure, unit-tested):
- Urdu script: strip diacritics/harakat (U+064B–U+065F, U+0670), normalize character variants (ي→ی, ك→ک, ة→ہ, أ/إ/آ handling), remove all punctuation + whitespace.
- Roman: lowercase, strip punctuation + whitespace, collapse repeated letters ("dilll"→"dil"), normalize common variant spellings (ee/i, ai/ay/ae, w/v, q/k, z/x) — port the variant table from Likhai's eval normalization if present.
- Matching: normalized similarity (Levenshtein ratio) ≥ 0.80, OR either normalized string contains the other (users paste one line of a two-line sher). Test both directions.

`normalize()` output is also the `normalized_key` for the explanations cache.

---

## 6. The LLM pipeline — AI feature rules (literal checklist)

One Claude call per uncached request. Model: latest Sonnet-class (`claude-sonnet-5` as of writing; check `claude-api` skill for current IDs). These rules are from Moiz's global standards and past production breakages — apply all of them:

1. **One SDK client per process**, module-level singleton. Explicit timeout (30s), `maxRetries: 2`.
2. **Force structured output via a tool definition** whose input schema mirrors `LlmSherAnalysis` (tool_choice forced). Do not parse JSON out of free text. When reading the response, **find the tool_use block by iterating `content` — never assume `content[0]`** (a thinking block may come first; this exact assumption broke every request in a previous build).
3. **Inject the client as a parameter** into the core `explainSher(client, input)` function so logic is testable without the network.
4. Model/API failures surface as **5xx with a visible error state + retry button** in the UI. Never swallowed, never a fabricated result.
5. **Rate limit:** 10 requests / hour / IP, counted in the `rate_limits` table. Get the client IP from the platform (SvelteKit `event.getClientAddress()`) — **never from a raw `X-Forwarded-For` header read** (attacker-rotatable; this bypassed a rate limit in a previous build). Prune rows older than 24h opportunistically on write (attacker-controlled growth is a real cost).
6. **Length cap:** 500 chars max input, enforced **server-side** (client-side too, for UX). Empty/whitespace input → 400.
7. **Cache first:** check `explanations` by `normalized_key` before calling the LLM. Famous shers cost one call ever.
8. `ANTHROPIC_API_KEY` and `TURSO_*` env vars are **required — fail closed at startup** with a clear message if missing. Never a fallback to a fake/canned response.
9. Prompt requirements: instruct the model to (a) never invent a ghazal/divan citation — `context` may say "specific ghazal unknown"; (b) set `attributionConfidence: 'high'` **only** for genuinely famous, well-documented ashaar, and explicitly warn it that misattribution-to-Ghalib is the classic failure; (c) always return `urduScript` even for Roman input; (d) set `isValidSher: false` for non-poetry, prose, or non-Urdu input, with a friendly `invalidReason`.

Input script detection (for UX hints only, not correctness): presence of chars in U+0600–U+06FF ⇒ Urdu script, else Roman. The LLM receives the raw input either way.

---

## 7. The share card — the growth engine

### Rendering architecture (this is where Landmine #1 lives)

The card is a **real DOM element** styled with CSS, using `Noto Nastaliq Urdu` — the browser's text engine does the complex script shaping. Export = `html-to-image`'s `toPng()` on that element at 2x pixel density. Likhai already ships this pattern — reuse it, including whatever font-embedding workaround it needed (fonts must be fully loaded before rasterizing; `document.fonts.ready` + explicit check).

**OG images for permalinks:** `scripts/render-og.ts` (Playwright) visits `/card/[slug]?theme=default&format=og` for every anthology entry against a local dev server, screenshots at 1200×630, writes `static/og/[slug].png`. Run at seed time / when the anthology changes. Permalink pages emit `og:image` / `twitter:card` meta pointing at these — **the WhatsApp/iMessage link preview IS the card.** For user-pasted (non-anthology) shers, use a single static branded OG image; do not attempt dynamic server-side card rendering (see Landmine #1).

### Card spec

- **Formats:** square 1080×1080 (feed/WhatsApp) and story 1080×1920. Rendered at CSS size ÷2 with 2x export scale.
- **Themes (3–4, hand-designed under `superpowers:frontend-design`):** working names — *Ivory* (classic ivory/ink, letterpress feel), *Mehfil* (midnight blue/deep green + gold), *Safha* (minimal white, huge type), optional fourth. Final art direction belongs to the frontend-design pass; the spec constrains only: Nastaliq is the hero (sher fills the card, comfortably large), correct line-height for Nastaliq (it needs ~2–2.2 line-height or descenders clip — see Landmine #2), one-line meaning in a contrasting Latin face, poet line per attribution tier (§5 — omitted for `unknown`), small `couplet.moizbuilds.com` watermark.
- **Studio UX:** live preview, theme picker, format toggle, download PNG. Theme/format state keyed sensibly so switching shers rebuilds preview (identity-keyed components — global standard #8).
- The one-line meaning on the card is `analysis.translation`'s first sentence, editable by the user before export (people will want to tweak it — small text input, not a full editor).

### Readiness gate (global structural rule)

Font loading gates BOTH the preview and the export. Build **one shared readiness check** (`fontsReady` store/promise) used by both; until ready, show a loading state; on failure show a message — never export a card with fallback fonts silently.

---

## 8. The eval — run before any quality claim

`npm run eval` → `scripts/run-eval.ts` (pattern-match Likhai's existing eval harness):

1. For each of the 40–50 anthology entries: run the real `explainSher()` (Urdu-script input; also a 10-entry Roman-input subset to cover that path).
2. **Attribution scoring — in code, exact:** anthology entries must come out `verified` with the right poet (this also tests `normalize()` matching end-to-end). Target: **100%**.
3. **Decoy scoring — in code:** each `eval-decoys.ts` entry passes iff the system does NOT confirm the popular misattribution (i.e. tier is `unknown`, or `attributed` to the *actual* poet). Target: **100% — any decoy failure is a release blocker**, it's the exact "everything is Ghalib" failure the app exists to avoid.
4. **Explanation quality — LLM judge:** judge model compares generated explanation against `referenceExplanation`, scoring 1–5 on three axes: translation fidelity / interpretation depth / no fabricated claims. Judge prompt requires a one-line justification per score (auditability). Target: **mean ≥ 4.0, no axis mean < 3.5**.
5. Output: per-sher table + aggregates, written to `eval-results/<date>.json` + console summary. Scoring normalization (spelling variants, punctuation) uses the same `normalize()` — do not hand-roll a second normalizer.

Judge caveat (from a previous build): normalize before string comparisons and eyeball disputed cases — naive matching under- and over-states accuracy.

---

## 9. Design direction (UI, not just cards)

Run `superpowers:frontend-design` before UI code; run `web-interface-guidelines` after. Constraints the design must satisfy:

- Bilingual typography is the identity: Nastaliq (Noto Nastaliq Urdu) for all sher text, a distinctive Latin face for UI/explanations (NOT Inter/Roboto/system — pick deliberately; Likhai used Bricolage Grotesque, Couplet should have its own voice). No purple gradients, no generic card grids.
- The explanation view should read like a beautifully typeset commentary page — generous whitespace, clear hierarchy (translation → interpretation → context → devices), Urdu terms visually distinguished with their gloss.
- RTL correctness: Urdu text blocks get `dir="rtl"` and `lang="ur"` (also required for correct font/shaping behavior on some platforms).
- Mobile-first: the sharing audience is on phones.

---

## 10. Phasing

**Phase 1 — the spine (end-to-end).** Turso schema, `normalize()` + unit tests, anthology file (can start with ~15 entries, grow to 40–50 during Phase 3), `/api/explain` with full AI checklist (§6), explanation UI, ONE card theme (Ivory) square-format with PNG export, anthology + permalink pages. *Acceptance: paste a famous sher in Roman Urdu → correct Urdu-script rendering, correct attribution tier, full explanation, downloadable card. Fitting test case: "dil se niklegi na mar kar bhi watan ki ulfat" — this exact line is itself widely misattributed online, so first verify its true attribution against Rekhta, then place it in whichever file that verdict dictates (anthology if verifiable, decoys if contested) and assert the matching tier.*

**Phase 2 — the growth engine.** All themes + story format, editable one-liner, OG pre-render script + meta tags, frontend-design polish pass to Tier A, `web-interface-guidelines` check.

**Phase 3 — proof + ship.** Anthology to 40–50 + decoys, full eval run meeting §8 thresholds, pre-flight checklist (§11), `superpowers:webapp-testing` pass, deploy to Vercel + `couplet.moizbuilds.com` DNS (note: the MCP Vercel account is NOT Moiz's real one — give him the DNS record values to add himself), 3-bullet learning summary for Moiz.

`/code-review` after each phase minimum; after each significant step preferred.

---

## 11. Pre-flight checklist — app-specific answers

Walk all nine global questions before claiming done; the app-specific expectations:

1. **Reload** mid-explain → input preserved (URL param or sessionStorage); no double LLM call (cache-by-key makes replays free anyway).
2. **Failure** → `/api/explain` errors show a retry UI; the pasted sher is never cleared on failure.
3. **Bad input** → empty/whitespace → 400; >500 chars → 400 server-side; non-poetry → friendly `invalidReason` card, no LLM re-tries.
4. **Secrets** → API key + Turso creds required, fail closed; Turso token scoped to this DB only.
5. **Cost** → rate limit + length cap + cache (§6). OG rendering is build-time, costs nothing at runtime.
6. **One source of truth** → types in `types.ts`; anthology is the single dataset for browse/truth/eval; `normalize()` shared by matcher, cache key, and eval.
7. **Trust boundary** → IP via `getClientAddress()` not headers; slug params validated against anthology (bad slug → clean 404); rate-limit rows pruned.
8. **Time & identity** → card studio keyed by sher identity; cache upserts on `normalized_key` (no double rows).
9. **Derived data** → nothing dashboard-like in v1; `cachedAt` stamped server-side.

---

## 12. Landmines — facts a future model MUST NOT rediscover the hard way

1. **`@vercel/og` / satori CANNOT render Nastaliq.** Satori does its own text layout with no complex-script (OpenType) shaping — Noto Nastaliq Urdu comes out as broken, disconnected letterforms. This is why the entire card architecture is browser-rendered DOM + `html-to-image`, and OG images are **pre-rendered via Playwright screenshots**, not generated per-request. Do not "simplify" to @vercel/og; it will look plausible in code review and be garbage on screen.
2. **Nastaliq needs unusual line-height (~2.0–2.2) and generous block padding.** It's a diagonal, deeply-descending script; default line-height clips descenders and stacks lines into collisions. Test with a long sher (e.g. Ghalib's *hazaron khwahishen*) at every card size.
3. **Rasterize only after fonts are loaded.** `html-to-image` will happily export the fallback font. Await `document.fonts.ready` AND check the specific family is loaded before enabling export. Likhai contains the working pattern.
4. **Anthropic responses: find the tool_use/text block by iterating `content`.** A thinking block may be first. `content[0]` broke every request in a previous build.
5. **Attribution comes from code, not the model.** The `verified` tier exists precisely because LLMs confidently misattribute to Ghalib. If eval decoys fail, the release is blocked — this is the product's core promise.
6. **Serverless has no shared memory** — rate-limit counters live in Turso, not a module-level Map.
7. **Roman Urdu has no canonical spelling.** All matching goes through `normalize()`; never compare raw strings. ("mein/main/mn", "nikle gi/niklegi".)
8. **Vercel MCP account ≠ Moiz's account.** For DNS/domain steps, output the record values for Moiz to add manually at his Vercel dashboard (moizbuilds.com is on Vercel DNS).

---

## 13. Out of scope for v1 (explicitly)

User accounts, saved collections, community feed, audio recitation, full ghazal explanations (single sher only), Urdu/Roman-Urdu explanation language toggle (fast-follow candidate), dynamic OG images for user-pasted shers, Hindi/Devanagari input.
