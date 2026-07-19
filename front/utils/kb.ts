import type { GuideCard } from "~/queries/apps";

/** Client-side title search over CMS-backed setup guides (tutorials have no description). */
export function filterGuides(query: string, guides: GuideCard[]): GuideCard[] {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return guides;
  }

  return guides.filter((guide) =>
    guide.title.toLowerCase().includes(normalized),
  );
}

export function sortGuidesByTitle(guides: GuideCard[]): GuideCard[] {
  return [...guides].sort((a, b) => a.title.localeCompare(b.title));
}

/** Guides visible for the current device tab / search box. */
export function getVisibleGuides(
  deviceSlug: string,
  searchQuery: string,
  guides: GuideCard[],
): GuideCard[] {
  if (searchQuery.trim()) {
    return sortGuidesByTitle(filterGuides(searchQuery, guides));
  }

  return sortGuidesByTitle(
    guides.filter((guide) => guide.deviceSlug === deviceSlug),
  );
}

export function formatGuideUpdatedAt(value: string | undefined): string | null {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
  }).format(parsed);
}
