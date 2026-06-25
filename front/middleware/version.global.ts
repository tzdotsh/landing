export default defineNuxtRouteMiddleware((to) => {
  const config = useRuntimeConfig();
  const activeVersion = config.public.activeVersion;
  const localePath = useLocalePath();

  // Skip middleware for certain routes (static assets, API routes, etc.)
  if (
    to.path.startsWith("/_") ||
    to.path.startsWith("/api") ||
    to.path.startsWith("/img") ||
    to.path.startsWith("/video") ||
    to.path.includes(".") ||
    !activeVersion
  ) {
    return;
  }

  // Extract locale and version from the route path
  // Pattern: /locale/vX/... or /vX/... or /locale/... or /
  const localeMatch = to.path.match(/^\/(en-en|es-es)/);
  const locale = localeMatch?.[1] || null;

  // Get the path after the locale (if present)
  const pathAfterLocale = locale
    ? to.path.substring(locale.length + 1)
    : to.path;

  // Extract version from the remaining path
  const versionMatch = pathAfterLocale.match(/^\/v(\d+)/);
  const routeVersion = versionMatch?.[1] ? parseInt(versionMatch[1]) : null;

  // If route doesn't have a version prefix, redirect to the active version
  if (!routeVersion) {
    const localePrefix = locale ? `/${locale}` : "";
    const pathSuffix =
      pathAfterLocale === "/" || pathAfterLocale === "" ? "" : pathAfterLocale;
    const newPath = `${localePrefix}/v${activeVersion}${pathSuffix}`;
    return navigateTo(localePath(newPath), { redirectCode: 301 });
  }

  // If route has a version prefix, verify it matches the active version
  if (routeVersion !== activeVersion) {
    // Replace the version in the path with the active version
    const localePrefix = locale ? `/${locale}` : "";
    const newPathAfterLocale = pathAfterLocale.replace(
      /^\/v\d+/,
      `/v${activeVersion}`,
    );
    const newPath = `${localePrefix}${newPathAfterLocale}`;
    return navigateTo(localePath(newPath), { redirectCode: 301 });
  }

  // Version matches, continue normally
});
