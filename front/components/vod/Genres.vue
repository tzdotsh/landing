<script lang="ts" setup>
import {
  VOD_GENRE_TILES,
  vodGenrePosterSrc,
} from "~/data/vodGenres";
import { tmdbPosterSrcset } from "~/data/tmdbPosters";

const { t } = useI18n();
</script>

<template>
  <section id="genres" class="relative py-14 md:py-20">
    <div class="container flex flex-col gap-y-10 lg:gap-y-12">
      <h2
        class="font-heading text-[clamp(2rem,4vw,2.75rem)]/[1.1] font-bold text-ink"
      >
        {{ t("vod.genres.heading") }}
      </h2>

      <div
        class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5"
      >
        <article
          v-for="tile in VOD_GENRE_TILES"
          :key="tile.id"
          class="group border-line bg-panel/60 relative overflow-hidden rounded-card border shadow-[0_8px_32px_rgba(0,0,0,0.22)] transition duration-300 ease-[var(--ease-brand)] hover:-translate-y-0.5 hover:border-line-2"
        >
          <div class="relative aspect-[4/5] overflow-hidden">
            <img
              :src="vodGenrePosterSrc(tile)"
              :srcset="tmdbPosterSrcset(tile.posterId)"
              :alt="t(`vod.genres.items.${tile.id}.label`)"
              width="400"
              height="500"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-deep)] via-[var(--color-bg-deep)]/40 to-transparent"
              aria-hidden="true"
            />
          </div>
          <div class="absolute inset-x-0 bottom-0 px-3 pb-3 sm:px-4 sm:pb-4">
            <p class="font-heading text-[14px]/[1.25] font-semibold text-ink sm:text-[15px]/[1.3]">
              {{ t(`vod.genres.items.${tile.id}.label`) }}
            </p>
            <p
              v-if="tile.subtitle"
              class="text-muted mt-1 text-[12px]/[1.35] sm:text-[13px]/[1.4]"
            >
              {{ t(`vod.genres.items.${tile.id}.subtitle`) }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
