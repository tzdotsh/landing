export type BlogFaqItem = {
  question: string;
  answer: string;
};

/** Shape returned by queryCollection('blog') after content.config schema. */
export type BlogCollectionItem = {
  id: string;
  path: string;
  title: string;
  slug: string;
  description: string;
  datePublished: string | Date;
  dateUpdated?: string | Date;
  author: string;
  authorBio?: string;
  tags: string[];
  category?: string;
  image?: string;
  locale: "en-en" | "es-es";
  draft: boolean;
  faq?: BlogFaqItem[];
  body?: unknown;
};

export type BlogPost = BlogCollectionItem & {
  readingTimeMinutes: number;
};

export const BLOG_POSTS_PER_PAGE = 12;

export const BLOG_DEFAULT_LOCALE = "en-en";

export function toContentLocale(locale: string): "en-en" | "es-es" {
  return locale.startsWith("es") ? "es-es" : "en-en";
}

export function resolveBlogSlug(post: BlogCollectionItem) {
  return post.slug ?? post.path.split("/").filter(Boolean).pop() ?? "";
}

export function isPublishedBlogPost(
  post: BlogCollectionItem,
  locale: string,
) {
  return Boolean(!post.draft) && post.locale === toContentLocale(locale);
}

export function sortBlogPostsNewestFirst(posts: BlogCollectionItem[]) {
  return [...posts].sort(
    (a, b) =>
      new Date(b.datePublished).getTime() -
      new Date(a.datePublished).getTime(),
  );
}

/** Nuxt Content v3 page collections expose parsed MDC/minimark trees, not raw strings. */
export function resolveBlogBodyPlainText(body: unknown): string {
  if (typeof body === "string") {
    return body;
  }

  if (!body) {
    return "";
  }

  if (Array.isArray(body)) {
    return body.map(resolveBlogBodyPlainText).join(" ");
  }

  if (typeof body === "object") {
    const node = body as Record<string, unknown>;

    if (node.type === "minimark" && node.value) {
      return resolveBlogBodyPlainText(node.value);
    }

    const parts: string[] = [];

    if (typeof node.value === "string") {
      parts.push(node.value);
    }

    if (typeof node.text === "string") {
      parts.push(node.text);
    }

    if (node.children) {
      parts.push(resolveBlogBodyPlainText(node.children));
    }

    if (node.body) {
      parts.push(resolveBlogBodyPlainText(node.body));
    }

    return parts.join(" ");
  }

  return "";
}

export function estimateReadingTimeMinutes(
  body: unknown,
  wordsPerMinute = 220,
) {
  const text = resolveBlogBodyPlainText(body).trim();
  const words = text.split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function withReadingTime(post: BlogCollectionItem): BlogPost {
  return {
    ...post,
    readingTimeMinutes: estimateReadingTimeMinutes(post.body),
  };
}

/** Canonical blog path without /v{version} — used for SEO and sitemap. */
export function blogCanonicalPath(slug: string, locale: string) {
  const normalized = toContentLocale(locale);

  if (normalized === BLOG_DEFAULT_LOCALE) {
    return `/blog/${slug}`;
  }

  return `/${normalized}/blog/${slug}`;
}

export function blogVersionedPath(
  slug: string,
  version: number | string,
  locale: string,
) {
  const normalized = toContentLocale(locale);
  const prefix =
    normalized === BLOG_DEFAULT_LOCALE ? "" : `/${normalized}`;

  return `${prefix}/v${version}/blog/${slug}`.replace(/\/{2,}/g, "/");
}

export function absoluteBlogUrl(
  siteUrl: string,
  slug: string,
  locale: string,
) {
  const base = siteUrl.replace(/\/$/, "");
  const path = blogCanonicalPath(slug, locale);

  return `${base}${path}`;
}

export function resolveBlogImageUrl(
  image: string | undefined,
  siteUrl: string,
) {
  if (!image) {
    return `${siteUrl.replace(/\/$/, "")}/og-image.webp`;
  }

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return `${siteUrl.replace(/\/$/, "")}${image.startsWith("/") ? image : `/${image}`}`;
}

export function formatBlogDate(
  value: string | Date | undefined,
  locale: string,
) {
  if (!value) {
    return "";
  }

  const dateLocale = locale.startsWith("es") ? "es-ES" : "en-GB";

  return new Date(value).toLocaleDateString(dateLocale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
