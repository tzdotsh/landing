import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

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
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },

  compatibilityDate: "latest",

  extends: [
    process.env.LOCAL_LAYER === "true"
      ? "../tv-layout"
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
        weights: [400, 500, 600, 700, 800],
        preload: true,
      },
      {
        name: "Hanken Grotesk",
        provider: "google",
        weights: [400, 500, 600, 700, 800],
      },
    ],
    defaults: {
      weights: [400, 500, 600, 700, 800],
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
    disableStylesheets: "entry",
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
    public: {
      validDomain: process.env.VALID_DOMAIN,
      enableAnimations: process.env.ENABLE_ANIMATIONS !== "false",
      siteUrl: process.env.SITE_URL || "https://maxco.one",
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

    // experimental: {
    //   wasm: true,
    // },

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