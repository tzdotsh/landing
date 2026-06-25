<script lang="ts" setup>
const { t } = useI18n();
</script>

<template>
  <section id="hero">
    <div class="container">
      <Heading
        title-tag="h1"
        size="primary"
        :title="t('report.hero.title')"
        title-class="tracking-normal"
      />
    </div>
  </section>
</template>
