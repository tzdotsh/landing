<script lang="ts" setup>
const { t } = useI18n();

const cards = ["anytime", "updated", "quality"] as const;
</script>

<template>
  <section id="features" class="relative py-14 md:py-20">
    <div class="container flex flex-col gap-y-10 lg:gap-y-12">
      <div class="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
        <article
          v-for="key in cards"
          :key="key"
          class="border-line bg-panel/70 rounded-card border p-6 shadow-[0_8px_32px_rgba(0,0,0,0.22)] backdrop-blur-md"
        >
          <h3 class="font-heading mb-3 text-[20px]/[1.25] font-semibold text-ink">
            {{ t(`vod.features.cards.${key}.title`) }}
          </h3>
          <p class="text-muted text-[15px]/[1.6]">
            {{ t(`vod.features.cards.${key}.description`) }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
