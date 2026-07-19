import { useInfiniteQuery, useQuery } from "@pinia/colada";
import { computed, toValue, type MaybeRefOrGetter } from "vue";

import {
  BLOG_POSTS_PER_PAGE,
  CMS_LOCALE_TO_SITE_LOCALE,
  estimateReadingTimeMinutes,
  parseBlogFaq,
  toCmsLocale,
  toContentLocale,
  type BlogPost,
  type BlogPostAlternate,
  type CmsLocale,
} from "~/utils/blog";

export type BlogPostsPage = {
  docs: BlogPost[];
  totalDocs: number;
  page: number;
  hasMore: boolean;
};

/**
 * Upstream CMS failure (network error, timeout, non-2xx, malformed response).
 * Distinct from "not found": only a well-formed `{docs: []}` with zero results
 * resolves to null/[] — everything else throws this, so pages can answer 503
 * instead of 404 and caches/ISR never store a dead page for a live post.
 */
export class BlogUpstreamError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "BlogUpstreamError";
  }
}

/** Raw Payload CMS `posts` doc (depth=1 resolves `thumbnail` into a media object). */
type PayloadPostDoc = {
  id: number;
  title?: string | null;
  description?: string | null;
  content?: string | null;
  slug?: string | null;
  thumbnail?: { url?: string | null } | number | null;
  createdAt: string;
  updatedAt: string;
};

/** `GET /api/posts/{id}?locale=all` returns localized fields keyed by CMS locale. */
type PayloadPostAllLocalesDoc = {
  id: number;
  title?: Partial<Record<CmsLocale, string | null>> | null;
  slug?: Partial<Record<CmsLocale, string | null>> | null;
};

function usePayloadBaseUrl() {
  const { public: config } = useRuntimeConfig();

  return String(config.payloadBaseURL || "");
}

function payloadPostsUrl(baseUrl: string, path = "") {
  return new URL(`/api/posts${path}`, baseUrl).href;
}

function resolveThumbnailUrl(
  thumbnail: PayloadPostDoc["thumbnail"],
  baseUrl: string,
): string | undefined {
  if (!thumbnail || typeof thumbnail !== "object" || !thumbnail.url) {
    return undefined;
  }

  if (/^https?:\/\//.test(thumbnail.url)) {
    return thumbnail.url;
  }

  return new URL(thumbnail.url, baseUrl).href;
}

function mapPayloadPost(
  doc: PayloadPostDoc,
  locale: string,
  baseUrl: string,
): BlogPost | null {
  // fallback-locale=none returns docs with null localized fields for
  // untranslated locales — drop them defensively.
  if (!doc?.title || !doc.slug) {
    return null;
  }

  const content = doc.content ?? "";

  return {
    id: doc.id,
    title: doc.title,
    slug: doc.slug,
    description: doc.description ?? "",
    content,
    image: resolveThumbnailUrl(doc.thumbnail, baseUrl),
    datePublished: doc.createdAt,
    dateUpdated: doc.updatedAt,
    author: "Maxco",
    tags: [],
    locale: toContentLocale(locale),
    readingTimeMinutes: estimateReadingTimeMinutes(content),
    faq: parseBlogFaq(content),
  };
}

/** $fetch wrapper: any thrown error (network, timeout, non-2xx) becomes a BlogUpstreamError. */
async function payloadFetch<T>(
  url: string,
  query: Record<string, string | number>,
): Promise<T> {
  try {
    return await $fetch<T>(url, { query, timeout: 10_000 });
  } catch (error) {
    throw new BlogUpstreamError(`Blog CMS request failed: ${url}`, {
      cause: error,
    });
  }
}

/** List queries must return a docs array — anything else is a malformed upstream response. */
function assertDocsArray<T>(
  response: { docs?: T[] } | null | undefined,
  context: string,
): T[] {
  if (!response || !Array.isArray(response.docs)) {
    throw new BlogUpstreamError(
      `Blog CMS returned a malformed response (missing docs array): ${context}`,
    );
  }

  return response.docs;
}

async function fetchPublishedPosts(locale: string): Promise<BlogPost[]> {
  const baseUrl = usePayloadBaseUrl();

  const response = await payloadFetch<{ docs?: PayloadPostDoc[] }>(
    payloadPostsUrl(baseUrl),
    {
      locale: toCmsLocale(locale),
      "fallback-locale": "none",
      limit: 100,
      sort: "-createdAt",
      depth: 1,
    },
  );

  return assertDocsArray(response, `posts list (${locale})`)
    .map((doc) => mapPayloadPost(doc, locale, baseUrl))
    .filter((post): post is BlogPost => post !== null);
}

