# BRANDING.md — maxco. design system

> The single source of truth for maxco's identity. When reskinning, change
> values **here / in tokens**, never inline.

## Brand at a glance

- **Name:** `maxco.` (lowercase, trailing period). Short for **MaxConnect**.
- **The trailing period is a live indicator** ("always live") — it is load-bearing
  brand meaning, not punctuation.
- **Category:** premium OTT/IPTV — live TV, films & series, live sport, 4K.
- **Tone:** premium, cinematic, calm, confident. Not loud, not "salesy template".

## Color system

| Role | Token | Hex |
|---|---|---|
| Page background | `--color-bg` | `#081623` |
| Deep background (footer, wells) | `--color-bg-deep` | `#050D16` |
| Panel / card surface | `--color-panel` | `#142637` |
| Elevated surface | `--color-panel-2` | `#0E2030` |
| Hairline border | `--color-line` | `rgba(255,255,255,0.08)` |
| Border (hover/strong) | `--color-line-2` | `rgba(255,255,255,0.15)` |
| Primary text | `--color-ink` | `#EDF3F8` (or pure `#FFFFFF`) |
| Muted text | `--color-muted` | `#8AA0B2` |
| Faint text | `--color-faint` | `#5F7588` |
| Gradient — lime (start) | `--color-lime` | `#D4F04D` |
| Gradient — green (mid) | `--color-green` | `#44D77A` |
| Gradient — teal (end) | `--color-teal` | `#22C8A0` |
| Accent glow | `--color-glow` | `rgba(68,215,122,0.28)` |

**Signature gradient:** `linear-gradient(110deg, #D4F04D, #44D77A 52%, #22C8A0)`
Logo mark variant runs **vertical, teal→lime** (top→bottom): `#22C8A0 → #44D77A → #D4F04D`.

**Gradient discipline (important):** lime→teal appears ONLY on — primary CTA
buttons, the logo mark, live dots/badges, and at most one accent per section
(e.g. a key stat figure). Text on the gradient must be dark (`#06160F`), never
white. Everything else: navy surfaces, white/muted text.

## Typography

- **Display / headings:** **Poppins** (700 / 800). Matches the wordmark.
- **Body / UI:** **Hanken Grotesk** (400/500/600) — clean, modern. (Optionally
  keep Poppins-only for cohesion; do not keep Inter.)
- Load via `@nuxt/fonts` (Google provider), weights 400/500/600/700/800.

## Radius / shadow / motion

- Radius: cards `16px`, buttons `12px`, posters `12–14px`.
- Cinema-dark rule: **no pure `#000`** — layer the near-blacks above.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` for all transitions.
- Soft accent glow behind primary CTAs / hero; subtle film-grain overlay is on-brand.

---

## Paste-ready Tailwind v4 `@theme`

Replace the **color + font** block in `front/assets/css/tailwind.css`.
**Keep the existing `--animate-*` keyframe tokens** already in that file.

```css
@theme {
  /* surfaces */
  --color-bg:        #081623;
  --color-bg-deep:   #050D16;
  --color-panel:     #142637;
  --color-panel-2:   #0E2030;

  /* lines / text */
  --color-line:   rgba(255,255,255,0.08);
  --color-line-2: rgba(255,255,255,0.15);
  --color-ink:    #EDF3F8;
  --color-muted:  #8AA0B2;
  --color-faint:  #5F7588;

  /* brand gradient stops */
  --color-lime:  #D4F04D;
  --color-green: #44D77A;
  --color-teal:  #22C8A0;
  --color-glow:  rgba(68,215,122,0.28);

  /* semantic */
  --color-primary: var(--color-teal);
  --color-on-accent: #06160F;   /* text on gradient */

  /* type */
  --font-heading: "Poppins", system-ui, sans-serif;
  --font-body:    "Hanken Grotesk", system-ui, sans-serif;

  /* shape / motion */
  --radius-card: 16px;
  --radius-btn:  12px;
  --ease-brand:  cubic-bezier(0.16, 1, 0.3, 1);
}

