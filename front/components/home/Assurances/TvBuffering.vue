<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    staticMotion?: boolean;
  }>(),
  {
    staticMotion: false,
  },
);

const { t } = useI18n();

const isPlaying = ref(props.staticMotion);

let cycleTimer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  if (props.staticMotion) {
    isPlaying.value = true;
    return;
  }

  cycleTimer = setInterval(() => {
    isPlaying.value = !isPlaying.value;
  }, 4200);
});

onUnmounted(() => {
  if (cycleTimer) clearInterval(cycleTimer);
});

watch(
  () => props.staticMotion,
  (reduce) => {
    if (reduce) {
      if (cycleTimer) clearInterval(cycleTimer);
      cycleTimer = null;
      isPlaying.value = true;
    }
  },
);
</script>

<template>
  <div
    class="relative max-w-full overflow-hidden rounded-[12px] bg-panel-2"
  >
    <MyNuxtImg
      src="/img/assurances/tv-buffering@2x.webp"
      srcset="/img/assurances/tv-buffering@1x.webp 1x, /img/assurances/tv-buffering@2x.webp 2x"
      class="relative z-0 mx-auto aspect-566/359 h-auto w-full brightness-[0.72] saturate-[0.85] lg:ml-0"
      width="566"
      height="359"
      alt=""
      loading="lazy"
    />

    <div
      class="bg-bg/45 absolute inset-0 z-10"
      aria-hidden="true"
    />

    <Transition
      enter-active-class="transition duration-300 ease-[var(--ease-brand)]"
      leave-active-class="transition duration-300 ease-[var(--ease-brand)]"
      enter-from-class="opacity-0 scale-95"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="!isPlaying"
        class="border-line absolute top-[24%] left-1/2 z-30 flex aspect-276/135 h-auto w-[min(72%,280px)] -translate-x-1/2 flex-col items-center justify-center gap-y-3 rounded-card border bg-panel/90 px-4 py-5 backdrop-blur-md"
      >
        <p class="text-muted text-[clamp(14px,2vw,18px)]/snug font-medium">
          {{ t("home.assurances.no_buffering.buffering_label") }}
        </p>
        <SvgoLoading
          class="h-auto w-[clamp(24px,3vw,36px)] text-teal"
          aria-hidden="true"
        />
      </div>
    </Transition>

    <div
      v-if="isPlaying"
      class="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between gap-x-3 bg-[linear-gradient(to_top,rgba(5,13,22,0.92),transparent)] px-4 pb-4 pt-10"
    >
      <div class="min-w-0">
        <p class="text-ink truncate text-[14px]/snug font-semibold">
          {{ t("home.assurances.no_buffering.playback_title") }}
        </p>
        <p class="text-muted text-[12px]/snug">
          {{ t("home.assurances.no_buffering.playback_meta") }}
        </p>
      </div>
      <div
        class="brand-gradient flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-[0_0_20px_var(--color-glow)]"
        aria-hidden="true"
      >
        <span class="text-on-accent ml-0.5 text-[11px] font-bold">▶</span>
      </div>
    </div>
  </div>
</template>
