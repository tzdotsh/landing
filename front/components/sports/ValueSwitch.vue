<script lang="ts" setup>
const { t } = useI18n();
</script>

<template>
  <section id="value-switch" class="relative py-14 md:py-20">
    <div class="container flex flex-col gap-y-10 lg:gap-y-12">
      <div class="flex max-w-[760px] flex-col gap-y-4">
        <h2
          class="font-heading text-[clamp(1.875rem,3.5vw,2.5rem)]/[1.12] font-bold text-ink"
        >
          {{ t("sports.value.heading") }}
        </h2>
        <p class="text-muted text-[17px]/[1.6] text-pretty">
          {{ t("sports.value.body") }}
        </p>
      </div>

      <div class="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        <article
          class="border-line bg-panel/50 rounded-card border p-6 sm:p-7"
        >
          <p
            class="text-faint mb-3 text-[12px]/none font-semibold tracking-[0.1em] uppercase"
          >
            {{ t("sports.value.old_way.label") }}
          </p>
          <p class="text-muted text-[16px]/[1.55]">
            {{ t("sports.value.old_way.description") }}
          </p>
        </article>

        <article
          class="border-line bg-panel/80 relative overflow-hidden rounded-card border p-6 shadow-[0_12px_40px_rgba(0,0,0,0.24)] sm:p-7"
        >
          <div
            class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,color-mix(in_srgb,var(--color-teal)_12%,transparent),transparent_65%)]"
            aria-hidden="true"
          />
          <p
            class="text-faint relative mb-3 text-[12px]/none font-semibold tracking-[0.1em] uppercase"
          >
            {{ t("sports.value.maxco_way.label") }}
          </p>
          <p class="text-ink relative text-[16px]/[1.55] font-medium">
            {{ t("sports.value.maxco_way.description") }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
