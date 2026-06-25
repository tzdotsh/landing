<script lang="ts" setup>
withDefaults(
  defineProps<{
    tag?: keyof HTMLElementTagNameMap;
    color?: "light" | "dark" | "black";
  }>(),

  {
    color: "light",
    tag: "div",
    borderRadius: 20,
  },
);
</script>

<template>
  <component
    :is="tag"
    :class="{
      'inverse-navbar bg-white bg-radial-[circle_at_bottom_left,rgba(34,200,160,0.18),#fff_60%] bg-size-[100%_1440px] bg-bottom-left':
        color === 'light',
      'bg-black bg-[radial-gradient(ellipse,#313131,#000_80%)] bg-size-[75%_200%] bg-position-[120%_80%]':
        color === 'black',
      'bg-transparent': color === 'dark',
    }"
    class="bg-no-repeat"
  >
    <slot></slot>
  </component>
</template>
