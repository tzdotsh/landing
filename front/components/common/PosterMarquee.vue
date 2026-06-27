<script lang="ts" setup>
import { HOME_MARQUEE_VELOCITY } from "~/constants/homeMarquee";
import {
  MARQUEE_EDGE_MASK,
  POSTER_MARQUEE_CARD_CLASS,
  tmdbPosterSrc,
  tmdbPosterSrcset,
} from "~/data/tmdbPosters";

const props = withDefaults(
  defineProps<{
    posterIds: readonly string[];
    reverse?: boolean;
  }>(),
  { reverse: false },
);

const { t } = useI18n();
const reducedMotion = usePreferredReducedMotion();

const staticMotion = computed(() => reducedMotion.value === "reduce");

const velocity = computed(() =>
  props.reverse ? -HOME_MARQUEE_VELOCITY : HOME_MARQUEE_VELOCITY,
);

const failedPosters = ref<Record<string, boolean>>({});

function showPoster(id: string) {
  return !failedPosters[id];
}

function handlePosterError(id: string) {
  failedPosters[id] = true;
}
</script>

<template>
  <div
    v-if="staticMotion"
    class="relative left-1/2 flex w-screen max-w-full -translate-x-1/2 gap-3 overflow-x-auto overscroll-x-contain px-4 pb-2 min-h-[225px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
  >
    <div
      v-for="id in posterIds"
      :key="`poster-static-${id}`"
      :class="POSTER_MARQUEE_CARD_CLASS"
    >
      <img
        v-if="showPoster(id)"
        :src="tmdbPosterSrc(id)"
        :srcset="tmdbPosterSrcset(id)"
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

  <div
    v-else
    :class="[
      'relative left-1/2 min-h-[225px] w-screen max-w-full -translate-x-1/2 overflow-hidden',
      MARQUEE_EDGE_MASK,
    ]"
  >
    <CommonMarquee
      :base-velocity="velocity"
      pause-on-hover
      class="relative flex w-max items-stretch"
    >
      <div
        v-for="id in posterIds"
        :key="`poster-marquee-${id}`"
        :class="POSTER_MARQUEE_CARD_CLASS"
      >
        <img
          v-if="showPoster(id)"
          :src="tmdbPosterSrc(id)"
          :srcset="tmdbPosterSrcset(id)"
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
</template>
