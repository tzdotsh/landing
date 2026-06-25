import type { RouteLocationNormalizedGeneric } from "vue-router";

export default function (route: RouteLocationNormalizedGeneric) {
  const version = route.params.version;

  return (
    !version ||
    (typeof version === "string" &&
      version.startsWith("-") &&
      isInteger(version.substring(1)))
  );
}
