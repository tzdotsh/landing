// Hostname allowlist guard for a zero-rebuild domain cutover.
//
// Serves only hosts listed in `validHostnames`; everything else gets 421
// (Misdirected Request). This blocks Host-header injection. It performs NO
// canonical redirect — Cloudflare owns redirects, and redirecting here would
// risk loops. To change the served domains, update VALID_HOSTNAMES + restart.
export default defineEventHandler((event) => {
  // Internal prerender/build requests have no real Host — never gate them.
  if (import.meta.prerender) return;

  const { validHostnames } = useRuntimeConfig(event);

  const allowed = String(validHostnames || "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);

  // Fail open if the allowlist is not configured, so a missing env var can't
  // take the whole app offline.
  if (!allowed.length) return;

  const rawHost =
    getRequestHeader(event, "x-forwarded-host") ||
    getRequestHeader(event, "host") ||
    "";

  // x-forwarded-host may carry a comma-separated proxy chain — take the first,
  // strip any port, lowercase for a case-insensitive match.
  const host = rawHost.split(",")[0]?.trim().split(":")[0]?.toLowerCase() ?? "";

  if (!host || !allowed.includes(host)) {
    throw createError({
      statusCode: 421,
      statusMessage: "Misdirected Request",
      message: "This host is not served by this application.",
    });
  }
});
