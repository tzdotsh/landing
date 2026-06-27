<script lang="ts" setup>
import { fetchBlogPostsPage } from "~/queries/blog";
import { toContentLocale } from "~/utils/blog";

const { t, locale } = useI18n();

usePageSeoMeta(t("seo.pages.blog.title"), t("seo.pages.blog.description"));

await useAsyncData(
  () => `blog-index-${locale.value}`,
  () => fetchBlogPostsPage(toContentLocale(locale.value), 1),
);
</script>

<template>
  <div class="home-page-depth relative isolate min-h-full">
    <HomeSectionGlow
      class="left-1/2 top-[28%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 sm:h-80 sm:w-80"
      strength="5%"
    />

    <BlogHero class="relative pt-46.5 pb-12.5" />
    <BlogArticles class="relative py-12.5" />
    <CommonContactSupport class="relative" />
  </div>
</template>
