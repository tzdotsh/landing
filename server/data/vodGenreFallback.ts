/** Curated poster art when TMDB discover is unavailable. */
export const VOD_GENRE_FALLBACK_POSTERS: Record<
  string,
  { title: string; posterUrl: string }
> = {
  movies: {
    title: "Gladiator II",
    posterUrl: "/channels/cinema-fallback/gladiator-2.jpg",
  },
  tv_series: {
    title: "The Bear",
    posterUrl: "/channels/cinema-fallback/the-bear.jpg",
  },
  box_sets: {
    title: "Shōgun",
    posterUrl: "/channels/cinema-fallback/shogun.jpg",
  },
  kids: {
    title: "Inside Out 2",
    posterUrl: "/vod/kids.jpg",
  },
  documentaries: {
    title: "Michael",
    posterUrl: "/channels/cinema-fallback/michael.jpg",
  },
  action_thrillers: {
    title: "Dune: Part Two",
    posterUrl: "/channels/cinema-fallback/dune-2.jpg",
  },
  comedy: {
    title: "Fallout",
    posterUrl: "/channels/cinema-fallback/fallout.jpg",
  },
  international: {
    title: "Squid Game",
    posterUrl: "/vod/international.jpg",
  },
};
