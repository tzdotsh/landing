<script lang="ts" setup>
const route = useRoute();
const { public: config } = useRuntimeConfig();
const { t, locale, locales, defaultLocale } = useI18n();

const title = t("seo.site.title");
const description = t("seo.site.description");
const siteName = t("seo.site.name");

const canonicalOrigin = computed(() => {
  const configured = String(
    config.siteUrl || config.canonicalHost || "maxco.one",
  ).replace(/\/$/, "");

  return /^https?:\/\//.test(configured) ? configured : `https://${configured}`;
});

const image = computed(() => `${canonicalOrigin.value}/poster.png`);

const canonicalPath = computed(() => {
  let path = route.path.replace(/^\/v\d+(?=\/|$)/, "") || "/";
  path = path.replace(/^\/(en-en|es-es|pt-pt)\/v\d+(?=\/|$)/, "/$1");
  return path;
});

const pathWithoutLocale = computed(() => {
  const localePrefix = `/${locale.value}`;
  if (
    locale.value !== defaultLocale &&
    (canonicalPath.value === localePrefix ||
      canonicalPath.value.startsWith(`${localePrefix}/`))
  ) {
    return canonicalPath.value.slice(localePrefix.length) || "/";
  }

  return canonicalPath.value;
});

const isBlogArticle = computed(
  () =>
    "article_slug" in route.params &&
    route.params.article_slug != null &&
    /\/blog\//.test(route.path),
);
const isHelpCompatibilityPage = computed(() => /\/help\//.test(route.path));
const isLegalPage = computed(() => /\/legal\//.test(route.path));

/** Append brand once — page titles in i18n already include "| Maxco" where set. */
function seoTitleTemplate(titleChunk?: string) {
  if (!titleChunk) {
    return `${title} | ${siteName}`;
  }

  if (titleChunk.includes(`| ${siteName}`)) {
    return titleChunk;
  }

  return `${titleChunk} | ${siteName}`;
}

useUmami();

useHead(() => ({
  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    { rel: "dns-prefetch", href: canonicalOrigin.value },
    ...(!isBlogArticle.value
      ? [
          {
            key: "canonical",
            rel: "canonical",
            href: `${canonicalOrigin.value}${canonicalPath.value}`,
          },
        ]
      : []),
    ...(!isBlogArticle.value && !isHelpCompatibilityPage.value
      ? locales.value
          .filter(
            (entry) =>
              !isLegalPage.value ||
              entry.code === "en-en" ||
              entry.code === "es-es",
          )
          .map((entry) => {
            const prefix = entry.code === defaultLocale ? "" : `/${entry.code}`;
            return {
              key: `alternate-${entry.code}`,
              rel: "alternate",
              hreflang: entry.language ?? entry.code,
              href: `${canonicalOrigin.value}${prefix}${pathWithoutLocale.value}`,
            };
          })
      : []),
    ...(!isBlogArticle.value && !isHelpCompatibilityPage.value
      ? [
          {
            key: "alternate-x-default",
            rel: "alternate",
            hreflang: "x-default",
            href: `${canonicalOrigin.value}${pathWithoutLocale.value}`,
          },
        ]
      : []),
  ],
}));

useSeoMeta({
  ogLocaleAlternate: locales.value
    .filter((el) => el.code !== locale.value)
    .map((el) => el.language!),
  titleTemplate: seoTitleTemplate,
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description,
  ogImage: image,
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: image,
});

useSchemaOrg(
  computed(() => {
    const organizationId = `${canonicalOrigin.value}/#organization`;

    return [
      defineWebSite({
        name: t("seo.site.name"),
        description: t("seo.site.description"),
        url: canonicalOrigin.value,
        publisher: { "@id": organizationId },
      }),
      {
        "@id": organizationId,
        "@type": "Organization",
        name: t("seo.site.name"),
        alternateName: "Maxco",
        description: t("seo.site.description"),
        logo: `${canonicalOrigin.value}/logo.png`,
        url: canonicalOrigin.value,
        email: "hello@maxcotv.com",
      },
    ];
  }),
);
</script>

<template>
  <NuxtLayout name="primary">
    <NuxtPage />
  </NuxtLayout>

  <MaxcoChatBubble />
</template>