/* signature gradient — use sparingly */
@utility brand-gradient {
  background-image: linear-gradient(110deg, #D4F04D, #44D77A 52%, #22C8A0);
}
@utility brand-gradient-text {
  background-image: linear-gradient(110deg, #D4F04D, #44D77A 52%, #22C8A0);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

---

## Logo

Files live in **`tv-layout`** (`front/assets/icons/logo.svg`, `logo-icon.svg`)
plus favicons/manifest — those swaps happen in that repo. The marketing site
references the same components. Drop-in SVGs are exported in this folder:
`maxco-logo-white.svg`, `maxco-logo-dark.svg`, `maxco-logo-color.svg`.

**The mark** (circuit/connection glyph — three nodes → traces, teal→lime):

```html
<svg viewBox="0 0 48 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="mx" x1="20" y1="12" x2="20" y2="52" gradientUnits="userSpaceOnUse">
      <stop offset="0%"  stop-color="#22C8A0"/>
      <stop offset="50%" stop-color="#44D77A"/>
      <stop offset="100%" stop-color="#D4F04D"/>
    </linearGradient>
  </defs>
  <g fill="none" stroke="url(#mx)" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20,13 V26 H45"/><path d="M12,32 H45"/><path d="M20,51 V38 H45"/>
  </g>
  <circle cx="20" cy="13" r="4.6" fill="url(#mx)"/>
  <circle cx="12" cy="32" r="4.6" fill="url(#mx)"/>
  <circle cx="20" cy="51" r="4.6" fill="url(#mx)"/>
  <circle cx="20" cy="26" r="2.3" fill="url(#mx)"/>
  <circle cx="20" cy="38" r="2.3" fill="url(#mx)"/>
</svg>
```

Wordmark: `maxco.` in Poppins 800, white (on dark) or `#081623` (on light).
Mono fallback: render mark + wordmark in a single solid color where the
gradient can't be used.

---

## Brand change map — this repo (`landing`)

| What | Where | From → To |
|---|---|---|
| Color tokens | `front/assets/css/tailwind.css` `@theme` | `#28459c/#fe405c/#1cffc7/#3fcaaa` → maxco tokens above |
| Body font | same `@theme` | `Inter` → `Poppins` + `Hanken Grotesk` |
| Dark section bg | `front/components/home/Background.vue`, `HeroBackground2.vue` | `#203C91`, `#0A1A49`, `#204396` → `#081623`, `#050D16` |
| Light glow | `Background.vue` | `#86A5FF` → drop light sections, or teal glow |
| Hotlinked thumbnails | `front/components/home/Features.vue` | `cccambox.com/thumbnails/{id}.png` → our own host |
| Old/dead components | `home/*.old.vue` (Catalog/Features/Reviews) | delete |
| Redis dump | `dump.rdb` | delete + gitignore |
| `extends` auth | `nuxt.config.ts` | hardcoded token → `process.env` |

## Brand change map — cross-layer (do in `tv-layout`)

| What | Where |
|---|---|
| Logo SVGs | `tv-layout/front/assets/icons/logo.svg`, `logo-icon.svg` |
| Favicons + manifest | `tv-layout/public/favicon*`, `manifest.json` |
| SEO meta | `tv-layout/nuxt.config.ts` (`twitterSite`, `applicationName`, `themeColor #203C91`) |
| Footer | `tv-layout/front/components/Footer.vue` (`CCCAMBOX TV™`, `cccamboxtv.com`) |
| SEO fallbacks | `tv-layout/front/composables/useSeoMeta.ts` (`CCCAMBOX`, `web.cccambox.com`) |
| Nav CTA color | `tv-layout/front/components/Navbar/Buttons.vue` (`#ec3655`) |
| i18n strings | `i18n/lang/*.json` — all `CCCAMBOX` / `Anti-Buffer V6™` / member-area copy |

## Copy / strings

Replace all `CCCAMBOX` / `CCCAMBOX TV` → `maxco.` in i18n files. Rename any
trademarked tech (`Anti-Buffer V6™`) to our own name. Verify trust claims
(channel counts, "Trusted by Xk customers", ratings) are accurate for maxco
before using them.

---

## State / semantic colors (feedback ≠ brand)

**The lime→teal gradient is for brand / CTA / delight only — never for system
feedback.** Errors must read as red, success as green, warnings as amber. Using
the brand gradient for errors makes a failed-payment or validation message look
"positive", which misleads users (especially on checkout/payment surfaces).

Add these to `@theme` and use them for all feedback states:

```css
@theme {
  --color-danger:    #FF5A6E;  /* errors, destructive actions, failed states */
  --color-success:   #44D77A;  /* success (on-brand green is correct here)   */
  --color-warning:   #F5B53D;  /* warnings, caution                          */
  --color-on-danger: #2A0A0E;  /* text on a solid danger surface             */
}
```

### Phase 2 migration note (legacy red aliases)

The temporary legacy aliases currently map old error/danger tokens onto the
brand gradient (`--color-red-1 → lime`, `--color-red-2 → green`). That is a
**stopgap to avoid broken styling only.** When migrating these components in
Phase 2 — `formkit.theme.ts`, `Pagination.vue`, the `Button.vue` danger variant,
`resellers/Pricing.vue` — point them at `--color-danger` / `--color-success` /
`--color-warning`, **not** at lime/green. Don't ship errors in brand-green.
