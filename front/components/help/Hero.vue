<script lang="ts" setup>
const { t } = useI18n();

const searchQuery = defineModel<string>("searchQuery", { default: "" });
</script>

<template>
  <section id="hero">
    <div class="container flex flex-col items-center gap-y-8 text-center">
      <Heading
        :title="t('apps.hero.title', { br: '<br />' })"
        :description="t('apps.hero.description')"
        title-tag="h1"
        gap="30"
        size="primary"
        title-class="tracking-normal"
        description-class="max-w-[920px] text-[22px]/[calc(26/22)] tracking-normal"
      />

      <div class="relative w-full max-w-[720px]">
        <label class="sr-only" for="kb-search-input">
          {{ t("apps.kb.search_label") }}
        </label>

        <AnimatedBorder
          border-radius="16"
          border-size="1"
          enabled-class="before:opacity-0 after:opacity-0! focus-within:after:opacity-100!"
          class="bg-panel/80 ring-line w-full pl-5 text-[18px]/[calc(21/18)] text-ink ring-1 backdrop-blur-sm transition-shadow duration-300 ease-[var(--ease-brand)] placeholder:font-medium placeholder:text-faint before:opacity-0 after:opacity-0 has-[:not(*:focus)]:hover:ring-line-2 max-lg:h-12 lg:h-15.5 lg:pl-7"
        >
          <input
            id="kb-search-input"
            v-model="searchQuery"
            :placeholder="t('apps.kb.search_placeholder')"
            type="search"
            autocomplete="off"
            class="text-ink placeholder:text-faint h-full w-full bg-transparent pr-12 text-[18px]/[calc(21/18)] font-medium focus:outline-none"
          />
        </AnimatedBorder>

        <div
          class="text-muted pointer-events-none absolute top-1/2 right-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center"
          aria-hidden="true"
        >
          <SvgoSearch class="h-5 w-5" />
        </div>
      </div>
    </div>
  </section>
</template>
