<script lang="ts" setup>
useVodPageSeo();
</script>

<template>
  <div class="home-page-depth relative isolate min-h-full">
    <HomeSectionGlow
      class="left-1/2 top-[22%] h-80 w-80 -translate-x-1/2 -translate-y-1/2 sm:h-96 sm:w-96"
      strength="5%"
    />

    <VodHero class="relative" />
    <VodLibrary class="relative" />
    <VodGenres class="relative" />
    <VodValueSwitch class="relative" />
    <VodFeatures class="relative" />
    <VodReviews class="relative" />
    <VodDevices class="relative" />
    <VodFaq class="relative" />
    <VodFinalCta class="relative" />
  </div>
</template>
