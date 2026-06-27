<script lang="ts" setup>
import { SPORTS_CATEGORY_TILES } from "~/data/sportsCategories";

const { t } = useI18n();
</script>

<template>
  <section id="categories" class="relative py-16 md:py-20">
    <div class="container flex flex-col gap-y-10 lg:gap-y-12">
      <h2
        class="font-heading text-[clamp(2rem,4vw,2.75rem)]/[1.1] font-bold text-ink"
      >
        {{ t("sports.categories.heading") }}
      </h2>

      <div
        class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:gap-5"
      >
        <article
          v-for="tile in SPORTS_CATEGORY_TILES"
          :key="tile.id"
          class="group border-line bg-panel/60 relative overflow-hidden rounded-card border shadow-[0_8px_32px_rgba(0,0,0,0.22)] transition duration-300 ease-[var(--ease-brand)] hover:-translate-y-0.5 hover:border-line-2"
        >
          <div class="relative aspect-[4/5] overflow-hidden">
            <NuxtImg
              :src="tile.image"
              :alt="t(`sports.categories.items.${tile.id}`)"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
              format="webp"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-deep)] via-[var(--color-bg-deep)]/35 to-transparent"
              aria-hidden="true"
            />
          </div>
          <p
            class="font-heading absolute inset-x-0 bottom-0 px-3 pb-3 text-[14px]/[1.25] font-semibold text-ink sm:px-4 sm:pb-4 sm:text-[15px]/[1.3]"
          >
            {{ t(`sports.categories.items.${tile.id}`) }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
