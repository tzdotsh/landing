<script lang="ts" setup>
import type { BlogPost } from "~/utils/blog";

defineProps<{
  post: BlogPost;
}>();
</script>

<template>
  <section id="post-meta" class="relative pb-4">
    <div class="container">
      <div
        class="border-line bg-panel/60 mx-auto max-w-3xl rounded-card border px-5 py-4 sm:px-6"
      >
        <p class="text-ink text-[15px]/[1.5] font-semibold">
          {{ post.author }}
        </p>
        <p
          v-if="post.authorBio"
          class="text-muted mt-1 text-[14px]/[1.55]"
        >
          {{ post.authorBio }}
        </p>
        <div
          v-if="post.tags.length"
          class="mt-3 flex flex-wrap gap-2"
        >
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="border-line text-muted rounded-full border px-2.5 py-0.5 text-[12px]/none font-medium uppercase tracking-wide"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
