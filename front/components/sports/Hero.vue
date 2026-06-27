<script lang="ts" setup>
import { motion } from "motion-v";

import { SPORTS_HERO_IMAGE } from "~/data/sportsCategories";

const { t } = useI18n();
const config = useRuntimeConfig();
const reducedMotion = usePreferredReducedMotion();

const email = ref("");
const emailInvalid = ref(false);

const motionEnabled = computed(
  () =>
    config.public.enableAnimations && reducedMotion.value !== "reduce",
);

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function externalAppPath(path: "/checkout" | "/trial", withEmail = false) {
  const trimmed = email.value.trim();

  if (!withEmail || !validateEmail(trimmed)) {
    return path;
  }

  return `${path}?${new URLSearchParams({ email: trimmed }).toString()}`;
}

const trialHref = computed(() => externalAppPath("/trial", true));

function handleSubmit() {
  emailInvalid.value = !validateEmail(email.value);
  if (emailInvalid.value) return;

  window.location.assign(externalAppPath("/checkout", true));
}

function entranceProps(delay: number) {
  return motionEnabled.value
    ? {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: 0.5,
          delay,
          ease: [0.16, 1, 0.3, 1] as const,
        },
      }
    : {};
}
</script>

<template>
  <section
    id="hero"
    class="sports-hero relative overflow-hidden bg-transparent"
  >
    <div class="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <NuxtImg
        :src="SPORTS_HERO_IMAGE"
        alt=""
        class="h-full w-full object-cover object-center opacity-35"
        format="webp"
        loading="eager"
        fetchpriority="high"
      />
      <div class="sports-hero-fade absolute inset-0" />
    </div>

    <HomeSectionGlow
      class="top-1/2 left-0 z-[2] h-[min(26rem,52vh)] w-[min(34rem,72vw)] -translate-y-1/2 blur-[5rem]"
      strength="5%"
    />

    <div class="container sports-hero-shell relative z-10 flex">
      <div class="sports-hero-content w-full max-w-[540px] text-left">
        <component
          :is="motionEnabled ? motion.p : 'p'"
          v-bind="entranceProps(0)"
          class="text-muted mb-4 text-[13px]/none font-medium tracking-[0.12em] uppercase max-[820px]:mb-3"
        >
          {{ t("sports.hero.eyebrow") }}
        </component>

        <component
          :is="motionEnabled ? motion.h1 : 'h1'"
          v-bind="entranceProps(0.08)"
          class="font-heading text-ink sports-hero-title mb-5 text-[clamp(2.5rem,5.6vw,4.25rem)] leading-[0.95] font-extrabold tracking-[-0.02em] max-[820px]:mb-4 max-[820px]:text-[clamp(2.125rem,10vw,2.75rem)] max-[820px]:leading-[1.05]"
        >
          {{ t("sports.hero.title") }}
        </component>

        <component
          :is="motionEnabled ? motion.p : 'p'"
          v-bind="entranceProps(0.16)"
          class="text-muted sports-hero-subtitle mb-8 max-w-[480px] text-[17px]/[1.55] font-medium text-pretty sm:text-[18px]/[1.55] max-[820px]:mb-6 max-[820px]:max-w-none"
        >
          {{ t("sports.hero.subline") }}
        </component>

        <component
          :is="motionEnabled ? motion.form : 'form'"
          v-bind="entranceProps(0.24)"
          class="flex w-full flex-col"
          @submit.prevent="handleSubmit"
        >
          <div
            :class="[
              'flex w-full flex-col gap-2 rounded-[14px] border bg-panel/80 p-1.5 backdrop-blur-md transition-[border-color,box-shadow] duration-300 ease-[var(--ease-brand)] max-[820px]:gap-2.5 sm:flex-row sm:items-stretch',
              emailInvalid
                ? 'border-danger ring-1 ring-danger/40'
                : 'border-line-2 ring-1 ring-white/5 focus-within:ring-white/10',
            ]"
          >
            <div class="flex min-w-0 flex-1 flex-col">
              <label class="sr-only" for="sports-hero-email">
                {{ t("sports.hero.email_placeholder") }}
              </label>
              <input
                id="sports-hero-email"
                v-model="email"
                type="email"
                name="email"
                autocomplete="email"
                inputmode="email"
                :placeholder="t('sports.hero.email_placeholder')"
                :aria-invalid="emailInvalid"
                :aria-describedby="emailInvalid ? 'sports-hero-email-error' : undefined"
                class="text-ink placeholder:text-faint h-12 w-full bg-transparent px-3 text-[16px] outline-none"
                @input="emailInvalid = false"
              />
            </div>

            <MotionWrapper
              :enabled="motionEnabled"
              :while-hover="{ scale: 1.02 }"
              :while-tap="{ scale: 0.98 }"
              :transition="{ type: 'spring', stiffness: 400, damping: 22 }"
              class="block w-full sm:w-auto"
            >
              <Button
                type="submit"
                size="small"
                radius="small"
                :btn-class="
                  [
                    'brand-gradient text-on-accent h-12 w-full shrink-0 rounded-[10px] px-6 text-[16px] font-semibold transition duration-300 ease-[var(--ease-brand)] sm:min-w-[10.5rem]',
                  ].join(' ')
                "
                @click="handleSubmit"
              >
                {{ t("sports.hero.cta_primary") }}
              </Button>
            </MotionWrapper>
          </div>

          <p
            v-if="emailInvalid"
            id="sports-hero-email-error"
            role="alert"
            class="text-danger mt-2 text-center text-[12px]/[15px] sm:text-left"
          >
            {{ t("sports.hero.email_error") }}
          </p>

          <div
            class="my-4 flex w-full items-center gap-x-3 max-[820px]:my-5"
            aria-hidden="true"
          >
            <span class="bg-line-2 h-px min-w-0 flex-1" />
            <span class="text-muted shrink-0 px-1 text-[13px] font-medium lowercase">
              {{ t("home.hero.orDivider") }}
            </span>
            <span class="bg-line-2 h-px min-w-0 flex-1" />
          </div>

          <MotionWrapper
            :enabled="motionEnabled"
            :while-hover="{ scale: 1.02 }"
            :while-tap="{ scale: 0.98 }"
            :transition="{ type: 'spring', stiffness: 400, damping: 22 }"
            class="block w-full"
          >
            <a
              :href="trialHref"
              class="brand-gradient text-on-accent flex h-12 w-full items-center justify-center rounded-[10px] px-6 text-[16px] font-semibold transition duration-300 ease-[var(--ease-brand)]"
            >
              {{ t("sports.hero.cta_secondary") }}
            </a>
          </MotionWrapper>
        </component>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sports-hero {
  --hero-nav-offset: 1.875rem;
  --hero-nav-height: 3.6875rem;
  --hero-nav-clearance: calc(var(--hero-nav-offset) + var(--hero-nav-height));
  --hero-eyebrow-gap: 1rem;
  min-height: 100svh;
}

.sports-hero-shell {
  min-height: calc(100svh - var(--hero-nav-clearance));
  margin-top: var(--hero-nav-clearance);
  flex-direction: column;
  align-items: flex-start;
  padding-top: var(--hero-eyebrow-gap);
  padding-bottom: 2rem;
}

@media (min-width: 821px) {
  .sports-hero-shell {
    justify-content: center;
    padding-bottom: var(--hero-eyebrow-gap);
    --hero-eyebrow-gap: 1.25rem;
  }
}

@media (max-width: 820px) {
  .sports-hero-shell {
    justify-content: center;
  }

  .sports-hero-content {
    width: 100%;
  }
}

.sports-hero-fade {
  background:
    linear-gradient(
      90deg,
      var(--color-bg-deep) 0%,
      var(--color-bg) 30%,
      color-mix(in srgb, var(--color-bg) 50%, transparent) 55%,
      color-mix(in srgb, var(--color-bg) 20%, transparent) 75%,
      var(--color-bg) 100%
    ),
    linear-gradient(
      0deg,
      var(--color-bg-deep) 4%,
      transparent 28%,
      transparent 78%,
      color-mix(in srgb, var(--color-bg) 65%, transparent) 100%
    );
}
</style>
