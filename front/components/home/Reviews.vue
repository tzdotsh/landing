<script lang="ts" setup>
import { HOME_MARQUEE_VELOCITY } from "~/constants/homeMarquee";
import { TRUSTPILOT_REVIEWS } from "~/data/trustpilotReviews";

const { t } = useI18n();
const reducedMotion = usePreferredReducedMotion();

const staticMotion = computed(() => reducedMotion.value === "reduce");

const MARQUEE_VELOCITY = HOME_MARQUEE_VELOCITY;

const row1Reviews = TRUSTPILOT_REVIEWS.slice(0, 7);
const row2Reviews = TRUSTPILOT_REVIEWS.slice(7);

const marqueeRows = [
  { reviews: row1Reviews, velocity: MARQUEE_VELOCITY },
  { reviews: row2Reviews, velocity: -MARQUEE_VELOCITY },
] as const;

const staticRows = [row1Reviews, row2Reviews] as const;
</script>

<template>
  <div id="reviews" class="relative flex w-full flex-col">
    <div class="container mb-5 sm:mb-6">
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
    </div>

    <div class="relative min-h-[340px]">
      <div
        v-if="staticMotion"
        class="relative left-1/2 w-screen max-w-full -translate-x-1/2 space-y-4"
      >
        <div
          v-for="(row, rowIndex) in staticRows"
          :key="`reviews-static-row-${rowIndex}`"
          class="flex gap-3 overflow-x-auto overscroll-x-contain px-4 pb-2 sm:gap-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <HomeReviewMarqueeCard
            v-for="(review, reviewIndex) in row"
            :key="`reviews-static-${rowIndex}-${reviewIndex}-${review.name}`"
            :review="review"
          />
        </div>
      </div>

      <div
        v-else
        class="relative left-1/2 w-screen max-w-full -translate-x-1/2 space-y-4"
      >
        <div
          v-for="(row, rowIndex) in marqueeRows"
          :key="`reviews-marquee-row-${rowIndex}`"
          class="relative overflow-hidden min-h-[9.5rem]"
        >
          <CommonMarquee
            :base-velocity="row.velocity"
            pause-on-hover
            class="relative flex w-max items-stretch"
          >
            <HomeReviewMarqueeCard
              v-for="(review, reviewIndex) in row.reviews"
              :key="`reviews-marquee-${rowIndex}-${reviewIndex}-${review.name}`"
              :review="review"
            />
          </CommonMarquee>
        </div>
      </div>
    </div>
  </div>
</template>
