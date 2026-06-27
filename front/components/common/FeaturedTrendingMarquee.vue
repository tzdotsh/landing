<script lang="ts" setup>
import { HOME_MARQUEE_VELOCITY } from "~/constants/homeMarquee";
import type { FeaturedTrendingItem } from "~/queries/featuredTrending";

const props = withDefaults(
  defineProps<{
    title: string;
    items: FeaturedTrendingItem[];
    reverse?: boolean;
  }>(),
  { reverse: false },
);

const reducedMotion = usePreferredReducedMotion();
const staticMotion = computed(
  () => import.meta.server || reducedMotion.value === "reduce",
);
const velocity = computed(() =>
  props.reverse ? -HOME_MARQUEE_VELOCITY : HOME_MARQUEE_VELOCITY,
);

const failedPosters = ref<Record<string, boolean>>({});

const posterCardClass =
  "border-line bg-panel group relative mx-1.5 w-[132px] shrink-0 overflow-hidden rounded-card border aspect-[2/3] shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition-[border-color,transform] duration-300 ease-[var(--ease-brand)] hover:-translate-y-1 hover:border-line-2 sm:w-[150px] md:mx-2";

function posterKey(item: FeaturedTrendingItem, index: number) {
  return `${item.posterUrl}-${index}`;
}

function handlePosterError(key: string) {
  failedPosters[key] = true;
}
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <h3 class="font-heading text-ink px-4 text-[18px]/[1.2] font-semibold sm:px-0 sm:text-[20px]/[1.25]">
      {{ title }}
    </h3>

    <div
      v-if="!items.length"
      class="border-line bg-panel/40 mx-4 h-[198px] animate-pulse rounded-card border sm:mx-0 sm:h-[225px]"
      aria-hidden="true"
    />

    <div v-else class="relative">
      <div
        v-if="staticMotion"
        class="relative left-1/2 flex w-screen max-w-full -translate-x-1/2 gap-3 overflow-x-auto overscroll-x-contain px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <figure
          v-for="(item, index) in items"
          :key="posterKey(item, index)"
          :class="posterCardClass"
        >
          <img
            v-if="!failedPosters[posterKey(item, index)]"
            :src="item.posterUrl"
            width="150"
            height="225"
            class="h-full w-full object-cover"
            :alt="item.title"
            loading="lazy"
            decoding="async"
            @error="handlePosterError(posterKey(item, index))"
          />
          <figcaption
            v-else
            class="text-muted flex h-full w-full items-end bg-panel p-3 text-[12px]/[1.3] font-medium"
          >
            {{ item.title }}
          </figcaption>
        </figure>
      </div>

      <div
        v-else
        class="relative left-1/2 w-screen max-w-full -translate-x-1/2 [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]"
      >
        <CommonMarquee
          :base-velocity="velocity"
          pause-on-hover
          class="relative flex w-max items-stretch"
        >
          <figure
            v-for="(item, index) in items"
            :key="`marquee-${posterKey(item, index)}`"
            :class="posterCardClass"
          >
            <img
              v-if="!failedPosters[posterKey(item, index)]"
              :src="item.posterUrl"
              width="150"
              height="225"
              class="h-full w-full object-cover"
              :alt="item.title"
              loading="lazy"
              decoding="async"
              @error="handlePosterError(posterKey(item, index))"
            />
            <figcaption
              v-else
              class="text-muted flex h-full w-full items-end bg-panel p-3 text-[12px]/[1.3] font-medium"
            >
              {{ item.title }}
            </figcaption>
          </figure>
        </CommonMarquee>
      </div>
    </div>
  </div>
</template>
