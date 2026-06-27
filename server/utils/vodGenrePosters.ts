import { VOD_GENRE_FALLBACK_POSTERS } from "../data/vodGenreFallback";
import { tmdbFetch, tmdbPosterUrl } from "./tmdb";

export type VodGenrePoster = {
  id: string;
  title: string;
  posterUrl: string;
};

export type VodGenrePostersPayload = {
  posters: VodGenrePoster[];
  source: "cache" | "tmdb" | "fallback";
};

type TmdbDiscoverResult = {
  title?: string;
  name?: string;
  poster_path: string | null;
};

type TmdbDiscoverResponse = {
  results: TmdbDiscoverResult[];
};

/** TMDB discover paths — one popular poster per VOD genre tile. */
const VOD_GENRE_DISCOVER: Record<string, string> = {
  movies: "/discover/movie?sort_by=popularity.desc&language=en-US&page=1",
  tv_series: "/discover/tv?sort_by=popularity.desc&language=en-US&page=1",
  box_sets:
    "/discover/tv?sort_by=vote_count.desc&language=en-US&with_type=2&page=1",
  kids: "/discover/movie?with_genres=10751&sort_by=popularity.desc&language=en-US&page=1",
  documentaries:
    "/discover/movie?with_genres=99&sort_by=popularity.desc&language=en-US&page=1",
  action_thrillers:
    "/discover/movie?with_genres=28,53&sort_by=popularity.desc&language=en-US&page=1",
  comedy:
    "/discover/movie?with_genres=35&sort_by=popularity.desc&language=en-US&page=1",
  international:
    "/discover/tv?with_origin_country=IN|KR|JP&sort_by=popularity.desc&language=en-US&page=1",
};

const CACHE_KEY = "vod:genre-posters:v1";
const CACHE_TTL_SECONDS = 60 * 60 * 24;

function pickPoster(
  id: string,
  results: TmdbDiscoverResult[],
): VodGenrePoster | null {
  for (const item of results) {
    if (!item.poster_path) continue;

    const title = (item.title ?? item.name)?.trim();
    if (!title) continue;

    return {
      id,
      title,
      posterUrl: tmdbPosterUrl(item.poster_path),
    };
  }

  return null;
}

async function fetchGenrePoster(
  apiKey: string,
  id: string,
  path: string,
): Promise<VodGenrePoster | null> {
  try {
    const data = await tmdbFetch<TmdbDiscoverResponse>(apiKey, path);
    return pickPoster(id, data.results ?? []);
  } catch {
    return null;
  }
}

function fallbackPoster(id: string): VodGenrePoster {
  const entry = VOD_GENRE_FALLBACK_POSTERS[id];

  return {
    id,
    title: entry.title,
    posterUrl: entry.posterUrl,
  };
}

export async function fetchVodGenrePosters(
  apiKey: string | undefined,
): Promise<{ posters: VodGenrePoster[]; usedFallback: boolean }> {
  const ids = Object.keys(VOD_GENRE_DISCOVER);

  if (!apiKey) {
    return {
      posters: ids.map(fallbackPoster),
      usedFallback: true,
    };
  }

  const fetched = await Promise.all(
    ids.map(async (id) => {
      const poster = await fetchGenrePoster(apiKey, id, VOD_GENRE_DISCOVER[id]!);
      return poster ?? fallbackPoster(id);
    }),
  );

  const usedFallback = fetched.every(
    (poster, index) =>
      poster.posterUrl === fallbackPoster(ids[index]!).posterUrl,
  );

  return { posters: fetched, usedFallback };
}

export async function getCachedVodGenrePosters(
  apiKey: string | undefined,
): Promise<VodGenrePostersPayload> {
  const storage = useStorage("cache");

  try {
    const cached = await storage.getItem<VodGenrePoster[]>(CACHE_KEY);

    if (cached?.length) {
      return { posters: cached, source: "cache" };
    }
  } catch {
    // Redis unavailable — fetch directly.
  }

  const { posters, usedFallback } = await fetchVodGenrePosters(apiKey);

  try {
    await storage.setItem(CACHE_KEY, posters, { ttl: CACHE_TTL_SECONDS });
  } catch {
    // Ignore cache write failures.
  }

  return {
    posters,
    source: usedFallback ? "fallback" : "tmdb",
  };
}
