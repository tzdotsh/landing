<script lang="ts" setup>
const { t } = useI18n();
const fps = useFps();
const percentage = ref(0.5);
const comparaisonBox = ref<HTMLElement>();
const isDragging = ref(false);
const isTouching = ref(false);

let lastUpdateTime = 0;
const throttleDelay = computed(() => Math.round(1000 / fps.value));
let animationFrameId: number | null = null;
let pendingPosition: number | null = null;

function calculatePosition(clientX: number): number {
  if (!comparaisonBox.value) return percentage.value;

  const rect = comparaisonBox.value.getBoundingClientRect();
  const position = (clientX - rect.left) / rect.width;

  return Math.max(Math.min(position, 1), 0);
}

function updatePercentage(clientX: number) {
  const newPosition = calculatePosition(clientX);
  const now = Date.now();

  pendingPosition = newPosition;

  if (now - lastUpdateTime < throttleDelay.value && animationFrameId !== null) {
    return;
  }

  if (animationFrameId !== null) {
    return;
  }

  animationFrameId = requestAnimationFrame(() => {
    if (pendingPosition !== null) {
      percentage.value = pendingPosition;
      pendingPosition = null;
    }
    animationFrameId = null;
    lastUpdateTime = Date.now();
  });
}

function handleMouseDown(e: MouseEvent) {
  isDragging.value = true;
  updatePercentage(e.clientX);
  e.preventDefault();
}

function handleMouseMove(e: MouseEvent) {
  if (isDragging.value) {
    updatePercentage(e.clientX);
  }
}

function handleTouchStart(e: TouchEvent) {
  isTouching.value = true;
  const touch = e.touches[0];
  if (touch) {
    updatePercentage(touch.clientX);
  }
  e.preventDefault();
}

function handleTouchMove(e: TouchEvent) {
  if (isTouching.value && e.touches.length === 1) {
    const touch = e.touches[0];
    if (touch) {
      updatePercentage(touch.clientX);
    }
    e.preventDefault();
  }
}

function handleTouchEnd() {
  isTouching.value = false;
}

function handleKeyDown(e: KeyboardEvent) {
  if (!comparaisonBox.value) return;

  const step = 0.05;

  switch (e.key) {
    case "ArrowLeft":
      e.preventDefault();
      percentage.value = Math.max(percentage.value - step, 0);
      break;
    case "ArrowRight":
      e.preventDefault();
      percentage.value = Math.min(percentage.value + step, 1);
      break;
    case "Home":
      e.preventDefault();
      percentage.value = 0;
      break;
    case "End":
      e.preventDefault();
      percentage.value = 1;
      break;
  }
}

let cleanupFn: (() => void) | null = null;
let globalMouseMoveHandler: ((e: MouseEvent) => void) | null = null;
let globalMouseUpHandler: (() => void) | null = null;

watch(
  comparaisonBox,
  (element, _, onCleanup) => {
    if (!element) return;

    element.addEventListener("mousedown", handleMouseDown);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("touchstart", handleTouchStart, { passive: false });
    element.addEventListener("touchmove", handleTouchMove, { passive: false });
    element.addEventListener("touchend", handleTouchEnd);
    element.addEventListener("keydown", handleKeyDown);

    globalMouseMoveHandler = (e: MouseEvent) => {
      if (isDragging.value) {
        updatePercentage(e.clientX);
      }
    };

    globalMouseUpHandler = () => {
      isDragging.value = false;
    };

    document.addEventListener("mousemove", globalMouseMoveHandler);
    document.addEventListener("mouseup", globalMouseUpHandler);

    cleanupFn = () => {
      element.removeEventListener("mousedown", handleMouseDown);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
      element.removeEventListener("keydown", handleKeyDown);
      if (globalMouseMoveHandler) {
        document.removeEventListener("mousemove", globalMouseMoveHandler);
      }
      if (globalMouseUpHandler) {
        document.removeEventListener("mouseup", globalMouseUpHandler);
      }

      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      pendingPosition = null;
    };

    onCleanup(cleanupFn);
  },
  { immediate: true },
);

