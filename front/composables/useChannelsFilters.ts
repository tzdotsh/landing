import { refDebounced } from "@vueuse/core";

export function useChannelsFilters() {
  const searchedChannel = useState("channels:searched-channel", () => "");
  const selectedCategory = useState<number | undefined>(
    "channels:selected-category",
    () => undefined,
  );
  const debouncedSearch = refDebounced(searchedChannel, 250);

  function toggleCategory(categoryId: number | undefined) {
    if (selectedCategory.value === categoryId) {
      selectedCategory.value = undefined;
      return;
    }

    if (categoryId) {
      selectedCategory.value = categoryId;
    }
  }

  function reset() {
    searchedChannel.value = "";
    selectedCategory.value = undefined;
  }

  return {
    searchedChannel,
    debouncedSearch,
    selectedCategory,
    toggleCategory,
    reset,
  };
}
