<script lang="ts" setup>
const reducedMotion = usePreferredReducedMotion();

const staticMotion = computed(() => reducedMotion.value === "reduce");

const COLUMN_COUNT = 6;
const POSTERS_PER_COLUMN = 12;
const TOTAL_POSTERS = 68;

function posterId(columnIndex: number, itemIndex: number) {
  return ((columnIndex * 11 + itemIndex) % TOTAL_POSTERS) + 1;
}
</script>

<template>
  <div
    class="hero-wall pointer-events-none absolute inset-0 z-0 overflow-hidden bg-bg-deep/40"
    aria-hidden="true"
  >
    <div
      class="hero-wall__grid"
      :class="{ 'hero-wall__grid--static': staticMotion }"
    >
      <div
        v-for="column in COLUMN_COUNT"
        :key="column"
        :class="[
          'hero-wall__column',
          !staticMotion &&
            (column % 2 === 0
              ? 'animate-top-to-bottom animation-duration-50000!'
              : 'animate-bottom-to-top animation-duration-50000!'),
        ]"
      >
        <MyNuxtImg
          v-for="item in POSTERS_PER_COLUMN"
          :key="`${column}-${item}`"
          :src="`/tmdb/low/${posterId(column - 1, item - 1)}@2x.webp`"
          :srcset="`/tmdb/low/${posterId(column - 1, item - 1)}@1x.webp 1x, /tmdb/low/${posterId(column - 1, item - 1)}@2x.webp 2x`"
          loading="lazy"
          width="198"
          height="294"
          :alt="`Streaming poster ${posterId(column - 1, item - 1)}`"
          class="hero-wall__poster opacity-0 transition duration-1000 data-[state=ready]:opacity-100"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-wall__grid {
  position: absolute;
  inset: -8% -6% -8% 22%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.625rem;
  transform: rotate(-5deg) scale(1.12);
  transform-origin: center center;
}

.hero-wall__grid--static {
  transform: rotate(-2deg) scale(1.04);
}

.hero-wall__column {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  min-width: 0;
  will-change: transform;
}

.hero-wall__poster {
  width: 100%;
  aspect-ratio: 198 / 294;
  height: auto;
  flex: none;
  border-radius: 14px;
  object-fit: cover;
}

@media (max-width: 820px) {
  .hero-wall__grid {
    inset: -18% -24% -12% -8%;
    opacity: 0.32;
  }

  .hero-wall__grid--static {
    transform: rotate(-3deg) scale(1.08);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-wall__column {
    animation: none !important;
  }
}
</style>
