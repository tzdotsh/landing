<script lang="ts" setup>
const { t } = useI18n();
</script>

<template>
  <div
    id="reviews"
    class="border-line relative flex w-full max-w-[420px] items-center justify-between gap-4 overflow-hidden rounded-card border bg-panel px-4 py-3.5 shadow-[0_0_0_1px_var(--color-glow),0_10px_32px_rgba(0,0,0,0.2)] sm:gap-5 sm:px-5"
  >
    <span
      class="brand-gradient pointer-events-none absolute inset-x-0 top-0 h-px opacity-50"
      aria-hidden="true"
    />

    <div class="min-w-0 flex flex-col gap-1.5 sm:gap-2">
      <p
        class="text-ink text-[11px]/none font-semibold tracking-[0.14em] uppercase"
      >
        {{ t("home.reviews.rating.excellent") }}
      </p>

      <div
        class="flex items-center gap-1"
        role="img"
        :aria-label="t('home.reviews.rating.score')"
      >
        <template v-for="starIndex in 5" :key="starIndex">
          <span
            v-if="starIndex <= 4"
            class="inline-flex h-5 w-5 items-center justify-center rounded-[2px]"
          >
            <CommonTrustpilotStarIcon />
          </span>

          <span
            v-else
            class="relative inline-flex h-5 w-5 overflow-hidden rounded-[2px]"
            :style="{ backgroundColor: 'rgba(255,255,255,0.1)' }"
          >
            <span
              class="absolute inset-0 overflow-hidden"
              style="width: 60%"
            >
              <CommonTrustpilotStarIcon />
            </span>
          </span>
        </template>
      </div>

      <p class="text-ink text-[15px]/none font-bold sm:text-base">
        {{ t("home.reviews.rating.score") }}
      </p>
      <p class="text-muted text-[12px]/[1.35] sm:text-[13px]/[1.35]">
        {{ t("home.reviews.rating.count") }}
      </p>
    </div>

    <div
      class="shrink-0 rounded-[6px] bg-white px-2.5 py-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
    >
      <SvgoTrustpilot
        class="h-6 w-auto max-w-[108px] opacity-100 sm:h-7 sm:max-w-[118px]"
        aria-hidden="true"
      />
    </div>
  </div>
</template>
