<script lang="ts" setup>
const { t } = useI18n();
</script>

<template>
  <section id="hero" class="relative overflow-hidden">
    <HomeSectionGlow
      class="left-1/2 top-1/2 h-[min(28rem,55vh)] w-[min(32rem,70vw)] -translate-x-1/2 -translate-y-1/2 blur-[5rem]"
      strength="5%"
    />

    <div
      class="container relative flex flex-col items-center gap-y-10 pt-[186px] pb-15 text-center"
    >
      <div class="mx-auto flex max-w-[760px] flex-col gap-y-6">
        <h1
          class="font-heading text-[clamp(2.5rem,6vw,4.5rem)]/[1.05] font-bold tracking-tight text-ink"
        >
          {{ t("resellers.hero.title_before") }}
          <span class="brand-gradient-text">{{ t("resellers.hero.title_highlight") }}</span>{{ t("resellers.hero.title_after") }}
        </h1>

        <p
          class="mx-auto max-w-[680px] text-[clamp(1.05rem,2vw,1.25rem)]/[1.55] text-muted"
        >
          {{ t("resellers.hero.description") }}
        </p>
      </div>

      <Cta
        to="#pricing"
        class="w-full sm:w-auto"
        radius="large"
        size="large"
        btn-class="brand-gradient text-on-accent text-[20px]/[1.2] font-semibold transition duration-300 ease-[var(--ease-brand)]"
      >
        {{ t("resellers.hero.cta_primary") }}
      </Cta>
    </div>
  </section>
</template>
