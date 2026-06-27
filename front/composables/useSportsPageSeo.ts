import { SPORTS_OG_IMAGE } from "~/data/sportsCategories";

type FaqMessageItem = {
  title: string;
  content: string;
};

export function useSportsPageSeo() {
  const { t, tm, rt, locale, locales } = useI18n();
  const {
    public: { siteUrl },
  } = useRuntimeConfig();

  const title = computed(() => t("seo.pages.sports.title"));
  const description = computed(() => t("seo.pages.sports.description"));

  const canonicalPath = computed(() =>
    locale.value === "en-en" ? "/iptv-sports" : `/${locale.value}/iptv-sports`,
  );

  const canonicalUrl = computed(
    () => `${siteUrl.replace(/\/$/, "")}${canonicalPath.value}`,
  );

  const ogImageUrl = computed(
    () => `${siteUrl.replace(/\/$/, "")}${SPORTS_OG_IMAGE}`,
  );

  const faqItems = computed(() =>
    tm<any, any, any, any, FaqMessageItem[]>("sports.faq.items").map(
      (item) => ({
        question: rt(item.title),
        answer: rt(item.content),
      }),
    ),
  );

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: "website",
    ogUrl: canonicalUrl,
    ogImage: ogImageUrl,
    twitterTitle: title,
    twitterDescription: description,
    twitterCard: "summary_large_image",
    twitterImage: ogImageUrl,
  });

  useHead({
    link: computed(() => {
      const links: Array<Record<string, string>> = [
        { rel: "canonical", href: canonicalUrl.value },
      ];

      for (const entry of locales.value) {
        const path =
          entry.code === "en-en"
            ? "/iptv-sports"
            : `/${entry.code}/iptv-sports`;

        links.push({
          rel: "alternate",
          hreflang: entry.language ?? entry.code,
          href: `${siteUrl.replace(/\/$/, "")}${path}`,
        });
      }

      return links;
    }),
  });

  useSchemaOrg(
    computed(() => [
      defineWebPage({
        name: title.value,
        description: description.value,
        url: canonicalUrl.value,
        inLanguage: locale.value,
      }),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: t("sports.breadcrumb.home"),
            item: siteUrl.replace(/\/$/, ""),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: t("sports.breadcrumb.current"),
            item: canonicalUrl.value,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.value.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ]),
  );
}
