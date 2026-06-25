import type { RouteLocationNormalizedGeneric } from "vue-router";

export default function (
  to: RouteLocationNormalizedGeneric,
  path?: "affiliates" | "apps" | "channels" | "home" | "iptv-resellers",
) {
  const localePath = useLocalePath();
  const { public: config } = useRuntimeConfig();
  const { activeVersion } = config;
  const { query } = to;

  const paths = [`v${activeVersion}`];

  if (path) {
    paths.push(path);
  }

  const pathName = paths.join("/");

  return navigateTo(localePath({ path: pathName, query }));
}
