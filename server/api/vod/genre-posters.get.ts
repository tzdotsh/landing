import { getCachedVodGenrePosters } from "../../utils/vodGenrePosters";
import { resolveTmdbApiKey } from "../../utils/tmdb";

export default defineEventHandler(async (event) => {
  const apiKey = resolveTmdbApiKey(event);
  const { posters, source } = await getCachedVodGenrePosters(apiKey);

  setResponseHeader(
    event,
    "Cache-Control",
    "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
  );

  return { posters, source };
});
