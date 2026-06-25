<script lang="ts" setup>
import { getKbArticleBySlug } from "~/utils/kb";

const { t } = useI18n();
const route = useRoute();

const slug = computed(() => route.params.slug?.toString() ?? "");

const article = computed(() => getKbArticleBySlug(slug.value));

if (import.meta.server && !article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Guide Not Found",
    fatal: true,
  });
}

if (import.meta.client) {
  watch(
    () => article.value,
    (value) => {
      if (value) {
        return;
      }

      showError(
        createError({
          statusCode: 404,
          statusMessage: "Guide Not Found",
          fatal: true,
        }),
      );
    },
    { immediate: true },
  );
}

const title = computed(() => article.value?.title || t("seo.pages.apps.title"));
const description = computed(
  () => article.value?.description || t("seo.pages.apps.description"),
);
const updatedAt = computed(() => article.value?.updatedAt || "");

useReactiveSeoMeta({
  title,
  description,
  type: "article",
  updatedDate: updatedAt,
});

useSchemaOrg({
  "@type": "HowTo",
  name: title,
  description,
});
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

          <p
            v-if="article.description"
            class="text-muted max-w-3xl text-[18px]/[1.55]"
          >
            {{ article.description }}
          </p>
        </header>
      </div>
    </section>

    <section id="guide-content" class="relative pb-16">
      <div class="container max-w-4xl">
        <div
          class="bg-panel/70 ring-line rounded-card border border-line/60 p-5 ring-1 backdrop-blur-sm sm:p-8 lg:p-10"
        >
          <HelpArticleBody :body="article.body" />
        </div>

        <HelpArticleFooter class="mt-10" />
      </div>
    </section>

    <CommonContactSupport class="relative" />
  </div>
</template>
