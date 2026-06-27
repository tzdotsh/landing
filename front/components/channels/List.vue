<script lang="ts" setup>
import { useVirtualizer } from "@tanstack/vue-virtual";

import { useChannelsFilters } from "~/composables/useChannelsFilters";
import {
  flattenChannels,
  getCategoriesLookup,
  useChannelsCategoriesQuery,
  useChannelsSearchQuery,
} from "~/queries/channels";
import { resolveCategoryIso } from "~/utils/resolveCategoryIso";

import Flag from "../common/Flag.vue";

const { t } = useI18n();
const channelsRef = ref<HTMLElement | null>(null);
const { isLargeScreen } = useDeviceType();
const { searchedChannel, selectedCategory, reset } = useChannelsFilters();
const channelsQuery = useChannelsSearchQuery();
const categoriesQuery = useChannelsCategoriesQuery();

const channels = computed(() =>
  flattenChannels(channelsQuery.state.value.data?.pages),
);
const categoriesObject = computed(() =>
  getCategoriesLookup(categoriesQuery.state.value.data),
);
const isChannelsLoading = computed(
  () => channelsQuery.state.value.status === "pending",
);
const isFetchingNextPage = computed(
  () =>
    channelsQuery.asyncStatus.value === "loading" &&
    Boolean(channelsQuery.state.value.data?.pages.length),
);
const hasMore = computed(() => channelsQuery.hasNextPage.value);
const hasActiveFilters = computed(
  () =>
    Boolean(searchedChannel.value.trim()) ||
    selectedCategory.value !== undefined,
);
const showEmptyState = computed(
  () => !isChannelsLoading.value && !channels.value.length,
);

function channelFlagIso(catId: number) {
  const category = categoriesObject.value?.[catId];
  return category ? resolveCategoryIso(category) : undefined;
}

const channelsVirtualizerOptions = computed(() => ({
  count: hasMore.value ? channels.value.length + 1 : channels.value.length,
  getScrollElement: () => channelsRef.value,
  estimateSize: () => 40,
  overscan: 20,
  gap: 10,
  lanes: isLargeScreen.value ? 2 : 1,
  useAnimationFrameWithResizeObserver: true,
}));

const channelsVirtualizer = useVirtualizer(
  channelsVirtualizerOptions as Parameters<typeof useVirtualizer>[0],
);

const channelsRows = computed(() =>
  channelsVirtualizer.value.getVirtualItems(),
);

const channelsTotalSize = computed(() =>
  channelsVirtualizer.value.getTotalSize(),
);

watchEffect(() => {
  const [lastItem] = [...channelsRows.value].reverse();

  if (!lastItem) {
    return;
  }

  if (
    lastItem.index >= channels.value.length - 1 &&
    hasMore.value &&
    !isFetchingNextPage.value &&
    !isChannelsLoading.value
  ) {
    channelsQuery.loadNextPage({ cancelRefetch: false });
  }
});

watch(isLargeScreen, () => {
  channelsVirtualizer.value.measure();
});
</script>

<template>
  <div
    ref="channelsRef"
    class="glass-scroll bg-panel ring-line h-full overflow-y-auto p-px pb-3 ring-1 lg:rounded-card lg:p-[11px]"
  >
    <div v-if="isChannelsLoading" class="grid gap-2.5 lg:grid-cols-2">
      <div
        v-for="n in 19"
        :key="n"
        class="bg-panel-2 ring-line flex h-10 w-full flex-none animate-pulse items-center gap-x-[15px] rounded-[10px] px-2 ring-1"
      >
        <div class="bg-line aspect-11/7 h-7 w-11 flex-none rounded-md" />

        <div class="bg-line h-3 w-3/4 rounded" />
      </div>
    </div>

    <div
      v-else-if="showEmptyState"
      class="flex h-full flex-1 flex-col items-center justify-center gap-4 px-6 py-10 text-center"
    >
      <div class="space-y-2">
        <p class="text-ink text-[24px]/[calc(29/24)] font-bold">
          {{ t("channels.empty_state.title") }}
        </p>

        <p class="text-muted mx-auto max-w-md text-base/normal">
          {{ t("channels.empty_state.description") }}
        </p>
      </div>

      <Button
        v-if="hasActiveFilters"
        variant="ghost"
        size="small"
        radius="small"
        class="px-5 text-[16px]/[calc(19/16)] font-semibold"
        @click="reset"
      >
        {{ t("channels.empty_state.reset_button") }}
      </Button>
    </div>

    <div
      v-else
      :style="{
        height: `${channelsTotalSize}px`,
      }"
      class="relative w-full"
    >
      <template
        v-for="{ index, size, start, lane } in channelsRows"
        :key="index"
      >
        <div
          v-if="index < channels.length"
          :style="{
            height: `${size}px`,
            transform: `translateY(${start}px)`,
            left: lane ? `calc(50% + 5px)` : '0',
          }"
          class="bg-panel ring-line absolute top-0 left-0 flex h-10 w-full flex-none items-center gap-x-[15px] rounded-[10px] px-2 ring-1 lg:w-[calc(50%-5px)]"
        >
          <Flag
            :country="channelFlagIso(channels[index]!.cat_id)"
            class="ring-line aspect-11/7 h-7 w-11 flex-none rounded-md object-cover ring-1"
          />

          <p
            class="text-ink line-clamp-1 text-[18px]/[calc(21/18)] font-medium"
          >
            {{ channels?.[index]?.name }}
          </p>
        </div>

        <div
          v-else
          :style="{
            height: `${size}px`,
            transform: `translateY(${start}px)`,
            left: lane ? `calc(50% + 5px)` : '0',
          }"
          class="bg-panel-2 ring-line absolute top-0 left-0 flex h-10 w-full flex-none animate-pulse items-center gap-x-[15px] rounded-[10px] px-2 ring-1 lg:w-[calc(50%-5px)]"
        >
          <div class="bg-line aspect-11/7 h-7 w-11 flex-none rounded-md" />

          <div class="bg-line h-2 w-1/2 rounded" />
        </div>
      </template>
    </div>
  </div>
</template>
