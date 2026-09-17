<script lang="ts" setup>
import { useAppTutorialQueryWithOptions } from "~/queries/apps";
import { toSeoDescription, toSeoTitle } from "~/utils/blog";

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

const title = computed(() =>
  toSeoTitle(currentTutorial.value?.title || t("seo.pages.apps.title")),
);
const description = computed(() =>
  toSeoDescription(
    currentTutorial.value?.content || "",
    t("seo.pages.apps.description"),
  ),
);
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description,
});
</script>

<template>
  <AppsPost :title="currentTutorial?.title" />
</template>
