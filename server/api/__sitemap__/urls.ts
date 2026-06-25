import type { SitemapUrl } from "#sitemap/types";

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

  // Fetch all dynamic content in parallel
  const [posts, tutorials, legalPages] = await Promise.all([
    fetchPosts(),
    fetchTutorials(),
    fetchLegalPages(),
  ]);

  // Prepare raw content items
  const rawContent: { path: string; lastModified?: string | Date }[] = [];

  // Static Pages
  const staticPaths = [
    "",
    "channels",
    "apps",
    "iptv-resellers",
    "blog",
    "faq",
    "support",
    "auth-check",
  ];
  staticPaths.forEach((p) => rawContent.push({ path: p }));

  // Dynamic Pages
  posts?.forEach((post) => {
    if (post.slug)
      rawContent.push({
        path: `blog/${post.slug}`,
        lastModified: post.updatedAt as string,
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
    if (page.slug)
      rawContent.push({
        path: `legal/${page.slug}`,
        lastModified: page.updatedAt,
      });
  });

  // Map to Sitemap Entries
  return rawContent.flatMap((item) => {
    return locales.map((locale) => {
      // Build URL for this locale
      const pathPrefix =
        locale.code === defaultLocale
          ? `/v${version}`
          : `/${locale.code}/v${version}`;
      const urlPath = `${pathPrefix}/${item.path}`.replace(/\/+/g, "/");
      const fullUrl = `${baseUrl}${urlPath}`;

      // Build alternatives
      const alternatives = locales
        .filter((l) => l.code !== locale.code)
        .map((altLocale) => {
          const altPathPrefix =
            altLocale.code === defaultLocale
              ? `/v${version}`
              : `/${altLocale.code}/v${version}`;
          const altUrlPath = `${altPathPrefix}/${item.path}`.replace(
            /\/+/g,
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
        priority: 0.8,
        alternatives,
      } satisfies SitemapUrl;
    });
  });
});

async function fetchPosts() {
  const payloadSdk = usePayload();

  try {
    const posts = (await payloadSdk.find({
      collection: "posts",
      limit: 1000,
      depth: 0,
      select: {
        slug: true,
        updatedAt: true,
      },
    })) as { docs: { slug: string; updatedAt: string }[] };
    return posts.docs || [];
  } catch (error) {
    console.error("Sitemap: Error fetching posts", error);
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
