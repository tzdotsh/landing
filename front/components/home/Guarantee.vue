<script lang="ts" setup>
import HomeReviews from "./Reviews.vue";

const { t } = useI18n();
</script>

<template>
  <HomeBackground
    id="guarantee"
    tag="section"
    color="dark"
    class="relative overflow-hidden py-12 md:py-16"
  >
    <HomeSectionGlow
      class="left-1/2 top-[44%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 sm:h-80 sm:w-80"
      strength="7%"
    />

    <HomeReviews class="mb-8 md:mb-10" />

    <div class="container relative">
      <div
        class="mx-auto flex max-w-[640px] flex-col items-center gap-5 md:gap-6"
      >
        <div
          class="guarantee-badge"
          role="img"
          :aria-label="t('home.guarantee.alt_text')"
        >
          <div class="guarantee-badge__ring">
            <div class="guarantee-badge__center">
              <span
                class="font-heading text-ink text-[clamp(1.75rem,4.5vw,2.5rem)] leading-none font-extrabold tracking-[-0.03em]"
              >
                30
              </span>
              <span
                class="text-muted mt-0.5 text-[10px] font-bold tracking-[0.18em] uppercase"
              >
                Days
              </span>
              <span
                class="text-ink mt-1.5 text-[9px] font-semibold tracking-[0.22em] uppercase"
              >
                Money Back
              </span>
            </div>
          </div>
        </div>

        <div class="max-w-[560px] text-center">
          <h2
            class="font-heading text-ink mb-2 text-[clamp(1.625rem,3.5vw,2.25rem)] leading-[1.1] font-extrabold tracking-[-0.02em] text-balance"
          >
            {{ t("home.guarantee.title") }}
          </h2>
          <p
            class="text-muted text-[15px]/[1.5] font-medium text-pretty sm:text-[16px]/[1.5]"
          >
            {{ t("home.guarantee.subtitle") }}
          </p>
        </div>

        <Cta
          gap="12"
          notice-color="light"
          btn-class="brand-gradient text-on-accent h-[56px] w-[min(100%,440px)] rounded-btn text-[17px] font-semibold transition duration-300 ease-[var(--ease-brand)] sm:h-[62px] sm:text-[18px]"
        >
          {{ t("home.guarantee.cta") }}
        </Cta>
      </div>
    </div>
  </HomeBackground>
</template>

<style scoped>
.guarantee-badge__ring {
  padding: 3px;
  border-radius: 9999px;
  background: linear-gradient(
    110deg,
    var(--color-lime),
    var(--color-green) 52%,
    var(--color-teal)
  );
  box-shadow:
    0 0 24px var(--color-glow),
    0 8px 28px rgba(0, 0, 0, 0.24);
}

.guarantee-badge__center {
  display: flex;
  width: clamp(8.75rem, 16vw, 10.5rem);
  height: clamp(8.75rem, 16vw, 10.5rem);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background: var(--color-panel);
  text-align: center;
}
</style>
