type LinkInput = { path?: string; name: string };

/**
 * Landing shadow of tv-layout's formatter. Shared layout components still
 * construct `/v{activeVersion}/…` marketing links; strip that obsolete public
 * segment here while preserving checkout/dashboard sibling-app paths.
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

      const baseName = route.name.split("_").at(0);
      return baseName ? [[baseName, route.name] as const] : [];
    }),
  );

  return function formatLink<T extends LinkInput>(link: T) {
    const localizedName = `${link.name}___${locale.value}`;
    const isInternal =
      internalRouteNames.has(link.name) ||
      internalRouteNames.has(localizedName);
    const routeName = getRoutes().some((route) => route.name === localizedName)
      ? localizedName
      : internalRouteNames.get(link.name) ?? link.name;
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

    return { ...link, name: routeName, path, isInternal };
  };
}
