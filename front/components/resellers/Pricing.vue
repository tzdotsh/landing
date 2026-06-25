<script lang="ts" setup>
import {
  PREPAID_TIERS,
  UNLIMITED_TIERS,
  featuredTierIndex,
  formatGbp,
  type PrepaidTier,
  type ResellerModel,
  type UnlimitedTier,
} from "@/configs/resellersPricing";

const { t, tm, rt } = useI18n();
const reducedMotion = usePreferredReducedMotion();

const model = ref<ResellerModel>("prepaid");
const tierIndex = ref(featuredTierIndex("prepaid"));
const trackRef = ref<HTMLElement | null>(null);
const dragging = ref(false);

const tiers = computed(() =>
  model.value === "prepaid" ? PREPAID_TIERS : UNLIMITED_TIERS,
);

const currentTier = computed(() => tiers.value[tierIndex.value]!);

const isPrepaid = computed(() => model.value === "prepaid");

const prepaidTier = computed(() =>
  isPrepaid.value ? (currentTier.value as PrepaidTier) : null,
);

const unlimitedTier = computed(() =>
  !isPrepaid.value ? (currentTier.value as UnlimitedTier) : null,
);

const thumbPercent = computed(() => (tierIndex.value / 2) * 100);

const sliderLabel = computed(() => {
  const tier = currentTier.value;

  if (isPrepaid.value) {
    const prepaid = tier as PrepaidTier;
    return `${prepaid.name}, ${formatGbp(prepaid.price)}, ${prepaid.credits} credits`;
  }

  const unlimited = tier as UnlimitedTier;
  return `${unlimited.name}, ${formatGbp(unlimited.price, "/mo")}, ${unlimited.capacity}`;
});

const orderLabel = computed(() => {
  if (isPrepaid.value) {
    return t("resellers.pricing.order", {
      price: formatGbp(prepaidTier.value!.price),
    });
  }

  return t("resellers.pricing.order", {
    price: formatGbp(unlimitedTier.value!.price, "/mo"),
  });
});

const sharedFeatures = computed(() => {
  const key = isPrepaid.value
    ? "resellers.pricing.prepaid_features"
    : "resellers.pricing.unlimited_features";

  return tm<any, any, any, any, string[]>(key);
});

const subResellerFeature = computed(() => {
  if (isPrepaid.value) {
    return prepaidTier.value!.subResellers
      ? t("resellers.pricing.features.sub_resellers_yes")
      : t("resellers.pricing.features.sub_resellers_no");
  }

  return t("resellers.pricing.features.sub_resellers_count", {
    count: unlimitedTier.value!.subResellers,
  });
});

const subResellerIncluded = computed(() => {
  if (isPrepaid.value) return prepaidTier.value!.subResellers;

  return unlimitedTier.value!.subResellers !== "No";
});

const motionSafe = computed(() => reducedMotion.value !== "reduce");

function setModel(next: ResellerModel) {
  if (model.value === next) return;

  model.value = next;
  tierIndex.value = featuredTierIndex(next);
}

function setTierIndex(index: number) {
  tierIndex.value = Math.min(2, Math.max(0, index));
}

function tierFromClientX(clientX: number) {
  const track = trackRef.value;
  if (!track) return;

  const rect = track.getBoundingClientRect();
  const ratio = (clientX - rect.left) / rect.width;
  const snapped = Math.round(ratio * 2);

  setTierIndex(snapped);
}

function onTrackClick(event: MouseEvent) {
  tierFromClientX(event.clientX);
}

function onTrackKeydown(event: KeyboardEvent) {
  if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
    event.preventDefault();
    setTierIndex(tierIndex.value - 1);
  } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
    event.preventDefault();
    setTierIndex(tierIndex.value + 1);
  } else if (event.key === "Home") {
    event.preventDefault();
    setTierIndex(0);
  } else if (event.key === "End") {
    event.preventDefault();
    setTierIndex(2);
  }
}

function onThumbPointerDown(event: PointerEvent) {
  dragging.value = true;
  (event.target as HTMLElement).setPointerCapture(event.pointerId);
}

function onThumbPointerMove(event: PointerEvent) {
  if (!dragging.value) return;

  tierFromClientX(event.clientX);
}

function onThumbPointerUp(event: PointerEvent) {
  dragging.value = false;
  (event.target as HTMLElement).releasePointerCapture(event.pointerId);
}
</script>

