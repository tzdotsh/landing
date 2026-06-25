import {
  KB_ARTICLES,
  KB_ARTICLES_BY_SLUG,
  KB_CATEGORIES,
  type KbArticle,
  type KbCategory,
  type KbCategoryId,
} from "~/data/kb-articles";

export type KbCategorySection = KbCategory & {
  articles: KbArticle[];
};

export const KB_DEFAULT_DEVICE: KbCategoryId = "android";

export function getKbDevices(): KbCategory[] {
  return KB_CATEGORIES;
}

export function getKbArticles(): KbArticle[] {
  return KB_ARTICLES;
}

export function getKbArticleBySlug(slug: string): KbArticle | null {
  return KB_ARTICLES_BY_SLUG[slug] ?? null;
}

export function filterKbArticles(
  query: string,
  articles: KbArticle[],
): KbArticle[] {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return articles;
  }

  return articles.filter((article) => {
    const haystack =
      `${article.title} ${article.description ?? ""}`.toLowerCase();
    return haystack.includes(normalized);
  });
}

export function getKbArticlesForDevice(
  deviceId: KbCategoryId,
  articles: KbArticle[] = KB_ARTICLES,
): KbArticle[] {
  return articles
    .filter((article) => article.category === deviceId)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getKbVisibleArticles(
  deviceId: KbCategoryId,
  searchQuery: string,
  articles: KbArticle[] = KB_ARTICLES,
): KbArticle[] {
  const normalized = searchQuery.trim();

  if (normalized) {
    return filterKbArticles(normalized, articles).sort((a, b) =>
      a.title.localeCompare(b.title),
    );
  }

  return getKbArticlesForDevice(deviceId, articles);
}

export function groupKbArticlesByCategory(
  articles: KbArticle[],
): KbCategorySection[] {
  const grouped = new Map<KbCategoryId, KbArticle[]>();

  for (const article of articles) {
    const list = grouped.get(article.category) ?? [];
    list.push(article);
    grouped.set(article.category, list);
  }

  return KB_CATEGORIES.filter((category) => grouped.has(category.id))
    .map((category) => ({
      ...category,
      articles: (grouped.get(category.id) ?? []).sort((a, b) =>
        a.title.localeCompare(b.title),
      ),
    }))
    .sort((a, b) => a.order - b.order);
}

export function resolveKbBodyHtml(
  body: string,
  localePath: (path: string) => string,
  version: string | number,
): string {
  return body.replace(/href="\/help\/([^"]+)"/g, (_, slug: string) => {
    return `href="${localePath(`/v${version}/help/${slug}`)}"`;
  });
}

export function formatKbUpdatedAt(dateStr: string): string | null {
  if (!dateStr) {
    return null;
  }

  const parsed = new Date(dateStr.replace(" ", "T"));

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
  }).format(parsed);
}

export function formatKbViews(views: number): string {
  return new Intl.NumberFormat("en-GB").format(views);
}

export function getKbDeviceLabel(deviceId: KbCategoryId): string {
  return KB_CATEGORIES.find((category) => category.id === deviceId)?.label ?? "";
}
