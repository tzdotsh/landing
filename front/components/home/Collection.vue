<script lang="ts" setup>
const { t } = useI18n();
const reducedMotion = usePreferredReducedMotion();

const staticMotion = computed(() => reducedMotion.value === "reduce");

/** ~65s loop at velocity 0.62 (Marquee: duration = 40 / |velocity|) */
const MARQUEE_VELOCITY = 0.62;

const POSTER_IDS = Array.from({ length: 68 }, (_, index) => String(index + 1));
const row1Posters = POSTER_IDS.slice(0, 34);
const row2Posters = POSTER_IDS.slice(34);

const marqueeRows = [
  { posters: row1Posters, velocity: MARQUEE_VELOCITY },
  { posters: row2Posters, velocity: -MARQUEE_VELOCITY },
] as const;

const staticRows = [row1Posters, row2Posters] as const;

const failedPosters = ref<Record<string, boolean>>({});

function posterSrc(id: string) {
  return `/tmdb/high/${id}@2x.webp`;
}

function posterSrcset(id: string) {
  return `/tmdb/high/${id}@1x.webp 1x, /tmdb/high/${id}@2x.webp 2x`;
}

function showPoster(id: string) {
  return !failedPosters[id];
}

function handlePosterError(id: string) {
  failedPosters[id] = true;
}

const posterCardClass =
  "border-line bg-panel group relative mx-1.5 w-[150px] shrink-0 overflow-hidden rounded-card border aspect-[2/3] transition-[border-color,transform,box-shadow] duration-300 ease-[var(--ease-brand)] hover:-translate-y-2 hover:scale-[1.04] hover:border-line-2 hover:z-10 hover:shadow-[0_0_0_1px_var(--color-glow),0_12px_40px_rgba(0,0,0,0.35)] md:mx-2";
</script>

<template>
  <HomeBackground
    id="collection"
    tag="section"
    color="dark"
    class="overflow-hidden py-16 md:py-24"
  >
    <div class="container mb-8 md:mb-10">
      <div class="mx-auto max-w-[920px] text-center">
        <h2
          class="font-heading text-ink mb-4 text-[clamp(1.875rem,4vw,2.75rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-balance"
        >
          {{ t("home.collection.title") }}
        </h2>
        <p
          class="text-muted mx-auto max-w-[760px] text-[17px]/[1.55] font-medium text-pretty sm:text-[18px]/[1.55]"
        >
          {{ t("home.collection.subtitle") }}
        </p>
      </div>
    </div>

    <div class="relative">
      <HomeSectionGlow
        class="left-1/2 top-[52%] h-[min(22rem,42vh)] w-[min(62rem,100vw)] -translate-x-1/2 -translate-y-1/2"
        strength="6%"
      />

      <div
        v-if="staticMotion"
        class="relative left-1/2 w-screen max-w-full -translate-x-1/2 space-y-4"
      >
      <div
        v-for="(row, rowIndex) in staticRows"
        :key="`collection-static-row-${rowIndex}`"
        class="flex gap-3 overflow-x-auto overscroll-x-contain px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div
          v-for="id in row"
          :key="`collection-static-${rowIndex}-${id}`"
          :class="posterCardClass"
        >
          <img
            v-if="showPoster(id)"
            :src="posterSrc(id)"
            :srcset="posterSrcset(id)"
            width="150"
            height="225"
            class="h-full w-full object-cover"
            :alt="t('home.collection.poster_alt', { index: id })"
            loading="lazy"
            decoding="async"
            @error="handlePosterError(id)"
          />

          <div
            v-else
            class="flex h-full w-full flex-col items-center justify-center gap-y-2 bg-[linear-gradient(145deg,var(--color-panel-2),var(--color-bg-deep))] p-4 text-center"
          >
            <span
              class="brand-gradient font-heading flex h-14 w-14 items-center justify-center rounded-full text-[18px] font-bold text-on-accent shadow-[0_0_24px_var(--color-glow)]"
              aria-hidden="true"
            >
              {{ id.padStart(2, "0") }}
            </span>
            <span
              class="text-faint text-[11px]/none font-semibold tracking-[0.12em] uppercase"
            >
              {{ t("home.collection.poster_fallback") }}
            </span>
          </div>
        </div>
      </div>
      </div>

      <div
        v-else
        class="relative left-1/2 w-screen max-w-full -translate-x-1/2 space-y-4"
      >
        <div
          v-for="(row, rowIndex) in marqueeRows"
          :key="`collection-marquee-row-${rowIndex}`"
          class="relative [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]"
        >
          <CommonMarquee
            :base-velocity="row.velocity"
            pause-on-hover
            class="relative flex w-max items-stretch"
          >
            <div
              v-for="id in row.posters"
              :key="`collection-marquee-${rowIndex}-${id}`"
              :class="posterCardClass"
            >
              <img
                v-if="showPoster(id)"
                :src="posterSrc(id)"
                :srcset="posterSrcset(id)"
                width="150"
                height="225"
                class="h-full w-full object-cover"
                :alt="t('home.collection.poster_alt', { index: id })"
                loading="lazy"
                decoding="async"
                @error="handlePosterError(id)"
              />

              <div
                v-else
                class="flex h-full w-full flex-col items-center justify-center gap-y-2 bg-[linear-gradient(145deg,var(--color-panel-2),var(--color-bg-deep))] p-4 text-center"
              >
                <span
                  class="brand-gradient font-heading flex h-14 w-14 items-center justify-center rounded-full text-[18px] font-bold text-on-accent shadow-[0_0_24px_var(--color-glow)]"
                  aria-hidden="true"
                >
                  {{ id.padStart(2, "0") }}
                </span>
                <span
                  class="text-faint text-[11px]/none font-semibold tracking-[0.12em] uppercase"
                >
                  {{ t("home.collection.poster_fallback") }}
                </span>
              </div>
            </div>
          </CommonMarquee>
        </div>
      </div>
    </div>
  </HomeBackground>
</template>
