import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { CRITICAL_HEAD } from "./front/constants/criticalTheme";

const currentDir = dirname(fileURLToPath(import.meta.url));

/** Nuxt Content SQLite driver — avoids better-sqlite3 native bindings when possible. */
function resolveContentSqliteConnector():
  | "native"
  | "bun"
  | "better-sqlite3"
  | undefined {
  const override = process.env.NUXT_CONTENT_SQLITE_CONNECTOR;

  if (
    override === "native" ||
    override === "bun" ||
    override === "better-sqlite3"
  ) {
    return override;
  }

  // bun run build / bun install — no native .node binary required
  if (process.versions.bun) {
    return "bun";
  }

  // Node 22.5+ built-in sqlite (see content.nuxt.com docs)
  const nodeMajor = Number(process.versions.node.split(".")[0] ?? 0);
  if (nodeMajor >= 22) {
    return "native";
  }

  return undefined;
}

const contentSqliteConnector = resolveContentSqliteConnector();

// Environment: Nuxt loads `.env` from the project root at build/dev time.
// Shared billing vars come from the tv-api-nuxt layer (`runtimeConfig` ← process.env).
// Server deploy: place `.env` here, run `bun build`, then `pm2 start ecosystem.config.cjs`.

export default defineNuxtConfig({
  hooks: {
    // Drop inherited tv-layout LiveChat plugin (GitHub layer cache). Landing loads
    // via useLiveChat() in MaxcoChatBubble; front/plugins/livechat.client.ts is a no-op shadow.
    "app:resolve"(app) {
      app.plugins = app.plugins.filter((plugin) => {
        const src = (plugin.src || "").replace(/\\/g, "/");
        if (!src.includes("livechat.client")) {
          return true;
        }
        // Strip any layer / c12 copy; keep only this repo's shadow plugin.
        return !src.includes("/.c12/") && !src.includes("/node_modules/");
      });
    },
  },

  app: {
    // out-in transitions delay first paint and inflate CLS on marketing pages
    pageTransition: false,
    layoutTransition: false,
    head: CRITICAL_HEAD,
  },

  // Overrides nuxt-security defaults inherited from the tv-api-nuxt layer.
  security: {
    headers: {
      // COEP (credentialless) blocks the LiveChat iframe (secure.livechatinc.com
      // sends no CORP/COEP), leaving the widget a dead queue stub — clicking the
      // bubble did nothing. We embed no cross-origin content that needs COEP.
      crossOriginEmbedderPolicy: false,
    },
  },

  compatibilityDate: "latest",

  extends: [
    process.env.LOCAL_LAYER === "true"
      ? "../layout"
      : ["github:tzdotsh/tv-layout#main", { auth: process.env.GIT_LAYER_TOKEN, install: true }],
  ],

  experimental: {
    typedPages: true,
    emitRouteChunkError: "automatic-immediate",
    inlineRouteRules: true,
  },

  modules: [
    "@nuxt/content",
    "@nuxt/fonts",
    "nuxt-echarts",
    "@nuxtjs/mdc",
    "nuxt-vitalizer",
    "@nuxtjs/fontaine",
    "nuxt-delay-hydration",
    "@pinia/colada-nuxt",
    "@nuxt/eslint",
  ],

  css: [
    join(currentDir, "./front/assets/css/tailwind.css"),
    join(currentDir, "./front/assets/css/markdown.css"),
  ],

  fonts: {
    families: [
      {
        name: "Poppins",
        provider: "google",
        weights: [400, 500, 600, 700],
        subsets: ["latin"],
      },
      {
        name: "Hanken Grotesk",
        provider: "google",
        weights: [400, 500, 600, 700],
        subsets: ["latin"],
      },
    ],
    defaults: {
      weights: [400, 500, 600, 700],
      display: "swap",
      preload: false,
    },
    provider: "google",
    devtools: true,
  },

  fontMetrics: {
    fonts: ["Poppins", "Hanken Grotesk"],
  },

  vitalizer: {
    disablePrefetchLinks: true,
  },

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  delayHydration: {
    // Manual mode requires <DelayHydration> wrappers — none on homepage hero path.
    mode: "manual",
    debug: process.env.NODE_ENV === "development",
  },

  srcDir: "front",

  formkit: {
    configFile: "./front/configs/formkit.config.ts",
  },

  echarts: {
    renderer: "svg",
    charts: ["BarChart"],
    components: ["DatasetComponent", "GridComponent"],
  },

  i18n: {
    baseUrl: process.env.SITE_URL || "http://localhost:3000",

    redirectStatusCode: 301,

    locales: [
      {
        code: "en-en",
        file: "en-en.json",
        language: "en-GB",
        name: "English",
      },

      {
        code: "es-es",
        file: "es-es.json",
        language: "es-ES",
        name: "Spanish",
      },

      {
        code: "pt-pt",
        file: "pt-pt.json",
        language: "pt-PT",
        name: "Português",
      },
    ],

    defaultLocale: "en-en",

    strategy: "prefix_except_default",

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "browserLang",
      alwaysRedirect: true,
      redirectOn: "root",
    },

    experimental: {
      typedOptionsAndMessages: "default",
    },

    hmr: true,

    langDir: "lang",
  },

  sitemap: {
    sources: ["/api/__sitemap__/urls"],

    excludeAppSources: true,
  },

  mdc: {
    components: {
      map: {
        stat: "content/Stat",
        "pull-quote": "content/PullQuote",
        faq: "content/Faq",
      },
    },
  },

  content: {
    ...(contentSqliteConnector
      ? { experimental: { sqliteConnector: contentSqliteConnector } }
      : {}),
  },

  runtimeConfig: {
    tmdbApiKey: process.env.TMDB_API_KEY || process.env.NUXT_TMDB_API_KEY,

    // Domain-agnostic cutover. `validHostnames` is the allowlist the hostname
    // guard enforces (server/middleware/hostname.ts). `canonicalHost` is the bare
    // host used to build absolute URLs. Cutover = flip CANONICAL_HOST + restart.
    validHostnames:
      process.env.VALID_HOSTNAMES ||
      "maxco.one,www.maxco.one,web.maxcotv.com,maxcotv.com",
    canonicalHost: process.env.CANONICAL_HOST || "maxco.one",

    public: {
      validDomain: process.env.VALID_DOMAIN,
      enableAnimations: process.env.ENABLE_ANIMATIONS !== "false",

      // LiveChat — landing-owned (plugin + bubble shadow tv-layout).
      livechatLicense: process.env.LIVECHAT_LICENSE || "16979592",
      validHostnames:
        process.env.VALID_HOSTNAMES ||
        "maxco.one,www.maxco.one,web.maxcotv.com,maxcotv.com",

      // Bare canonical host for building absolute URLs client-side. Overridable
      // at runtime via NUXT_PUBLIC_CANONICAL_HOST (no rebuild on domain cutover).
      canonicalHost: process.env.CANONICAL_HOST || "maxco.one",

      siteUrl:
        process.env.SITE_URL ||
        `https://${process.env.CANONICAL_HOST || "maxco.one"}`,
      HOSTNAME:
        process.env.HOSTNAME ||
        process.env.SITE_URL ||
        `https://${process.env.CANONICAL_HOST || "maxco.one"}`,
      umamiUrl:
        process.env.NUXT_PUBLIC_UMAMI_URL || "https://analytics.maxco.one",
      umamiWebsiteId:
        process.env.NUXT_PUBLIC_UMAMI_ID ||
        "57811e23-d90d-441e-b2d6-a66ba498e4fd",
      umamiEnabled:
        process.env.NODE_ENV === "production" &&
        process.env.NUXT_PUBLIC_UMAMI_DISABLED !== "true",
    },
  },

  nitro: {
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },

    externals: {
      inline: [
        "vue",
        "@vue/server-renderer",
        "@vue/runtime-core",
        "@vue/runtime-dom",
        "@vue/shared",
        "@vue/reactivity",
      ],
    },

    experimental: {
      // Request context for useEvent() in server utils (e.g. sitemap sources).
      asyncContext: true,
    },

    devStorage: {
      cache: {
        driver: "redis",
        base: "website:",
      },
    },

    storage: {
      cache: {
        driver: "redis",
        base: "website:",
      },
    },
  },

  // Route rules for performance optimization
  routeRules: {
    // Homepage - prerender and cache
    "/": {
      prerender: true,
      headers: {
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
    // Static pages - prerender
    "/faq": {
      prerender: true,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    },
    "/support": {
      prerender: true,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    },
    "/apps": {
      prerender: true,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    },
    "/iptv-resellers": {
      prerender: true,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    },
    "/iptv-sports": {
      prerender: true,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    },
    "/v*/iptv-sports": {
      isr: 3600,
      headers: {
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
    "/es-es/v*/iptv-sports": {
      isr: 3600,
      headers: {
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
    "/iptv-vod": {
      prerender: true,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    },
    "/v*/iptv-vod": {
      isr: 3600,
      headers: {
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
    "/es-es/v*/iptv-vod": {
      isr: 3600,
      headers: {
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
    // Blog pages - ISR with revalidation (versioned + locale-prefixed paths)
    "/blog/**": {
      isr: 3600,
      headers: {
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
    "/v*/blog/**": {
      isr: 3600,
      headers: {
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
    "/es-es/v*/blog/**": {
      isr: 3600,
      headers: {
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
    // Channels - cache with shorter TTL
    "/channels": {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=600",
      },
    },
    "/api/featured/trending": {
      headers: {
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=43200",
      },
    },
    "/api/vod/genre-posters": {
      headers: {
        "Cache-Control":
          "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
    // API-like routes - no cache
    "/auth-check": {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    },
    // Spanish locale routes
    "/es-es/**": {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    },
  },

  // Bundle optimization
  vite: {
    plugins: [tailwindcss()],

    server: {
      fs: {
        allow: [join(currentDir, "..")],
      },
    },

    ssr: {
      noExternal: ["tv-layout", /tv-layout/, /tv-layout\/front/],
    },

    optimizeDeps: {
      include: [
        "vue-slider-component/dist-css/vue-slider-component.umd.min.js", // CJS,
        "@tanstack/vue-virtual",
        "reka-ui",
        "@formkit/core",
        "@unhead/schema-org/vue",
        "@formkit/addons",
        "tailwind-merge",
        "@formkit/themes",
        "@headlessui/vue",
        "@fahdlaabi12/sileo/vue",
        "@payloadcms/sdk",
      ],
    },
  },

  sentry: {
    enabled: false,
  },
});