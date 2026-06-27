function titleCase(value: string): string {
  return value.replace(/\b([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

/** Uppercase ISO-like tokens (uk → UK, pk / ind → PK / IND). */
function uppercaseIsoTokens(value: string): string {
  return value.replace(/\b([a-z]{2,3})\b/g, (token) => token.toUpperCase());
}

/** Display name for channel categories from the channels API. */
export function formatChannelCategoryName(name: string): string {
  if (name.includes("|")) {
    const [region, ...rest] = name.split(/\s*\|\s*/);
    const regionLabel = region?.trim() ?? "";
    const formattedRegion = /^[a-z]{2,3}$/i.test(regionLabel)
      ? regionLabel.toUpperCase()
      : uppercaseIsoTokens(titleCase(regionLabel));

    return `${formattedRegion} | ${titleCase(rest.join(" | "))}`;
  }

  if (name.includes("-")) {
    const [left, ...rest] = name.split(/\s*-\s*/);
    const leftLabel = left?.trim() ?? "";
    const formattedLeft = uppercaseIsoTokens(titleCase(leftLabel));

    return `${formattedLeft} - ${uppercaseIsoTokens(titleCase(rest.join(" - ")))}`;
  }

  return uppercaseIsoTokens(titleCase(name));
}
