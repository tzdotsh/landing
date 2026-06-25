<script lang="ts" setup>
import { getAppsForDevice, useAppsMetadataQuery } from "~/queries/apps";

const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const metadataQuery = useAppsMetadataQuery();

const selectedDevice = computed(() => route.params.device?.toString() ?? "");
const selectedApp = computed(() => route.params.app?.toString() ?? "");
const apps = computed(() =>
  getAppsForDevice(metadataQuery.state.value.data, selectedDevice.value),
);
const shouldShowMetadataSkeleton = computed(
  () =>
    metadataQuery.state.value.status === "pending" ||
    (metadataQuery.asyncStatus.value === "loading" && !apps.value.length),
);
const hasMetadataError = computed(
  () => metadataQuery.state.value.status === "error",
);
const showEmptyState = computed(
  () =>
    !shouldShowMetadataSkeleton.value &&
    !hasMetadataError.value &&
    !apps.value.length,
);

function appLink(slug: string) {
  return localePath(
    `/v${route.params.version}/apps/${selectedDevice.value}/${slug}`,
  );
}
</script>

<template>
  <section id="select-tutorial">
    <div class="container flex flex-col gap-y-20">
      <div class="flex flex-col gap-y-5">
        <SectionTitle>{{ t("apps.select.app_title") }}</SectionTitle>

        <div
          class="grid grid-cols-2 gap-x-4 gap-y-5.25 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-5.75"
        >
          <template v-if="shouldShowMetadataSkeleton">
            <div
              v-for="i in 5"
              :key="i"
              :style="`animation-delay: ${i * 100}ms`"
              class="skeleton h-21.5 rounded-[14px]"
            ></div>
          </template>

          <template v-else-if="hasMetadataError">
            <p
              class="text-muted col-span-full rounded-card bg-panel ring-1 ring-line px-6 py-8 text-center text-[16px]/[1.5] md:col-span-3 lg:col-span-5"
            >
              {{ t("apps.select.load_error") }}
            </p>
          </template>

          <template v-else-if="showEmptyState">
            <p
              class="text-muted col-span-full rounded-card bg-panel ring-1 ring-line px-6 py-8 text-center text-[16px]/[1.5] md:col-span-3 lg:col-span-5"
            >
              {{ t("apps.select.empty_apps") }}
            </p>
          </template>

          <template v-else>
            <NuxtLinkLocale
              v-for="{ name, slug } in apps"
              :key="slug"
              :to="appLink(slug)"
            >
              <AnimatedBorder
                :enabled="slug === selectedApp"
                border-radius="14"
                class="shadow-black-15 h-21.5 w-full"
              >
                <GradientBg
                  :enabled="slug === selectedApp"
                  class="flex items-center justify-center"
                >
                  <p class="text-[18px] font-medium text-white">
                    {{ name }}
                  </p>
                </GradientBg>
              </AnimatedBorder>
            </NuxtLinkLocale>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
