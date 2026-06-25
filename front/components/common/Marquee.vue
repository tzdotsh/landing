<script lang="ts" setup>
import { twMerge } from "tailwind-merge";

type PropsType = {
  pauseOnHover?: boolean;
  baseVelocity?: number;
};

const props = withDefaults(defineProps<PropsType>(), {
  pauseOnHover: false,
  baseVelocity: 1,
});

const velocity = ref(props.baseVelocity);
const isLocallyPaused = ref(false);

// Group functionality - inject group pause state and controls
const groupPauseOnHover = inject("pauseOnHoverGroup", false);
const isGroupPaused = inject("isGroupPaused", ref(false));
const pauseGroup = inject("pauseGroup", () => {});
const resumeGroup = inject("resumeGroup", () => {});

// Watch for group pause state changes
watch(isGroupPaused, (paused) => {
  if (groupPauseOnHover) {
    isLocallyPaused.value = paused;
  }
});

// Pause/resume functions
function pause() {
  if (props.pauseOnHover) {
    isLocallyPaused.value = true;
  }

  if (groupPauseOnHover) {
    isLocallyPaused.value = true;
    pauseGroup();
  }
}

function resume() {
  if (props.pauseOnHover) {
    isLocallyPaused.value = false;
  }

  if (groupPauseOnHover) {
    isLocallyPaused.value = false;
    resumeGroup();
  }
}

// Calculate velocity-based animation properties
const isReverse = computed(() => velocity.value < 0);
const absVelocity = computed(() => Math.abs(velocity.value));

// Calculate animation duration based on velocity
// Base duration is 20s at velocity 1, adjust inversely with velocity
const animationDuration = computed(() => {
  if (absVelocity.value === 0) return "0s";
  return `${40 / absVelocity.value}s`;
});

// Animation direction based on velocity sign
const animationDirection = computed(() => {
  return isReverse.value ? "reverse" : "normal";
});

// Dynamic styles for velocity-based animation
const marqueeStyles = computed(() => ({
  animationDuration: animationDuration.value,
  animationDirection: animationDirection.value,
  animationPlayState: isLocallyPaused.value ? "paused" : "running",
}));
</script>

<template>
  <div
    :style="marqueeStyles"
    :class="twMerge('animate-marquee')"
    @mouseover="pause"
    @mouseleave="resume"
  >
    <slot />
    <slot />
  </div>
</template>

<style scoped>
.animate-marquee {
  animation-name: marquee;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Performance optimizations */
.animate-marquee {
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}
</style>
