<script lang="ts" setup>
import type { KbCategorySection } from "~/utils/kb";

defineProps<{
  section: KbCategorySection;
}>();
</script>

<template>
  <section :id="`kb-${section.id}`" class="flex flex-col gap-y-5">
    <div class="flex items-center gap-x-3">
      <span
        class="brand-gradient h-6 w-1 rounded-full"
        aria-hidden="true"
      />
      <h2 class="font-heading text-ink text-[24px]/none font-semibold tracking-normal">
        {{ section.label }}
      </h2>
      <span class="text-faint text-[13px]/none font-medium">
        {{ section.articles.length }}
      </span>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <HelpArticleCard
        v-for="article in section.articles"
        :key="article.id"
        :article="article"
      />
    </div>
  </section>
</template>
