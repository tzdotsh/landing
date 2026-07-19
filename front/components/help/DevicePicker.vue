<script lang="ts" setup>
import type { Device } from "~/queries/apps";

defineProps<{
  devices: Pick<Device, "slug" | "name">[];
}>();

const selectedDevice = defineModel<string>("selectedDevice", {
  required: true,
});
</script>

<template>
  <div
    class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
    role="tablist"
    aria-label="Select device"
  >
    <button
      v-for="device in devices"
      :key="device.slug"
      type="button"
      role="tab"
      :aria-selected="selectedDevice === device.slug"
      :class="[
        'flex min-h-14 items-center justify-center rounded-[12px] border px-3 py-3 text-center text-[14px]/[1.25] font-semibold transition-[border-color,box-shadow,background-color,color] duration-300 ease-[var(--ease-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-line-2 motion-reduce:transition-none',
        selectedDevice === device.slug
          ? 'brand-gradient text-on-accent border-transparent shadow-[0_0_0_1px_var(--color-glow),0_8px_24px_rgba(0,0,0,0.28)]'
          : 'bg-panel text-ink border-line hover:border-line-2',
      ]"
      @click="selectedDevice = device.slug"
    >
      <span class="line-clamp-2">{{ device.name }}</span>
    </button>
  </div>
</template>
