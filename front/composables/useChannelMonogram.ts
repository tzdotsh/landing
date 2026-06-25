export function formatChannelDisplayName(name: string) {
  return (
    name
      .split("(")[0]
      ?.replace(/\s*(FHD|HD|4K|UHD)\s*$/i, "")
      .trim()
      .slice(0, 36) ?? name
  );
}

export function getChannelMonogram(name: string) {
  const displayName = formatChannelDisplayName(name);

  const words = displayName
    .split(/\s+/)
    .map((part) => part.replace(/[^A-Za-z0-9&+]/g, ""))
    .filter(Boolean);

  if (words.length >= 2) {
    return `${words[0]!.charAt(0)}${words[1]!.charAt(0)}`.toUpperCase();
  }

  return displayName.replace(/[^A-Za-z0-9&+]/g, "").slice(0, 2).toUpperCase();
}

export function getLogoHost(logo: string | null | undefined) {
  if (!logo) return null;

  try {
    return new URL(logo).hostname;
  } catch {
    return null;
  }
}
