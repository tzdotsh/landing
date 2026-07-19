<script lang="ts" setup>
import {
  fetchBlogPostAlternates,
  fetchRelatedBlogPosts,
  fetchBlogPostBySlug,
} from "~/queries/blog";

const route = useRoute("vversion-blog-article_slug___en-en");
const { locale } = useI18n();
const articleSlug = computed(() => route.params.article_slug?.toString() ?? "");

const {
  data: currentPost,
  error: postError,
  status,
} = await useAsyncData(
  () => `blog-post-${locale.value}-${articleSlug.value}`,
  () => fetchBlogPostBySlug(locale.value, articleSlug.value),
  { watch: [articleSlug, locale] },
);

// fetchBlogPostBySlug only throws on upstream failure (BlogUpstreamError):
// answer 503, never 404, so caches/ISR don't store a dead page for a live
// post and search engines don't read a CMS outage as "gone".
if (postError.value) {
  throw createError({
    statusCode: 503,
    statusMessage: "Content temporarily unavailable",
  });
}

// A well-formed empty result is the sole genuine not-found signal.
if (!currentPost.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Post Not Found",
    fatal: true,
  });
}

const isLoadingPost = computed(() => status.value === "pending");

// Alternates + related are enhancements: on upstream failure degrade to
// empty arrays — never fail a page whose post already loaded.
const { data: alternates } = await useAsyncData(
  () => `blog-alternates-${currentPost.value?.id ?? articleSlug.value}`,
  async () => {
    if (!currentPost.value) {
      return [];
    }

    return fetchBlogPostAlternates(currentPost.value.id).catch((error) => {
      console.error("Blog: failed to fetch post alternates", error);
      return [];
    });
  },
  { watch: [currentPost] },
);

const { data: relatedPosts } = await useAsyncData(
  () => `blog-related-${currentPost.value?.id ?? articleSlug.value}`,
  async () => {
    if (!currentPost.value) {
      return [];
    }

    return fetchRelatedBlogPosts(currentPost.value).catch((error) => {
      console.error("Blog: failed to fetch related posts", error);
      return [];
    });
  },
  { watch: [currentPost] },
);

useBlogPostSeo(currentPost, alternates);

// Payload posts carry raw markdown — parse once (server-cached via useAsyncData)
// and render with MDCRenderer, same as the tutorials/legal markdown path.
const { pending: mdPending, data: ast } = await useParseMarkdown(
  () => `article-${locale.value}-${articleSlug.value}`,
  computed(() => currentPost.value?.content),
);
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

    <section id="markdown" class="relative pt-7 pb-12">
      <div class="container">
        <CommonMarkdownRender
          :loading="isLoadingPost || mdPending"
          class="markdown-panel min-h-50 p-5 sm:p-8 lg:p-10"
        >
          <MDCRenderer v-if="ast" :body="ast.body" :data="ast.data" />
        </CommonMarkdownRender>
      </div>
    </section>

    <BlogRelatedPosts v-if="relatedPosts?.length" :posts="relatedPosts" />
  </div>
</template>
