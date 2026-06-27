import { useChannelsFilters } from "~/composables/useChannelsFilters";
import { useChannelsCategoriesQuery } from "~/queries/channels";

/** Select the first sidebar category on load; restore it when search is cleared. */
export function useChannelsDefaultCategory() {
  const { debouncedSearch, selectedCategory, setDefaultCategory } =
    useChannelsFilters();
  const categoriesQuery = useChannelsCategoriesQuery();

  watch(
    () => categoriesQuery.state.value.data,
    (categories) => {
      const firstCategoryId = categories?.[0]?.id;
      setDefaultCategory(firstCategoryId);
    },
    { immediate: true },
  );

  watch(debouncedSearch, (query, previousQuery) => {
    if (query.trim() || !previousQuery?.trim() || selectedCategory.value) {
      return;
    }

    setDefaultCategory(categoriesQuery.state.value.data?.[0]?.id);
  });
}
