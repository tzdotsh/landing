<script setup>
import { usePrevious } from "@vueuse/core";

defineProps({
  as: {
    type: String,
    default: "div",
  },
});

const active = ref(-1);

function setActive(index) {
  active.value = index;
}

const previous = usePrevious(active, 0);

provide("scroll-observer-context", {
  active,
  setActive,
  previous,
});
</script>

<template>
  <component :is="as">
    <slot :active="active" :previous="previous" />
  </component>
</template>
