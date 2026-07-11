<script lang="ts" setup>
const { t } = useI18n();

const perks = computed(() => [
  {
    icon: "percent",
    stat: t("affiliate-program.perks.commission.stat"),
    title: t("affiliate-program.perks.commission.title"),
    description: t("affiliate-program.perks.commission.description"),
  },
  {
    icon: "recurring",
    stat: t("affiliate-program.perks.recurring.stat"),
    title: t("affiliate-program.perks.recurring.title"),
    description: t("affiliate-program.perks.recurring.description"),
  },
  {
    icon: "crypto",
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
          <svg
            v-if="perk.icon === 'percent'"
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="mb-1"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="mxcAffG1"
                x1="0"
                y1="0"
                x2="24"
                y2="24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#B3EA52" />
                <stop offset="1" stop-color="#38D2A1" />
              </linearGradient>
            </defs>
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="url(#mxcAffG1)"
              stroke-width="1.6"
            />
            <path
              d="M8.5 15.5l7-7"
              stroke="url(#mxcAffG1)"
              stroke-width="1.6"
              stroke-linecap="round"
            />
            <circle
              cx="9"
              cy="9"
              r="1.3"
              stroke="url(#mxcAffG1)"
              stroke-width="1.4"
            />
            <circle
              cx="15"
              cy="15"
              r="1.3"
              stroke="url(#mxcAffG1)"
              stroke-width="1.4"
            />
          </svg>

          <svg
            v-else-if="perk.icon === 'recurring'"
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="mb-1"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="mxcAffG2"
                x1="0"
                y1="0"
                x2="24"
                y2="24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#B3EA52" />
                <stop offset="1" stop-color="#38D2A1" />
              </linearGradient>
            </defs>
            <path
              d="M21 12a9 9 0 1 1-2.64-6.36"
              stroke="url(#mxcAffG2)"
              stroke-width="1.6"
              stroke-linecap="round"
              fill="none"
            />
            <path
              d="M21 3v6h-6"
              stroke="url(#mxcAffG2)"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="none"
            />
          </svg>

          <svg
            v-else
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="mb-1"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="mxcAffG3"
                x1="0"
                y1="0"
                x2="24"
                y2="24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#B3EA52" />
                <stop offset="1" stop-color="#38D2A1" />
              </linearGradient>
            </defs>
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="url(#mxcAffG3)"
              stroke-width="1.6"
            />
            <path
              d="M12 6.5v11"
              stroke="url(#mxcAffG3)"
              stroke-width="1.6"
              stroke-linecap="round"
            />
            <path
              d="M15 8.8c-.7-.9-1.8-1.4-3-1.4-1.7 0-2.9.9-2.9 2.2 0 3 6.3 1.7 6.3 4.8 0 1.3-1.3 2.2-3.2 2.2-1.4 0-2.6-.5-3.3-1.4"
              stroke="url(#mxcAffG3)"
              stroke-width="1.6"
              stroke-linecap="round"
              fill="none"
            />
          </svg>

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
