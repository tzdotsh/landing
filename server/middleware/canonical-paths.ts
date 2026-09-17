import { getRequestURL, sendRedirect } from "h3";

const LOCALE_PREFIX = /^\/(en-en|es-es|pt-pt)(?=\/|$)/;
const VERSION_PREFIX = /^\/v\d+(?=\/|$)/;

const LEGACY_PATHS: Record<string, string> = {
  "/affiliates": "/affiliate",
  "/home": "/",
  "/sports": "/iptv-sports",
  "/vod": "/iptv-vod",
};

/**
 * Normalize legacy/versioned marketing URLs before Nuxt routing. This is a
 * real HTTP 301 (not a 200 meta-refresh), preserves locale/query, and avoids
 * redirect chains by resolving directly to the unversioned canonical path.
 */
export default defineEventHandler((event) => {
  const url = getRequestURL(event);
  const pathname = url.pathname;

  if (
    pathname.startsWith("/_") ||
    pathname.startsWith("/api/") ||
    pathname.includes(".")
  ) {
    return;
  }

  const localeMatch = pathname.match(LOCALE_PREFIX);
  const localePrefix = localeMatch?.[0] ?? "";
  let localPath = localePrefix
    ? pathname.slice(localePrefix.length) || "/"
    : pathname;

  const versionMatch = localPath.match(VERSION_PREFIX);
  if (versionMatch) {
    localPath = localPath.slice(versionMatch[0].length) || "/";
  }

  // Normalize old `foo-57` route names as well as permanent aliases.
  localPath = localPath.replace(
    /^\/(affiliates|apps|channels|home|iptv-resellers|iptv-sports|iptv-vod|sports|vod)-\d+\/?$/,
    "/$1",
  );
  localPath = LEGACY_PATHS[localPath.replace(/\/$/, "") || "/"] ?? localPath;

  const normalizedPath =
    `${localePrefix}${localPath === "/" ? "" : localPath}` || "/";

  if (normalizedPath !== pathname) {
    return sendRedirect(
      event,
      `${normalizedPath}${url.search}`,
      301,
    );
  }
});
