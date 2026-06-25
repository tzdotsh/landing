<script lang="ts" setup>
const { locale } = useI18n();

const { pending, data: reportDisclaimer } = await useAsyncData(
  () => `report-disclaimer-${locale.value}`,
  () =>
    $fetch("/api/legal/report", {
      query: { locale: locale.value },
    }),
  { watch: [locale] },
);
</script>

<template>
  <section v-if="pending || reportDisclaimer?.html" id="disclaimer">
    <div class="container">
      <CommonMarkdownRender
        :loading="pending"
        class="mx-auto max-w-[1012px]"
      >
        <div v-if="reportDisclaimer?.html" v-html="reportDisclaimer.html" />
      </CommonMarkdownRender>
    </div>
  </section>
</template>

<style scoped lang="sass">
#disclaimer :deep(.markdown-body)
  color: white
  opacity: .6

  *
    font-size: 22px
    line-height: 26px

  h3
    font-weight: 800

  strong
    color: white

  p
    margin: 26px 0
    font-weight: 400
</style>
