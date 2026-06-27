<script lang="ts" setup>
withDefaults(
  defineProps<{
    /** `em` scales with parent font size; `md` / `sm` match rating rows */
    scale?: "em" | "md" | "sm";
  }>(),
  { scale: "md" },
);

const TRUSTPILOT_GREEN = "#00B67A";
</script>

<template>
  <span
    class="inline-flex items-center justify-center rounded-[2px]"
    :class="
      scale === 'em'
        ? 'h-[1em] w-[1em] align-[-0.1em]'
        : scale === 'sm'
          ? 'h-4 w-4'
          : 'h-5 w-5'
    "
    :style="{ backgroundColor: TRUSTPILOT_GREEN }"
  >
    <svg
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      :class="
        scale === 'em'
          ? 'h-[0.7em] w-[0.7em] fill-white'
          : scale === 'sm'
            ? 'h-2.5 w-2.5 fill-white'
            : 'h-3 w-3 fill-white'
      "
    >
      <path
        d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.92L8 10.67 4.48 12.34l.67-3.92L2.3 5.64l3.94-.57L8 1.5z"
      />
    </svg>
  </span>
</template>
