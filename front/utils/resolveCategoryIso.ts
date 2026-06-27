/** Non-standard region codes → ISO 3166-1 alpha-2 for flagcdn.com */
const ISO_ALIASES: Record<string, string> = {
  UK: "GB",
  EN: "GB",
  SCT: "GB",
};

export function normalizeIsoCode(code: string): string {
  const upper = code.toUpperCase();

  if (upper.startsWith("GB-")) {
    return "GB";
  }

  return ISO_ALIASES[upper] ?? upper;
}

/** Irish IPTV groups use the "IR" prefix — not ISO Iran (IR). */
function resolveIrPrefix(name: string): string {
  const lower = name.toLowerCase();

  if (lower.includes("iran")) {
    return "IR";
  }

  return "IE";
}

function extractPipePrefixIso(name: string): string | undefined {
  const match = name.match(/^([a-z]{2,3})\s*\|/i);

  if (!match?.[1]) {
    return undefined;
  }

  const code = match[1].toUpperCase();

  if (code === "IR") {
    return resolveIrPrefix(name);
  }

  if (code === "VIP" || code === "LA") {
    return undefined;
  }

  return normalizeIsoCode(code);
}

/** Resolve a flag ISO code from API category data (pipe prefix, alias, or existing iso). */
export function resolveCategoryIso(category: {
  name: string;
  iso?: string;
}): string | undefined {
  if (category.iso) {
    return normalizeIsoCode(category.iso);
  }

  return extractPipePrefixIso(category.name);
}
