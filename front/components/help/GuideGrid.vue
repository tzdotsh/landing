<script lang="ts" setup>
import type { GuideCard } from "~/queries/apps";

defineProps<{
  articles: GuideCard[];
}>();
</script>

<template>
  <div class="grid auto-rows-fr gap-4 sm:grid-cols-2 xl:grid-cols-3">
    <HelpArticleCard
      v-for="article in articles"
      :key="article.id"
      :article="article"
    />
  </div>
</template>
