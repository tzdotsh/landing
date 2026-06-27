<script lang="ts" setup>
import { motion } from "motion-v";

import {
  CHANNELS_HERO_CATEGORIES,
  type ChannelsHeroCategoryId,
} from "~/data/channelsHeroCategories";
import { CHANNELS_HERO_CINEMA_SLIDES } from "~/data/channelsHeroCinema";
import { CHANNELS_HERO_FTV_SLIDES } from "~/data/channelsHeroFtv";
import { CHANNELS_HERO_SPORTS_SLIDES } from "~/data/channelsHeroSports";
import type { ChannelsHeroSlide } from "~/data/channelsHeroSports";

const { t } = useI18n();

const target = useTemplateRef<HTMLDivElement>("target");
const targetIsVisible = useElementVisibility(target);

const selectedCategory = ref<ChannelsHeroCategoryId>("sports");
const slideIndices = ref<Record<ChannelsHeroCategoryId, number>>({
  sports: 0,
  cinema: 0,
  channels: 0,
});

function slidesForCategory(categoryId: ChannelsHeroCategoryId): ChannelsHeroSlide[] {
  const category = CHANNELS_HERO_CATEGORIES.find((entry) => entry.id === categoryId);

  if (!category) {
    return [];
  }

  if (category.source === "static-sports") {
    return CHANNELS_HERO_SPORTS_SLIDES;
  }

  if (category.source === "static-ftv") {
    return CHANNELS_HERO_FTV_SLIDES;
  }

  return CHANNELS_HERO_CINEMA_SLIDES;
}

function advanceSlide(categoryId: ChannelsHeroCategoryId) {
  const slides = slidesForCategory(categoryId);

  if (slides.length <= 1) {
    return;
  }

  slideIndices.value[categoryId] =
    ((slideIndices.value[categoryId] ?? 0) + 1) % slides.length;
}

const activeSlide = computed(() => {
  const slides = slidesForCategory(selectedCategory.value);
  const index = slideIndices.value[selectedCategory.value] ?? 0;

  return slides[index] ?? slides[0]!;
});

const displayCopy = computed(() => {
  const slide = activeSlide.value;
  const base = `channels.hero.slides.${selectedCategory.value}.${slide.i18nKey}`;

  return {
    title: t(`${base}.title`),
    description: t(`${base}.description`),
    notice: t(`${base}.notice`),
  };
});

let autoSwitchInterval: NodeJS.Timeout | null = null;

function startAutoSwitch() {
  if (autoSwitchInterval) {
    clearInterval(autoSwitchInterval);
  }

  autoSwitchInterval = setInterval(() => {
    const currentIndex = CHANNELS_HERO_CATEGORIES.findIndex(
      (category) => category.id === selectedCategory.value,
    );
    const nextIndex = (currentIndex + 1) % CHANNELS_HERO_CATEGORIES.length;
    const previousCategory = selectedCategory.value;

    advanceSlide(previousCategory);
    selectedCategory.value = CHANNELS_HERO_CATEGORIES[nextIndex]!.id;
  }, 3000);
}

function stopAutoSwitch() {
  if (autoSwitchInterval) {
    clearInterval(autoSwitchInterval);
    autoSwitchInterval = null;
  }
}

watch(
  targetIsVisible,
  (isVisible) => (isVisible ? startAutoSwitch() : stopAutoSwitch()),
  { immediate: true },
);

onMounted(() => {
  startAutoSwitch();
});

onUnmounted(() => {
  stopAutoSwitch();
});
</script>

<template>
  <section id="hero" ref="target">
    <div class="container">
      <div class="grid grid-cols-1 lg:min-h-[810px]">
        <div
          class="absolute top-0 left-0 -z-10 h-[810px] w-full overflow-hidden mask-[linear-gradient(to_bottom,black_50%,transparent_90%)]"
        >
          <AnimatePresence>
            <motion.div
              :key="`${selectedCategory}-${activeSlide.id}`"
              :initial="{ scale: 1.05, opacity: 0 }"
              :animate="{ scale: 1, opacity: 1 }"
              :exit="{ scale: 1.05, opacity: 0 }"
              class="relative -z-20 h-full w-full"
            >
              <ChannelsHeroSlideImage
                v-if="activeSlide"
                :slide="activeSlide"
                class="absolute inset-0 h-full w-full"
                :img-class="
                  selectedCategory === 'cinema'
                    ? 'absolute inset-0 scale-100 object-cover object-top data-[state=ready]:scale-100'
                    : 'absolute inset-0 scale-100 object-cover object-center data-[state=ready]:scale-100'
                "
              />
            </motion.div>
          </AnimatePresence>

          <div
            class="absolute inset-0 -z-10 bg-linear-to-tr from-bg-deep/80 from-40% to-transparent"
          ></div>
        </div>

        <div
          class="relative z-10 flex h-full flex-col pb-[31px] max-lg:pt-40 lg:pt-[215px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              :key="`${selectedCategory}-${activeSlide.id}`"
              layout
            >
              <div
                class="bg-panel/80 ring-line mb-2.5 flex h-8.5 w-max items-center rounded-full px-3.5 ring-1 backdrop-blur-md"
              >
                <p class="text-ink text-[18px]/[calc(21/18)] lg:line-clamp-7">
                  {{ displayCopy.notice }}
                </p>
              </div>

              <Heading
                :title="displayCopy.title"
                :description="displayCopy.description"
                size="primary"
                align="left"
                gap="10"
                title-class="leading-[calc(90/80)]"
                description-class="max-w-[625px] text-[20px]/[calc(24/20)] tracking-normal opacity-100"
              />

              <Cta
                size="small"
                variant="secondary"
                class="mt-5 w-max"
                btn-class="rounded-[10px] font-medium"
              >
                {{ t("common.buttons.watch_now") }}
              </Cta>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  </section>
</template>
