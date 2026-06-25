<script lang="ts" setup>
const { t } = useI18n();
</script>

<template>
  <section id="hero">
    <div class="container">
      <Heading
        :title="t('blog.hero.title')"
        :description="t('blog.hero.description')"
        title-tag="h1"
        gap="30"
        size="primary"
        title-class="tracking-normal"
        description-class="max-w-[1012px] text-[22px]/[calc(26/22)] tracking-normal"
      />
    </div>
  </section>
</template>
