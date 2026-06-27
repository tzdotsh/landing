import { getCachedFeaturedTrending } from "../../utils/featuredTrending";
import { resolveTmdbApiKey } from "../../utils/tmdb";

export default defineEventHandler(async (event) => {
  const apiKey = resolveTmdbApiKey(event);
  const { movies, series, source } = await getCachedFeaturedTrending(apiKey);

  setResponseHeader(
    event,
    "Cache-Control",
    "public, max-age=3600, s-maxage=3600, stale-while-revalidate=43200",
  );

  return {
    movies,
    series,
    /** Combined list kept for backwards compatibility */
    items: [...movies, ...series],
    source,
  };
});
