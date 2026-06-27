import { TRENDING_FALLBACK_ITEMS } from "../data/trendingFallback";

export type FeaturedTrendingItem = {
  title: string;
  posterUrl: string;
  type: "movie" | "tv";
};

type TmdbTrendingResult = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  vote_count?: number;
  popularity?: number;
};

type TmdbTrendingResponse = {
  results: TmdbTrendingResult[];
};

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const CACHE_KEY = "featured:trending";
const CACHE_TTL_SECONDS = 60 * 60 * 12; // 12 hours
const MIN_VOTE_COUNT = 200;
const MIN_POPULARITY = 15;
const RESULT_LIMIT = 18;

function toPosterUrl(posterPath: string) {
  return `${TMDB_IMAGE_BASE}${posterPath}`;
}

function mapTrendingItem(
  item: TmdbTrendingResult,
  type: FeaturedTrendingItem["type"],
): FeaturedTrendingItem | null {
  if (!item.poster_path) {
    return null;
  }

  const voteCount = item.vote_count ?? 0;
  const popularity = item.popularity ?? 0;

  if (voteCount < MIN_VOTE_COUNT && popularity < MIN_POPULARITY) {
    return null;
  }

  const title = (type === "movie" ? item.title : item.name)?.trim();

  if (!title) {
    return null;
  }

  return {
    title,
    posterUrl: toPosterUrl(item.poster_path),
    type,
  };
}

async function fetchTrendingPage(
  apiKey: string,
  path: string,
): Promise<TmdbTrendingResult[]> {
  const response = await fetch(`https://api.themoviedb.org/3${path}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `TMDB request failed (${path}): ${response.status} ${response.statusText}`,
    );
  }

  const data = (await response.json()) as TmdbTrendingResponse;
  return data.results ?? [];
}

export async function fetchFeaturedTrending(
  apiKey: string | undefined,
): Promise<{ items: FeaturedTrendingItem[]; usedFallback: boolean }> {
  if (!apiKey) {
    return { items: [...TRENDING_FALLBACK_ITEMS], usedFallback: true };
  }

  try {
    const [movies, series] = await Promise.all([
      fetchTrendingPage(apiKey, "/trending/movie/week?language=en-US"),
      fetchTrendingPage(apiKey, "/trending/tv/week?language=en-US"),
    ]);

    const merged = [
      ...movies.map((item) => mapTrendingItem(item, "movie")),
      ...series.map((item) => mapTrendingItem(item, "tv")),
    ].filter((item): item is FeaturedTrendingItem => item !== null);

    const deduped = [
      ...new Map(merged.map((item) => [item.posterUrl, item])).values(),
    ].slice(0, RESULT_LIMIT);

    if (!deduped.length) {
      return { items: [...TRENDING_FALLBACK_ITEMS], usedFallback: true };
    }

    return { items: deduped, usedFallback: false };
  } catch {
    return { items: [...TRENDING_FALLBACK_ITEMS], usedFallback: true };
  }
}

export async function getCachedFeaturedTrending(
  apiKey: string | undefined,
): Promise<{ items: FeaturedTrendingItem[]; source: "cache" | "tmdb" | "fallback" }> {
  const storage = useStorage("cache");

  try {
    const cached = await storage.getItem<FeaturedTrendingItem[]>(CACHE_KEY);

    if (cached?.length) {
      return { items: cached, source: "cache" };
    }
  } catch {
    // Redis unavailable — fetch directly.
  }

  const { items, usedFallback } = await fetchFeaturedTrending(apiKey);

  try {
    await storage.setItem(CACHE_KEY, items, { ttl: CACHE_TTL_SECONDS });
  } catch {
    // Ignore cache write failures.
  }

  return { items, source: usedFallback ? "fallback" : "tmdb" };
}
