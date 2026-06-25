<script lang="ts" setup>
interface Props {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
}

interface Emits {
  (e: "page-changed", page: number): void;
}

const props = withDefaults(defineProps<Props>(), {
  maxVisiblePages: 5,
});

const emit = defineEmits<Emits>();

// Computed values for pagination display
const visiblePages = computed(() => {
  const { currentPage, totalPages, maxVisiblePages } = props;
  const pages: number[] = [];

  if (totalPages <= maxVisiblePages) {
    // Show all pages if total pages is less than max visible
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Calculate range of pages to show
    const halfVisible = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - halfVisible);
    let end = Math.min(totalPages, currentPage + halfVisible);

    // Adjust if we're near the beginning or end
    if (end - start + 1 < maxVisiblePages) {
      if (start === 1) {
        end = Math.min(totalPages, start + maxVisiblePages - 1);
      } else if (end === totalPages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
    }

    // Add first page and ellipsis if needed
    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push(-1); // -1 represents ellipsis
      }
    }

    // Add visible pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis and last page if needed
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push(-1); // -1 represents ellipsis
      }
      pages.push(totalPages);
    }
  }

  return pages;
});

const canGoPrevious = computed(() => props.currentPage > 1);
const canGoNext = computed(() => props.currentPage < props.totalPages);

// Methods
const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit("page-changed", page);
  }
};

const previousPage = () => {
  if (canGoPrevious.value) {
    emit("page-changed", props.currentPage - 1);
  }
};

const nextPage = () => {
  if (canGoNext.value) {
    emit("page-changed", props.currentPage + 1);
  }
};
</script>

<template>
  <nav
    v-if="totalPages > 1"
    class="flex items-center justify-center gap-3"
    aria-label="Pagination Navigation"
  >
    <!-- Previous Button -->
    <button
      :disabled="!canGoPrevious"
      class="flex h-10 w-10 items-center justify-center rounded-btn font-medium transition-all duration-300 ease-[var(--ease-brand)]"
      :class="
        canGoPrevious
          ? 'bg-panel text-ink ring-1 ring-line hover:bg-panel-2 cursor-pointer'
          : 'cursor-not-allowed bg-panel/50 text-muted opacity-50'
      "
      aria-label="Previous page"
      @click="previousPage"
    >
      <SvgoArrow class="h-4 w-4 rotate-180" />
    </button>

    <!-- Page Numbers -->
    <div class="flex items-center gap-2">
      <template v-for="(page, index) in visiblePages" :key="`page-${index}`">
        <!-- Ellipsis -->
        <span
          v-if="page === -1"
          class="text-muted flex h-10 w-10 items-center justify-center"
          aria-hidden="true"
        >
          ...
        </span>

        <!-- Page Number -->
        <button
          v-else
          :class="[
            'flex h-10 w-10 items-center justify-center rounded-btn font-medium transition-all duration-300 ease-[var(--ease-brand)]',
            page === currentPage
              ? 'brand-gradient text-on-accent shadow-[0_0_16px_var(--color-glow)]'
              : 'bg-panel text-ink ring-1 ring-line hover:bg-panel-2 cursor-pointer',
          ]"
          :aria-label="`Go to page ${page}`"
          :aria-current="page === currentPage ? 'page' : undefined"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </template>
    </div>

    <!-- Next Button -->
    <button
      :disabled="!canGoNext"
      :class="[
        'flex h-10 w-10 items-center justify-center rounded-btn font-medium transition-all duration-300 ease-[var(--ease-brand)]',
        canGoNext
          ? 'bg-panel text-ink ring-1 ring-line hover:bg-panel-2 cursor-pointer'
          : 'cursor-not-allowed bg-panel/50 text-muted opacity-50',
      ]"
      aria-label="Next page"
      @click="nextPage"
    >
      <SvgoArrow class="h-4 w-4" />
    </button>
  </nav>
</template>
