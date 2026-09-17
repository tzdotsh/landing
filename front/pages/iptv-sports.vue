<script lang="ts" setup>
useSportsPageSeo();
</script>

<template>
  <div class="home-page-depth relative isolate min-h-full">
    <HomeSectionGlow
      class="left-1/2 top-[22%] h-80 w-80 -translate-x-1/2 -translate-y-1/2 sm:h-96 sm:w-96"
      strength="5%"
    />

    <SportsHero class="relative" />
    <SportsCategories class="relative" />
    <SportsCompetitions class="relative" />
    <SportsValueSwitch class="relative" />
    <SportsReliability class="relative" />
    <SportsReviews class="relative" />
    <SportsDevices class="relative" />
    <SportsFaq class="relative" />
    <SportsFinalCta class="relative" />
  </div>
</template>
