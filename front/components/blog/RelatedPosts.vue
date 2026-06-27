<script lang="ts" setup>
import { resolveBlogSlug, type BlogPost } from "~/utils/blog";

defineProps<{
  posts: BlogPost[];
}>();

const { version } = useProject();
const { t } = useI18n();
</script>

<template>
  <section v-if="posts.length" id="related-posts" class="relative pb-20 pt-6">
    <div class="container">
      <Heading
        :title="t('blog.post.related_title')"
        size="small"
        align="left"
        gap="20"
        title-class="text-[28px]/[1.2] font-bold tracking-normal"
      />

      <div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <NuxtLinkLocale
          v-for="post in posts"
          :key="resolveBlogSlug(post)"
          :to="`/v${version}/blog/${resolveBlogSlug(post)}`"
        >
          <BlogPostCard :post="post" />
        </NuxtLinkLocale>
      </div>
    </div>
  </section>
</template>