onUnmounted(() => {
  isDragging.value = false;
  isTouching.value = false;

  if (cleanupFn) {
    cleanupFn();
    cleanupFn = null;
  }

  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  pendingPosition = null;
});
</script>

<template>
  <div :style="`--percentage: ${percentage * 100}%`" class="relative z-20">
    <div
      class="overflow-hidden rounded-[12px] bg-panel-2 p-3 lg:p-[18px]"
    >
      <div class="absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
        <div
          class="brand-gradient h-full w-(--percentage) origin-left opacity-20 will-change-transform"
        />
      </div>

      <div
        ref="comparaisonBox"
        class="relative h-full w-full cursor-grab touch-none rounded-[inherit] select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/50"
        :class="{ 'cursor-grabbing': isDragging || isTouching }"
        tabindex="0"
        role="slider"
        :aria-valuenow="Math.round(percentage * 100)"
        aria-valuemin="0"
        aria-valuemax="100"
        :aria-label="t('home.assurances.high_quality.drag_to_compare')"
      >
        <MyNuxtImg
          src="/img/live-quality@2x.webp"
          srcset="/img/live-quality@1x.webp 1x, /img/live-quality@2x.webp 2x"
          class="pointer-events-none aspect-513/292 h-auto w-full rounded-[inherit] object-cover object-center"
          width="513"
          height="292"
          alt=""
          loading="lazy"
        />

        <div
          class="pointer-events-none absolute top-3 left-3 z-20 rounded-md bg-panel/90 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-on-accent uppercase backdrop-blur-sm brand-gradient shadow-[0_0_16px_var(--color-glow)]"
        >
          {{ t("home.assurances.high_quality.true_4k") }}
        </div>

        <div
          class="pointer-events-none absolute top-3 right-3 z-20 rounded-md border border-line bg-bg/80 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-muted uppercase backdrop-blur-sm"
        >
          {{ t("home.assurances.high_quality.upscaled") }}
        </div>

        <div class="absolute inset-0 overflow-hidden rounded-[inherit]">
          <div
            class="h-full w-full origin-right translate-x-(--percentage) bg-bg/40 backdrop-blur-[3px] will-change-transform"
          />
        </div>

        <div class="absolute inset-0 overflow-hidden rounded-[inherit]">
          <div
            class="h-full w-full translate-x-(--percentage) will-change-transform"
          >
            <div
              class="brand-gradient h-full w-0.5 -translate-x-1/2 shadow-[0_0_12px_var(--color-glow)]"
            />
          </div>
        </div>

        <div
          class="absolute inset-0 translate-x-(--percentage) rounded-[inherit] will-change-transform"
        >
          <div
            class="absolute top-1/2 left-0 flex -translate-x-1/2 -translate-y-1/2 items-center gap-x-1 drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)] transition-transform duration-150 ease-[var(--ease-brand)]"
            :class="{ 'scale-110': isDragging || isTouching }"
          >
            <SvgoCompareArrow class="text-ink" />
            <div class="bg-panel border-line h-14 w-3 rounded-xs border" />
            <SvgoCompareArrow class="text-ink rotate-180" />
          </div>
        </div>

        <div
          class="pointer-events-none absolute inset-0 flex items-end justify-center pb-3"
        >
          <div
            class="border-line rounded-full border bg-panel/90 px-3 py-1 text-[12px] font-medium text-muted backdrop-blur-sm transition-opacity duration-300"
            :class="{ 'lg:opacity-100': !isDragging && !isTouching, 'opacity-80': isDragging || isTouching }"
          >
            <span class="hidden lg:inline">
              {{ t("home.assurances.high_quality.drag_to_compare") }}
            </span>
            <span class="lg:hidden">
              {{ t("home.assurances.high_quality.swipe_to_compare") }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div
      class="brand-gradient absolute inset-0 -z-10 w-(--percentage) origin-left opacity-25 blur-[50px] will-change-transform"
      aria-hidden="true"
    />
  </div>
</template>
