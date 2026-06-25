<script lang="ts" setup>
import { useAppTutorialQueryWithOptions } from "~/queries/apps";

const { t } = useI18n();
const route = useRoute();

const deviceSlug = computed(() => route.params.device?.toString() ?? "");
const appSlug = computed(() => route.params.app?.toString() ?? "");
const tutorialQuery = useAppTutorialQueryWithOptions(deviceSlug, appSlug, {
  server: true,
});

if (import.meta.server) {
  await tutorialQuery.refresh();

  if (
    tutorialQuery.state.value.status === "error" ||
    !tutorialQuery.state.value.data
  ) {
    throw createError({
      statusCode: 404,
      statusMessage: "Tutorial Not Found",
      fatal: true,
    });
  }
}

const currentTutorial = computed(() => tutorialQuery.state.value.data ?? null);
const isTutorialLoading = computed(
  () =>
    tutorialQuery.state.value.status === "pending" ||
    tutorialQuery.asyncStatus.value === "loading",
);
const shouldShowTutorialError = computed(
  () =>
    !isTutorialLoading.value &&
    (tutorialQuery.state.value.status === "error" ||
      (tutorialQuery.state.value.status === "success" &&
        !tutorialQuery.state.value.data)),
);

if (import.meta.client) {
  watch(
    shouldShowTutorialError,
    (value) => {
      if (!value) {
        return;
      }

      showError(
        createError({
          statusCode: 404,
          statusMessage: "Tutorial Not Found",
          fatal: true,
        }),
      );
    },
    { immediate: true },
  );
}

const title = computed(
  () => currentTutorial.value?.title || t("seo.pages.apps.title"),
);
const description = computed(() => t("seo.pages.apps.description"));
const publishedAt = computed(() => currentTutorial.value?.createdAt || "");
const updatedAt = computed(() => currentTutorial.value?.updatedAt || "");
const wordCount = computed(() => {
  const content = currentTutorial.value?.content || "";
  return content.trim().split(/\s+/).length;
});

useReactiveSeoMeta({
  title,
  description,
  type: "article",
  publishedDate: publishedAt,
  updatedDate: updatedAt,
  wordCount,
});

useSchemaOrg({
  "@type": "HowTo",
  name: currentTutorial.value?.title || t("seo.pages.apps.title"),
  step: currentTutorial.value?.content,
});
</script>

<template>
  <AppsPost />
</template>
