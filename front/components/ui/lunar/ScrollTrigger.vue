<script setup>
defineProps({
  as: {
    type: String,
    default: "div",
  },
});

const container = ref();

const context = inject("scroll-observer-context");

// current element index
const peers = inject("peers");

const index = computed(() => {
  return peers?.value ? peers.value.indexOf(container.value) : null;
});

const isFirst = computed(() => index.value === 0);
const isLast = computed(() => index.value === peers.value.length - 1);

// active element
const isActive = computed(() => context.active?.value === index.value);

const isPrevious = computed(() => context.previous?.value === index.value);

// indicators
const show = computed(
  () => isActive.value || (context.active?.value === -1 && isPrevious.value),
);
const faded = computed(() => context.active?.value === -1);

// component logic
const { y, height } = useElementBounding(container);
const { height: windowHeight } = useWindowSize();

const isVisible = computed(() => {
  return (
    y.value > windowHeight.value / 2 - height.value &&
    y.value <= windowHeight.value / 2
  );
});

watchEffect(() => {
  if (isVisible.value) {
    context.setActive(index.value);
  } else if (isFirst.value && y.value > windowHeight.value / 2 - height.value) {
    context.setActive(-1);
  } else if (isLast.value && y.value <= windowHeight.value / 2) {
    context.setActive(-1);
  }
});
</script>

<template>
  <component :is="as" ref="container">
    <slot :is-active="isActive" :show="show" :faded="faded" />
  </component>
</template>
