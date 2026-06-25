<script lang="ts" setup>
import { useChannelsFilters } from "~/composables/useChannelsFilters";

const { t } = useI18n();
const { searchedChannel, selectedCategory } = useChannelsFilters();

const searchedChannelModel = computed({
  get: () => searchedChannel.value,
  set: (value: string) => {
    searchedChannel.value = value;

    if (value && selectedCategory.value) {
      selectedCategory.value = undefined;
    }
  },
});

const { isSmallScreen } = useDeviceType();
</script>

<template>
  <div class="relative">
    <AnimatedBorder
      :border-radius="isSmallScreen ? 20 : 1000"
      border-size="1"
      enabled-class="before:opacity-0 after:opacity-0! focus-within:after:opacity-100!"
      class="bg-panel ring-line w-full pl-5 text-[18px]/[calc(21/18)] text-ink ring-1 transition-shadow duration-500 placeholder:font-medium placeholder:text-faint before:opacity-0 after:opacity-0 has-[:not(*:focus)]:hover:ring-line-2 max-lg:h-12 lg:h-15.5 lg:pr-25 lg:pl-7.75"
    >
      <input
        id="search-input"
        v-model="searchedChannelModel"
        :placeholder="t('channels.search_placeholder')"
        type="text"
        class="text-ink placeholder:text-faint h-full w-full bg-transparent pr-12.5 text-[18px]/[calc(21/18)] font-medium"
        autocomplete="off"
      />
    </AnimatedBorder>

    <button
      v-if="!isSmallScreen"
      type="button"
      class="bg-panel-2 ring-line before-full absolute top-1/2 right-1.75 flex aspect-square h-11 -translate-y-1/2 items-center justify-center rounded-full ring-1 before:bg-line before:opacity-0 before:transition hover:before:opacity-100 max-lg:hidden"
    >
      <SvgoSearch />
    </button>
  </div>
</template>
