<script lang="ts" setup>
import { twMerge } from "tailwind-merge";

import type { ChannelsHeroSlide } from "~/data/channelsHeroSports";

const props = defineProps<{
  slide: Pick<ChannelsHeroSlide, "src" | "srcset" | "alt">;
  imgClass?: string;
  class?: string;
}>();

const failed = ref(false);

watch(
  () => props.slide.src,
  () => {
    failed.value = false;
  },
);

function handleError() {
  failed.value = true;
}
</script>

<template>
  <div :class="twMerge('relative overflow-hidden', $props.class)">
    <div
      v-if="failed"
      class="brand-gradient flex h-full w-full items-center justify-center"
      role="img"
      :aria-label="slide.alt"
    >
      <SvgoLogoIcon class="h-7 w-auto opacity-90" aria-hidden="true" />
    </div>

    <img
      v-else
      :key="slide.src"
      :src="slide.src"
      :srcset="slide.srcset"
      :alt="slide.alt"
      :class="
        twMerge(
          'h-full w-full object-cover opacity-0 transition duration-1000 data-[state=ready]:opacity-100',
          imgClass,
        )
      "
      loading="eager"
      fetchpriority="high"
      decoding="async"
      @load="($event.target as HTMLImageElement).dataset.state = 'ready'"
      @error="handleError"
    />
  </div>
</template>
