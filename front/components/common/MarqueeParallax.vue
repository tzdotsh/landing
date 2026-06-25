<script lang="ts" setup>
import { motion } from "motion-v";

type PropsType = {
  baseVelocity?: number;
  pauseOnHover?: boolean;
};

const props = withDefaults(defineProps<PropsType>(), {
  baseVelocity: 0.5,
  pauseOnHover: false,
});

// Group functionality
const pauseOnHoverGroup = inject("pauseOnHoverGroup", false);
const isGroupPaused = inject("isGroupPaused", ref(false));
const pauseGroup = inject("pauseGroup", () => {});
const resumeGroup = inject("resumeGroup", () => {});

const velocity = ref(props.baseVelocity);
const isLocallyPaused = ref(false);

const baseX = useMotionValue(0);

const x = useTransform(baseX, (v) => `${wrap(-5, -55, v)}%`);

// Watch for group pause state changes
watch(isGroupPaused, (paused) => {
  if (pauseOnHoverGroup) {
    velocity.value = paused ? 0 : props.baseVelocity;
  }
});

useAnimationFrame((t, delta) => {
  const moveBy = velocity.value * (delta / 1000);

  baseX.set(baseX.get() + moveBy);
});

function pause() {
  if (pauseOnHoverGroup) {
    // If in a group, pause the entire group
    pauseGroup();
  } else if (props.pauseOnHover) {
    // If not in a group, pause only this marquee
    isLocallyPaused.value = true;
    velocity.value = 0;
  }
}

function resume() {
  if (pauseOnHoverGroup) {
    // If in a group, resume the entire group
    resumeGroup();
  } else if (props.pauseOnHover) {
    // If not in a group, resume only this marquee
    isLocallyPaused.value = false;
    velocity.value = props.baseVelocity;
  }
}
</script>

<template>
  <motion.div
    :style="{ x }"
    class="scroller"
    @mouseover="pause"
    @mouseleave="resume"
  >
    <slot />
    <slot />
  </motion.div>
</template>
