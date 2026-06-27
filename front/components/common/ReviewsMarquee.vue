<script lang="ts" setup>
import { HOME_MARQUEE_VELOCITY } from "~/constants/homeMarquee";
import { MARQUEE_EDGE_MASK } from "~/data/tmdbPosters";
import { TRUSTPILOT_REVIEWS } from "~/data/trustpilotReviews";

const reducedMotion = usePreferredReducedMotion();

const staticMotion = computed(
  () => import.meta.server || reducedMotion.value === "reduce",
);

const row1Reviews = TRUSTPILOT_REVIEWS.slice(0, 7);
const row2Reviews = TRUSTPILOT_REVIEWS.slice(7);

const marqueeRows = [
  { reviews: row1Reviews, velocity: HOME_MARQUEE_VELOCITY },
  { reviews: row2Reviews, velocity: -HOME_MARQUEE_VELOCITY },
] as const;

const staticRows = [row1Reviews, row2Reviews] as const;
</script>

<template>
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
        :class="[
          'relative min-h-[9.5rem] overflow-hidden',
          MARQUEE_EDGE_MASK,
        ]"
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
</template>
