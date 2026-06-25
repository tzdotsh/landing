<script lang="ts" setup generic="T">
const props = withDefaults(
  defineProps<{
    items: T[];
    wrapperClass?: string;
    slideClass?: string;
    wait?: number;
  }>(),
  { wrapperClass: "", slideClass: "", wait: 3000 },
);

const reducedMotion = usePreferredReducedMotion();
const staticMotion = computed(() => reducedMotion.value === "reduce");

const items = computed(() => {
  if (props.items.length >= 12) {
    return props.items.slice(0, 12);
  }

  const result = [...props.items];

  while (result.length < 12) {
    result.push(
      ...props.items.slice(0, Math.min(12 - result.length, props.items.length)),
    );
  }

  return result;
});

const activeIndex = ref(0);
const autoplayInterval = ref<NodeJS.Timeout | null>(null);

const calculatePosition = (index: number) => {
  const diff = index - activeIndex.value;
  const halfLength = 6;

  if (diff > halfLength) return diff - 12;
  if (diff <= -halfLength) return diff + 12;
  return diff;
};

const setActive = (index: number) => {
  activeIndex.value = index;
};

const startAutoplay = () => {
  if (staticMotion.value) return;

  stopAutoplay();
  autoplayInterval.value = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % 12;
  }, props.wait);
};

const stopAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value);
    autoplayInterval.value = null;
  }
};

const handleMouseEnter = () => {
  stopAutoplay();
};

const handleMouseLeave = () => {
  startAutoplay();
};

defineExpose({
  setActive,
  startAutoplay,
  stopAutoplay,
});

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});

watch(staticMotion, (reduce) => {
  if (reduce) {
    stopAutoplay();
  } else {
    startAutoplay();
  }
});
</script>

<template>
  <div @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div
      v-if="staticMotion"
      class="glass-scroll flex snap-x snap-mandatory justify-start gap-3 overflow-x-auto px-4 pb-2 md:justify-center"
    >
      <div
        v-for="(item, index) in items.slice(0, 6)"
        :key="`static-${index}`"
        :class="slideClass"
        class="snap-center shrink-0 opacity-95"
      >
        <slot v-bind="{ item, active: false }" />
      </div>
    </div>

    <div v-else class="flex items-center justify-center">
      <div :class="wrapperClass" class="relative">
        <div
          v-for="(item, index) in items"
          :key="index"
          :class="slideClass"
          :data-position="calculatePosition(index)"
          class="slide absolute inset-0 mx-auto origin-center cursor-pointer"
          @click="setActive(index)"
        >
          <slot v-bind="{ item, active: activeIndex === index }" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.slide {
  transition:
    translate 420ms var(--ease-brand),
    rotate 420ms var(--ease-brand),
    scale 420ms var(--ease-brand),
    opacity 420ms var(--ease-brand);
}

.slide[data-position="-5"] {
  translate: -74% 196%;
  scale: 0.78;
  opacity: 0.55;
  z-index: 10;
  rotate: -150deg;
}

.slide[data-position="-4"] {
  translate: -118% 158%;
  scale: 0.82;
  opacity: 0.62;
  z-index: 11;
  rotate: -120deg;
}

.slide[data-position="-3"] {
  translate: -132% 108%;
  scale: 0.86;
  opacity: 0.7;
  z-index: 12;
  rotate: -90deg;
}

.slide[data-position="-2"] {
  translate: -118% 58%;
  scale: 0.9;
  opacity: 0.78;
  z-index: 13;
  rotate: -60deg;
}

.slide[data-position="-1"] {
  translate: -74% 22%;
  scale: 0.94;
  opacity: 0.86;
  z-index: 14;
  rotate: -30deg;
}

.slide[data-position="0"] {
  translate: 0% 0%;
  scale: 1;
  opacity: 1;
  z-index: 15;
  rotate: 0deg;
}

.slide[data-position="1"] {
  translate: 74% 22%;
  scale: 0.94;
  opacity: 0.86;
  z-index: 14;
  rotate: 30deg;
}

.slide[data-position="2"] {
  translate: 118% 58%;
  scale: 0.9;
  opacity: 0.78;
  z-index: 13;
  rotate: 60deg;
}

.slide[data-position="3"] {
  translate: 132% 108%;
  scale: 0.86;
  opacity: 0.7;
  z-index: 12;
  rotate: 90deg;
}

.slide[data-position="4"] {
  translate: 118% 158%;
  scale: 0.82;
  opacity: 0.62;
  z-index: 11;
  rotate: 120deg;
}

.slide[data-position="5"] {
  translate: 74% 196%;
  scale: 0.78;
  opacity: 0.55;
  z-index: 10;
  rotate: 150deg;
}

.slide[data-position="-6"],
.slide[data-position="6"] {
  translate: 0 214%;
  scale: 0.74;
  opacity: 0.5;
  z-index: 9;
  rotate: 180deg;
}
</style>
