<script lang="ts" setup>
import { twMerge } from "tailwind-merge";

type PropsType = {
  admin?: boolean;
  textClass?: string;
};

withDefaults(defineProps<PropsType>(), {
  admin: false,
  textClass: "",
});
</script>

<template>
  <div
    :class="
      twMerge('flex items-end gap-x-2', !admin && 'ml-auto flex-row-reverse')
    "
  >
    <div
      :class="
        twMerge(
          'flex h-[clamp(22px,5vw,30px)] w-[clamp(22px,5vw,30px)] shrink-0 items-center justify-center rounded-full text-[10px] font-bold',
          admin
            ? 'brand-gradient text-on-accent shadow-[0_0_12px_var(--color-glow)]'
            : 'bg-panel-2 text-muted border border-line',
        )
      "
      aria-hidden="true"
    >
      {{ admin ? "m." : "Y" }}
    </div>

    <div
      :class="
        twMerge(
          'rounded-card border px-2.5 py-2 lg:px-3 lg:py-2.5',
          admin
            ? 'border-line bg-panel text-ink'
            : 'border-line-2 bg-panel-2 text-muted',
          textClass,
        )
      "
    >
      <p class="text-[clamp(9px,1.8vw,12px)]/[1.45] font-medium text-pretty">
        <slot />
      </p>
    </div>
  </div>
</template>
