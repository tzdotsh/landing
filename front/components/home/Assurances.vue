<script lang="ts" setup>
import TvBuffering from "./Assurances/TvBuffering.vue";
import NoDowntime from "./Assurances/NoDowntime.vue";
import QualityComparaison from "./Assurances/QualityComparaison.vue";
import QuickSupport from "./Assurances/QuickSupport.vue";

const { t } = useI18n();
const reducedMotion = usePreferredReducedMotion();

const staticMotion = computed(() => reducedMotion.value === "reduce");

const assuranceKeys = [
  "no_buffering",
  "no_downtime",
  "high_quality",
  "quick_support",
] as const;

const components = [TvBuffering, NoDowntime, QualityComparaison, QuickSupport];

const items = computed(() =>
  assuranceKeys.map((key, index) => ({
    key,
    title: t(`home.assurances.${key}.title`),
    content: t(`home.assurances.${key}.description`),
    component: components[index]!,
  })),
);
</script>

<template>
  <HomeBackground
    id="assurances"
    tag="section"
    color="dark"
    class="py-16 md:py-24"
  >
    <div class="container">
      <div class="mx-auto mb-8 max-w-[920px] text-center md:mb-10">
        <h2
          class="font-heading text-ink text-[clamp(1.875rem,4vw,2.75rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-balance"
        >
          {{ t("home.assurances.title") }}
        </h2>
      </div>

      <div class="mx-auto flex min-h-[720px] max-w-[920px] flex-col gap-y-5 md:gap-y-6">
        <article
          v-for="item in items"
          :key="item.key"
          class="border-line bg-panel overflow-hidden rounded-card border p-4 md:p-5"
        >
          <div
            class="grid items-center gap-y-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-x-6"
          >
            <component
              :is="item.component"
              :static-motion="staticMotion"
              class="mx-auto w-full max-w-[440px] lg:mx-0"
            />

            <div class="flex flex-col gap-y-2.5 text-left lg:px-1">
              <h3
                class="font-heading text-ink text-[clamp(1.25rem,2.8vw,1.625rem)] leading-[1.15] font-bold tracking-[-0.01em] text-balance"
              >
                {{ item.title }}
              </h3>
              <p
                class="text-muted text-[15px]/[1.55] font-medium text-pretty sm:text-[16px]/[1.55]"
              >
                {{ item.content }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </HomeBackground>
</template>
