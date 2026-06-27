<script lang="ts" setup>
const { t } = useI18n();
</script>

<template>
  <section id="value-stack" class="relative py-14 md:py-20">
    <div class="container flex max-w-[760px] flex-col gap-y-4">
      <h2
        class="font-heading text-[clamp(1.875rem,3.5vw,2.5rem)]/[1.12] font-bold text-ink"
      >
        {{ t("vod.value.heading") }}
      </h2>
      <p class="text-muted text-[17px]/[1.6] text-pretty">
        {{ t("vod.value.body") }}
      </p>
    </div>
  </section>
</template>
