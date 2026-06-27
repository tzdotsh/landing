export type FeaturedTrendingItem = {
  title: string;
  posterUrl: string;
  type: "movie" | "tv";
};

export type FeaturedTrendingResponse = {
  movies: FeaturedTrendingItem[];
  series: FeaturedTrendingItem[];
  items: FeaturedTrendingItem[];
  source: "cache" | "tmdb" | "fallback";
};

export const FEATURED_TRENDING_QUERY_KEY = "featured-trending";

export function useFeaturedTrendingQuery() {
  return useFetch<FeaturedTrendingResponse>("/api/featured/trending", {
    key: FEATURED_TRENDING_QUERY_KEY,
    default: () => ({
      movies: [],
      series: [],
      items: [],
      source: "fallback" as const,
    }),
  });
}
