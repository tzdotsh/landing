import { refDebounced } from "@vueuse/core";

export function useChannelsFilters() {
  const searchedChannel = useState("channels:searched-channel", () => "");
  const selectedCategory = useState<number | undefined>(
    "channels:selected-category",
    () => undefined,
  );
  const defaultCategoryId = useState<number | undefined>(
    "channels:default-category",
    () => undefined,
  );
  const debouncedSearch = refDebounced(searchedChannel, 250);

  function setDefaultCategory(categoryId: number | undefined) {
    defaultCategoryId.value = categoryId;

    if (
      categoryId !== undefined &&
      selectedCategory.value === undefined &&
      !searchedChannel.value.trim()
    ) {
      selectedCategory.value = categoryId;
    }
  }

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
    selectedCategory.value = defaultCategoryId.value;
  }

  return {
    searchedChannel,
    debouncedSearch,
    selectedCategory,
    defaultCategoryId,
    setDefaultCategory,
    toggleCategory,
    reset,
  };
}
