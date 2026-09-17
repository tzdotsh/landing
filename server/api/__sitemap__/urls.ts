import type { SitemapUrl } from "#sitemap/types";
import {
  getHardcodedLegalDocument,
  LEGAL_PAGE_SLUGS,
} from "~/data/legal-documents";

type RawSitemapItem = {
  path: string;
  lastModified?: string | Date;
  /** When set, emit only this real content locale. */
  locale?: string;
  /** Groups localized CMS docs for hreflang (slugs may differ by locale). */
  alternateKey?: string;
};

/** Payload CMS locale ↔ site locale mapping for the posts collection. */
const CMS_LOCALES = [
  { cms: "en", site: "en-en" },
  { cms: "es", site: "es-es" },
  { cms: "pt", site: "pt-pt" },
] as const;

export default defineSitemapEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const i18nConfig = config.public.i18n;
  const baseUrl = String(
    i18nConfig?.baseUrl ||
      config.public.siteUrl ||
      getRequestURL(event).origin,
  ).replace(/\/$/, "");
  const locales = (i18nConfig?.locales || []) as Array<{
    code: string;
    language: string;
  }>;
  const defaultLocale = i18nConfig?.defaultLocale || "en-en";

  const isoLocales = Object.fromEntries(
    locales.map((locale) => [locale.code, locale.language]),
  );

  const payloadBaseURL = String(config.public.payloadBaseURL || "");

  const [posts, tutorials] = await Promise.all([
    fetchPosts(payloadBaseURL),
    fetchTutorials(payloadBaseURL),
  ]);

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
    "affiliate",
  ];
  staticPaths.forEach((path) => rawContent.push({ path }));

  posts?.forEach((post) => {
    rawContent.push({
      path: `blog/${post.slug}`,
      lastModified: post.updatedAt,
      locale: post.locale,
      alternateKey: `blog:${post.id}`,
    });
  });

  tutorials?.forEach((tutorial) => {
    if (tutorial.device?.slug && tutorial.app?.slug) {
      rawContent.push({
        path: `apps/${tutorial.device.slug}/${tutorial.app.slug}`,
        lastModified: tutorial.updatedAt,
        locale: tutorial.locale,
        alternateKey: `tutorial:${tutorial.device.slug}/${tutorial.app.slug}`,
      });
    }
  });

  LEGAL_PAGE_SLUGS.forEach((slug) => {
    for (const { site, cms } of CMS_LOCALES.filter(
      ({ site }) => site !== "pt-pt",
    )) {
      const page = getHardcodedLegalDocument(slug, cms === "es" ? "es" : "en");
      if (!page) {
        continue;
      }

      rawContent.push({
        path: `legal/${slug}`,
        lastModified: page.updatedAt,
        locale: site,
        alternateKey: `legal:${slug}`,
      });
    }
  });

  const localizedPath = (item: RawSitemapItem, localeCode: string) => {
    const prefix = localeCode === defaultLocale ? "" : `/${localeCode}`;
    return `${prefix}${item.path ? `/${item.path}` : ""}` || "/";
  };

  const itemsByAlternateKey = rawContent.reduce<
    Record<string, RawSitemapItem[]>
  >((groups, item) => {
    if (item.alternateKey) {
      groups[item.alternateKey] ??= [];
      groups[item.alternateKey].push(item);
    }
    return groups;
  }, {});

  return rawContent.flatMap((item) => {
    const targetLocales = item.locale
      ? locales.filter((entry) => entry.code === item.locale)
      : locales;

    return targetLocales.map((locale) => {
      const alternateItems = item.alternateKey
        ? (itemsByAlternateKey[item.alternateKey] ?? [item])
        : locales.map((entry) => ({ ...item, locale: entry.code }));

      const alternatives = alternateItems.flatMap((alternate) => {
        const alternateLocale = locales.find(
          (entry) => entry.code === alternate.locale,
        );
        if (!alternateLocale) {
          return [];
        }

        return [
          {
            hreflang: alternateLocale.language,
            href: `${baseUrl}${localizedPath(alternate, alternateLocale.code)}`,
          },
        ];
      });

      const englishItem = alternateItems.find(
        (alternate) => alternate.locale === defaultLocale,
      );
      if (englishItem) {
        alternatives.push({
          hreflang: "x-default",
          href: `${baseUrl}${localizedPath(englishItem, defaultLocale)}`,
        });
      }

      return {
        _sitemap: isoLocales[locale.code],
        loc: `${baseUrl}${localizedPath(item, locale.code)}`,
        lastmod: item.lastModified
          ? new Date(item.lastModified).toISOString()
          : undefined,
        changefreq: "daily",
        priority: item.path === "" ? 1 : 0.8,
        alternatives,
      } satisfies SitemapUrl;
    });
  });
});

/**
 * Blog posts from the Payload CMS `posts` collection, one request per CMS
 * locale with `fallback-locale=none` so untranslated locales (null title/slug)
 * are excluded instead of emitting fallback-English URLs.
 */
async function fetchPosts(payloadBaseURL: string) {
  const results = await Promise.all(
    CMS_LOCALES.map(async ({ cms, site }) => {
      try {
        const docs = await fetchPayloadCollection<{
          id: number;
          title?: string | null;
          slug?: string | null;
          updatedAt: string;
        }>(payloadBaseURL, "posts", {
          locale: cms,
          "fallback-locale": "none",
          limit: 100,
          sort: "-createdAt",
          depth: 0,
          "select[title]": "true",
          "select[slug]": "true",
          "select[updatedAt]": "true",
        });

        return docs
          .filter((doc) => doc.title && doc.slug)
          .map((doc) => ({
            id: doc.id,
            slug: doc.slug as string,
            locale: site as string,
            updatedAt: doc.updatedAt,
          }));
      } catch (error) {
        console.error(`Sitemap: Error fetching blog posts (${cms})`, error);
        return [];
      }
    }),
  );

  return results.flat();
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
  const results = await Promise.all(
    CMS_LOCALES.map(async ({ cms, site }) => {
      try {
        const docs = await fetchPayloadCollection<{
          title?: string | null;
          updatedAt: string;
          device: { slug: string };
          app: { slug: string };
        }>(payloadBaseURL, "tutorials", {
          locale: cms,
          "fallback-locale": "none",
          limit: 1000,
          depth: 1,
          "select[title]": "true",
          "select[updatedAt]": "true",
          "select[device]": "true",
          "select[app]": "true",
        });

        const seenPairs = new Set<string>();
        return docs.flatMap((doc) => {
          if (!doc.title || !doc.device?.slug || !doc.app?.slug) {
            return [];
          }

          const pair = `${doc.device.slug}/${doc.app.slug}`;
          if (seenPairs.has(pair)) {
            return [];
          }
          seenPairs.add(pair);

          return [{ ...doc, locale: site }];
        });
      } catch (error) {
        console.error(`Sitemap: Error fetching tutorials (${cms})`, error);
        return [];
      }
    }),
  );

  return results.flat();
}
