<script lang="ts" setup>
import { SPORTS_COMPETITIONS } from "~/data/sportsCompetitions";

const { t, locale, tm } = useI18n();

const competitions = computed(() => {
  if (locale.value === "es-es") {
    const items = tm<any, any, any, any, string[]>("sports.competitions.items");

    if (items?.length) {
      return items;
    }
  }

  return [...SPORTS_COMPETITIONS];
});
</script>

<template>
  <section id="competitions" class="relative py-14 md:py-16">
    <div class="container flex flex-col gap-y-8">
      <div class="flex max-w-[760px] flex-col gap-y-4">
        <h2
          class="font-heading text-[clamp(1.875rem,3.5vw,2.5rem)]/[1.12] font-bold text-ink"
        >
          {{ t("sports.competitions.heading") }}
        </h2>
        <p class="text-muted text-[17px]/[1.6] text-pretty">
          {{ t("sports.competitions.subtext") }}
        </p>
      </div>

      <div
        class="flex flex-wrap gap-2.5 sm:gap-3"
        role="list"
        aria-label="Major football competitions"
      >
        <span
          v-for="name in competitions"
          :key="name"
          role="listitem"
          class="border-line bg-panel/70 text-muted rounded-full border px-3.5 py-2 text-[13px]/none font-medium tracking-wide uppercase sm:px-4 sm:text-[14px]/none"
        >
          {{ name }}
        </span>
      </div>
    </div>
  </section>
</template>
