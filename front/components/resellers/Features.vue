<script lang="ts" setup>
const { t } = useI18n();

const items = [
  {
    key: "reseller_dashboard",
    variant: "dashboard" as const,
  },
  {
    key: "api_access",
    variant: "api" as const,
  },
  {
    key: "custom_dns",
    variant: "dns" as const,
  },
  {
    key: "vip_support",
    variant: "support" as const,
  },
  {
    key: "data_privacy",
    variant: "privacy" as const,
  },
  {
    key: "free_trials",
    variant: "trials" as const,
  },
];
</script>

<template>
  <section id="features">
    <div class="container flex flex-col gap-y-16 lg:gap-y-20">
      <div class="flex flex-col gap-y-6">
        <h2
          class="font-heading text-[clamp(2rem,4vw,2.75rem)]/[1.1] font-bold text-ink"
        >
          {{ t("resellers.features.title") }}
        </h2>
        <p class="text-muted max-w-[720px] text-[18px]/[1.55]">
          {{ t("resellers.features.description") }}
        </p>
      </div>

      <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        <article
          v-for="item in items"
          :key="item.key"
          class="group relative overflow-hidden rounded-card border border-line bg-panel/70 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.22)] backdrop-blur-md transition duration-300 ease-[var(--ease-brand)] hover:-translate-y-0.5 hover:border-line-2 hover:shadow-[0_16px_48px_rgba(0,0,0,0.28)]"
        >
          <div
            class="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-teal)_14%,transparent),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          />

          <ResellersBenefitIcon
            :variant="item.variant"
            class="mb-6"
          />

          <h3 class="font-heading mb-3 text-[22px]/[1.2] font-semibold text-ink">
            {{ t(`resellers.features.items.${item.key}.title`) }}
          </h3>

          <p class="text-[15px]/[1.6] text-muted">
            {{ t(`resellers.features.items.${item.key}.description`) }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
