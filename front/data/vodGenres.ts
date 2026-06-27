import { tmdbPosterSrc } from "~/data/tmdbPosters";

export type VodGenreTile = {
  id: string;
  label: string;
  /** TMDB poster id in public/tmdb/high (1–48 movies, 49–68 TV). */
  posterId: string;
  /** Optional subtitle (e.g. International examples). */
  subtitle?: string;
};

/** VOD genre tiles — posterId maps to the home collection TMDB art. */
export const VOD_GENRE_TILES: VodGenreTile[] = [
  { id: "movies", label: "Movies", posterId: "1" },
  { id: "tv_series", label: "TV Series", posterId: "49" },
  { id: "box_sets", label: "Box Sets", posterId: "52" },
  { id: "kids", label: "Kids & Family", posterId: "8" },
  { id: "documentaries", label: "Documentaries", posterId: "18" },
  { id: "action_thrillers", label: "Action & Thrillers", posterId: "4" },
  { id: "comedy", label: "Comedy", posterId: "11" },
  { id: "international", label: "International", posterId: "63", subtitle: "Bollywood, Turkish dramas, Anime" },
];

export function vodGenrePosterSrc(tile: VodGenreTile) {
  return tmdbPosterSrc(tile.posterId);
}

export const VOD_OG_IMAGE = "/vod/og.jpg";

/** Placeholder until catalogue size is confirmed with product. */
export const VOD_LIBRARY_SIZE_PLACEHOLDER = "[CONFIRM library size]";
