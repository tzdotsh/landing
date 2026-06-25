import { defineQueryOptions, useInfiniteQuery, useQuery } from "@pinia/colada";

import { useChannelsFilters } from "~/composables/useChannelsFilters";

type ChannelsSearchResponse = Awaited<
  ReturnType<typeof $fetch<unknown, "/api/channels/search">>
>;

export type Channels = ChannelsSearchResponse["data"];

export type Categories = Awaited<
  ReturnType<typeof $fetch<unknown, "/api/channels/categories">>
>;

export type HomeChannelPreview = {
  id: number;
  name: string;
  logo: string | null;
};

export type ChannelSearchFilters = {
  query: string;
  category: number | null;
};

export type ChannelCategoriesSearchFilters = {
  query: string;
};

export const CHANNELS_QUERY_KEYS = {
  root: ["channels"] as const,
  catalog: () => [...CHANNELS_QUERY_KEYS.root, "catalog"] as const,
  live: () => [...CHANNELS_QUERY_KEYS.root, "live"] as const,
  categories: () => [...CHANNELS_QUERY_KEYS.root, "categories"] as const,
  search: (filters: ChannelSearchFilters) =>
    [...CHANNELS_QUERY_KEYS.root, "search", filters] as const,
  searchCategories: (filters: ChannelCategoriesSearchFilters) =>
    [...CHANNELS_QUERY_KEYS.root, "search-categories", filters] as const,
};

export const channelsCategoriesQuery = defineQueryOptions({
  key: CHANNELS_QUERY_KEYS.categories(),
  query: () => $fetch("/api/channels/categories"),
  staleTime: 1000 * 60 * 60,
});

export function useChannelsCategoriesQuery() {
  return useQuery(() => ({
    ...channelsCategoriesQuery,
    enabled: import.meta.client,
  }));
}

export function useChannelsSearchQuery() {
  const { debouncedSearch, selectedCategory } = useChannelsFilters();

  return useInfiniteQuery({
    key: () =>
      CHANNELS_QUERY_KEYS.search({
        query: debouncedSearch.value.trim(),
        category: selectedCategory.value ?? null,
      }),
    enabled: import.meta.client,
    initialPageParam: 1,
    query: ({ pageParam, signal }) =>
      $fetch("/api/channels/search", {
        params: {
          q: debouncedSearch.value.trim() || undefined,
          category: selectedCategory.value || undefined,
          page: pageParam,
          limit: 50,
        },
        signal,
      }),
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.hasMore ? lastPageParam + 1 : null,
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
  });
}

export function useChannelsSearchCategoriesQuery() {
  const { debouncedSearch } = useChannelsFilters();

  return useInfiniteQuery({
    key: () =>
      CHANNELS_QUERY_KEYS.searchCategories({
        query: debouncedSearch.value.trim(),
      }),
    enabled: import.meta.client && Boolean(debouncedSearch.value.trim()),
    initialPageParam: 1,
    query: ({ pageParam, signal }) =>
      $fetch("/api/channels/search", {
        params: {
          q: debouncedSearch.value.trim() || undefined,
          page: pageParam,
          limit: 50,
        },
        signal,
      }),
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.hasMore ? lastPageParam + 1 : null,
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
  });
}

export function flattenChannels(
  pages: ChannelsSearchResponse[] | undefined,
): NonNullable<Channels> {
  return pages?.flatMap((page) => page.data ?? []) ?? [];
}

export function filterCategoriesByChannels(
  categories: Categories | undefined,
  channels: Channels | undefined,
): NonNullable<Categories> {
  if (!categories?.length || !channels?.length) {
    return [];
  }

  const categoryIds = new Set(channels.map((channel) => channel.cat_id));

  return categories.filter((category) => categoryIds.has(category.id));
}

export function getCategoriesLookup(categories: Categories | undefined) {
  return [...(categories ?? [])]
    .sort((firstCategory, secondCategory) => {
      const firstIsSpanish = firstCategory.iso === "ES";
      const secondIsSpanish = secondCategory.iso === "ES";

      if (firstIsSpanish && !secondIsSpanish) {
        return -1;
      }

      if (!firstIsSpanish && secondIsSpanish) {
        return 1;
      }

      return 0;
    })
    .reduce(
      (lookup, category) => {
        lookup[category.id] = category;
        return lookup;
      },
      {} as Record<string, Categories[number]>,
    );
}
