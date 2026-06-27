<script lang="ts" setup>
import { TRUSTPILOT_AGGREGATE_RATING } from "~/data/trustpilotReviews";

const props = withDefaults(
  defineProps<{
    /** Aggregate score on a 5-star scale (e.g. 4.6). */
    rating?: number;
    size?: "sm" | "md";
  }>(),
  {
    rating: TRUSTPILOT_AGGREGATE_RATING,
    size: "md",
  },
);

const fullStars = computed(() => Math.floor(props.rating));
const partialPercent = computed(() =>
  Math.round((props.rating - fullStars.value) * 100),
);
const emptyTrack = "rgba(255,255,255,0.1)";
</script>

<template>
  <div
    class="inline-flex items-center gap-1"
    role="img"
    :aria-label="`${rating} out of 5`"
  >
    <template v-for="starIndex in 5" :key="starIndex">
      <span
        v-if="starIndex <= fullStars"
        class="inline-flex items-center justify-center rounded-[2px]"
        :class="size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'"
      >
        <CommonTrustpilotStarIcon :scale="size === 'sm' ? 'sm' : 'md'" />
      </span>

      <span
        v-else-if="starIndex === fullStars + 1 && partialPercent > 0"
        class="relative inline-flex overflow-hidden rounded-[2px]"
        :class="size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'"
        :style="{ backgroundColor: emptyTrack }"
      >
        <span
          class="absolute inset-0 overflow-hidden"
          :style="{ width: `${partialPercent}%` }"
        >
          <CommonTrustpilotStarIcon :scale="size === 'sm' ? 'sm' : 'md'" />
        </span>
      </span>

      <span
        v-else
        class="inline-flex rounded-[2px]"
        :class="size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'"
        :style="{ backgroundColor: emptyTrack }"
        aria-hidden="true"
      />
    </template>
  </div>
</template>
