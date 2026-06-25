<script lang="ts" setup>
import { twMerge } from "tailwind-merge";

import { getChannelMonogram } from "~/composables/useChannelMonogram";

const props = withDefaults(
  defineProps<{
    name: string;
    logo?: string | null;
    alt?: string;
    imgClass?: string;
    fallbackClass?: string;
    class?: string;
  }>(),
  {
    logo: null,
    alt: "",
    imgClass: "",
    fallbackClass: "",
    class: "",
  },
);

const failed = ref(false);

watch(
  () => props.logo,
  () => {
    failed.value = false;
  },
);

const showLogo = computed(() => Boolean(props.logo) && !failed.value);
const monogram = computed(() => getChannelMonogram(props.name));
const altText = computed(() => props.alt || props.name);

function handleError() {
  failed.value = true;
}
</script>

<template>
  <div
    :class="
      twMerge(
        'flex items-center justify-center overflow-hidden',
        $props.class,
      )
    "
  >
    <img
      v-if="showLogo"
      :src="logo!"
      :alt="altText"
      loading="lazy"
      decoding="async"
      :class="twMerge('max-h-full max-w-full object-contain', imgClass)"
      @error="handleError"
    />

    <span
      v-else
      :class="
        twMerge(
          'text-muted font-heading text-[13px] font-semibold tracking-wide uppercase select-none',
          fallbackClass,
        )
      "
      aria-hidden="true"
    >
      {{ monogram }}
    </span>
  </div>
</template>
