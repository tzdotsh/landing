import type { SitemapUrl } from "#sitemap/types";

type RawSitemapItem = {
  path: string;
  lastModified?: string | Date;
  /** Canonical marketing URL — no /v{version} prefix. */
  canonical?: boolean;
  /** When set, only emit this locale (used for locale-specific blog posts). */
  locale?: string;
  /** When set, only emit these locales (used for content that isn't translated everywhere). */
  localeCodes?: string[];
  /** Slug grouping key for blog hreflang alternates. */
  hreflangSlug?: string;
};

/**
 * Locales with real Payload CMS content (tutorials, legal). pt-pt is excluded
 * until the CMS carries Portuguese docs — emitting it would index
 * fallback-English pages under /pt-pt/ as duplicate content.
 */
const PAYLOAD_CONTENT_LOCALES = ["en-en", "es-es"];

export default defineSitemapEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const i18nConfig = config.public.i18n;
  const baseUrl =
    i18nConfig?.baseUrl || config.public.siteUrl || "http://localhost:3000";
  const version = config.public.activeVersion;

  const locales = (i18nConfig?.locales || []) as Array<{
    code: string;
    language: string;
  }>;
  const defaultLocale = i18nConfig?.defaultLocale || "en-en";

  const isoLocales = Object.fromEntries(
    locales.map((locale) => [locale.code, locale.language]),
  );

  const payloadBaseURL = String(config.public.payloadBaseURL || "");

  const [posts, tutorials, legalPages] = await Promise.all([
    fetchPosts(event),
    fetchTutorials(payloadBaseURL),
    fetchLegalPages(payloadBaseURL),
  ]);

  const blogAlternatesBySlug = posts.reduce<
    Record<string, Array<{ locale: string; language: string }>>
  >((acc, post) => {
    if (!post.slug) {
      return acc;
    }

    const language =
      locales.find((entry) => entry.code === post.locale)?.language ??
      post.locale;

    acc[post.slug] ??= [];
    acc[post.slug].push({ locale: post.locale, language });

    return acc;
  }, {});

  const rawContent: RawSitemapItem[] = [];

  const staticPaths = [
    "",
    "channels",
    "apps",
    "iptv-resellers",
    "blog",
    "iptv-sports",
    "iptv-vod",
    "faq",
    "support",
    "auth-check",
  ];
  staticPaths.forEach((p) =>
    rawContent.push({
      path: p,
      ...(p === "iptv-sports" || p === "iptv-vod" ? { canonical: true } : {}),
    }),
  );

  posts?.forEach((post) => {
    if (!post.slug) {
      return;
    }

    rawContent.push({
      path: `blog/${post.slug}`,
      lastModified: post.updatedAt as string,
      canonical: true,
      locale: post.locale,
      hreflangSlug: post.slug,
    });
  });

  tutorials?.forEach((tutorial) => {
    if (tutorial.device?.slug && tutorial.app?.slug) {
      rawContent.push({
        path: `apps/${tutorial.device.slug}/${tutorial.app.slug}`,
        lastModified: tutorial.updatedAt,
        localeCodes: PAYLOAD_CONTENT_LOCALES,
      });
    }
  });

  legalPages?.forEach((page) => {
    if (page.slug) {
      rawContent.push({
        path: `legal/${page.slug}`,
        lastModified: page.updatedAt,
        localeCodes: PAYLOAD_CONTENT_LOCALES,
      });
    }
  });

  return rawContent.flatMap((item) => {
    const targetLocales = item.locale
      ? locales.filter((locale) => locale.code === item.locale)
      : item.localeCodes
        ? locales.filter((locale) => item.localeCodes!.includes(locale.code))
        : locales;

    return targetLocales.map((locale) => {
      const pathPrefix =
        locale.code === defaultLocale
          ? `/v${version}`
          : `/${locale.code}/v${version}`;

      const urlPath = item.canonical
        ? locale.code === defaultLocale
          ? `/${item.path}`
          : `/${locale.code}/${item.path}`
        : `${pathPrefix}/${item.path}`;

      const normalizedPath = urlPath.replace(/\/{2,}/g, "/");
      const fullUrl = `${baseUrl}${normalizedPath}`;

      const alternatives =
        item.hreflangSlug && blogAlternatesBySlug[item.hreflangSlug]
          ? blogAlternatesBySlug[item.hreflangSlug]
              .filter((entry) => entry.locale !== locale.code)
              .map((entry) => {
                const altPath =
                  entry.locale === defaultLocale
                    ? `/blog/${item.hreflangSlug}`
                    : `/${entry.locale}/blog/${item.hreflangSlug}`;

                return {
                  hreflang: entry.language,
                  href: `${baseUrl}${altPath}`,
                };
              })
          : targetLocales
              .filter((entry) => entry.code !== locale.code)
              .map((altLocale) => {
                const altPathPrefix =
                  altLocale.code === defaultLocale
                    ? `/v${version}`
                    : `/${altLocale.code}/v${version}`;
                const altUrlPath = `${altPathPrefix}/${item.path}`.replace(
                  /\/{2,}/g,
                  "/",
                );

                return {
                  hreflang: altLocale.language,
                  href: `${baseUrl}${altUrlPath}`,
                };
              });

      return {
        _sitemap: isoLocales[locale.code],
        loc: fullUrl,
        lastmod: item.lastModified
          ? new Date(item.lastModified).toISOString()
          : undefined,
        changefreq: "daily",
        priority: item.canonical ? 0.9 : 0.8,
        alternatives,
      } satisfies SitemapUrl;
    });
  });
});

