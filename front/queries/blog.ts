import { defineQueryOptions, useInfiniteQuery, useQuery } from "@pinia/colada";
import { computed, toValue, type MaybeRefOrGetter } from "vue";

export type ExtendedPost = Post & {
  content: string;
};

type ContentLocale = "en" | "es";

const BLOG_POSTS_PER_PAGE = 12;

const POST_LIST_SELECT = {
  id: true,
  title: true,
  slug: true,
  thumbnail: true,
  description: true,
  createdAt: true,
  updatedAt: true,
} as const;

const POST_SELECT = {
  ...POST_LIST_SELECT,
  content: true,
} as const;

function toContentLocale(locale: string): ContentLocale {
  return locale.startsWith("es") ? "es" : "en";
}

function useContentLocale() {
  const locale = useLocale();

  return computed(() => toContentLocale(locale.value));
}

async function fetchBlogPostsPage(locale: ContentLocale, page: number) {
  const payload = usePayload();

  return payload.find({
    collection: "posts",
    limit: BLOG_POSTS_PER_PAGE,
    page,
    depth: 1,
    locale,
    select: POST_LIST_SELECT,
    sort: "-createdAt",
  });
}

export type BlogPostsPage = Awaited<ReturnType<typeof fetchBlogPostsPage>>;

export const BLOG_QUERY_KEYS = {
  root: ["blog"] as const,
  list: (locale: ContentLocale) =>
    [...BLOG_QUERY_KEYS.root, "list", { locale }] as const,
  post: (params: { locale: ContentLocale; slug: string }) =>
    [...BLOG_QUERY_KEYS.root, "post", params] as const,
};

export const blogPostQuery = defineQueryOptions(
  ({ locale, slug }: { locale: ContentLocale; slug: string }) => ({
    key: BLOG_QUERY_KEYS.post({ locale, slug }),
    query: async () => {
      const payload = usePayload();
      const result = await payload.find({
        collection: "posts",
        locale,
        where: {
          slug: {
            equals: slug,
          },
        },
        depth: 2,
        select: POST_SELECT,
      });

      return (result.docs?.[0] as ExtendedPost | undefined) ?? null;
    },
    staleTime: 1000 * 60 * 5,
  }),
);

export function useBlogPostsQuery() {
  const locale = useContentLocale();

  return useInfiniteQuery({
    key: () => BLOG_QUERY_KEYS.list(locale.value),
    enabled: import.meta.client,
    initialPageParam: 1,
    query: ({ pageParam }) => fetchBlogPostsPage(locale.value, pageParam),
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const loadedPosts = allPages.reduce(
        (count, page) => count + (page.docs?.length ?? 0),
        0,
      );

      return loadedPosts < (lastPage.totalDocs ?? 0) ? lastPageParam + 1 : null;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useBlogPostQuery(slug: MaybeRefOrGetter<string | undefined>) {
  return useBlogPostQueryWithOptions(slug);
}

export function useBlogPostQueryWithOptions(
  slug: MaybeRefOrGetter<string | undefined>,
  options: {
    server?: boolean;
  } = {},
) {
  const locale = useContentLocale();

  return useQuery(() => {
    const resolvedSlug = toValue(slug) ?? "";

    return {
      ...blogPostQuery({ locale: locale.value, slug: resolvedSlug }),
      enabled:
        Boolean(resolvedSlug) &&
        (import.meta.client || Boolean(options.server)),
    };
  });
}

export function flattenBlogPosts(pages: BlogPostsPage[] | undefined) {
  return pages?.flatMap((page) => (page.docs ?? []) as Post[]) ?? [];
}

export { BLOG_POSTS_PER_PAGE };
