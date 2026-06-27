<script lang="ts" setup>
import {
  fetchBlogPostAlternates,
  fetchRelatedBlogPosts,
  fetchBlogPostBySlug,
} from "~/queries/blog";
import { toContentLocale } from "~/utils/blog";

const route = useRoute("vversion-blog-article_slug___en-en");
const { locale } = useI18n();
const articleSlug = computed(() => route.params.article_slug?.toString() ?? "");

const { data: currentPost, status } = await useAsyncData(
  () => `blog-post-${locale.value}-${articleSlug.value}`,
  () =>
    fetchBlogPostBySlug(
      toContentLocale(locale.value),
      articleSlug.value,
    ),
  { watch: [articleSlug, locale] },
);

if (!currentPost.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Post Not Found",
    fatal: true,
  });
}

const isLoadingPost = computed(() => status.value === "pending");

const { data: alternates } = await useAsyncData(
  () => `blog-alternates-${articleSlug.value}`,
  () => fetchBlogPostAlternates(articleSlug.value),
  { watch: [articleSlug] },
);

const { data: relatedPosts } = await useAsyncData(
  () => `blog-related-${currentPost.value?.id ?? articleSlug.value}`,
  async () => {
    if (!currentPost.value) {
      return [];
    }

    return fetchRelatedBlogPosts(currentPost.value);
  },
  { watch: [currentPost] },
);

useBlogPostSeo(currentPost, alternates);
</script>

<template>
  <div class="home-page-depth relative isolate min-h-full">
    <HomeSectionGlow
      class="left-1/2 top-[28%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 sm:h-80 sm:w-80"
      strength="5%"
    />

    <BlogPostHero
      :post="currentPost"
      :loading="isLoadingPost"
      class="relative pt-46.5 pb-7"
    />

    <BlogPostMeta v-if="currentPost" :post="currentPost" />

    <ArticleMarkdown :loading="isLoadingPost" class="relative pt-7 pb-12">
      <CommonMarkdownRender :loading="isLoadingPost">
        <ContentRenderer v-if="currentPost" :value="currentPost" />
      </CommonMarkdownRender>
    </ArticleMarkdown>

    <BlogRelatedPosts v-if="relatedPosts?.length" :posts="relatedPosts" />
  </div>
</template>
