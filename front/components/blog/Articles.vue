<script lang="ts" setup>
import {
  BLOG_POSTS_PER_PAGE,
  flattenBlogPosts,
  useBlogPostsQuery,
} from "~/queries/blog";
import { resolveBlogSlug } from "~/utils/blog";

const { version } = useProject();
const { t } = useI18n();
const blogPostsQuery = useBlogPostsQuery();

const allPosts = computed(() =>
  flattenBlogPosts(blogPostsQuery.state.value.data?.pages),
);
const hasMorePosts = computed(() => blogPostsQuery.hasNextPage.value);
const isLoadingInitial = computed(
  () => blogPostsQuery.state.value.status === "pending",
);
const isLoadingMore = computed(
  () =>
    blogPostsQuery.asyncStatus.value === "loading" &&
    Boolean(blogPostsQuery.state.value.data?.pages.length),
);
const isLoading = computed(() => isLoadingInitial.value || isLoadingMore.value);

function loadMorePosts() {
  return blogPostsQuery.loadNextPage({ cancelRefetch: false });
}
</script>

<template>
  <section id="last-articles">
    <div v-auto-animate class="container mx-auto px-4">
      <div
        v-auto-animate
        class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <NuxtLinkLocale
          v-for="(post, index) in allPosts"
          :key="resolveBlogSlug(post)"
          :to="`/v${version}/blog/${resolveBlogSlug(post)}`"
          class="lg:first:col-span-3"
        >
          <BlogPostCard :latest="!index" :post="post" />
        </NuxtLinkLocale>

        <template v-if="isLoading">
          <BlogPostCard v-for="i in BLOG_POSTS_PER_PAGE" :key="i" />
        </template>
      </div>

      <Button
        v-if="hasMorePosts"
        variant="primary"
        class="mx-auto mt-10 px-15"
        @click="loadMorePosts"
      >
        {{ t("blog.articles.show_more") }}
      </Button>
    </div>
  </section>
</template>
