<script lang="ts" setup>
import { twMerge } from "tailwind-merge";

import { getChannelCategoryImage } from "~/configs/channelsCategoryImages";

const props = defineProps<{
  category: string;
  alt: string;
  imgClass?: string;
  class?: string;
}>();

const failed = ref(false);

watch(
  () => props.category,
  () => {
    failed.value = false;
  },
);

const image = computed(() => getChannelCategoryImage(props.category));
const showFallback = computed(() => failed.value || !image.value);

function handleError() {
  failed.value = true;
}
</script>

<template>
  <div :class="twMerge('relative overflow-hidden', $props.class)">
    <div
      v-if="showFallback"
      class="brand-gradient flex h-full w-full items-center justify-center"
      role="img"
      :aria-label="alt"
    >
      <SvgoLogoIcon class="h-7 w-auto opacity-90" aria-hidden="true" />
    </div>

    <MyNuxtImg
      v-else
      :src="image!.src"
      :srcset="image!.srcset"
      :alt="alt"
      :class="
        twMerge(
          'h-full w-full object-cover opacity-0 transition duration-1000 data-[state=ready]:opacity-100',
          imgClass,
        )
      "
      @error="handleError"
    />
  </div>
</template>
