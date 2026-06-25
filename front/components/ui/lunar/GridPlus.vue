<script lang="ts" setup>
type GridContext = {
  size: number;
  offsetX: number;
  offsetY: number;
};

const props = withDefaults(
  defineProps<{
    row: number;
    column: number;
    class?: string;
    style?: string;
  }>(),
  {
    class: "",
    style: "",
  },
);

const grid = inject<GridContext>("grid-context")!;
</script>

<template>
  <line
    :style="props.style"
    :class="props.class"
    :x1="props.column * grid.size + grid.offsetX"
    :y1="props.row * grid.size + grid.offsetY / 2 - grid.size / 4"
    :x2="props.column * grid.size + grid.offsetX"
    :y2="props.row * grid.size + grid.offsetY + grid.size / 4"
    stroke-width=".66"
  ></line>
  <line
    :style="props.style"
    :class="props.class"
    :x1="props.column * grid.size + grid.offsetX - grid.size / 4"
    :y1="props.row * grid.size + grid.offsetY"
    :x2="props.column * grid.size + grid.offsetX + grid.size / 4"
    :y2="props.row * grid.size + grid.offsetY"
    stroke-width="0.66"
  ></line>
</template>
