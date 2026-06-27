export default defineNuxtRouteMiddleware((to) => {
  const { public: config } = useRuntimeConfig();
  const { activeVersion } = config;
  const { query } = to;
  const localePath = useLocalePath();

  // Skip if activeVersion is not configured
  if (!activeVersion) return;

  // Skip if already on new route structure (starts with /v)
  if (to.path.match(/^\/v\d/)) return;

  // Extract locale and path without locale
  // Supported locales: en-en, es-es, pt-pt, de-de (based on your i18n config)
  const defaultLocale = "en-en";
  const localePattern = /^\/(?:en-en|es-es|pt-pt|de-de)(?=\/|$)/;
  const localeMatch = to.path.match(localePattern);
  const locale = localeMatch ? localeMatch[0] : "";
  const pathWithoutLocale = to.path.replace(localePattern, "") || "/";

  // Define old route patterns and their new equivalents
  const oldRoutePatterns = {
    // Root route
    "^/$": "",

    // Named routes with optional version suffix
    "^/affiliates(?:-\\d+)?/?$": "affiliates",
    "^/apps(?:-\\d+)?/?$": "apps",
    "^/channels(?:-\\d+)?/?$": "channels",
    "^/home(?:-\\d+)?/?$": "",
    "^/iptv-resellers(?:-\\d+)?/?$": "iptv-resellers",
    "^/iptv-sports(?:-\\d+)?/?$": "iptv-sports",
    "^/iptv-vod(?:-\\d+)?/?$": "iptv-vod",
    "^/sports(?:-\\d+)?/?$": "iptv-sports",
    "^/vod(?:-\\d+)?/?$": "iptv-vod",
  };

  // Check if path without locale matches any old route pattern
  for (const [pattern, newPath] of Object.entries(oldRoutePatterns)) {
    if (pathWithoutLocale.match(new RegExp(pattern))) {
      // Build the new path: preserve non-default locale + add version + new path
      // Don't add locale prefix if it's the default locale
      const localePrefix =
        locale && locale !== `/${defaultLocale}` ? locale : "";
      let targetPath = localePrefix; // Start with locale prefix (e.g., /es-es or empty)

      if (newPath) {
        targetPath += `/v${activeVersion}/${newPath}`;
      } else {
        targetPath += `/v${activeVersion}`;
      }

      // console.log(`Old route detected: ${to.path} -> ${targetPath}`);

      return navigateTo(
        localePath({
          path: targetPath,
          query,
        }),
        { redirectCode: 301 },
      );
    }
  }
});
