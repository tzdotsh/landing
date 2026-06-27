<script lang="ts" setup>
import { useVirtualizer } from "@tanstack/vue-virtual";
import {
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "reka-ui";

import { useChannelsFilters } from "~/composables/useChannelsFilters";
import {
  filterCategoriesByChannels,
  flattenChannels,
  getCategoriesLookup,
  useChannelsCategoriesQuery,
  useChannelsSearchCategoriesQuery,
} from "~/queries/channels";
import { formatChannelCategoryName } from "~/utils/formatChannelCategoryName";
import { resolveCategoryIso } from "~/utils/resolveCategoryIso";

import Flag from "../common/Flag.vue";

const { t } = useI18n();
const categoriesRef = ref<HTMLElement | null>(null);
const { isSmallScreen } = useDeviceType();
const { debouncedSearch, selectedCategory, toggleCategory } =
  useChannelsFilters();
const searchCategoriesQuery = useChannelsSearchCategoriesQuery();
const categoriesQuery = useChannelsCategoriesQuery();

const channels = computed(() =>
  flattenChannels(searchCategoriesQuery.state.value.data?.pages),
);
const isSearchActive = computed(() => Boolean(debouncedSearch.value.trim()));
const categories = computed(() => {
  const allCategories = categoriesQuery.state.value.data ?? [];

  if (!isSearchActive.value) {
    return allCategories;
  }

  return filterCategoriesByChannels(allCategories, channels.value);
});
const categoriesObject = computed(() => getCategoriesLookup(categories.value));
const isCategoriesLoading = computed(
  () =>
    categoriesQuery.state.value.status === "pending" ||
    (isSearchActive.value &&
      (searchCategoriesQuery.state.value.status === "pending" ||
        (searchCategoriesQuery.asyncStatus.value === "loading" &&
          !channels.value.length))) ||
    (categoriesQuery.asyncStatus.value === "loading" &&
      !categories.value.length),
);

const selectedCategoryModel = computed({
  get: () => selectedCategory.value,
  set: (value: number | undefined) => {
    selectedCategory.value = value;
  },
});

const categoriesVirtualizerOptions = computed(() => ({
  enabled: !isSmallScreen.value,
  count: categories.value?.length || 0,
  getScrollElement: () => categoriesRef.value,
  estimateSize: () => 40,
  overscan: 5,
  gap: 10,
  useAnimationFrameWithResizeObserver: true,
}));

const categoriesVirtualizer = useVirtualizer(
  categoriesVirtualizerOptions as any,
);

const categoriesRows = computed(() => {
  if (isSmallScreen.value) return [];
  return categoriesVirtualizer.value.getVirtualItems();
});
const categoriesTotalSize = computed(() => {
  if (isSmallScreen.value) return 0;
  return categoriesVirtualizer.value.getTotalSize();
});

function categoryFlagIso(category: (typeof categories.value)[number] | undefined) {
  return category ? resolveCategoryIso(category) : undefined;
}
</script>

<template>
  <SelectRoot v-if="isSmallScreen" v-model="selectedCategoryModel">
    <template v-if="isCategoriesLoading">
      <div class="bg-panel-2 h-14 w-full animate-pulse rounded-full"></div>
    </template>

    <template v-else>
      <SelectTrigger
        class="text-ink data-placeholder:text-muted w-full data-placeholder:normal-case"
        aria-label="Customise options"
      >
        <div
          :class="[
            'ring-line flex h-14 w-full items-center justify-between gap-x-5 rounded-full px-[15px] text-[21px] ring-1 transition duration-300 ease-[var(--ease-brand)]',
            selectedCategory
              ? 'bg-panel-2 ring-line-2'
              : 'bg-panel hover:bg-panel-2 hover:ring-line-2',
          ]"
        >
          <div class="flex items-center gap-x-2">
            <Flag
              v-if="selectedCategory"
              :country="categoryFlagIso(categoriesObject?.[selectedCategory])"
              class="ring-line aspect-11/7 h-7 w-11 flex-none rounded-md object-cover ring-1"
            />

            <SvgoGlobe v-else class="text-muted h-7 w-auto stroke-current" />

            <SelectValue
              class="line-clamp-1 text-left break-all"
              :placeholder="t('common.placeholders.select_country')"
            />
          </div>

          <div
            class="bg-panel-2 ring-line flex aspect-square items-center rounded-full p-2 ring-1"
          >
            <SvgoArrow class="text-muted mt-0.5" />
          </div>
        </div>
      </SelectTrigger>

      <SelectPortal>
        <SelectContent
          class="data-[side=top]:animate-slide-down-and-fade data-[side=right]:animate-slide-left-and-fade data-[side=bottom]:animate-slide-up-and-fade data-[side=left]:animate-slide-right-and-fade bg-panel ring-line z-20 max-w-[calc(100vw-20px)] min-w-40 rounded-card ring-1 backdrop-blur-[18px] will-change-[opacity,transform]"
        >
          <SelectScrollUpButton
            class="flex h-[25px] items-center justify-center"
          >
            <SvgoArrow class="rotate-180" />
          </SelectScrollUpButton>

          <SelectViewport class="flex flex-col gap-y-2.5 p-[11px]">
            <SelectItem
              v-for="(category, index) in categories"
              :key="index"
              :value="category.id"
              class="text-ink relative flex items-center text-[18px]/[21px] select-none"
            >
              <button
                type="button"
                :class="[
                  'ring-line line-clamp-1 w-full rounded-full px-[15px] py-3 break-all ring-1 transition duration-300 ease-[var(--ease-brand)]',
                  selectedCategory === category.id
                    ? 'bg-panel-2 ring-line-2'
                    : 'bg-panel hover:bg-panel-2 hover:ring-line-2',
                ]"
              >
                <SelectItemText>
                  {{ formatChannelCategoryName(category.name) }}
                </SelectItemText>
              </button>
            </SelectItem>
          </SelectViewport>

          <SelectScrollDownButton
            class="flex h-[25px] items-center justify-center"
          >
            <SvgoArrow />
          </SelectScrollDownButton>
        </SelectContent>
      </SelectPortal>
    </template>
  </SelectRoot>

  <div
    v-else
    ref="categoriesRef"
    class="glass-scroll bg-panel ring-line h-full overflow-auto rounded-card px-2 py-[11px] ring-1"
  >
    <div v-if="isCategoriesLoading" class="grid gap-y-2.5">
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
      v-else
      :style="{
        height: `${categoriesTotalSize}px`,
      }"
      class="relative w-full"
    >
      <div
        v-for="{ index, size, start } in categoriesRows"
        :key="index"
        :style="{
          height: `${size}px`,
          transform: `translateY(${start}px)`,
        }"
        class="absolute top-0 left-0 w-full flex-none"
        @click="() => toggleCategory(categories?.[index]?.id)"
      >
        <div
          :class="[
            'flex h-full w-full cursor-pointer items-center gap-x-[15px] rounded-[10px] px-2 ring-1 transition duration-300 ease-[var(--ease-brand)]',
            selectedCategory === categories?.[index]?.id
              ? 'bg-panel-2 ring-line-2'
              : 'bg-panel ring-line hover:bg-panel-2 hover:ring-line-2',
          ]"
        >
          <Flag
            :country="categoryFlagIso(categories?.[index])"
            class="ring-line aspect-11/7 h-7 w-11 flex-none rounded-md object-cover ring-1"
          />

          <p
            class="text-ink line-clamp-2 text-left text-[18px]/[calc(21/18)] font-medium"
          >
            {{
              categories?.[index]?.name
                ? formatChannelCategoryName(categories[index]!.name)
                : ""
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
