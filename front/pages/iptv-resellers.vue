<script lang="ts" setup>
const { t } = useI18n();

usePageSeoMeta(
  t("seo.pages.resellers.title"),
  t("seo.pages.resellers.description"),
);
</script>

<template>
  <div class="home-page-depth relative isolate min-h-full">
    <HomeSectionGlow
      class="left-1/2 top-[18%] h-80 w-80 -translate-x-1/2 -translate-y-1/2 sm:h-96 sm:w-96"
      strength="5%"
    />

    <ResellersHero class="relative" />
    <ResellersFeatures class="relative pt-15 pb-[75px]" />
    <ResellersPricing class="relative py-[75px]" />
    <ResellersReviews class="relative py-[75px]" />
    <ResellersFaq class="relative pt-[75px] pb-20" />
    <ResellersFinalCta class="relative pb-25" />
  </div>
</template>
