<script lang="ts" setup>
const { t } = useI18n();

const rows = computed(() => [
  {
    customers: t("affiliate-program.earnings.rows.r1.customers"),
    amount: t("affiliate-program.earnings.rows.r1.amount"),
    highlight: false,
  },
  {
    customers: t("affiliate-program.earnings.rows.r2.customers"),
    amount: t("affiliate-program.earnings.rows.r2.amount"),
    highlight: false,
  },
  {
    customers: t("affiliate-program.earnings.rows.r3.customers"),
    amount: t("affiliate-program.earnings.rows.r3.amount"),
    highlight: true,
  },
  {
    customers: t("affiliate-program.earnings.rows.r4.customers"),
    amount: t("affiliate-program.earnings.rows.r4.amount"),
    highlight: false,
  },
]);
</script>

<template>
  <section id="earnings">
    <div class="container">
      <div class="mx-auto max-w-[640px]">
        <div class="mb-3 flex justify-center">
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="mxcAffG4"
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
            <ellipse
              cx="12"
              cy="5.5"
              rx="7"
              ry="2.8"
              stroke="url(#mxcAffG4)"
              stroke-width="1.6"
            />
            <path
              d="M5 5.5v6c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8v-6"
              stroke="url(#mxcAffG4)"
              stroke-width="1.6"
              fill="none"
            />
            <path
              d="M5 11.5v6c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8v-6"
              stroke="url(#mxcAffG4)"
              stroke-width="1.6"
              fill="none"
            />
          </svg>
        </div>

        <h2 class="mb-2 text-center text-[26px]/[32px] font-bold text-white">
          {{ $t("affiliate-program.earnings.title") }}
        </h2>
        <p class="text-muted mb-6 text-center text-[14px]/[20px]">
          {{ $t("affiliate-program.earnings.subtitle") }}
        </p>

        <div class="glass-effect-ring overflow-hidden rounded-[15px]">
          <div class="flex border-b border-white/10 px-5 py-3">
            <span
              class="text-muted flex-1 text-[11px]/[15px] font-semibold tracking-[.12em] uppercase"
            >
              {{ $t("affiliate-program.earnings.col-customers") }}
            </span>
            <span
              class="text-muted text-[11px]/[15px] font-semibold tracking-[.12em] uppercase"
            >
              {{ $t("affiliate-program.earnings.col-earn") }}
            </span>
          </div>

          <div
            v-for="(row, i) in rows"
            :key="i"
            :class="[
              'flex items-center px-5 py-3.5',
              i < rows.length - 1 ? 'border-b border-white/5' : '',
              row.highlight ? 'bg-[#38D2A1]/8' : '',
            ]"
          >
            <span
              :class="[
                'flex-1 text-[15px]/[20px] text-white',
                row.highlight ? 'font-semibold' : '',
              ]"
            >
              {{ row.customers }}
            </span>
            <span
              v-if="row.highlight"
              class="bg-gradient-to-r from-[#B3EA52] to-[#38D2A1] bg-clip-text text-[15px]/[20px] font-bold text-transparent"
            >
              {{ row.amount }}
            </span>
            <span v-else class="text-[15px]/[20px] font-semibold text-white">
              {{ row.amount }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
