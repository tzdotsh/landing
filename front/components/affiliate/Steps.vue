<script lang="ts" setup>
const { t } = useI18n();

const steps = computed(() =>
  ["s1", "s2", "s3", "s4"].map((key, i) => ({
    number: String(i + 1),
    title: t(`affiliate-program.steps.${key}.title`),
    description: t(`affiliate-program.steps.${key}.description`),
  })),
);
</script>

<template>
  <section id="how-it-works">
    <div class="container">
      <h2 class="mb-6 text-center text-[26px]/[32px] font-bold text-white">
        {{ $t("affiliate-program.steps.title") }}
      </h2>

      <div
        class="mx-auto grid max-w-[1012px] gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <div
          v-for="step in steps"
          :key="step.number"
          class="glass-effect-ring flex flex-col gap-y-1.5 rounded-[12px] px-5 py-5"
        >
          <p
            class="bg-gradient-to-r from-[#B3EA52] to-[#38D2A1] bg-clip-text text-[20px]/[24px] font-bold text-transparent"
          >
            {{ step.number }}
          </p>
          <p class="text-[14px]/[19px] font-semibold text-white">
            {{ step.title }}
          </p>
          <p class="text-muted text-[13px]/[19px]">
            {{ step.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
