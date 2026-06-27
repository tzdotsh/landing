<script lang="ts" setup>
const { t } = useI18n();
</script>

<template>
  <section id="reviews" class="relative py-14 md:py-20">
    <div class="container flex flex-col gap-y-10">
      <div
        class="mx-auto flex w-full max-w-[640px] flex-col items-center gap-3 px-2 text-center sm:gap-3.5"
      >
        <p
          class="text-ink text-[11px]/none font-semibold tracking-[0.14em] uppercase"
        >
          {{ t("home.reviews.rating.excellent") }}
        </p>

        <CommonTrustpilotRatingStars size="md" />

        <div
          class="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 sm:gap-x-3"
        >
          <p class="text-ink text-[15px]/none font-bold sm:text-base">
            {{ t("home.reviews.rating.score") }}
          </p>

          <span
            class="rounded-[6px] bg-white px-2.5 py-1 shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
          >
            <SvgoTrustpilot
              class="h-5 w-auto max-w-[96px] opacity-100 sm:h-6 sm:max-w-[108px]"
              aria-hidden="true"
            />
          </span>
        </div>

        <p class="text-muted text-[12px]/[1.35] sm:text-[13px]/[1.35]">
          {{ t("home.reviews.rating.count") }}
        </p>
      </div>

      <CommonReviewsMarquee />
    </div>
  </section>
</template>
