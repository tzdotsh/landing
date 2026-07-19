<script lang="ts" setup>
import type { GuideCard } from "~/queries/apps";
import { formatGuideUpdatedAt } from "~/utils/kb";

type Props = {
  article: GuideCard;
};

const props = defineProps<Props>();

const { version } = useProject();
const localePath = useLocalePath();

// Mirrors the deterministic detail-page resolution: the guide's device/app pair.
const articlePath = computed(() =>
  localePath(
    `/v${version}/apps/${props.article.deviceSlug}/${props.article.appSlug}`,
  ),
);

const updatedLabel = computed(() =>
  formatGuideUpdatedAt(props.article.updatedAt),
);
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

        <p class="text-muted mt-2 text-[15px]/[1.55]">
          {{ article.deviceName }}
        </p>
      </div>
    </div>

    <p
      v-if="updatedLabel"
      class="text-faint mt-auto text-[13px]/none font-medium tracking-wide uppercase"
    >
      {{ $t("apps.kb.updated", { date: updatedLabel }) }}
    </p>
  </NuxtLinkLocale>
</template>
