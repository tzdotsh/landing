<script lang="ts" setup>
import { getAppsForDevice, useAppsMetadataQuery } from "~/queries/apps";

const localePath = useLocalePath();
const route = useRoute("apps-device-app___en-en");
const metadataQuery = useAppsMetadataQuery();

const apps = computed(() =>
  getAppsForDevice(
    metadataQuery.state.value.data,
    route.params.device?.toString() ?? "",
  ),
);

watchEffect(() => {
  if (route.params.device && !route.params.app && apps.value.length) {
    navigateTo(
      localePath(`/apps/${route.params.device}/${apps.value[0]!.slug}`),
    );
  }
});
</script>

<template>
  <div class="flex flex-col gap-y-20 pt-32 sm:pt-36">
    <AppsSelectApp />

    <NuxtPage :transition="false" />
  </div>
</template>
