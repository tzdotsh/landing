import { useInfiniteQuery, useQuery } from "@pinia/colada";
import { computed, toValue, type MaybeRefOrGetter } from "vue";

import {
  BLOG_POSTS_PER_PAGE,
  isPublishedBlogPost,
  resolveBlogSlug,
  sortBlogPostsNewestFirst,
  toContentLocale,
  withReadingTime,
  type BlogPost,
} from "~/utils/blog";

export type BlogPostsPage = {
  docs: BlogPost[];
  totalDocs: number;
  page: number;
  hasMore: boolean;
};

async function fetchPublishedPosts(locale: string) {
  const posts = await queryCollection("blog").all();

  return sortBlogPostsNewestFirst(
    posts.filter((post) => isPublishedBlogPost(post, locale)),
  ).map(withReadingTime);
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

export async function fetchBlogPostBySlug(locale: string, slug: string) {
  const posts = await queryCollection("blog").all();
  const match = posts.find(
    (post) =>
      resolveBlogSlug(post) === slug && isPublishedBlogPost(post, locale),
  );

  return match ? withReadingTime(match) : null;
}

export async function fetchBlogPostAlternates(slug: string) {
  const posts = await queryCollection("blog").all();

  return posts.filter(
    (post) => resolveBlogSlug(post) === slug && !post.draft,
  );
}

export async function fetchRelatedBlogPosts(
  post: BlogPost,
  limit = 3,
) {
  const posts = await fetchPublishedPosts(post.locale);
  const currentSlug = resolveBlogSlug(post);

  const scored = posts
    .filter((entry) => resolveBlogSlug(entry) !== currentSlug)
    .map((entry) => {
      let score = 0;

      if (entry.category && entry.category === post.category) {
        score += 3;
      }

      const sharedTags = entry.tags.filter((tag) => post.tags.includes(tag));
      score += sharedTags.length;

      return { entry, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return (
        new Date(b.entry.datePublished).getTime() -
        new Date(a.entry.datePublished).getTime()
      );
    });

  if (scored.length >= limit) {
    return scored.slice(0, limit).map(({ entry }) => entry);
  }

  const fallback = posts
    .filter(
      (entry) =>
        resolveBlogSlug(entry) !== currentSlug &&
        !scored.some(({ entry: scoredEntry }) => scoredEntry.id === entry.id),
    )
    .slice(0, limit - scored.length);

  return [...scored.map(({ entry }) => entry), ...fallback];
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
