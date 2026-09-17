# Graph Report - landing  (2026-09-17)

## Corpus Check
- 243 files · ~1,153,927 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1353 nodes · 1549 edges · 194 communities (105 shown, 89 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 14 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bb3bdffc`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- queries/blog.ts
- PosterMarquee.vue
- scripts
- Pricing.vue
- utils/featuredTrending.ts
- QualityComparaison.vue
- legal-documents.ts
- update-tmdb-images.ts
- channels/Hero.vue
- Maxco SEO & AI-SEO Strategy — UK, Spain & EU Markets
- List.vue
- sports/Hero.vue
- channels.ts
- [app]/index.vue
- Category.vue
- apps.ts
- TV Website - DevOps Documentation
- trustpilotReviews.ts
- auth-check/index.vue
- apps/index.vue
- Accordions.vue
- Marquee.vue
- app.vue
- Flag.vue
- home/Hero.vue
- SelectDevice.vue
- home/Features.vue
- ScrollTrigger.vue
- BRANDING.md — maxco. design system
- MarqueeParallax.vue
- CircleSlick.vue
- Competition.vue
- ChannelLogo.vue
- channelLogos.ts
- como-instalar-iptv-firestick-smart-tv.md
- instalar-iptv-firestick-smart-tv.md
- dependencies
- JoinForm.vue
- SelectApp.vue
- vod/Hero.vue
- how-to-install-iptv-on-firestick.md
- Catalog.vue
- Pagination.vue
- ensureLoaded
- nuxt.config.ts
- iptv-vs-cable-vs-streaming.md
- iptv-vs-cabo-vs-streaming.md
- CLAUDE.md — maxco. landing (marketing site)
- MaxcoChatBubble.vue
- support/Form.vue
- ScrollReactor.vue
- ver-laliga-sin-cortes.md
- watching-football-on-iptv.md
- Post.vue
- Review.vue
- ArticleCard.vue
- Reviews.old.vue
- sports/FinalCta.vue
- vod/FinalCta.vue
- kb-articles.ts
- how-to-spot-a-fake-iptv-reseller.md
- watch-premier-league-without-sky.md
- REBRAND-PLAN.md — execution order
- [app].vue
- QuestionResponse.vue
- bootstrap-channels-hero-images.ts
- MarqueeGroup.vue
- report/Form.vue
- Search.vue
- resellers/Reviews.vue
- Competitions.vue
- queries/vodGenrePosters.ts
- _template.md
- Cta.vue
- ArticleFooter.vue
- Guarantee.vue
- HeroBackground2.vue
- ScrollObserver.vue
- livechat.d.ts
- Details.vue
- Earnings.vue
- Perks.vue
- Steps.vue
- ContactSupport.vue
- help/Hero.vue
- Features.old.vue
- BenefitIcon.vue
- resellers/Features.vue
- sports/Devices.vue
- Reliability.vue
- GridPattern.vue
- GridPlus.vue
- ScrollReactorGroup.vue
- ScrollTriggerGroup.vue
- vod/Devices.vue
- vod/Features.vue
- useFormatLink.ts
- auth-check.vue
- faq.vue
- umami.d.ts
- tsconfig.json
- eslint-plugin-tailwind-canonical-classes
- @fahdlaabi12/tailwindcss-inner-border
- @formkit/addons
- affiliate/Hero.vue
- apps/Hero.vue
- blog/Hero.vue
- channels/Form.vue
- faq/Hero.vue
- InfoCard.vue
- Catalog.old.vue
- MidCta.vue
- legal/Hero.vue
- Disclaimer.vue
- report/Hero.vue
- resellers/FinalCta.vue
- resellers/Hero.vue
- sports/Reviews.vue
- sports/ValueSwitch.vue
- support/Hero.vue
- GridBlock.vue
- vod/Reviews.vue
- vod/ValueSwitch.vue
- affiliate.vue
- v[version]/index.vue
- iptv-resellers.vue
- report.vue
- support.vue
- fuse.js
- @headlessui/vue
- motion-v
- nuxt
- nuxt-delay-hydration
- nuxt-echarts
- @nuxt/eslint
- @nuxt/fonts
- @nuxt/kit
- @nuxtjs/fontaine
- @nuxtjs/mdc
- pinia
- @pinia/colada
- @pinia/colada-nuxt
- reka-ui
- sharp
- @splidejs/splide-extension-auto-scroll
- @splidejs/splide-extension-grid
- @splidejs/splide-extension-intersection
- @splidejs/vue-splide
- tailwind-merge
- tailwindcss
- @tailwindcss/vite
- @takumi-rs/core
- tw-animate-css
- vue
- vue-router
- @formkit/themes
- @vueuse/core
- @vueuse/router
- zod
- .prettierrc.mjs
- redeploy.sh
- canonical-paths.ts
- slider.d.ts
- splide.d.ts

## God Nodes (most connected - your core abstractions)
1. `scripts` - 17 edges
2. `useChannelsFilters()` - 13 edges
3. `BRANDING.md — maxco. design system` - 11 edges
4. `Maxco SEO & AI-SEO Strategy — UK, Spain & EU Markets` - 11 edges
5. `TV Website - DevOps Documentation` - 9 edges
6. `fetchPublishedPosts()` - 8 edges
7. `fetchBlogPostBySlug()` - 8 edges
8. `getAppsForDevice()` - 7 edges
9. `mapPayloadPost()` - 7 edges
10. `BlogPost` - 7 edges

## Surprising Connections (you probably didn't know these)
- `apps` --calls--> `getAppsForDevice()`  [EXTRACTED]
  front/components/apps/SelectApp.vue → front/queries/apps.ts
- `devices` --calls--> `getDevicesFromTutorials()`  [EXTRACTED]
  front/components/apps/SelectDevice.vue → front/queries/apps.ts
- `getAppsByDevice()` --calls--> `getAppsForDevice()`  [EXTRACTED]
  front/components/apps/SelectDevice.vue → front/queries/apps.ts
- `channels` --calls--> `flattenChannels()`  [EXTRACTED]
  front/components/channels/Category.vue → front/queries/channels.ts
- `categoriesObject` --calls--> `getCategoriesLookup()`  [EXTRACTED]
  front/components/channels/Category.vue → front/queries/channels.ts

## Import Cycles
- None detected.

## Communities (194 total, 89 thin omitted)

### Community 0 - "queries/blog.ts"
Cohesion: 0.06
Nodes (55): allPosts, blogPostsQuery, hasMorePosts, isLoading, isLoadingInitial, isLoadingMore, { t }, imageSrc (+47 more)

### Community 1 - "PosterMarquee.vue"
Cohesion: 0.05
Nodes (38): failedPosters, props, reducedMotion, staticMotion, velocity, failedPosters, props, reducedMotion (+30 more)

### Community 2 - "scripts"
Cohesion: 0.05
Nodes (38): devDependencies, prettier, prettier-plugin-tailwindcss, sass-embedded, tailwind-scrollbar, @types/imagemin, @types/imagemin-webp, typescript (+30 more)

### Community 3 - "Pricing.vue"
Cohesion: 0.08
Nodes (31): currentTier, dragging, isPrepaid, model, motionSafe, onThumbPointerMove(), onTrackClick(), onTrackKeydown() (+23 more)

### Community 4 - "utils/featuredTrending.ts"
Cohesion: 0.10
Nodes (28): TRENDING_FALLBACK_ITEMS, TRENDING_FALLBACK_MOVIES, TRENDING_FALLBACK_SERIES, VOD_GENRE_FALLBACK_POSTERS, dedupeByPoster(), FeaturedTrendingItem, FeaturedTrendingPayload, fetchFeaturedTrending() (+20 more)

### Community 5 - "QualityComparaison.vue"
Cohesion: 0.07
Nodes (25): assuranceKeys, PropsType, components, items, { t }, calculatePosition(), comparaisonBox, fps (+17 more)

### Community 6 - "legal-documents.ts"
Cohesion: 0.09
Nodes (23): getHardcodedLegalDocument(), HARDCODED_LEGAL, HARDCODED_LEGAL_SLUGS, HardcodedLegalSlug, isHardcodedLegalSlug(), isLegalPageSlug(), LEGAL_PAGE_SLUGS, LegalDocument (+15 more)

### Community 7 - "update-tmdb-images.ts"
Cohesion: 0.09
Nodes (24): trustedDependencies, sharp, BLOG_ASSETS, BlogAsset, downloadAsWebp(), main(), formatKb(), main() (+16 more)

### Community 8 - "channels/Hero.vue"
Cohesion: 0.10
Nodes (21): activeSlide, advanceSlide(), displayCopy, localePath, selectedCategory, slideIndices, slidesForCategory(), startAutoSwitch() (+13 more)

### Community 9 - "Maxco SEO & AI-SEO Strategy — UK, Spain & EU Markets"
Cohesion: 0.08
Nodes (25): 0. Important context before you act on this, 1. The market in one picture (what people actually search & why they buy), 2.1 UK (primary market), 2.2 Spain, 2.3 France, 2.4 Germany, 2.5 Italy, 2. Keyword clusters by market (+17 more)

### Community 10 - "List.vue"
Cohesion: 0.10
Nodes (21): categoriesObject, channels, categoriesObject, categoriesQuery, channels, channelsQuery, channelsRef, channelsRows (+13 more)

### Community 11 - "sports/Hero.vue"
Cohesion: 0.12
Nodes (16): { t }, config, email, emailInvalid, externalAppPath(), handleSubmit(), motionEnabled, reducedMotion (+8 more)

### Community 12 - "channels.ts"
Cohesion: 0.16
Nodes (16): useChannelsDefaultCategory(), useChannelsFilters(), setDefaultCategory(), { reset }, { t }, Categories, ChannelCategoriesSearchFilters, Channels (+8 more)

### Community 13 - "[app]/index.vue"
Cohesion: 0.11
Nodes (20): appSlug, currentTutorial, description, deviceSlug, isTutorialLoading, route, shouldShowTutorialError, { t } (+12 more)

### Community 14 - "Category.vue"
Cohesion: 0.12
Nodes (18): categories, categoriesQuery, categoriesRef, categoriesRows, categoriesTotalSize, categoriesVirtualizer, categoriesVirtualizerOptions, { debouncedSearch, selectedCategory, toggleCategory } (+10 more)

### Community 15 - "apps.ts"
Cohesion: 0.15
Nodes (18): selectedDevice, App, APPS_QUERY_KEYS, appsMetadataQuery, appTutorialBySlugQuery, appTutorialQuery, ContentLocale, Device (+10 more)

### Community 16 - "TV Website - DevOps Documentation"
Cohesion: 0.10
Nodes (19): Build Commands, Common Issues, 🔧 Configuration, 📦 Deployment, Deployment Notes, 🧩 Development Notes, Development Setup, Environment Variables (+11 more)

### Community 17 - "trustpilotReviews.ts"
Cohesion: 0.14
Nodes (13): fullStars, partialPercent, props, initials, props, SPORTS_FEATURED_REVIEWS, SPORTS_REVIEW_NAMES, TRUSTPILOT_AGGREGATE_RATING (+5 more)

### Community 18 - "auth-check/index.vue"
Cohesion: 0.15
Nodes (11): authStore, { t }, actualStateStyle, authCheckStore, State, statesStyle, means_list, { t, rt, tm } (+3 more)

### Community 19 - "apps/index.vue"
Cohesion: 0.17
Nodes (15): guideCards, isLoading, isSearchActive, metadataQuery, searchQuery, selectedDevice, showEmptyDevice, showEmptySearch (+7 more)

### Community 20 - "Accordions.vue"
Cohesion: 0.15
Nodes (11): AccordionItemType, items, props, PropsType, { rt }, questions, { tm, t }, items (+3 more)

### Community 21 - "Marquee.vue"
Cohesion: 0.14
Nodes (15): absVelocity, animationDirection, animationDuration, groupPauseOnHover, isGroupPaused, isLocallyPaused, isReverse, marqueeStyles (+7 more)

### Community 22 - "app.vue"
Cohesion: 0.13
Nodes (13): canonicalOrigin, canonicalPath, description, image, isBlogArticle, isHelpCompatibilityPage, isLegalPage, pathWithoutLocale (+5 more)

### Community 23 - "Flag.vue"
Cohesion: 0.19
Nodes (12): categoryFlagIso(), channelFlagIso(), failed, flagCode, flagUrl, props, PropsType, extractPipePrefixIso() (+4 more)

### Community 24 - "home/Hero.vue"
Cohesion: 0.17
Nodes (13): config, email, emailInvalid, externalAppPath(), eyebrowMotionEnabled, handleSubmit(), motionEnabled, reducedMotion (+5 more)

### Community 25 - "SelectDevice.vue"
Cohesion: 0.18
Nodes (13): deviceLink(), devices, getAppsByDevice(), hasMetadataError, localePath, metadataQuery, route, selectedDevice (+5 more)

### Community 26 - "home/Features.vue"
Cohesion: 0.15
Nodes (8): livePulseEnabled, listRows, pillKeys, reducedMotion, { t }, failed, props, thumbIds

### Community 27 - "ScrollTrigger.vue"
Cohesion: 0.14
Nodes (13): container, context, faded, { height: windowHeight }, index, isActive, isFirst, isLast (+5 more)

### Community 28 - "BRANDING.md — maxco. design system"
Cohesion: 0.15
Nodes (12): Brand at a glance, Brand change map — cross-layer (do in `tv-layout`), Brand change map — this repo (`landing`), BRANDING.md — maxco. design system, Color system, Copy / strings, Logo, Paste-ready Tailwind v4 `@theme` (+4 more)

### Community 29 - "MarqueeParallax.vue"
Cohesion: 0.18
Nodes (12): baseX, isGroupPaused, isLocallyPaused, pause(), pauseGroup, pauseOnHoverGroup, props, PropsType (+4 more)

### Community 30 - "CircleSlick.vue"
Cohesion: 0.19
Nodes (10): activeIndex, autoplayInterval, handleMouseEnter(), handleMouseLeave(), items, props, reducedMotion, startAutoplay() (+2 more)

### Community 31 - "Competition.vue"
Cohesion: 0.17
Nodes (11): chartBox, chartIsland, chartSize, competitors, getDefaultChartSize(), initOption, { isSmallScreen }, option (+3 more)

### Community 32 - "ChannelLogo.vue"
Cohesion: 0.21
Nodes (8): altText, failed, monogram, props, resolvedLogo, showLogo, formatChannelDisplayName(), getChannelMonogram()

### Community 33 - "channelLogos.ts"
Cohesion: 0.24
Nodes (9): CATALOG_CHANNEL_LIMIT, ChannelWithLogo, cleanChannelName(), fetchChannelsWithLogos(), isValidChannel(), LIVE_CHANNEL_IDS, normalizeLogo(), pickLiveChannels() (+1 more)

### Community 34 - "como-instalar-iptv-firestick-smart-tv.md"
Cohesion: 0.18
Nodes (10): Comece em poucos minutos, Como instalar IPTV num Firestick, Dicas para ver sem cortes, Instalar IPTV numa Smart TV (Samsung e LG), O que precisa antes de começar, Passo 1: Permitir a instalação de aplicações, Passo 2: Instalar o Downloader, Passo 3: Instalar o reprodutor IPTV (+2 more)

### Community 35 - "instalar-iptv-firestick-smart-tv.md"
Cohesion: 0.18
Nodes (10): Cómo instalar IPTV en un Firestick, Empieza en pocos minutos, Instalar IPTV en Smart TV (Samsung y LG), Lo que necesitas antes de empezar, Paso 1: Permitir la instalación de aplicaciones, Paso 2: Instalar Downloader, Paso 3: Instalar el reproductor IPTV, Paso 4: Iniciar sesión y empezar a ver (+2 more)

### Community 36 - "dependencies"
Cohesion: 0.18
Nodes (11): echarts, nuxt-vitalizer, dependencies, echarts, nuxt-vitalizer, @pinia/nuxt, @tanstack/vue-virtual, vue-slider-component (+3 more)

### Community 37 - "JoinForm.vue"
Cohesion: 0.20
Nodes (8): applyMutation, audienceOptions, FormData, open, { t }, { user, loggedIn }, AffiliateApplyPayload, useAffiliateApplyMutation()

### Community 38 - "SelectApp.vue"
Cohesion: 0.20
Nodes (10): appLink(), hasMetadataError, localePath, metadataQuery, route, selectedApp, selectedDevice, shouldShowMetadataSkeleton (+2 more)

### Community 39 - "vod/Hero.vue"
Cohesion: 0.25
Nodes (10): config, email, emailInvalid, externalAppPath(), handleSubmit(), motionEnabled, reducedMotion, { t } (+2 more)

### Community 40 - "how-to-install-iptv-on-firestick.md"
Cohesion: 0.20
Nodes (9): Frequently asked questions, How to install IPTV on a Firestick, Ready to start watching?, Step 1: Allow app installations, Step 2: Install the Downloader app, Step 3: Install an IPTV player, Step 4: Log in and start watching, Tips for smooth, buffer-free streaming (+1 more)

### Community 41 - "Catalog.vue"
Cohesion: 0.24
Nodes (7): localePath, marqueeChannels, reducedMotion, staticMotion, { t }, HOME_CATALOG_CHANNELS, HomeCatalogChannel

### Community 42 - "Pagination.vue"
Cohesion: 0.27
Nodes (9): canGoNext, canGoPrevious, emit, Emits, goToPage(), nextPage(), previousPage(), Props (+1 more)

### Community 43 - "ensureLoaded"
Cohesion: 0.31
Nodes (8): DEFAULT_HOSTS, hostAllowed(), injectLiveChatStub(), useLiveChat(), ensureLoaded(), openChat(), resolveLicense(), whenReady()

### Community 44 - "nuxt.config.ts"
Cohesion: 0.22
Nodes (5): CRITICAL_HEAD, CRITICAL_INK_COLOR, CRITICAL_THEME_COLOR, CRITICAL_THEME_CSS, currentDir

### Community 45 - "iptv-vs-cable-vs-streaming.md"
Cohesion: 0.22
Nodes (8): Content, Cost, Flexibility, Frequently asked questions, IPTV vs cable vs streaming: the short answer, Quality, So which should you choose?, Try the all-in-one option

### Community 46 - "iptv-vs-cabo-vs-streaming.md"
Cohesion: 0.22
Nodes (8): Conteúdo, Custo, Então, qual deve escolher?, Experimente a opção tudo-em-um, Flexibilidade, IPTV vs cabo vs streaming: a resposta curta, Perguntas frequentes, Qualidade

### Community 47 - "CLAUDE.md — maxco. landing (marketing site)"
Cohesion: 0.22
Nodes (8): CLAUDE.md — maxco. landing (marketing site), Decision of record, Hard rules, Tailwind v4 across layers (important), Tech stack, The 3-layer architecture, What this repo is, What this site actually fetches (read-only, public)

### Community 48 - "MaxcoChatBubble.vue"
Cohesion: 0.22
Nodes (4): chatOpen, { ensureLoaded, openChat, whenReady }, greetingVisible, hasUnread

### Community 49 - "support/Form.vue"
Cohesion: 0.25
Nodes (6): FormData, supportMutation, { t }, { user, loggedIn, clear: logOut }, SupportPayload, useSupportMutation()

### Community 50 - "ScrollReactor.vue"
Cohesion: 0.22
Nodes (8): container, context, faded, index, isActive, isPrevious, peers, show

### Community 51 - "ver-laliga-sin-cortes.md"
Cohesion: 0.25
Nodes (7): Compruébalo tú mismo, Cómo evitar los cortes durante los partidos, Cómo ver LaLiga sin cortes con IPTV, Lo que de verdad importa: estabilidad sin cortes, Preguntas frecuentes, Pruébalo antes de pagar, Qué competiciones puedes seguir

### Community 52 - "watching-football-on-iptv.md"
Cohesion: 0.25
Nodes (7): Can you watch football on IPTV?, Frequently asked questions, How to avoid buffering during matches, See the quality for yourself, Test before you commit, The thing that actually matters: reliability, What football you can follow

### Community 53 - "Post.vue"
Cohesion: 0.25
Nodes (7): isTutorialLoading, post, route, selectedApp, selectedDevice, { t }, tutorialQuery

### Community 54 - "Review.vue"
Cohesion: 0.25
Nodes (7): displayName, hasAvatar, initials, props, PropsType, Review, { rt }

### Community 55 - "ArticleCard.vue"
Cohesion: 0.32
Nodes (6): articlePath, localePath, Props, updatedLabel, GuideCard, formatGuideUpdatedAt()

### Community 56 - "Reviews.old.vue"
Cohesion: 0.25
Nodes (7): options, options1, options2, reviews, reviews1, reviews2, { tm }

### Community 57 - "sports/FinalCta.vue"
Cohesion: 0.39
Nodes (7): email, emailInvalid, externalAppPath(), handleSubmit(), { t }, trialHref, validateEmail()

### Community 58 - "vod/FinalCta.vue"
Cohesion: 0.39
Nodes (7): email, emailInvalid, externalAppPath(), handleSubmit(), { t }, trialHref, validateEmail()

### Community 59 - "kb-articles.ts"
Cohesion: 0.25
Nodes (7): KB_ARTICLES, KB_ARTICLES_BY_SLUG, KB_CATEGORIES, KB_CATEGORY_MAP, KbArticle, KbCategory, KbCategoryId

### Community 60 - "how-to-spot-a-fake-iptv-reseller.md"
Cohesion: 0.29
Nodes (6): Buy with confidence, Frequently asked questions, How to spot a fake IPTV reseller, How to verify a legitimate IPTV service, Protect yourself: a quick checklist, The warning signs of a dodgy IPTV seller

### Community 61 - "watch-premier-league-without-sky.md"
Cohesion: 0.29
Nodes (6): Frequently asked questions, How to get started, How to watch the Premier League without Sky, Test it before the next kick-off, What you can follow, Why reliability matters most for football

### Community 62 - "REBRAND-PLAN.md — execution order"
Cohesion: 0.29
Nodes (6): Out of scope here, Phase 0 — Own it & clean it (once), Phase 1 — Reskin the shell (tokens + identity), Phase 2 — Redesign the page layer (home sections), Phase 3 — Other pages, REBRAND-PLAN.md — execution order

### Community 63 - "[app].vue"
Cohesion: 0.33
Nodes (6): apps, apps, localePath, metadataQuery, route, getAppsForDevice()

### Community 64 - "QuestionResponse.vue"
Cohesion: 0.29
Nodes (5): faqs, sections, selectedSection, selectedSectionInfos, { tm, rt }

### Community 65 - "bootstrap-channels-hero-images.ts"
Cohesion: 0.33
Nodes (4): HERO_ASSETS, HeroAsset, main(), verifyAndDownload()

### Community 66 - "MarqueeGroup.vue"
Cohesion: 0.33
Nodes (3): isGroupPaused, props, PropsType

### Community 67 - "report/Form.vue"
Cohesion: 0.40
Nodes (3): reportMutation, { t }, useReportMutation()

### Community 68 - "Search.vue"
Cohesion: 0.40
Nodes (4): { isSmallScreen }, { searchedChannel, selectedCategory }, searchedChannelModel, { t }

### Community 69 - "resellers/Reviews.vue"
Cohesion: 0.40
Nodes (4): allReviews, Review, { t, tm }, visibleReviews

### Community 70 - "Competitions.vue"
Cohesion: 0.50
Nodes (3): competitions, { t, locale, tm }, SPORTS_COMPETITIONS

### Community 71 - "queries/vodGenrePosters.ts"
Cohesion: 0.40
Nodes (3): VOD_GENRE_POSTERS_QUERY_KEY, VodGenrePoster, VodGenrePostersResponse

### Community 72 - "_template.md"
Cohesion: 0.50
Nodes (3): Internal links, Section heading (H2), Subsection (H3)

### Community 74 - "ArticleFooter.vue"
Cohesion: 0.67
Nodes (3): guidesPath, localePath, { t }

### Community 78 - "livechat.d.ts"
Cohesion: 0.50
Nodes (3): LiveChatConfig, LiveChatWidgetApi, Window

## Knowledge Gaps
- **728 isolated node(s):** `require`, `route`, `{ public: config }`, `{ t, locale, locales, defaultLocale }`, `title` (+723 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **89 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `scripts`, `fuse.js`, `@headlessui/vue`, `motion-v`, `nuxt`, `nuxt-delay-hydration`, `nuxt-echarts`, `@nuxt/eslint`, `@nuxt/fonts`, `@nuxt/kit`, `@nuxtjs/fontaine`, `@nuxtjs/mdc`, `pinia`, `@pinia/colada`, `@pinia/colada-nuxt`, `reka-ui`, `sharp`, `@splidejs/splide-extension-auto-scroll`, `@splidejs/splide-extension-grid`, `@splidejs/splide-extension-intersection`, `@splidejs/vue-splide`, `tailwind-merge`, `tailwindcss`, `@tailwindcss/vite`, `@takumi-rs/core`, `tw-animate-css`, `vue`, `vue-router`, `@formkit/themes`, `@vueuse/core`, `@vueuse/router`, `zod`, `eslint-plugin-tailwind-canonical-classes`, `@fahdlaabi12/tailwindcss-inner-border`, `@formkit/addons`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **Why does `trustedDependencies` connect `update-tmdb-images.ts` to `scripts`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `useChannelsFilters()` (e.g. with `reset()` and `setDefaultCategory()`) actually correct?**
  _`useChannelsFilters()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `require`, `route`, `{ public: config }` to the rest of the system?**
  _728 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `queries/blog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05706760316066725 - nodes in this community are weakly interconnected._
- **Should `PosterMarquee.vue` be split into smaller, more focused modules?**
  _Cohesion score 0.050505050505050504 - nodes in this community are weakly interconnected._
- **Should `scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.05128205128205128 - nodes in this community are weakly interconnected._