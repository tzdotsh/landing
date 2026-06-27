<script lang="ts" setup>
import {
  TMDB_MOVIE_POSTER_IDS,
  TMDB_SERIES_POSTER_IDS,
} from "~/data/tmdbPosters";

const { t } = useI18n();
</script>

<template>
  <section id="library" class="relative py-16 md:py-20">
    <div class="container mb-8 md:mb-10">
      <div class="flex max-w-[760px] flex-col gap-y-4">
        <h2
          class="font-heading text-[clamp(2rem,4vw,2.75rem)]/[1.1] font-bold text-ink"
        >
          {{ t("vod.library.heading") }}
        </h2>
      </div>
    </div>

    <div class="relative flex flex-col gap-y-10 md:gap-y-12">
      <div>
        <div class="container mb-4 md:mb-5">
          <h3
            class="font-heading text-ink text-[18px]/[1.2] font-semibold sm:text-[20px]/[1.25]"
          >
            {{ t("vod.library.movies_row") }}
          </h3>
        </div>
        <CommonPosterMarquee :poster-ids="TMDB_MOVIE_POSTER_IDS" />
      </div>

      <div>
        <div class="container mb-4 md:mb-5">
          <h3
            class="font-heading text-ink text-[18px]/[1.2] font-semibold sm:text-[20px]/[1.25]"
          >
            {{ t("vod.library.series_row") }}
          </h3>
        </div>
        <CommonPosterMarquee
          :poster-ids="TMDB_SERIES_POSTER_IDS"
          reverse
        />
      </div>
    </div>
  </section>
</template>
