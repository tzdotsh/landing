<script lang="ts" setup>
import type { KbArticle } from "~/data/kb-articles";
import { formatKbUpdatedAt, formatKbViews } from "~/utils/kb";

type Props = {
  article: KbArticle;
};

const props = defineProps<Props>();

const { version } = useProject();
const localePath = useLocalePath();

const articlePath = computed(() =>
  localePath(`/v${version}/help/${props.article.slug}`),
);

const updatedLabel = computed(() =>
  formatKbUpdatedAt(props.article.updatedAt),
);

const metaHint = computed(() => {
  if (updatedLabel.value) {
    return { type: "updated" as const, value: updatedLabel.value };
  }

  if (props.article.views > 0) {
    return { type: "views" as const, value: formatKbViews(props.article.views) };
  }

  return null;
});
</script>

<template>
  <NuxtLinkLocale
    :to="articlePath"
    class="group bg-panel/70 ring-line hover:border-line-2 flex h-full min-h-[148px] flex-col gap-y-3 rounded-card border border-transparent p-5 ring-1 transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-brand)] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-line-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
  >
    <div class="flex items-start gap-x-3">
      <span
        class="brand-gradient mt-1 h-8 w-1 shrink-0 rounded-full opacity-80 transition-opacity duration-300 ease-[var(--ease-brand)] group-hover:opacity-100"
        aria-hidden="true"
      />

      <div class="min-w-0 flex-1">
        <h3
          class="font-heading text-ink line-clamp-2 text-[18px]/[1.35] font-semibold tracking-normal"
        >
          {{ article.title }}
        </h3>

        <p
          v-if="article.description"
          class="text-muted mt-2 line-clamp-2 text-[15px]/[1.55]"
        >
          {{ article.description }}
        </p>
      </div>
    </div>

    <p
      v-if="metaHint"
      class="text-faint mt-auto text-[13px]/none font-medium tracking-wide uppercase"
    >
      <template v-if="metaHint.type === 'updated'">
        {{ $t("apps.kb.updated", { date: metaHint.value }) }}
      </template>
      <template v-else>
        {{ $t("apps.kb.views", { count: metaHint.value }) }}
      </template>
    </p>
  </NuxtLinkLocale>
</template>
