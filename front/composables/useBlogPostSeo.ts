import {
  absoluteBlogUrl,
  markdownToPlainText,
  resolveBlogImageUrl,
  resolveBlogSlug,
  type BlogPost,
  type BlogPostAlternate,
} from "~/utils/blog";

export function useBlogPostSeo(
  post: Ref<BlogPost | null | undefined>,
  alternates: Ref<BlogPostAlternate[] | null | undefined> = ref(undefined),
) {
  const { locales } = useI18n();
  const {
    public: { canonicalHost },
  } = useRuntimeConfig();

  // Canonical origin from NUXT_PUBLIC_CANONICAL_HOST (bare host).
  const siteUrl = `https://${String(canonicalHost).replace(/^https?:\/\//, "")}`;

  const slug = computed(() =>
    post.value ? resolveBlogSlug(post.value) : "",
  );

  const canonicalUrl = computed(() => {
    if (!post.value) {
      return "";
    }

    return absoluteBlogUrl(siteUrl, slug.value, post.value.locale);
  });

  const imageUrl = computed(() =>
    resolveBlogImageUrl(post.value?.image, siteUrl),
  );

  const updatedDate = computed(
    () => post.value?.dateUpdated ?? post.value?.datePublished,
  );

  const title = computed(() => post.value?.title ?? "Blog");
  const description = computed(() => post.value?.description ?? "");

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: "article",
    ogUrl: canonicalUrl,
    ogImage: imageUrl,
    twitterTitle: title,
    twitterDescription: description,
    twitterCard: "summary_large_image",
    twitterImage: imageUrl,
    articlePublishedTime: computed(() =>
      post.value?.datePublished
        ? new Date(post.value.datePublished).toISOString()
        : undefined,
    ),
    articleModifiedTime: computed(() =>
      updatedDate.value
        ? new Date(updatedDate.value).toISOString()
        : undefined,
    ),
    articleAuthor: computed(() =>
      post.value?.author ? [post.value.author] : ["Maxco"],
    ),
  });

  useHead({
    link: computed(() => {
      const links: Array<Record<string, string>> = [];

      if (canonicalUrl.value) {
        links.push({ rel: "canonical", href: canonicalUrl.value });
      }

      // Payload slugs are per-locale: every alternate carries its own slug.
      for (const entry of alternates.value ?? []) {
        const entryLocale = locales.value.find(
          (item) => item.code === entry.locale,
        );

        links.push({
          rel: "alternate",
          hreflang: entryLocale?.language ?? entry.locale,
          href: absoluteBlogUrl(siteUrl, entry.slug, entry.locale),
        });
      }

      return links;
    }),
  });

  useSchemaOrg(
    computed(() => {
      if (!post.value) {
        return [];
      }

      const schemas = [
        defineArticle({
          "@type": "BlogPosting",
          headline: post.value.title,
          description: post.value.description,
          image: imageUrl.value,
          datePublished: new Date(post.value.datePublished).toISOString(),
          dateModified: new Date(updatedDate.value!).toISOString(),
          author: [
            {
              name: post.value.author,
              url: siteUrl,
            },
          ],
          publisher: {
            "@type": "Organization",
            name: "Maxco",
            url: siteUrl,
          },
          mainEntityOfPage: canonicalUrl.value,
          inLanguage: post.value.locale,
          articleSection: post.value.category
            ? [post.value.category]
            : ["Blog"],
          wordCount: markdownToPlainText(post.value.content)
            .split(/\s+/)
            .filter(Boolean).length,
        }),
      ];

      if (post.value.faq?.length) {
        schemas.push(
          defineWebPage({
            "@type": "FAQPage",
            mainEntity: post.value.faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        );
      }

      return schemas;
    }),
  );
}
