<script lang="ts"></script>

<script lang="ts" setup>
import { twMerge } from "tailwind-merge";
export type Props = {
  variant?: "primary" | "secondary" | "gradient" | "ghost" | "danger";
  size?: "small" | "medium" | "large" | number | string; // small: 37px | medium: 60px | large: 70px | or custom
  radius?: "small" | "medium" | "large" | number | string; // small: 10px | medium: 12px | large: 20px
  class?: string;
  btnClass?: string; // additional class for the button
};

withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "medium",
  radius: "medium",
  class: "",
  btnClass: "",
});
</script>

<template>
  <button
    :class="
      twMerge(
        'shadow-black-15 flex cursor-pointer items-center justify-center gap-x-2.5 px-5 font-bold',
        (variant === 'primary' ||
          variant === 'secondary' ||
          variant === 'gradient') &&
          'brand-gradient text-on-accent transition duration-300 ease-[var(--ease-brand)]',
        variant === 'ghost' &&
          'bg-panel text-ink ring-1 ring-line hover:bg-panel-2 transition duration-300 ease-[var(--ease-brand)]',
        variant === 'danger' && 'bg-danger text-on-danger',
        size === 'large' && 'h-[70px]',
        size === 'medium' && 'h-[62px] text-[22px]',
        size === 'small' && 'h-[37px]',
        radius === 'large' && 'rounded-[20px]',
        radius === 'medium' && 'rounded-btn',
        radius === 'small' && 'rounded-[10px]',
        $props.class,
        $props.btnClass,
      )
    "
    type="button"
  >
    <slot name="icon"></slot>

    <slot></slot>
  </button>
</template>
