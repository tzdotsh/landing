<script lang="ts" setup>
import {
  getDevicesFromTutorials,
  getGuideCards,
  useAppsMetadataQueryWithOptions,
} from "~/queries/apps";
import { getVisibleGuides, sortGuidesByTitle } from "~/utils/kb";

const { t } = useI18n();

definePageMeta({
  scrollToTop: true,
});

usePageSeoMeta(t("seo.pages.apps.title"), t("seo.pages.apps.description"));

const metadataQuery = useAppsMetadataQueryWithOptions({ server: true });

// SSR: an upstream CMS failure must answer 503 (not a cached empty page), so
// caches/ISR never store a dead index for a live catalog. Genuine empties
// (well-formed zero-doc responses) fall through to the empty state below.
if (import.meta.server) {
  await metadataQuery.refresh();

  if (metadataQuery.state.value.status === "error") {
    throw createError({
      statusCode: 503,
      statusMessage: "Content temporarily unavailable",
    });
  }
}

if (import.meta.client) {
  watch(
    () => metadataQuery.state.value.status,
    (status) => {
      if (status === "error") {
        showError(
          createError({
            statusCode: 503,
            statusMessage: "Content temporarily unavailable",
          }),
        );
      }
    },
    { immediate: true },
  );
}

const searchQuery = ref("");

const devices = computed(() =>
  getDevicesFromTutorials(metadataQuery.state.value.data),
);
const guideCards = computed(() =>
  sortGuidesByTitle(getGuideCards(metadataQuery.state.value.data)),
);

const selectedDevice = ref("");

// Default to the first CMS device once the catalog resolves; leave the user's
// choice untouched if it still exists in the list.
watch(
  devices,
  (list) => {
    if (!list.length) {
      return;
    }

    if (!selectedDevice.value || !list.some((d) => d.slug === selectedDevice.value)) {
      selectedDevice.value = list[0]!.slug;
    }
  },
  { immediate: true },
);

const isLoading = computed(
  () =>
    metadataQuery.state.value.status === "pending" ||
    (metadataQuery.asyncStatus.value === "loading" && !guideCards.value.length),
);

const isSearchActive = computed(() => Boolean(searchQuery.value.trim()));

const visibleArticles = computed(() =>
  getVisibleGuides(selectedDevice.value, searchQuery.value, guideCards.value),
);

const showNoArticlesState = computed(
  () => !isLoading.value && !guideCards.value.length,
);

const showEmptySearch = computed(
  () => isSearchActive.value && !visibleArticles.value.length,
);

const showEmptyDevice = computed(
  () =>
    !isSearchActive.value &&
    !isLoading.value &&
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
        <HelpDevicePicker
          v-if="devices.length"
          v-model:selected-device="selectedDevice"
          :devices="devices"
        />

        <div
          v-if="isLoading"
          class="grid auto-rows-fr gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          <div
            v-for="i in 6"
            :key="i"
            :style="`animation-delay: ${i * 100}ms`"
            class="skeleton min-h-[148px] rounded-card"
          />
        </div>

        <p
          v-else-if="showNoArticlesState"
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