async function fetchPosts(event: Parameters<typeof queryCollection>[0]) {
  try {
    // Pass the handler's own event — no useEvent()/async-context dependency.
    const posts = await queryCollection(event, "blog").all();

    return posts
      .filter((post) => !post.draft)
      .map((post) => ({
        slug: post.slug,
        locale: post.locale,
        updatedAt: post.dateUpdated ?? post.datePublished,
      }));
  } catch (error) {
    console.error("Sitemap: Error fetching blog posts", error);
    return [];
  }
}

/**
 * Payload CMS REST fetch — plain server-side $fetch against the same API the
 * client SDK targets (`${payloadBaseURL}/api/{collection}`). The `usePayload`
 * composable is app-context only and does not exist in the Nitro bundle.
 */
async function fetchPayloadCollection<T>(
  payloadBaseURL: string,
  collection: string,
  query: Record<string, string | number>,
): Promise<T[]> {
  if (!payloadBaseURL) {
    console.error(
      `Sitemap: payloadBaseURL is not configured — skipping ${collection}`,
    );
    return [];
  }

  const response = await $fetch<{ docs?: T[] }>(
    new URL(`/api/${collection}`, payloadBaseURL).href,
    { query, timeout: 10_000 },
  );

  return response?.docs ?? [];
}

async function fetchTutorials(payloadBaseURL: string) {
  try {
    return await fetchPayloadCollection<{
      slug: string;
      updatedAt: string;
      device: { slug: string };
      app: { slug: string };
    }>(payloadBaseURL, "tutorials", {
      limit: 1000,
      depth: 1,
      "select[slug]": "true",
      "select[updatedAt]": "true",
      "select[device]": "true",
      "select[app]": "true",
    });
  } catch (error) {
    console.error("Sitemap: Error fetching tutorials", error);
    return [];
  }
}

async function fetchLegalPages(payloadBaseURL: string) {
  try {
    return await fetchPayloadCollection<{ slug: string; updatedAt: string }>(
      payloadBaseURL,
      "legal",
      {
        limit: 100,
        depth: 0,
        "select[slug]": "true",
        "select[updatedAt]": "true",
      },
    );
  } catch (error) {
    console.error("Sitemap: Error fetching legal pages", error);
    return [];
  }
}
