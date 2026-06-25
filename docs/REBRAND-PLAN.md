# REBRAND-PLAN.md — execution order

> Do these in order. Phase 0 → 1 unblock everything; Phase 2 is the visible work.

## Phase 0 — Own it & clean it (once)

- [ ] Move `landing`, `tv-layout`, `tv-api-nuxt` into our own GitHub org.
- [ ] Repoint `extends` in `nuxt.config.ts` to our repos via an **env var** token
      (the old hardcoded PATs are revoked — still scrub them from git history with
      `git filter-repo` during migration so scanners stay quiet).
- [ ] Delete `dump.rdb`; add `dump.rdb`, `.env*`, `.output`, `.nuxt` to `.gitignore`.
- [ ] Delete dead files: `front/components/home/*.old.vue`.
- [ ] Confirm ownership/license of the code + `@fahdlaabi12` packages is documented.

## Phase 1 — Reskin the shell (tokens + identity)

Mostly token/string swaps — fast, and it makes everything built afterward
already on-brand.

- [ ] Replace the color + font block in `front/assets/css/tailwind.css` `@theme`
      with the maxco tokens (see `BRANDING.md`). Keep existing `--animate-*`.
- [ ] Swap dark-section hexes in `home/Background.vue` + `home/HeroBackground2.vue`
      to `#081623` / `#050D16`; remove/retune the light `#86A5FF` sections.
- [ ] **In `tv-layout`:** swap logo SVGs, regenerate favicons + `manifest.json`,
      update SEO meta + footer + `useSeoMeta` fallbacks, nav CTA color.
- [ ] Replace `CCCAMBOX*` strings in i18n with `maxco.`; rename `Anti-Buffer V6™`.
- [ ] Repoint channel thumbnails off `cccambox.com` to our host (`Features.vue`).
- [ ] Add fonts (Poppins + Hanken Grotesk) in `nuxt.config.ts` `fonts`.

**Checkpoint:** the existing layout should now render in maxco navy + lime→teal
with the new logo, before any redesign. Verify, commit.

## Phase 2 — Redesign the page layer (home sections)

Rebuild `front/components/home/*` in the premium maxco direction, keeping the
proven IPTV funnel order. Reuse `ui/lunar/*` scroll system, `common/Marquee*`,
and `global/*` primitives. One section per PR.

Order (top to bottom of the page):

1. [ ] **Nav** (`tv-layout/Navbar`) — transparent over hero → frosted/floating
       bar on scroll (`backdrop-filter` + hairline border). CTA persists.
2. [ ] **Hero** (`home/Hero.vue` + `HeroBackground2.vue`) — content-forward:
       poster-wall fading into navy, headline + subhead, **in-hero email capture**
       (new — old site lacked it) + gradient CTA, money-back microcopy.
       Respect `prefers-reduced-motion` on the poster animation.
3. [ ] **Catalog logos** (`home/Catalog.vue`) — keep marquee; restyle on navy.
4. [ ] **Reviews / Trustpilot** (`home/Reviews.vue`) — two-row marquee, real
       named reviewers + rating. Make social proof load-bearing.
5. [ ] **Features / live channels** (`home/Features.vue`) — live thumbnail rows
       (own host), branded anti-buffer name, 4K/devices pills.
6. [ ] **Collection / VOD** (`home/Collection.vue`, `CircleSlick`) — restyle the
       carousel; real (licensed) artwork when available, placeholders meanwhile.
7. [ ] **Assurances** (`home/Assurances.vue` + subs) — keep the scroll-sticky
       narrative; restyle illustrations to navy + gradient accents.
8. [ ] **Guarantee** (`home/Guarantee.vue`) — 30-day money-back CTA on navy.
9. [ ] **Footer** (`tv-layout/Footer.vue`) — maxco mark, columns, `© 2026 maxco.`

**Improve on the old site's gaps:** in-hero email capture; analytics
(GA4 / Pixel / Clarity) like the old Vodrux setup; `prefers-reduced-motion`;
own thumbnail/TMDB pipeline (`scripts/update-tmdb-images.ts`) instead of hotlinks.

## Phase 3 — Other pages

Apply the same tokens/components to `channels`, `apps`, `blog`, `faq`,
`iptv-resellers`, `legal`, `support`, `auth-check`. Mostly inherit from Phase 1
tokens; spot-redesign where needed.

## Out of scope here

- WHMCS 7.x → 8.x DB migration (Users/Clients split) — that's the
  **dashboard / checkout / trial** apps, not this marketing site.
- Billing/auth logic in `tv-api-nuxt` — keep as-is.
