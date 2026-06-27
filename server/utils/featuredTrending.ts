import {
  TRENDING_FALLBACK_MOVIES,
  TRENDING_FALLBACK_SERIES,
} from "../data/trendingFallback";
import { tmdbFetch, tmdbPosterUrl } from "./tmdb";

export type FeaturedTrendingItem = {
  title: string;
  posterUrl: string;
  type: "movie" | "tv";
};

export type FeaturedTrendingPayload = {
  movies: FeaturedTrendingItem[];
  series: FeaturedTrendingItem[];
  source: "cache" | "tmdb" | "fallback";
};

type TmdbTrendingResult = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
};

type TmdbTrendingResponse = {
  results: TmdbTrendingResult[];
};

const CACHE_KEY = "featured:trending:v3";
const CACHE_TTL_SECONDS = 60 * 60 * 12;
const PER_TYPE_LIMIT = 12;

function dedupeByPoster(items: FeaturedTrendingItem[]) {
  return [...new Map(items.map((item) => [item.posterUrl, item])).values()];
}

function mapTrendingItem(
  item: TmdbTrendingResult,
  type: FeaturedTrendingItem["type"],
): FeaturedTrendingItem | null {
  if (!item.poster_path) {
    return null;
  }

  const title = (type === "movie" ? item.title : item.name)?.trim();

  if (!title) {
    return null;
  }

  return {
    title,
    posterUrl: tmdbPosterUrl(item.poster_path),
    type,
  };
}

function mapTrendingResults(
  results: TmdbTrendingResult[],
  type: FeaturedTrendingItem["type"],
) {
  return dedupeByPoster(
    results
      .map((item) => mapTrendingItem(item, type))
      .filter((item): item is FeaturedTrendingItem => item !== null)
      .slice(0, PER_TYPE_LIMIT),
  );
}

async function fetchTrendingPage(
  apiKey: string,
  path: string,
): Promise<TmdbTrendingResult[]> {
  const data = await tmdbFetch<TmdbTrendingResponse>(apiKey, path);
  return data.results ?? [];
}

export async function fetchFeaturedTrending(
  apiKey: string | undefined,
): Promise<{
  movies: FeaturedTrendingItem[];
  series: FeaturedTrendingItem[];
  usedFallback: boolean;
}> {
  if (!apiKey) {
    return {
      movies: [...TRENDING_FALLBACK_MOVIES],
      series: [...TRENDING_FALLBACK_SERIES],
      usedFallback: true,
    };
  }

  try {
    const [movies, series] = await Promise.all([
      fetchTrendingPage(apiKey, "/trending/movie/week?language=en-US"),
      fetchTrendingPage(apiKey, "/trending/tv/week?language=en-US"),
    ]);

    const movieItems = mapTrendingResults(movies, "movie");
    const seriesItems = mapTrendingResults(series, "tv");

    if (!movieItems.length && !seriesItems.length) {
      return {
        movies: [...TRENDING_FALLBACK_MOVIES],
        series: [...TRENDING_FALLBACK_SERIES],
        usedFallback: true,
      };
    }

    return {
      movies: movieItems.length
        ? movieItems
        : [...TRENDING_FALLBACK_MOVIES],
      series: seriesItems.length
        ? seriesItems
        : [...TRENDING_FALLBACK_SERIES],
      usedFallback: false,
    };
  } catch {
    return {
      movies: [...TRENDING_FALLBACK_MOVIES],
      series: [...TRENDING_FALLBACK_SERIES],
      usedFallback: true,
    };
  }
}

export async function getCachedFeaturedTrending(
  apiKey: string | undefined,
): Promise<FeaturedTrendingPayload> {
  const storage = useStorage("cache");

  try {
    const cached = await storage.getItem<{
      movies: FeaturedTrendingItem[];
      series: FeaturedTrendingItem[];
    }>(CACHE_KEY);

    if (cached?.movies?.length || cached?.series?.length) {
      return { ...cached, source: "cache" };
    }
  } catch {
    // Redis unavailable — fetch directly.
  }

  const { movies, series, usedFallback } = await fetchFeaturedTrending(apiKey);

  try {
    await storage.setItem(CACHE_KEY, { movies, series }, { ttl: CACHE_TTL_SECONDS });
  } catch {
    // Ignore cache write failures.
  }

  return {
    movies,
    series,
    source: usedFallback ? "fallback" : "tmdb",
  };
}
