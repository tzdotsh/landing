<script lang="ts" setup>
import { useFeaturedTrendingQuery } from "~/queries/featuredTrending";

const { t } = useI18n();

const { data: trendingResponse } = useFeaturedTrendingQuery();

const trendingMovies = computed(
  () => trendingResponse.value?.movies ?? [],
);

const popularSeries = computed(
  () => trendingResponse.value?.series ?? [],
);
</script>

<template>
  <section id="library" class="relative py-16 md:py-20">
    <div class="container flex flex-col gap-y-10 lg:gap-y-12">
      <div class="flex max-w-[760px] flex-col gap-y-4">
        <h2
          class="font-heading text-[clamp(2rem,4vw,2.75rem)]/[1.1] font-bold text-ink"
        >
          {{ t("vod.library.heading") }}
        </h2>
      </div>

      <div class="flex flex-col gap-y-8">
        <CommonFeaturedTrendingMarquee
          :title="t('vod.library.movies_row')"
          :items="trendingMovies"
        />
        <CommonFeaturedTrendingMarquee
          :title="t('vod.library.series_row')"
          :items="popularSeries"
          reverse
        />
      </div>
    </div>
  </section>
</template>
