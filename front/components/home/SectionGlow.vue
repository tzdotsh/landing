<script lang="ts" setup>
import { twMerge } from "tailwind-merge";

withDefaults(
  defineProps<{
    strength?: string;
    class?: string;
  }>(),
  { strength: "6%" },
);
</script>

<template>
  <div
    :class="
      twMerge(
        'home-atmosphere-glow pointer-events-none absolute blur-[4.5rem]',
        $props.class,
      )
    "
    :style="{ '--glow-strength': strength }"
    aria-hidden="true"
  />
</template>
