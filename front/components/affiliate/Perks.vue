<script lang="ts" setup>
const { t } = useI18n();

const perks = computed(() => [
  {
    stat: t("affiliate-program.perks.commission.stat"),
    title: t("affiliate-program.perks.commission.title"),
    description: t("affiliate-program.perks.commission.description"),
  },
  {
    stat: t("affiliate-program.perks.recurring.stat"),
    title: t("affiliate-program.perks.recurring.title"),
    description: t("affiliate-program.perks.recurring.description"),
  },
  {
    stat: t("affiliate-program.perks.payouts.stat"),
    title: t("affiliate-program.perks.payouts.title"),
    description: t("affiliate-program.perks.payouts.description"),
  },
]);
</script>

<template>
  <section id="perks">
    <div class="container">
      <div class="mx-auto grid max-w-[1012px] gap-5 md:grid-cols-3">
        <div
          v-for="(perk, i) in perks"
          :key="i"
          class="glass-effect-ring flex flex-col gap-y-2 rounded-[15px] px-6 py-7"
        >
          <p class="text-[34px]/[40px] font-bold text-white">
            {{ perk.stat }}
          </p>
          <p class="text-[17px]/[22px] font-semibold text-white">
            {{ perk.title }}
          </p>
          <p class="text-muted text-[15px]/[21px]">
            {{ perk.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
