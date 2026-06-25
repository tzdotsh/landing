# CLAUDE.md — maxco. landing (marketing site)

> Context for AI assistants (Cursor / Claude) working in this repo.
> Read this, `BRANDING.md`, and `REBRAND-PLAN.md` before making changes.

## What this repo is

This is the **public marketing site** for **maxco.** — a premium OTT/IPTV
streaming brand (live TV, films & series, live sport). It is the *brochure*,
not the app. It does **not** handle login, billing, subscriptions, or any
customer-account data.

It is being **rebranded from "CCCAMBOX TV"** to **maxco.** The job here is a
**reskin of the shell + redesign of the page layer**, NOT a rebuild. The
architecture is sound (Nuxt 4 + Tailwind v4); we are changing identity and
the marketing page design, not re-architecting.

## The 3-layer architecture

This repo (`landing`) is the top layer. It extends two others (siblings on disk
under `../`):

```
landing (this repo)      → marketing pages + home sections   ← REDESIGN here
  └ extends tv-layout    → shell: navbar, footer, logo, SEO,  ← RESKIN (separate repo)
                           fonts, design-token base, CMS
      └ extends tv-api-nuxt → WHMCS billing/auth/data engine  ← KEEP AS-IS (separate repo)
```

- `extends` is configured in `nuxt.config.ts`. Locally it points to `../layout`
  and `../api`; in CI it pulled from private GitHub repos. **Migrate all three
  into our own org** and point `extends` at our repos via an **env var**, never
  a hardcoded token.
- Because of the chain, the billing engine is *present* in the dependency tree,
  but the marketing pages only **call read-only public endpoints** (see below).

## What this site actually fetches (read-only, public)

- **Channels:** `/api/channels`, `/api/channels/categories`, `/api/channels/search`
  (external `CHANNELS_API_URL`) — for the channels list/search pages.
- **Channel thumbnails:** currently hotlinked from `cccambox.com/thumbnails/{id}.png`
  — **must be repointed** to our own host (see `BRANDING.md`).
- **Payload CMS:** blog, app tutorials, legal pages, FAQs (`PAYLOAD_BASE_URL`).
- **Forms:** `/api/support`, `/api/report`, auth-check link validator — contact
  forms only (email/Telegram). No account data.

> Nothing here touches `tblclients` / `tblusers` / billing. The **WHMCS 7.x→8.x
> Users/Clients schema migration is NOT a concern for this repo** — it belongs to
> the dashboard / checkout / trial apps.

## Tech stack

- Nuxt 4 (`srcDir: front`), SSR + prerender/ISR hybrid
- Tailwind CSS v4 (`@theme` in `front/assets/css/tailwind.css` — no tailwind.config.js)
- `motion-v` for animation; custom IntersectionObserver scroll system (`ui/lunar/*`)
- Pinia + `@pinia/colada`; `@nuxtjs/i18n` (en-en default, es-es); `nuxt-svgo`
- Package manager: **Bun**

### Tailwind v4 across layers (important)

`tv-layout` ships a **token/source sheet** (`@import "tailwindcss" source(none)`) in
its `css:` array — it does **not** run `@tailwindcss/vite` (only the consuming app
does). **landing** runs the single `@tailwindcss/vite` plugin and must `@source`
`tv-layout/front` in its own `tailwind.css` so shell classes (navbar, footer) are
not purged.

When **dashboard / checkout / trial** are built next, each app that extends
`tv-layout` must also: **(a)** register `@tailwindcss/vite` in its own
`nuxt.config.ts`, and **(b)** add `@source` for `../tv-layout/front` (adjust
relative depth) in its Tailwind entry sheet. Two `@tailwindcss/vite` instances
(one per layer) will SSR-crash on a virtual `/assets/css/tailwind.css` collision.

## Hard rules

1. **Never edit billing/auth logic.** Anything under `tv-api-nuxt` server routes,
   WHMCS, gateways, sessions — out of scope for this repo. Don't touch it.
2. **All brand identity is data, not structure.** Colors → `@theme` tokens.
   Logo → SVG files. Copy → i18n files. Don't hardcode new brand values inline;
   add/extend tokens. See `BRANDING.md`.
3. **Keep the component architecture.** Reuse `ui/lunar/*`, `common/Marquee*`,
   `global/*` primitives. We're redesigning visuals, not rewriting the framework.
4. **No secrets in source.** `extends` auth, API keys → env vars only.
   `dump.rdb` and any `.env` must be gitignored and never committed.
5. **Respect `prefers-reduced-motion`** on all new animation (the old hero
   poster columns did not — fix when redesigning).
6. **Gradient is rationed.** The lime→teal gradient appears only on primary CTAs,
   the logo mark, live indicators, and at most one accent per section. Everything
   else is navy + white + muted. (See `BRANDING.md`.)

## Decision of record

- `tv-api-nuxt` → **keep** (brand-agnostic, hard to recreate).
- `tv-layout` → **reskin** (logo, favicons, ~6–8 strings, tokens).
- `landing` (this) → **reskin tokens + redesign the home/marketing page layer**.

See `REBRAND-PLAN.md` for the section-by-section redesign order.
