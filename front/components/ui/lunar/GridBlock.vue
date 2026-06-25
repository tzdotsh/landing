<script setup>
defineProps({
  row: {
    type: Number,
    required: true,
  },
  column: {
    type: Number,
    required: true,
  },
});

const grid = inject("grid-context");
</script>

<template>
  <rect
    stroke-width="0"
    :width="grid.size"
    :height="grid.size"
    :x="column * grid.size + grid.offsetX"
    :y="row * grid.size + grid.offsetY"
  ></rect>
</template>
