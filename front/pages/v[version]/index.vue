<script lang="ts" setup>
const { t } = useI18n();

usePageSeoMeta(t("seo.pages.home.title"), t("seo.pages.home.description"));
</script>

<template>
  <div class="home-page-depth relative isolate min-h-full">
    <HomeHero />

    <DelayHydration>
      <div class="min-h-[220px]">
        <LazyHomeCatalog />
      </div>

      <div class="min-h-[640px]">
        <LazyHomeFeatures />
      </div>

      <div class="min-h-[120px]">
        <LazyHomeMidCta />
      </div>

      <div class="min-h-[520px]">
        <LazyHomeCollection />
      </div>

      <div class="min-h-[720px]">
        <LazyHomeAssurances />
      </div>

      <div class="min-h-[480px]">
        <LazyHomeGuarantee />
      </div>
    </DelayHydration>
  </div>
</template>
