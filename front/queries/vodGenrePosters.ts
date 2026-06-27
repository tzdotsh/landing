export type VodGenrePoster = {
  id: string;
  title: string;
  posterUrl: string;
};

export type VodGenrePostersResponse = {
  posters: VodGenrePoster[];
  source: "cache" | "tmdb" | "fallback";
};

export const VOD_GENRE_POSTERS_QUERY_KEY = "vod-genre-posters";

export function useVodGenrePostersQuery() {
  return useFetch<VodGenrePostersResponse>("/api/vod/genre-posters", {
    key: VOD_GENRE_POSTERS_QUERY_KEY,
    server: false,
    default: () => ({
      posters: [],
      source: "fallback" as const,
    }),
  });
}
