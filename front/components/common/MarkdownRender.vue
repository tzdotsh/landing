<script lang="ts" setup>
/**
 * Shadows tv-layout CommonMarkdownRender. Same API, but skeleton pulses use
 * white/10 so they read on Maxco dark panel surfaces (layer used black/10).
 */
defineProps<{
  loading?: boolean;
}>();
</script>

<template>
  <div class="markdown-body">
    <div v-if="loading" class="flex flex-col gap-y-6">
      <template v-for="i in 5" :key="i">
        <div class="h-8 w-3/4 animate-pulse rounded-full bg-white/10" />
        <div class="h-6 w-1/2 animate-pulse rounded-full bg-white/10" />
        <div class="mt-4 space-y-3">
          <div class="h-4 w-full animate-pulse rounded-full bg-white/10" />
          <div class="h-4 w-full animate-pulse rounded-full bg-white/10" />
          <div class="h-4 w-5/6 animate-pulse rounded-full bg-white/10" />
        </div>
        <div class="mt-6 space-y-3">
          <div class="h-4 w-full animate-pulse rounded-full bg-white/10" />
          <div class="h-4 w-full animate-pulse rounded-full bg-white/10" />
          <div class="h-4 w-4/5 animate-pulse rounded-full bg-white/10" />
        </div>
        <div class="mt-6 space-y-3">
          <div class="h-4 w-full animate-pulse rounded-full bg-white/10" />
          <div class="h-4 w-11/12 animate-pulse rounded-full bg-white/10" />
        </div>
      </template>
    </div>

    <slot v-else />
  </div>
</template>