export async function fetchBlogPostsPage(locale: string, page: number) {
  const published = await fetchPublishedPosts(locale);
  const start = (page - 1) * BLOG_POSTS_PER_PAGE;
  const docs = published.slice(start, start + BLOG_POSTS_PER_PAGE);

  return {
    docs,
    totalDocs: published.length,
    page,
    hasMore: start + BLOG_POSTS_PER_PAGE < published.length,
  } satisfies BlogPostsPage;
}

/** Resolves to null ONLY on a well-formed empty result — upstream failures throw BlogUpstreamError. */
export async function fetchBlogPostBySlug(locale: string, slug: string) {
  const baseUrl = usePayloadBaseUrl();

  const response = await payloadFetch<{ docs?: PayloadPostDoc[] }>(
    payloadPostsUrl(baseUrl),
    {
      locale: toCmsLocale(locale),
      "fallback-locale": "none",
      "where[slug][equals]": slug,
      limit: 1,
      depth: 1,
    },
  );

  const doc = assertDocsArray(response, `post by slug (${locale}/${slug})`)[0];

  return doc ? mapPayloadPost(doc, locale, baseUrl) : null;
}

/**
 * hreflang alternates for a post. Payload slugs are per-locale, so fetch the
 * doc with locale=all and emit only locales where both slug and title exist.
 * Throws BlogUpstreamError on failure — callers decide how to degrade.
 */
export async function fetchBlogPostAlternates(
  postId: number,
): Promise<BlogPostAlternate[]> {
  const baseUrl = usePayloadBaseUrl();

  const doc = await payloadFetch<PayloadPostAllLocalesDoc>(
    payloadPostsUrl(baseUrl, `/${postId}`),
    { locale: "all", depth: 0 },
  );

  return (
    Object.entries(CMS_LOCALE_TO_SITE_LOCALE) as Array<
      [CmsLocale, BlogPostAlternate["locale"]]
    >
  ).flatMap(([cmsLocale, siteLocale]) => {
    const slug = doc?.slug?.[cmsLocale];
    const title = doc?.title?.[cmsLocale];

    return slug && title ? [{ locale: siteLocale, slug }] : [];
  });
}

export async function fetchRelatedBlogPosts(post: BlogPost, limit = 3) {
  const posts = await fetchPublishedPosts(post.locale);

  return posts.filter((entry) => entry.id !== post.id).slice(0, limit);
}

export { BLOG_POSTS_PER_PAGE };

export const BLOG_QUERY_KEYS = {
  root: ["blog"] as const,
  list: (locale: ReturnType<typeof toContentLocale>) =>
    [...BLOG_QUERY_KEYS.root, "list", { locale }] as const,
  post: (params: { locale: ReturnType<typeof toContentLocale>; slug: string }) =>
    [...BLOG_QUERY_KEYS.root, "post", params] as const,
};

export function useContentLocale() {
  const locale = useLocale();

  return computed(() => toContentLocale(locale.value));
}

export function useBlogPostsQuery() {
  const locale = useContentLocale();

  return useInfiniteQuery({
    key: () => BLOG_QUERY_KEYS.list(locale.value),
    initialPageParam: 1,
    query: ({ pageParam }) => fetchBlogPostsPage(locale.value, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : null,
    staleTime: 1000 * 60 * 5,
  });
}

export function useBlogPostQueryWithOptions(
  slug: MaybeRefOrGetter<string | undefined>,
  options: { server?: boolean } = {},
) {
  const locale = useContentLocale();

  return useQuery(() => {
    const resolvedSlug = toValue(slug) ?? "";

    return {
      key: BLOG_QUERY_KEYS.post({ locale: locale.value, slug: resolvedSlug }),
      query: () => fetchBlogPostBySlug(locale.value, resolvedSlug),
      enabled:
        Boolean(resolvedSlug) &&
        (import.meta.client || Boolean(options.server)),
      staleTime: 1000 * 60 * 5,
    };
  });
}

export function flattenBlogPosts(pages: BlogPostsPage[] | undefined) {
  return pages?.flatMap((page) => page.docs) ?? [];
}
