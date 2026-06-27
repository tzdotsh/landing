import type { SitemapUrl } from "#sitemap/types";

type RawSitemapItem = {
  path: string;
  lastModified?: string | Date;
  /** Canonical marketing URL — no /v{version} prefix. */
  canonical?: boolean;
  /** When set, only emit this locale (used for locale-specific blog posts). */
  locale?: string;
  /** Slug grouping key for blog hreflang alternates. */
  hreflangSlug?: string;
};

export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig();

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

  const [posts, tutorials, legalPages] = await Promise.all([
    fetchPosts(),
    fetchTutorials(),
    fetchLegalPages(),
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
      });
    }
  });

  legalPages?.forEach((page) => {
    if (page.slug) {
      rawContent.push({
        path: `legal/${page.slug}`,
        lastModified: page.updatedAt,
      });
    }
  });

  return rawContent.flatMap((item) => {
    const targetLocales = item.locale
      ? locales.filter((locale) => locale.code === item.locale)
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
          : locales
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

async function fetchPosts() {
  try {
    const event = useEvent();
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

async function fetchTutorials() {
  const payloadSdk = usePayload();

  try {
    const tutorials = (await payloadSdk.find({
      collection: "tutorials",
      limit: 1000,
      depth: 1,
      select: {
        slug: true,
        updatedAt: true,
        device: true,
        app: true,
      },
    })) as {
      docs: {
        slug: string;
        updatedAt: string;
        device: { slug: string };
        app: { slug: string };
      }[];
    };
    return tutorials.docs || [];
  } catch (error) {
    console.error("Sitemap: Error fetching tutorials", error);
    return [];
  }
}

async function fetchLegalPages() {
  const payloadSdk = usePayload();

  try {
    const legalPages = (await payloadSdk.find({
      collection: "legal",
      limit: 100,
      depth: 0,
      select: {
        slug: true,
        updatedAt: true,
      },
    })) as { docs: { slug: string; updatedAt: string }[] };
    return legalPages.docs || [];
  } catch (error) {
    console.error("Sitemap: Error fetching legal pages", error);
    return [];
  }
}
