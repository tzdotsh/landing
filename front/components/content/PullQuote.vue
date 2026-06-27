<script lang="ts" setup>
defineProps<{
  author?: string;
}>();
</script>

<template>
  <blockquote
    class="border-line bg-panel/40 my-8 rounded-card border-l-4 border-l-[var(--color-teal)] px-6 py-5"
  >
    <p class="text-ink text-[20px]/[1.5] font-medium italic">
      <slot />
    </p>
    <footer v-if="author" class="text-muted mt-3 text-[14px]/[1.4] font-medium">
      — {{ author }}
    </footer>
  </blockquote>
</template>
