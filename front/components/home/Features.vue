<script lang="ts" setup>
import PhoneDeviceMock from "./Features/PhoneDeviceMock.vue";
import TvDeviceMock from "./Features/TvDeviceMock.vue";

const { t } = useI18n();
const reducedMotion = usePreferredReducedMotion();

const livePulseEnabled = computed(() => reducedMotion.value !== "reduce");

const pillKeys = [
  "antibuffer",
  "multi_devices",
  "ppv_events",
  "hd_4k_quality",
] as const;

const chipClass =
  "border-line bg-panel hover:border-line-2 hover:bg-panel-2 flex min-h-[52px] items-center justify-center gap-2 rounded-[12px] border px-3 py-3 text-center transition-[background-color,border-color] duration-300 ease-[var(--ease-brand)] sm:px-4";
</script>

<template>
  <HomeBackground
    id="features"
    tag="section"
    class="relative overflow-x-hidden py-16 md:py-24"
    color="dark"
  >
    <HomeSectionGlow
      class="left-1/2 top-[58%] hidden h-96 w-[min(48rem,92vw)] -translate-x-1/2 -translate-y-1/2 md:block"
      strength="4%"
    />

    <div class="container relative">
      <div
        class="mx-auto grid max-w-[1100px] grid-cols-2 items-stretch gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-x-5"
      >
        <div
          v-for="key in pillKeys"
          :key="key"
          :class="chipClass"
        >
          <span
            class="brand-gradient h-2 w-2 shrink-0 rounded-full"
            aria-hidden="true"
          />
          <span
            class="font-heading text-ink min-w-0 truncate text-[clamp(14px,2.2vw,16px)] font-medium whitespace-nowrap"
          >
            {{ t(`home.features.pills.${key}`) }}
          </span>
        </div>
      </div>

      <div
        class="mx-auto mt-8 grid max-w-[1100px] gap-4 md:mt-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-5"
      >
        <article
          class="border-line bg-panel flex flex-col rounded-card border p-5 md:p-6 lg:p-7"
        >
          <h2
            class="font-heading text-ink mb-3 text-[clamp(1.625rem,3.2vw,2.25rem)] leading-[1.1] font-extrabold tracking-[-0.02em] text-balance"
          >
            {{ t("home.features.title") }}
          </h2>
          <p
            class="text-muted mb-6 max-w-[520px] text-[15px]/[1.55] font-medium text-pretty sm:text-[16px]/[1.55]"
          >
            {{ t("home.features.description") }}
          </p>

          <div
            class="mt-auto grid items-end justify-items-center gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-4 lg:gap-6"
            aria-hidden="true"
          >
            <TvDeviceMock />
            <PhoneDeviceMock :live-pulse="livePulseEnabled" />
          </div>
        </article>

        <div class="flex flex-col gap-4">
          <article
            class="border-line bg-panel flex flex-1 flex-col rounded-card border p-5 md:p-6"
          >
            <span
              class="brand-gradient text-on-accent mb-3 inline-flex w-fit rounded-full px-2.5 py-1 text-[11px] font-bold tracking-[0.04em]"
            >
              {{ t("home.features.tiles.playback.tag") }}
            </span>
            <h3
              class="font-heading text-ink mb-2 text-[clamp(1.125rem,2.2vw,1.375rem)] leading-[1.15] font-bold tracking-[-0.01em] text-balance"
            >
              {{ t("home.features.tiles.playback.title") }}
            </h3>
            <p
              class="text-muted text-[14px]/[1.55] font-medium text-pretty sm:text-[15px]/[1.55]"
            >
              {{ t("home.features.tiles.playback.description") }}
            </p>
          </article>

          <article
            class="border-line bg-panel flex flex-1 flex-col rounded-card border p-5 md:p-6"
          >
            <p
              class="brand-gradient-text font-heading mb-2 text-[clamp(2.5rem,6vw,3.25rem)] leading-none font-extrabold tracking-[-0.03em] tabular-nums"
            >
              {{ t("home.features.tiles.uptime.stat") }}
            </p>
            <h3
              class="font-heading text-ink mb-2 text-[clamp(1.125rem,2.2vw,1.375rem)] leading-[1.15] font-bold tracking-[-0.01em] text-balance"
            >
              {{ t("home.features.tiles.uptime.title") }}
            </h3>
            <p
              class="text-muted text-[14px]/[1.55] font-medium text-pretty sm:text-[15px]/[1.55]"
            >
              {{ t("home.features.tiles.uptime.description") }}
            </p>
          </article>
        </div>
      </div>
    </div>
  </HomeBackground>
</template>
