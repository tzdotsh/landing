<script lang="ts" setup>
const route = useRoute();
const url = useRequestURL();
const { t, locale, locales, defaultLocale, baseUrl } = useI18n();

const title = t("seo.site.title");
const description = t("seo.site.description");
const image = url.origin + "/poster.png";

const pathWithoutLocale = computed(() => {
  if (route.path.includes(`/${locale.value}/`)) {
    return route.path.replace(`/${locale.value}`, "");
  }
  return route.path;
});

useHead(() => ({
  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    // Resource hints for performance
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    { rel: "dns-prefetch", href: "https://cccambox.com" },
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
  titleTemplate: "%s | " + t("seo.site.name"),
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
    email: "hello@cccambox.com",
  }),

  {
    "@type": "Organization",
    name: t("seo.site.name"),
    alternateName: "Maxco",
    description: t("seo.site.description"),
    logo: "/logo.png",
    url: baseUrl || "http://localhost:3000",
    email: "hello@cccambox.com",
  },
]);
</script>

<template>
  <NuxtLayout name="primary">
    <NuxtPage />
  </NuxtLayout>
</template>
