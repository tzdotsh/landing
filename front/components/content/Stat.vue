<script lang="ts" setup>
defineProps<{
  value: string;
  label: string;
}>();
</script>

<template>
  <div
    class="border-line bg-panel/60 my-8 flex flex-col gap-y-1 rounded-card border px-6 py-5 sm:inline-flex sm:min-w-[220px]"
  >
    <p class="font-heading text-ink text-[2rem]/none font-bold tracking-tight">
      {{ value }}
    </p>
    <p class="text-muted text-[14px]/[1.4] font-medium uppercase tracking-wide">
      {{ label }}
    </p>
  </div>
</template>