<template>
  <section id="pricing" class="relative">
    <HomeSectionGlow
      class="left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 blur-[5rem]"
      strength="5%"
    />

    <div class="container relative flex flex-col gap-y-12 lg:gap-y-16">
      <div class="flex flex-col gap-y-6">
        <h2
          class="font-heading text-[clamp(2rem,4vw,2.75rem)]/[1.1] font-bold text-ink"
        >
          {{ t("resellers.pricing.title") }}
        </h2>
        <p class="text-muted max-w-[760px] text-[18px]/[1.55]">
          {{ t("resellers.pricing.description") }}
        </p>
      </div>

      <div
        class="rounded-card border border-line bg-panel/70 p-5 shadow-[0_12px_48px_rgba(0,0,0,0.28)] backdrop-blur-md sm:p-8 lg:p-10"
      >
        <div
          class="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
        >
          <p class="text-muted text-[14px] font-medium uppercase tracking-[0.12em]">
            {{ t("resellers.pricing.model_label") }}
          </p>

          <div
            role="tablist"
            :aria-label="t('resellers.pricing.model_label')"
            class="border-line bg-bg-deep/80 inline-flex rounded-full border p-1"
          >
            <button
              type="button"
              role="tab"
              :aria-selected="model === 'prepaid'"
              class="min-h-11 rounded-full px-5 text-[15px] font-semibold transition duration-300 ease-[var(--ease-brand)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-teal)]"
              :class="
                model === 'prepaid'
                  ? 'brand-gradient text-on-accent shadow-[0_0_20px_color-mix(in_srgb,var(--color-glow)_35%,transparent)]'
                  : 'text-muted hover:text-ink'
              "
              @click="setModel('prepaid')"
            >
              {{ t("resellers.pricing.models.prepaid") }}
            </button>

            <button
              type="button"
              role="tab"
              :aria-selected="model === 'unlimited'"
              class="min-h-11 rounded-full px-5 text-[15px] font-semibold transition duration-300 ease-[var(--ease-brand)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-teal)]"
              :class="
                model === 'unlimited'
                  ? 'brand-gradient text-on-accent shadow-[0_0_20px_color-mix(in_srgb,var(--color-glow)_35%,transparent)]'
                  : 'text-muted hover:text-ink'
              "
              @click="setModel('unlimited')"
            >
              {{ t("resellers.pricing.models.unlimited") }}
            </button>
          </div>
        </div>

        <div
          class="mb-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-start"
        >
          <div
            class="relative overflow-hidden rounded-card border border-line bg-bg-deep/50 p-6 sm:p-8"
          >
            <div
              v-if="currentTier.featured"
              class="brand-gradient text-on-accent mb-4 inline-flex rounded-full px-3 py-1 text-[12px] font-semibold uppercase tracking-wide"
            >
              {{ t("resellers.pricing.featured") }}
            </div>

            <Transition
              :name="motionSafe ? 'tier-fade' : ''"
              mode="out-in"
            >
              <div :key="`${model}-${tierIndex}`">
                <p class="text-muted mb-2 text-[14px] font-medium uppercase tracking-[0.1em]">
                  {{ t("resellers.pricing.selected_plan") }}
                </p>

                <h3 class="font-heading mb-4 text-[clamp(1.5rem,3vw,2rem)] font-bold text-ink">
                  {{ currentTier.name }}
                </h3>

                <p class="mb-2 tabular-nums">
                  <span class="font-heading text-[clamp(2.5rem,6vw,3.75rem)] font-bold text-ink">
                    {{
                      isPrepaid
                        ? formatGbp(prepaidTier!.price)
                        : formatGbp(unlimitedTier!.price)
                    }}
                  </span>
                  <span
                    v-if="!isPrepaid"
                    class="text-muted ml-1 text-[clamp(1rem,2vw,1.25rem)] font-medium"
                  >
                    /mo
                  </span>
                </p>

                <p class="text-ink mb-1 text-[18px] font-semibold tabular-nums">
                  <template v-if="isPrepaid">
                    {{ prepaidTier!.credits }}
                    {{ t("resellers.pricing.yield.credits") }}
                  </template>
                  <template v-else>
                    {{ unlimitedTier!.capacity }}
                  </template>
                </p>

                <p class="text-muted text-[15px]">
                  <template v-if="isPrepaid">
                    {{ prepaidTier!.rate }}
                    <span
                      v-if="tierIndex === 2"
                      class="text-teal ml-2 font-medium"
                    >
                      ({{ t("resellers.pricing.best_value") }})
                    </span>
                  </template>
                  <template v-else>
                    {{ t("resellers.pricing.yield.capacity_note") }}
                  </template>
                </p>
              </div>
            </Transition>
          </div>

          <ul class="flex flex-col gap-y-3">
            <li
              v-for="(feature, index) in sharedFeatures"
              :key="`shared-${index}`"
              class="text-ink flex items-start gap-x-3 text-[15px]/[1.5]"
            >
              <SvgoCheck class="text-teal mt-0.5 h-5 w-5 shrink-0" />
              <span>{{ rt(feature) }}</span>
            </li>

            <li class="text-ink flex items-start gap-x-3 text-[15px]/[1.5]">
              <SvgoCheck
                v-if="subResellerIncluded"
                class="text-teal mt-0.5 h-5 w-5 shrink-0"
              />
              <span
                v-else
                class="text-muted mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-[14px]"
                aria-hidden="true"
              >
                —
              </span>
              <span>{{ subResellerFeature }}</span>
            </li>
          </ul>
        </div>

        <div class="mb-8">
          <div
            ref="trackRef"
            role="slider"
            tabindex="0"
            :aria-label="t('resellers.pricing.slider_label')"
            aria-orientation="horizontal"
            :aria-valuemin="0"
            :aria-valuemax="2"
            :aria-valuenow="tierIndex"
            :aria-valuetext="sliderLabel"
            class="relative h-12 cursor-pointer touch-none select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-teal)]"
            @click="onTrackClick"
            @keydown="onTrackKeydown"
          >
            <div
              class="absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-line"
              aria-hidden="true"
            >
              <div
                class="bg-teal/80 h-full rounded-full transition-[width] duration-300 ease-[var(--ease-brand)] motion-reduce:transition-none"
                :style="{ width: `${thumbPercent}%` }"
              />
            </div>

            <div
              class="border-ink bg-panel absolute top-1/2 z-10 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-teal)_25%,transparent),0_8px_24px_rgba(0,0,0,0.35)] transition duration-300 ease-[var(--ease-brand)] motion-reduce:transition-none"
              :class="dragging ? 'scale-105 motion-reduce:scale-100' : ''"
              :style="{ left: `${thumbPercent}%` }"
              aria-hidden="true"
              @pointerdown="onThumbPointerDown"
              @pointermove="onThumbPointerMove"
              @pointerup="onThumbPointerUp"
              @pointercancel="onThumbPointerUp"
            />
          </div>

          <div
            class="mt-8 grid grid-cols-3 gap-2"
            role="group"
            :aria-label="t('resellers.pricing.slider_label')"
          >
            <button
              v-for="(tier, index) in tiers"
              :key="tier.id"
              type="button"
              class="flex min-h-11 flex-col items-center gap-y-1 rounded-lg border px-1 py-2 text-center transition duration-300 ease-[var(--ease-brand)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-teal)]"
              :class="
                tierIndex === index
                  ? 'border-line-2 bg-panel/80 text-ink'
                  : 'border-transparent text-muted hover:border-line hover:text-ink'
              "
              :aria-current="tierIndex === index ? 'true' : undefined"
              @click="setTierIndex(index)"
            >
              <span class="text-[13px] font-semibold sm:text-[14px]">
                {{ tier.name.replace("Maxco ", "").replace(" Unlimited", "") }}
              </span>
              <span class="text-[12px] tabular-nums opacity-80">
                {{
                  isPrepaid
                    ? formatGbp((tier as PrepaidTier).price)
                    : formatGbp((tier as UnlimitedTier).price)
                }}
              </span>
            </button>
          </div>
        </div>

        <div class="flex justify-end">
          <Cta
            :to="currentTier.orderUrl"
            external
            btn-class="brand-gradient text-on-accent inline-flex min-h-[56px] w-full items-center justify-center rounded-btn px-8 text-[18px] font-semibold transition duration-300 ease-[var(--ease-brand)] sm:w-auto"
          >
            {{ orderLabel }}
            <span aria-hidden="true"> →</span>
          </Cta>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tier-fade-enter-active,
.tier-fade-leave-active {
  transition:
    opacity 0.25s var(--ease-brand),
    transform 0.25s var(--ease-brand);
}

.tier-fade-enter-from,
.tier-fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

@media (prefers-reduced-motion: reduce) {
  .tier-fade-enter-active,
  .tier-fade-leave-active {
    transition: none;
  }

  .tier-fade-enter-from,
  .tier-fade-leave-to {
    transform: none;
  }
}
</style>
