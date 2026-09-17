<script lang="ts" setup>
const { t } = useI18n();

usePageSeoMeta(
  t("seo.pages.support.title"),
  t("seo.pages.support.description"),
);
</script>

<template>
  <div class="home-page-depth relative isolate min-h-full">
    <HomeSectionGlow
      class="left-1/2 top-[28%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 sm:h-80 sm:w-80"
      strength="5%"
    />

    <SupportHero class="relative pt-[186px] pb-10" />
    <SupportForm class="relative pt-10 pb-[70px]" />
  </div>
</template>
