<script setup>
defineProps({
  as: {
    type: String,
    default: "div",
  },
});

const container = ref();

const context = inject("scroll-observer-context");

const peers = inject("peers");

const index = computed(() => {
  return peers?.value ? peers.value.indexOf(container.value) : null;
});

// active element
const isActive = computed(() => context.active?.value === index.value);
const isPrevious = computed(() => context.previous?.value === index.value);

// indicators
const show = computed(
  () => isActive.value || (context.active?.value === -1 && isPrevious.value),
);
const faded = computed(() => context.active?.value === -1);
</script>

<template>
  <component :is="as" ref="container">
    <slot
      :is-previous="isPrevious"
      :is-active="isActive"
      :show="show"
      :faded="faded"
    />
  </component>
</template>
