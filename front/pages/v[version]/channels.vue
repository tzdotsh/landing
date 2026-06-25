<script lang="ts" setup>
import { useChannelsFilters } from "~/composables/useChannelsFilters";
import {
  useChannelsCategoriesQuery,
  useChannelsSearchQuery,
} from "~/queries/channels";

const { t } = useI18n();
const { reset } = useChannelsFilters();

useChannelsSearchQuery();
useChannelsCategoriesQuery();

usePageSeoMeta(
  t("seo.pages.channels.title"),
  t("seo.pages.channels.description"),
);

onUnmounted(reset);
</script>

<template>
  <div class="home-page-depth relative isolate min-h-full">
    <HomeSectionGlow
      class="left-1/2 top-[28%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 sm:h-80 sm:w-80"
      strength="5%"
    />

    <ChannelsHero class="relative pb-[31px]" />
    <ChannelsForm class="relative pt-[31px]" />
    <CommonContactSupport class="relative" />
  </div>
</template>
