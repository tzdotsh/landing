<script lang="ts" setup>
import { motion } from "motion-v";

const { t } = useI18n();
const config = useRuntimeConfig();
const reducedMotion = usePreferredReducedMotion();

const email = ref("");
const emailInvalid = ref(false);

const motionEnabled = computed(
  () =>
    config.public.enableAnimations && reducedMotion.value !== "reduce",
);

const titleLine1 = computed(() => {
  const title = t("home.hero.title");
  const commaIndex = title.indexOf(",");

  if (commaIndex === -1) return title;

  return title.slice(0, commaIndex + 1).trim();
});

const titleLine2 = computed(() => {
  const title = t("home.hero.title");
  const commaIndex = title.indexOf(",");

  if (commaIndex === -1) return "";

  return title.slice(commaIndex + 1).trim();
});

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Root-proxied apps (/checkout, /trial) — never version- or locale-prefixed. */
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
    class="hero-section relative overflow-hidden bg-transparent"
  >
    <HomeHeroBackground2 />

    <div class="hero-fade pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />

    <HomeSectionGlow
      class="top-1/2 left-0 z-[2] h-[min(26rem,52vh)] w-[min(34rem,72vw)] -translate-y-1/2 blur-[5rem]"
      strength="5%"
    />

    <div class="container hero-shell relative z-10 flex">
      <div class="hero-content w-full max-w-[540px] text-left">
        <component
          :is="motionEnabled ? motion.div : 'div'"
          v-bind="entranceProps(0)"
          class="mb-4 flex items-center gap-x-2.5 max-[820px]:mb-3"
        >
          <span class="relative flex h-2 w-2 shrink-0">
            <span
              v-if="motionEnabled"
              class="brand-gradient absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
            />
            <span
              class="brand-gradient relative inline-flex h-2 w-2 rounded-full"
            />
          </span>
          <span
            class="text-muted text-[13px]/none font-medium tracking-[0.08em] uppercase"
          >
            {{ t("home.hero.eyebrowBefore") }}
            <CommonTrustpilotStarIcon scale="em" />
            {{ t("home.hero.eyebrowAfter") }}
          </span>
        </component>

        <component
          :is="motionEnabled ? motion.h1 : 'h1'"
          v-bind="entranceProps(0.08)"
          class="font-heading text-ink hero-title mb-5 text-[clamp(2.5rem,5.6vw,4.25rem)] leading-[0.95] font-extrabold tracking-[-0.02em] uppercase max-[820px]:mb-4 max-[820px]:text-[clamp(2.125rem,10vw,2.75rem)] max-[820px]:leading-[1]"
        >
          <span class="block">{{ titleLine1 }}</span>
          <span class="block">{{ titleLine2 }}</span>
        </component>

        <component
          :is="motionEnabled ? motion.p : 'p'"
          v-bind="entranceProps(0.16)"
          class="text-muted hero-subtitle mb-8 max-w-[440px] text-[17px]/[1.55] font-medium text-pretty sm:text-[18px]/[1.55] max-[820px]:mb-6 max-[820px]:max-w-none"
        >
          {{ t("home.hero.subtitle") }}
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
              <label class="sr-only" for="hero-email">
                {{ t("home.hero.emailPlaceholder") }}
              </label>
              <input
                id="hero-email"
                v-model="email"
                type="email"
                name="email"
                autocomplete="email"
                inputmode="email"
                :placeholder="t('home.hero.emailPlaceholder')"
                :aria-invalid="emailInvalid"
                :aria-describedby="emailInvalid ? 'hero-email-error' : undefined"
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
              >
                {{ t("home.hero.cta") }}
              </Button>
            </MotionWrapper>
          </div>

          <p
            v-if="emailInvalid"
            id="hero-email-error"
            role="alert"
            class="text-danger mt-2 text-center text-[12px]/[15px] sm:text-left"
          >
            {{ t("home.hero.emailError") }}
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
              {{ t("home.hero.trialCta") }}
            </a>
          </MotionWrapper>

          <div
            class="mt-5 flex w-full flex-col items-center gap-y-2.5 text-center max-[820px]:mt-6"
          >
            <p
              class="text-muted max-w-[22rem] text-[12px]/[1.45] text-pretty opacity-90 max-[820px]:max-w-[19rem] max-[820px]:text-[11px]/[1.5]"
            >
              <SvgoMoneyBack
                class="fill-muted mr-1 inline-block h-4 w-4 shrink-0 align-[-0.15em] opacity-80"
                aria-hidden="true"
              />
              {{ t("common.notices.money_back_guarantee") }}
            </p>

            <p
              class="text-muted max-w-[20rem] text-[12px]/[1.45] text-pretty opacity-90 max-[820px]:max-w-[17.5rem] max-[820px]:text-[11px]/[1.5]"
            >
              {{ t("home.hero.socialproof") }}
            </p>
          </div>
        </component>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Navbar floats fixed at top-7.5 + h-14.75 (tv-layout Navbar.vue) — all breakpoints */
.hero-section {
  --hero-nav-offset: 1.875rem;
  --hero-nav-height: 3.6875rem;
  --hero-nav-clearance: calc(var(--hero-nav-offset) + var(--hero-nav-height));
  --hero-eyebrow-gap: 1rem;
  min-height: 100svh;
}

.hero-shell {
  min-height: calc(100svh - var(--hero-nav-clearance));
  margin-top: var(--hero-nav-clearance);
  flex-direction: column;
  align-items: flex-start;
  padding-top: var(--hero-eyebrow-gap);
  padding-bottom: 2rem;
}

@media (min-width: 821px) {
  .hero-shell {
    justify-content: center;
    padding-bottom: var(--hero-eyebrow-gap);
    --hero-eyebrow-gap: 1.25rem;
  }
}

@media (max-width: 820px) {
  .hero-shell {
    justify-content: center;
  }

  .hero-content {
    width: 100%;
  }
}

@media (max-width: 820px) and (max-height: 700px) {
  .hero-section {
    --hero-eyebrow-gap: 0.75rem;
  }

  .hero-shell {
    justify-content: flex-start;
    padding-bottom: 1.25rem;
  }

  .hero-title {
    margin-bottom: 0.75rem;
    font-size: clamp(1.875rem, 9vw, 2.25rem);
  }

  .hero-subtitle {
    margin-bottom: 1.25rem;
    font-size: 1rem;
    line-height: 1.5;
  }
}

.hero-fade {
  background:
    linear-gradient(
      90deg,
      var(--color-bg-deep) 0%,
      var(--color-bg) 28%,
      color-mix(in srgb, var(--color-bg) 55%, transparent) 52%,
      color-mix(in srgb, var(--color-bg) 25%, transparent) 74%,
      var(--color-bg) 100%
    ),
    linear-gradient(
      0deg,
      var(--color-bg-deep) 3%,
      transparent 26%,
      transparent 80%,
      color-mix(in srgb, var(--color-bg) 60%, transparent) 100%
    );
}

@media (max-width: 820px) {
  .hero-fade {
    background:
      linear-gradient(
        0deg,
        var(--color-bg-deep) 6%,
        color-mix(in srgb, var(--color-bg) 92%, transparent) 24%,
        color-mix(in srgb, var(--color-bg) 55%, transparent) 48%,
        transparent 72%
      ),
      linear-gradient(
        90deg,
        var(--color-bg-deep) 0%,
        var(--color-bg) 32%,
        color-mix(in srgb, var(--color-bg) 45%, transparent) 68%,
        var(--color-bg) 100%
      );
  }
}
</style>
