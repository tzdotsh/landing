type LinkInput = { path?: string; name: string };

/**
 * Landing shadow of tv-layout's formatter. The shared shell still sends its
 * historical `vversion-*` route names and `/v{number}` paths, so translate
 * those inputs at the layer boundary without exposing versioning in this app.
 */
export default function useFormatLink() {
  const { getRoutes } = useRouter();
  const { locale } = useI18n();
  const config = useRuntimeConfig();
  const baseUrl = config.app.baseURL;

  const internalRouteNames = new Map(
    getRoutes().flatMap((route) => {
      if (typeof route.name !== "string") {
        return [];
      }

      const baseName = route.name.replace(/___[^_]+$/, "");
      return baseName ? [[baseName, route.name] as const] : [];
    }),
  );

  return function formatLink<T extends LinkInput>(link: T) {
    const unversionedName =
      link.name === "vversion"
        ? "index"
        : link.name.replace(/^vversion-/, "");
    const localizedName = `${unversionedName}___${locale.value}`;
    const isInternal = internalRouteNames.has(unversionedName);
    const routeName = getRoutes().some((route) => route.name === localizedName)
      ? localizedName
      : internalRouteNames.get(unversionedName) ?? unversionedName;
    let path = link.path;

    if (path) {
      path = path.replace(/^\/?v\d+(?=\/|$)/, "") || "/";
      path = path.replace(
        /^\/?(en-en|es-es|pt-pt)\/v\d+(?=\/|$)/,
        "/$1",
      );
    }

    if (isInternal && baseUrl !== "/" && path) {
      path = path.replace(baseUrl, "") || "/";
    }

    return {
      ...link,
      // The inherited footer otherwise forwards its obsolete `version` param
      // when resolving slug-based legal links. A direct path is authoritative.
      slug:
        isInternal && path
          ? undefined
          : (link as T & { slug?: string }).slug,
      name: routeName,
      path,
      isInternal,
    };
  };
}
