/** TMDB poster IDs in public/tmdb/high — 1–48 movies, 49–68 TV (see scripts/update-tmdb-images.ts). */
export const TMDB_MOVIE_POSTER_IDS = Array.from({ length: 48 }, (_, index) =>
  String(index + 1),
);

export const TMDB_SERIES_POSTER_IDS = Array.from({ length: 20 }, (_, index) =>
  String(index + 49),
);

/** Home collection — two mixed rows for visual density. */
export const TMDB_COLLECTION_ROW1_IDS = TMDB_MOVIE_POSTER_IDS.slice(0, 34);

export const TMDB_COLLECTION_ROW2_IDS = [
  ...TMDB_MOVIE_POSTER_IDS.slice(34),
  ...TMDB_SERIES_POSTER_IDS,
];

export function tmdbPosterSrc(id: string) {
  return `/tmdb/high/${id}@2x.webp`;
}

export function tmdbPosterSrcset(id: string) {
  return `/tmdb/high/${id}@1x.webp 1x, /tmdb/high/${id}@2x.webp 2x`;
}

/** Edge fade mask — matches home collection / catalog marquees. */
export const MARQUEE_EDGE_MASK =
  "[mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]";

export const POSTER_MARQUEE_CARD_CLASS =
  "border-line bg-panel group relative mx-1.5 w-[150px] shrink-0 overflow-hidden rounded-card border aspect-[2/3] transition-[border-color,transform,box-shadow] duration-300 ease-[var(--ease-brand)] hover:-translate-y-2 hover:scale-[1.04] hover:border-line-2 hover:z-10 hover:shadow-[0_0_0_1px_var(--color-glow),0_12px_40px_rgba(0,0,0,0.35)] md:mx-2";
