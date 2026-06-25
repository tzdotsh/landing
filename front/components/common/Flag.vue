<script setup lang="ts">
import { twMerge } from "tailwind-merge";

type PropsType = { country?: string; class?: string };

const props = defineProps<PropsType>();

const flagUrl = computed(() => {
  const countryCode = props.country?.toLowerCase();
  return `https://flagcdn.com/w80/${countryCode}.webp`;
});
</script>

<template>
  <MyNuxtImg
    v-if="country"
    :src="flagUrl"
    :alt="`${country} flag`"
    :class="
      twMerge(
        'transition duration-1000 data-[state=loading]:opacity-0',
        $props.class,
      )
    "
    width="44"
    height="28"
    loading="lazy"
  />

  <SvgoLogoIcon v-else :class="$props.class" aria-hidden="true" />
</template>
