export type VodGenreTile = {
  id: string;
  label: string;
  image: string;
  /** Optional subtitle (e.g. International examples). */
  subtitle?: string;
};

/** VOD genre tiles — edit labels/images in public/vod/ without touching markup. */
export const VOD_GENRE_TILES: VodGenreTile[] = [
  { id: "movies", label: "Movies", image: "/vod/movies.jpg" },
  { id: "tv_series", label: "TV Series", image: "/vod/tv-series.jpg" },
  { id: "box_sets", label: "Box Sets", image: "/vod/box-sets.jpg" },
  { id: "kids", label: "Kids & Family", image: "/vod/kids.jpg" },
  {
    id: "documentaries",
    label: "Documentaries",
    image: "/vod/documentaries.jpg",
  },
  {
    id: "action_thrillers",
    label: "Action & Thrillers",
    image: "/vod/action.jpg",
  },
  { id: "comedy", label: "Comedy", image: "/vod/comedy.jpg" },
  {
    id: "international",
    label: "International",
    subtitle: "Bollywood, Turkish dramas, Anime",
    image: "/vod/international.jpg",
  },
];

export const VOD_OG_IMAGE = "/vod/og.jpg";

/** Placeholder until catalogue size is confirmed with product. */
export const VOD_LIBRARY_SIZE_PLACEHOLDER = "[CONFIRM library size]";
