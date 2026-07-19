export type BlogFaqItem = {
  question: string;
  answer: string;
};

export type SiteContentLocale = "en-en" | "es-es" | "pt-pt";

/** Payload CMS locale codes for the posts collection. */
export type CmsLocale = "en" | "es" | "pt";

/** Blog post mapped from a Payload CMS `posts` doc into the shape the blog UI consumes. */
export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  description: string;
  /** Raw markdown from Payload's `content` field. */
  content: string;
  /** Absolute thumbnail URL (https://cms.../api/media/file/...). */
  image?: string;
  datePublished: string;
  dateUpdated?: string;
  author: string;
  authorBio?: string;
  tags: string[];
  category?: string;
  locale: SiteContentLocale;
  readingTimeMinutes: number;
  faq: BlogFaqItem[];
};

/** hreflang alternate — Payload slugs are per-locale, so each entry carries its own slug. */
export type BlogPostAlternate = {
  locale: SiteContentLocale;
  slug: string;
};

export const BLOG_POSTS_PER_PAGE = 12;

export const BLOG_DEFAULT_LOCALE = "en-en";

export const CMS_LOCALE_TO_SITE_LOCALE: Record<CmsLocale, SiteContentLocale> = {
  en: "en-en",
  es: "es-es",
  pt: "pt-pt",
};

export function toContentLocale(locale: string): SiteContentLocale {
  if (locale.startsWith("es")) {
    return "es-es";
  }

  if (locale.startsWith("pt")) {
    return "pt-pt";
  }

  return "en-en";
}

/** Map a site locale (en-en / es-es / pt-pt) to the Payload CMS locale code. */
export function toCmsLocale(locale: string): CmsLocale {
  if (locale.startsWith("es")) {
    return "es";
  }

  if (locale.startsWith("pt")) {
    return "pt";
  }

  return "en";
}

export function resolveBlogSlug(post: Pick<BlogPost, "slug">) {
  return post.slug;
}

/** Rough markdown → plain text for word counts and FAQ answers. */
export function markdownToPlainText(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^::[^\n]*$/gm, " ")
    .replace(/[*_~>|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function estimateReadingTimeMinutes(
  markdown: string,
  wordsPerMinute = 220,
) {
  const words = markdownToPlainText(markdown)
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

const FAQ_HEADING_PATTERN =
  /^(faq|faqs|frequently asked questions?|preguntas frecuentes|perguntas frequentes)$/i;

/**
 * Extract a trailing `## FAQ` markdown section (`### question` + answer
 * paragraphs) for FAQPage JSON-LD. Returns [] when the post has no FAQ block.
 */
export function parseBlogFaq(markdown: string): BlogFaqItem[] {
  const lines = markdown.split("\n");

  let faqStart = -1;
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^##\s+(.+?)\s*$/);
    if (match && FAQ_HEADING_PATTERN.test(match[1].trim())) {
      faqStart = i + 1;
    }
  }

  if (faqStart === -1) {
    return [];
  }

  const items: BlogFaqItem[] = [];
  let question = "";
  let answerLines: string[] = [];

  const flush = () => {
    if (question && answerLines.length) {
      const answer = markdownToPlainText(answerLines.join("\n"));
      if (answer) {
        items.push({ question, answer });
      }
    }
    question = "";
    answerLines = [];
  };

  for (let i = faqStart; i < lines.length; i++) {
    const line = lines[i];

    // A following h2 ends the FAQ section.
    if (/^##\s+[^#]/.test(line)) {
      break;
    }

    const questionMatch = line.match(/^###\s+(.+?)\s*$/);
    if (questionMatch) {
      flush();
      question = markdownToPlainText(questionMatch[1]);
      continue;
    }

    if (question) {
      answerLines.push(line);
    }
  }

  flush();

  return items;
}

/** Canonical blog path without /v{version} — used for SEO and sitemap. */
export function blogCanonicalPath(slug: string, locale: string) {
  const normalized = toContentLocale(locale);

  if (normalized === BLOG_DEFAULT_LOCALE) {
    return `/blog/${slug}`;
  }

  return `/${normalized}/blog/${slug}`;
}

export function absoluteBlogUrl(
  siteUrl: string,
  slug: string,
  locale: string,
) {
  const base = siteUrl.replace(/\/$/, "");
  const path = blogCanonicalPath(slug, locale);

  return `${base}${path}`;
}

export function resolveBlogImageUrl(
  image: string | undefined,
  siteUrl: string,
) {
  if (!image) {
    return `${siteUrl.replace(/\/$/, "")}/og-image.webp`;
  }

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return `${siteUrl.replace(/\/$/, "")}${image.startsWith("/") ? image : `/${image}`}`;
}

export function formatBlogDate(
  value: string | Date | undefined,
  locale: string,
) {
  if (!value) {
    return "";
  }

  const dateLocale = locale.startsWith("es")
    ? "es-ES"
    : locale.startsWith("pt")
      ? "pt-PT"
      : "en-GB";

  return new Date(value).toLocaleDateString(dateLocale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
