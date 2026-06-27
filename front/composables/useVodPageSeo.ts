import { VOD_OG_IMAGE } from "~/data/vodGenres";

type FaqMessageItem = {
  title: string;
  content: string;
};

export function useVodPageSeo() {
  const { t, tm, rt, locale, locales } = useI18n();
  const {
    public: { siteUrl },
  } = useRuntimeConfig();

  const title = computed(() => t("seo.pages.vod.title"));
  const description = computed(() => t("seo.pages.vod.description"));

  const canonicalPath = computed(() =>
    locale.value === "en-en" ? "/iptv-vod" : `/${locale.value}/iptv-vod`,
  );

  const canonicalUrl = computed(
    () => `${siteUrl.replace(/\/$/, "")}${canonicalPath.value}`,
  );

  const ogImageUrl = computed(
    () => `${siteUrl.replace(/\/$/, "")}${VOD_OG_IMAGE}`,
  );

  const faqItems = computed(() =>
    tm<any, any, any, any, FaqMessageItem[]>("vod.faq.items").map((item) => ({
      question: rt(item.title),
      answer: rt(item.content),
    })),
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
          entry.code === "en-en" ? "/iptv-vod" : `/${entry.code}/iptv-vod`;

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
            name: t("vod.breadcrumb.home"),
            item: siteUrl.replace(/\/$/, ""),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: t("vod.breadcrumb.current"),
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
