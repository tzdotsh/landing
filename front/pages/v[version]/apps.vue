<script lang="ts" setup>
import type { KbCategoryId } from "~/data/kb-articles";
import {
  KB_DEFAULT_DEVICE,
  getKbArticles,
  getKbVisibleArticles,
} from "~/utils/kb";

const { t } = useI18n();

definePageMeta({
  scrollToTop: true,
});

usePageSeoMeta(
  t("seo.pages.apps.title"),
  t("seo.pages.apps.description"),
);

const searchQuery = ref("");
const selectedDevice = ref<KbCategoryId>(KB_DEFAULT_DEVICE);
const allArticles = getKbArticles();

const isSearchActive = computed(() => Boolean(searchQuery.value.trim()));

const visibleArticles = computed(() =>
  getKbVisibleArticles(selectedDevice.value, searchQuery.value, allArticles),
);

const showNoArticlesState = computed(() => !allArticles.length);

const showEmptySearch = computed(
  () => isSearchActive.value && !visibleArticles.value.length,
);

const showEmptyDevice = computed(
  () =>
    !isSearchActive.value &&
    !showNoArticlesState.value &&
    !visibleArticles.value.length,
);
</script>

<template>
  <div class="home-page-depth relative isolate min-h-full">
    <HomeSectionGlow
      class="left-1/2 top-[28%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 sm:h-80 sm:w-80"
      strength="5%"
    />

    <HelpHero
      v-model:search-query="searchQuery"
      class="relative pt-46.5 pb-10"
    />

    <section id="kb-guides" class="relative pb-20">
      <div class="container flex flex-col gap-y-10">
        <HelpDevicePicker v-model:selected-device="selectedDevice" />

        <p
          v-if="showNoArticlesState"
          class="text-muted rounded-card bg-panel ring-line px-6 py-8 text-center text-[16px]/[1.5] ring-1"
        >
          {{ t("apps.select.empty_devices") }}
        </p>

        <p
          v-else-if="showEmptySearch"
          class="text-muted rounded-card bg-panel ring-line px-6 py-8 text-center text-[16px]/[1.5] ring-1"
        >
          {{ t("apps.kb.no_results", { query: searchQuery.trim() }) }}
        </p>

        <p
          v-else-if="showEmptyDevice"
          class="text-muted rounded-card bg-panel ring-line px-6 py-8 text-center text-[16px]/[1.5] ring-1"
        >
          {{ t("apps.kb.empty_device") }}
        </p>

        <HelpGuideGrid v-else :articles="visibleArticles" />
      </div>
    </section>

    <CommonContactSupport class="relative" />
  </div>
</template>
