<script lang="ts" setup>
/**
 * Shadows tv-layout ArticleMarkdown. The layer wraps slots in the light
 * `inverse-navbar box-bg` card; landing articles use the Maxco dark
 * `.markdown-panel` surface instead. Prefer CommonMarkdownRender + markdown-panel
 * directly — this shadow only exists so any leftover ArticleMarkdown usage
 * cannot reintroduce the light card.
 */
defineProps<{
  loading?: boolean;
}>();
</script>

<template>
  <section id="markdown">
    <div class="container">
      <div class="markdown-panel min-h-50 p-5 sm:p-8 lg:px-11.25 lg:py-10.5">
        <template v-if="loading">
          <div class="flex flex-col gap-y-4">
            <div
              v-for="i in 32"
              :key="i"
              :class="{
                'w-1/3': i % 4 === 0,
                'w-2/3': i % 4 === 1,
                'w-full': i % 4 === 2,
                'w-1/2': i % 4 === 3,
              }"
              class="h-4 animate-pulse rounded-full bg-white/10"
            />
          </div>
        </template>

        <slot v-else />
      </div>
    </div>
  </section>
</template>
