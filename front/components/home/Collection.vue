<script lang="ts" setup>
import {
  TMDB_COLLECTION_ROW1_IDS,
  TMDB_COLLECTION_ROW2_IDS,
} from "~/data/tmdbPosters";

const { t } = useI18n();
</script>

<template>
  <HomeBackground
    id="collection"
    tag="section"
    color="dark"
    class="overflow-hidden py-16 md:py-24"
  >
    <div class="container mb-8 md:mb-10">
      <div class="mx-auto max-w-[920px] text-center">
        <h2
          class="font-heading text-ink mb-4 text-[clamp(1.875rem,4vw,2.75rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-balance"
        >
          {{ t("home.collection.title") }}
        </h2>
        <p
          class="text-muted mx-auto max-w-[760px] text-[17px]/[1.55] font-medium text-pretty sm:text-[18px]/[1.55]"
        >
          {{ t("home.collection.subtitle") }}
        </p>
      </div>
    </div>

    <div class="relative">
      <HomeSectionGlow
        class="left-1/2 top-[52%] h-[min(22rem,42vh)] w-[min(62rem,100vw)] -translate-x-1/2 -translate-y-1/2"
        strength="6%"
      />

      <div class="relative left-1/2 w-screen max-w-full -translate-x-1/2 space-y-4 min-h-[466px]">
        <CommonPosterMarquee :poster-ids="TMDB_COLLECTION_ROW1_IDS" />
        <CommonPosterMarquee
          :poster-ids="TMDB_COLLECTION_ROW2_IDS"
          reverse
        />
      </div>
    </div>
  </HomeBackground>
</template>
