<script lang="ts" setup>
const { t } = useI18n();
const { version } = useProject();
const localePath = useLocalePath();

const guidesPath = computed(() => localePath(`/v${version}/apps`));
</script>

<template>
  <div class="flex flex-col items-start gap-y-6">
    <NuxtLinkLocale
      :to="guidesPath"
      class="text-muted hover:text-ink inline-flex min-h-11 items-center gap-x-2 text-[15px]/none font-medium transition-colors duration-300 ease-[var(--ease-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-line-2 rounded-sm motion-reduce:transition-none"
    >
      <span aria-hidden="true">←</span>
      {{ t("apps.kb.back_to_guides") }}
    </NuxtLinkLocale>
  </div>
</template>
