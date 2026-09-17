<script lang="ts" setup>
const { t } = useI18n();
const localePath = useLocalePath();

const guidesPath = computed(() => localePath("/apps"));
</script>

<template>
  <div class="flex flex-col items-start gap-y-6">
    <NuxtLinkLocale
      :to="guidesPath"
      class="text-muted hover:text-ink focus-visible:ring-line-2 inline-flex min-h-11 items-center gap-x-2 rounded-sm text-[15px]/none font-medium transition-colors duration-300 ease-[var(--ease-brand)] focus-visible:ring-2 focus-visible:outline-none motion-reduce:transition-none"
    >
      <span aria-hidden="true">←</span>
      {{ t("apps.kb.back_to_guides") }}
    </NuxtLinkLocale>
  </div>
</template>
