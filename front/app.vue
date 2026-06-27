<script lang="ts" setup>
import {
  TRUSTPILOT_AGGREGATE_RATING,
  TRUSTPILOT_REVIEW_COUNT,
} from "~/data/trustpilotReviews";

const route = useRoute();
const url = useRequestURL();
const { t, locale, locales, defaultLocale, baseUrl } = useI18n();

const title = t("seo.site.title");
const description = t("seo.site.description");
const image = url.origin + "/poster.png";
const siteName = t("seo.site.name");

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

const pathWithoutLocale = computed(() => {
  if (route.path.includes(`/${locale.value}/`)) {
    return route.path.replace(`/${locale.value}`, "");
  }
  return route.path;
});

useUmami();

useHead(() => ({
  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    { rel: "dns-prefetch", href: "https://maxco.one" },
    ...locales.value.map((el) => {
      let href = `${url.origin}`;

      if (el.code !== defaultLocale) {
        href += `/${el.code}`;
      }

      href += pathWithoutLocale.value;

      return {
        rel: "alternate",
        hreflang: el.language ?? undefined,
        href,
      };
    }),
    {
      rel: "alternate",
      hreflang: "x-default",
      href: `${url.origin}${pathWithoutLocale.value}`,
    },
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

useSchemaOrg([
  defineWebSite({
    name: t("seo.site.name"),
    description: t("seo.site.description"),
    url: baseUrl || "http://localhost:3000",
    logo: "/logo.png",
    email: "hello@maxcotv.com",
  }),

  {
    "@type": "Organization",
    name: t("seo.site.name"),
    alternateName: "Maxco",
    description: t("seo.site.description"),
    logo: "/logo.png",
    url: baseUrl || "http://localhost:3000",
    email: "hello@maxcotv.com",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(TRUSTPILOT_AGGREGATE_RATING),
      bestRating: "5",
      worstRating: "1",
      ratingCount: String(TRUSTPILOT_REVIEW_COUNT),
    },
  },
]);
</script>

<template>
  <NuxtLayout name="primary">
    <NuxtPage />
  </NuxtLayout>
</template>
