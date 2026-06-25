<script lang="ts" setup>
const { t } = useI18n();
</script>

<template>
  <section id="final-cta" class="relative">
    <HomeSectionGlow
      class="bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 translate-y-1/3 blur-[4rem]"
      strength="5%"
    />

    <div class="container relative">
      <div
        class="relative overflow-hidden rounded-card border border-line bg-panel/75 px-6 py-12 text-center shadow-[0_12px_48px_rgba(0,0,0,0.28)] backdrop-blur-md sm:px-10 sm:py-14 lg:px-16 lg:py-16"
      >
        <div
          class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,color-mix(in_srgb,var(--color-teal)_10%,transparent),transparent_65%)]"
          aria-hidden="true"
        />

        <div class="relative flex flex-col items-center gap-y-6">
          <h2 class="font-heading max-w-[640px] text-[clamp(1.75rem,4vw,2.5rem)]/[1.15] font-bold text-ink">
            {{ t("resellers.final_cta.title") }}
          </h2>

          <p class="text-muted max-w-[560px] text-[17px]/[1.6]">
            {{ t("resellers.final_cta.description") }}
          </p>

          <Cta
            to="#pricing"
            btn-class="brand-gradient text-on-accent mt-2 inline-flex min-h-[56px] items-center justify-center rounded-btn px-8 text-[18px] font-semibold transition duration-300 ease-[var(--ease-brand)]"
          >
            {{ t("resellers.final_cta.button") }}
          </Cta>
        </div>
      </div>
    </div>
  </section>
</template>
