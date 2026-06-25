<script lang="ts" setup>
import { useBlogPostQueryWithOptions } from "~/queries/blog";

const route = useRoute("vversion-blog-article_slug___en-en");
const { public: config } = useRuntimeConfig();

const baseURL = config.payloadBaseURL;
const articleSlug = computed(() => route.params.article_slug?.toString());
const blogPostQuery = useBlogPostQueryWithOptions(articleSlug, {
  server: true,
});

if (import.meta.server) {
  await blogPostQuery.refresh();

  if (
    blogPostQuery.state.value.status === "error" ||
    !blogPostQuery.state.value.data
  ) {
    throw createError({
      statusCode: 404,
      statusMessage: "Post Not Found",
      fatal: true,
    });
  }
}

const currentPost = computed(() => blogPostQuery.state.value.data ?? null);
const isLoadingPost = computed(
  () =>
    blogPostQuery.state.value.status === "pending" ||
    blogPostQuery.asyncStatus.value === "loading",
);
const shouldShowPostError = computed(
  () =>
    !isLoadingPost.value &&
    (blogPostQuery.state.value.status === "error" ||
      (blogPostQuery.state.value.status === "success" &&
        !blogPostQuery.state.value.data)),
);

if (import.meta.client) {
  watch(
    shouldShowPostError,
    (value) => {
      if (!value) {
        return;
      }

      showError(
        createError({
          statusCode: 404,
          statusMessage: "Post Not Found",
          fatal: true,
        }),
      );
    },
    { immediate: true },
  );
}

const title = computed(() => currentPost.value?.title || "Blog Article");
const description = computed(
  () => currentPost.value?.description || "Read our latest blog article",
);
const image = computed(() => baseURL + currentPost.value?.thumbnail?.url || "");
const publishedAt = computed(() => currentPost.value?.createdAt || "");
const updatedAt = computed(() => currentPost.value?.updatedAt || "");
const wordCount = computed(() => {
  const content = currentPost.value?.content || "";
  return content.trim().split(/\s+/).length;
});

useReactiveSeoMeta({
  title,
  description,
  image,
  type: "article",
  publishedDate: publishedAt,
  updatedDate: updatedAt,
  wordCount,
});

const { pending: mdPending, data: ast } = await useParseMarkdown(
  `article-${route.params.article_slug}`,
  computed(() => currentPost.value?.content),
);
</script>

<template>
  <div class="home-page-depth relative isolate min-h-full">
    <HomeSectionGlow
      class="left-1/2 top-[28%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 sm:h-80 sm:w-80"
      strength="5%"
    />

    <ArticleHero
      :post="currentPost"
      :loading="isLoadingPost"
      class="relative pt-46.5 pb-7"
    />
    <ArticleMarkdown :loading="isLoadingPost" class="relative pt-7 pb-27.75">
      <CommonMarkdownRender :loading="mdPending">
        <MDCRenderer v-if="ast" :body="ast.body" :data="ast.data" />
      </CommonMarkdownRender>
    </ArticleMarkdown>
  </div>
</template>
