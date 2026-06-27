import type { FeaturedTrendingItem } from "../utils/featuredTrending";

/** Local TMDB-sourced posters — used when the API is unavailable. */
export const TRENDING_FALLBACK_MOVIES: FeaturedTrendingItem[] = [
  {
    title: "Michael",
    posterUrl: "/channels/cinema-fallback/michael.jpg",
    type: "movie",
  },
  {
    title: "Dune: Part Two",
    posterUrl: "/channels/cinema-fallback/dune-2.jpg",
    type: "movie",
  },
  {
    title: "Gladiator II",
    posterUrl: "/channels/cinema-fallback/gladiator-2.jpg",
    type: "movie",
  },
];

export const TRENDING_FALLBACK_SERIES: FeaturedTrendingItem[] = [
  {
    title: "The Bear",
    posterUrl: "/channels/cinema-fallback/the-bear.jpg",
    type: "tv",
  },
  {
    title: "Shōgun",
    posterUrl: "/channels/cinema-fallback/shogun.jpg",
    type: "tv",
  },
  {
    title: "Fallout",
    posterUrl: "/channels/cinema-fallback/fallout.jpg",
    type: "tv",
  },
];

/** @deprecated Use TRENDING_FALLBACK_MOVIES + TRENDING_FALLBACK_SERIES */
export const TRENDING_FALLBACK_ITEMS: FeaturedTrendingItem[] = [
  ...TRENDING_FALLBACK_MOVIES,
  ...TRENDING_FALLBACK_SERIES,
];
