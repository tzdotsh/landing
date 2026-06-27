export type FeaturedTrendingItem = {
  title: string;
  posterUrl: string;
  type: "movie" | "tv";
};

export type FeaturedTrendingResponse = {
  items: FeaturedTrendingItem[];
  source: "cache" | "tmdb" | "fallback";
};

export const FEATURED_TRENDING_QUERY_KEY = "featured-trending";

export function useFeaturedTrendingQuery() {
  return useFetch<FeaturedTrendingResponse>("/api/featured/trending", {
    key: FEATURED_TRENDING_QUERY_KEY,
    default: () => ({
      items: [],
      source: "fallback" as const,
    }),
  });
}
