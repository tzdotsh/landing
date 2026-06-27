export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export function tmdbPosterUrl(posterPath: string) {
  return `${TMDB_IMAGE_BASE}${posterPath}`;
}

export async function tmdbFetch<T>(
  apiKey: string,
  path: string,
): Promise<T> {
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

  return (await response.json()) as T;
}

export function resolveTmdbApiKey(event?: { context?: unknown }) {
  const config = event ? useRuntimeConfig(event) : useRuntimeConfig();
  return (
    config.tmdbApiKey ||
    process.env.TMDB_API_KEY ||
    process.env.NUXT_TMDB_API_KEY
  );
}
