<script lang="ts" setup>
const { t } = useI18n();

usePageSeoMeta(
  t("seo.pages.affiliate-program.title"),
  t("seo.pages.affiliate-program.description"),
);
</script>

<template>
  <div class="home-page-depth relative isolate min-h-full">
    <HomeSectionGlow
      class="left-1/2 top-[28%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 sm:h-80 sm:w-80"
      strength="5%"
    />

    <AffiliateHero class="relative pt-[186px] pb-10" />
    <AffiliatePerks class="relative pt-4 pb-10" />
    <AffiliateEarnings class="relative pt-6 pb-10" />
    <AffiliateSteps class="relative pt-4 pb-10" />
    <AffiliateDetails class="relative pt-4 pb-10" />
    <AffiliateJoinForm class="relative pt-6 pb-[70px]" />
  </div>
</template>
