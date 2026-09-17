<script lang="ts" setup>
const { t } = useI18n();

usePageSeoMeta(t("seo.pages.report.title"), t("seo.pages.report.description"));
</script>

<template>
  <div class="home-page-depth relative isolate min-h-full">
    <HomeSectionGlow
      class="left-1/2 top-[28%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 sm:h-80 sm:w-80"
      strength="5%"
    />

    <ReportHero class="relative pt-[186px] pb-[15px]" />
    <ReportDisclaimer class="relative pt-[15px] pb-[22px]" />
    <ReportForm class="relative pt-[22px] pb-[81px]" />
  </div>
</template>
