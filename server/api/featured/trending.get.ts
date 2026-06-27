import { getCachedFeaturedTrending } from "../../utils/featuredTrending";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const apiKey =
    config.tmdbApiKey ||
    process.env.TMDB_API_KEY ||
    process.env.NUXT_TMDB_API_KEY;

  const { items, source } = await getCachedFeaturedTrending(apiKey);

  setResponseHeader(
    event,
    "Cache-Control",
    "public, max-age=3600, s-maxage=3600, stale-while-revalidate=43200",
  );

  return {
    items,
    source,
  };
});
