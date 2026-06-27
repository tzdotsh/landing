<script setup lang="ts">
import { twMerge } from "tailwind-merge";

import { normalizeIsoCode } from "~/utils/resolveCategoryIso";

type PropsType = { country?: string; class?: string };

const props = defineProps<PropsType>();

const failed = ref(false);

watch(
  () => props.country,
  () => {
    failed.value = false;
  },
);

const flagCode = computed(() => {
  if (!props.country) {
    return undefined;
  }

  return normalizeIsoCode(props.country).toLowerCase();
});

const flagUrl = computed(() => {
  if (!flagCode.value) {
    return "";
  }

  return `https://flagcdn.com/w80/${flagCode.value}.webp`;
});

function handleError() {
  failed.value = true;
}
</script>

<template>
  <MyNuxtImg
    v-if="flagCode && !failed"
    :src="flagUrl"
    :alt="`${flagCode.toUpperCase()} flag`"
    :class="
      twMerge(
        'transition duration-1000 data-[state=loading]:opacity-0',
        $props.class,
      )
    "
    width="44"
    height="28"
    loading="lazy"
    @error="handleError"
  />

  <SvgoLogoIcon v-else :class="$props.class" aria-hidden="true" />
</template>
