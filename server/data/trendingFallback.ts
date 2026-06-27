import type { FeaturedTrendingItem } from "../utils/featuredTrending";

/** Local posters under public/channels/cinema-fallback/ — used when TMDB is unavailable. */
export const TRENDING_FALLBACK_ITEMS: FeaturedTrendingItem[] = [
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
  {
    title: "Gladiator II",
    posterUrl: "/channels/cinema-fallback/gladiator-2.jpg",
    type: "movie",
  },
];
