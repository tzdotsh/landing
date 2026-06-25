<script lang="ts" setup>
const { t } = useI18n();

usePageSeoMeta(t("seo.pages.home.title"), t("seo.pages.home.description"));
</script>

<template>
  <div class="home-page-depth relative isolate min-h-full">
    <HomeHero />
    <!-- Nuxt automatically code-splits components, so these will be lazy-loaded -->
    <LazyHomeCatalog />
    <LazyHomeFeatures />
    <LazyHomeMidCta />
    <LazyHomeCollection />
    <LazyHomeAssurances />
    <LazyHomeGuarantee />
  </div>
</template>
