<script lang="ts" setup>
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
</script>

<template>
  <section id="hero" class="vod-hero relative overflow-hidden bg-transparent">
    <HomeHeroBackground2 />

    <div class="vod-hero-fade pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />

    <HomeSectionGlow
      class="top-1/2 left-0 z-[2] h-[min(26rem,52vh)] w-[min(34rem,72vw)] -translate-y-1/2 blur-[5rem]"
      strength="5%"
    />

    <div class="container vod-hero-shell relative z-10 flex">
      <div class="vod-hero-content w-full max-w-[540px] text-left">
        <p
          class="text-muted mb-4 text-[13px]/none font-medium tracking-[0.12em] uppercase max-[820px]:mb-3"
        >
          {{ t("vod.hero.eyebrow") }}
        </p>

        <h1
          class="font-heading text-ink vod-hero-title mb-5 text-[clamp(2.5rem,5.6vw,4.25rem)] leading-[0.95] font-extrabold tracking-[-0.02em] max-[820px]:mb-4 max-[820px]:text-[clamp(2.125rem,10vw,2.75rem)] max-[820px]:leading-[1.05]"
        >
          {{ t("vod.hero.title") }}
        </h1>

        <p
          class="text-muted vod-hero-subtitle mb-8 max-w-[480px] text-[17px]/[1.55] font-medium text-pretty sm:text-[18px]/[1.55] max-[820px]:mb-6 max-[820px]:max-w-none"
        >
          {{ t("vod.hero.subline") }}
        </p>

        <form
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
              <label class="sr-only" for="vod-hero-email">
                {{ t("vod.hero.email_placeholder") }}
              </label>
              <input
                id="vod-hero-email"
                v-model="email"
                type="email"
                name="email"
                autocomplete="email"
                inputmode="email"
                :placeholder="t('vod.hero.email_placeholder')"
                :aria-invalid="emailInvalid"
                :aria-describedby="emailInvalid ? 'vod-hero-email-error' : undefined"
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
                {{ t("vod.hero.cta_primary") }}
              </Button>
            </MotionWrapper>
          </div>

          <p
            v-if="emailInvalid"
            id="vod-hero-email-error"
            role="alert"
            class="text-danger mt-2 text-center text-[12px]/[15px] sm:text-left"
          >
            {{ t("vod.hero.email_error") }}
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
              {{ t("vod.hero.cta_secondary") }}
            </a>
          </MotionWrapper>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vod-hero {
  --hero-nav-offset: 1.875rem;
  --hero-nav-height: 3.6875rem;
  --hero-nav-clearance: calc(var(--hero-nav-offset) + var(--hero-nav-height));
  --hero-eyebrow-gap: 1rem;
  min-height: 100svh;
}

.vod-hero-shell {
  min-height: calc(100svh - var(--hero-nav-clearance));
  margin-top: var(--hero-nav-clearance);
  flex-direction: column;
  align-items: flex-start;
  padding-top: var(--hero-eyebrow-gap);
  padding-bottom: 2rem;
}

@media (min-width: 821px) {
  .vod-hero-shell {
    justify-content: center;
    padding-bottom: var(--hero-eyebrow-gap);
    --hero-eyebrow-gap: 1.25rem;
  }
}

@media (max-width: 820px) {
  .vod-hero-shell {
    justify-content: center;
  }

  .vod-hero-content {
    width: 100%;
  }
}

.vod-hero-fade {
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
</style>
