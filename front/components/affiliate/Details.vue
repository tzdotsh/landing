<script lang="ts" setup>
const { t } = useI18n();

const details = computed(() =>
  ["commission", "duration", "tracking", "payouts", "cost", "approval"].map(
    (key) => ({
      label: t(`affiliate-program.details.${key}.label`),
      value: t(`affiliate-program.details.${key}.value`),
    }),
  ),
);
</script>

<template>
  <section id="details">
    <div class="container">
      <div class="mx-auto max-w-[640px]">
        <h2 class="mb-6 text-center text-[26px]/[32px] font-bold text-white">
          {{ $t("affiliate-program.details.title") }}
        </h2>

        <div class="glass-effect-ring overflow-hidden rounded-[15px]">
          <div
            v-for="(detail, i) in details"
            :key="i"
            :class="[
              'flex items-center px-5 py-3',
              i < details.length - 1 ? 'border-b border-white/5' : '',
            ]"
          >
            <span class="text-muted flex-1 text-[13px]/[19px]">
              {{ detail.label }}
            </span>
            <span class="text-[13px]/[19px] font-semibold text-white">
              {{ detail.value }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
