<script lang="ts" setup>
import { useAppTutorialBySlugQueryWithOptions } from "~/queries/apps";

const { t } = useI18n();
const route = useRoute();

const slug = computed(() => route.params.slug?.toString() ?? "");

const tutorialQuery = useAppTutorialBySlugQueryWithOptions(slug, {
  server: true,
});

// SSR: distinguish upstream failure (503, not cached) from a genuinely missing
// slug (404). SDK .find() throws only on transport/HTTP errors → status
// "error"; a well-formed empty result is "success" with null data.
if (import.meta.server) {
  await tutorialQuery.refresh();

  if (tutorialQuery.state.value.status === "error") {
    throw createError({
      statusCode: 503,
      statusMessage: "Content temporarily unavailable",
    });
  }

  if (!tutorialQuery.state.value.data) {
    throw createError({
      statusCode: 404,
      statusMessage: "Guide Not Found",
      fatal: true,
    });
  }
}

const article = computed(() => tutorialQuery.state.value.data ?? null);
const isLoading = computed(
  () =>
    tutorialQuery.state.value.status === "pending" ||
    tutorialQuery.asyncStatus.value === "loading",
);

if (import.meta.client) {
  watch(
    () => ({
      status: tutorialQuery.state.value.status,
      hasData: Boolean(tutorialQuery.state.value.data),
      loading: isLoading.value,
    }),
    ({ status, hasData, loading }) => {
      if (loading) {
        return;
      }

      if (status === "error") {
        showError(
          createError({
            statusCode: 503,
            statusMessage: "Content temporarily unavailable",
          }),
        );
        return;
      }

      if (status === "success" && !hasData) {
        showError(
          createError({
            statusCode: 404,
            statusMessage: "Guide Not Found",
            fatal: true,
          }),
        );
      }
    },
    { immediate: true },
  );
}

const title = computed(() => article.value?.title || t("seo.pages.apps.title"));
const description = computed(() => t("seo.pages.apps.description"));
const updatedAt = computed(() => article.value?.updatedAt || "");
const publishedAt = computed(() => article.value?.createdAt || "");

useReactiveSeoMeta({
  title,
  description,
  type: "article",
  publishedDate: publishedAt,
  updatedDate: updatedAt,
});

useSchemaOrg({
  "@type": "HowTo",
  name: title,
  description,
  step: computed(() => article.value?.content),
});

// Tutorial content is markdown — render via the shared useParseMarkdown +
// MDCRenderer path (same as blog + app tutorials), not raw v-html.
const { pending: mdPending, data: ast } = await useParseMarkdown(
  () => `help-${slug.value}`,
  computed(() => article.value?.content),
);
</script>

<template>
  <div v-if="article" class="home-page-depth relative isolate min-h-full">
    <HomeSectionGlow
      class="left-1/2 top-[20%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 sm:h-80 sm:w-80"
      strength="5%"
    />

    <section class="relative pt-46.5 pb-10">
      <div class="container max-w-4xl">
        <HelpArticleFooter class="mb-8" />

        <header class="flex flex-col gap-y-4">
          <p class="text-faint text-[13px]/none font-semibold tracking-[0.1em] uppercase">
            {{ t("apps.kb.guide_label") }}
          </p>

          <h1 class="font-heading text-ink text-[clamp(2rem,4vw,2.75rem)]/none font-semibold tracking-normal text-pretty">
            {{ article.title }}
          </h1>
        </header>
      </div>
    </section>

    <section id="guide-content" class="relative pb-16">
      <div class="container max-w-4xl">
        <CommonMarkdownRender
          :loading="mdPending || isLoading"
          class="bg-panel/70 ring-line rounded-card border border-line/60 p-5 ring-1 backdrop-blur-sm sm:p-8 lg:p-10"
        >
          <MDCRenderer v-if="ast" :body="ast.body" :data="ast.data" />
        </CommonMarkdownRender>

        <HelpArticleFooter class="mt-10" />
      </div>
    </section>

    <CommonContactSupport class="relative" />
  </div>
</template>
