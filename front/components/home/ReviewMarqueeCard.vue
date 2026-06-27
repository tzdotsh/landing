<script lang="ts" setup>
import type { TrustpilotReview } from "~/data/trustpilotReviews";

const props = defineProps<{
  review: TrustpilotReview;
}>();

const initials = computed(() =>
  props.review.name
    .split(/\s+/)
    .map((part) => part.replace(/[^A-Za-z]/g, "").charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase(),
);
</script>

<template>
  <article
    class="border-line bg-panel relative mx-1.5 flex w-[15.5rem] shrink-0 flex-col overflow-hidden rounded-card border p-3.5 sm:mx-2 sm:w-[17.5rem] sm:p-4"
  >
    <div class="mb-3 flex items-start justify-between gap-2">
      <div class="flex min-w-0 items-center gap-2.5">
        <div
          class="bg-panel-2 text-muted flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold tracking-wide sm:h-10 sm:w-10 sm:text-[12px]"
          aria-hidden="true"
        >
          {{ initials }}
        </div>

        <div class="min-w-0">
          <p class="text-ink truncate text-[13px]/[1.2] font-semibold sm:text-[14px]/[1.2]">
            {{ review.name }}
          </p>
          <p class="text-muted text-[11px]/[1.2] font-medium tracking-wide uppercase sm:text-[12px]/[1.2]">
            {{ review.loc }}
          </p>
        </div>
      </div>

      <CommonTrustpilotStarIcon
        scale="sm"
        class="mt-0.5 shrink-0 opacity-80"
        aria-hidden="true"
      />
    </div>

    <div
      class="mb-2.5 flex items-center gap-x-0.5"
      :aria-label="`${review.stars} out of 5 stars`"
    >
      <svg
        v-for="starIndex in review.stars"
        :key="starIndex"
        viewBox="0 0 16 16"
        class="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4"
        fill="#FFB800"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.92L8 10.67 4.48 12.34l.67-3.92L2.3 5.64l3.94-.57L8 1.5z"
        />
      </svg>
    </div>

    <p
      class="text-muted line-clamp-3 flex-1 text-[12px]/[1.45] text-pretty sm:text-[13px]/[1.45]"
    >
      {{ review.text }}
    </p>
  </article>
</template>
