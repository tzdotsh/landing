<script lang="ts" setup>
import { motion } from "motion-v";

const { t } = useI18n();

const target = useTemplateRef<HTMLDivElement>("target");
const targetIsVisible = useElementVisibility(target);

const categories = ref([
  {
    name: "sports",
    name_i18n: t("channels.hero.categories.sports.name"),
    title: t("channels.hero.categories.sports.title"),
    description: t("channels.hero.categories.sports.description"),
    notice: t("channels.hero.categories.sports.notice"),
  },
  {
    name: "cinema",
    name_i18n: t("channels.hero.categories.cinema.name"),
    title: t("channels.hero.categories.cinema.title"),
    description: t("channels.hero.categories.cinema.description"),
    notice: t("channels.hero.categories.cinema.notice"),
  },
  {
    name: "discovery",
    name_i18n: t("channels.hero.categories.culture.name"),
    title: t("channels.hero.categories.culture.title"),
    description: t("channels.hero.categories.culture.description"),
    notice: t("channels.hero.categories.culture.notice"),
  },
  {
    name: "antena3",
    name_i18n: t("channels.hero.categories.tdt.name"),
    title: t("channels.hero.categories.tdt.title"),
    description: t("channels.hero.categories.tdt.description"),
    notice: t("channels.hero.categories.tdt.notice"),
  },
  {
    name: "nickelodeon",
    name_i18n: t("channels.hero.categories.kids.name"),
    title: t("channels.hero.categories.kids.title"),
    description: t("channels.hero.categories.kids.description"),
    notice: t("channels.hero.categories.kids.notice"),
  },
  {
    name: "f1",
    name_i18n: t("channels.hero.categories.formula_1.name"),
    title: t("channels.hero.categories.formula_1.title"),
    description: t("channels.hero.categories.formula_1.description"),
    notice: t("channels.hero.categories.formula_1.notice"),
  },
] as const);

const selectedCategory =
  ref<(typeof categories.value)[number]["name"]>("sports");

const selectedCategoryInfo = computed(() => {
  return categories.value.find(
    (category) => category.name === selectedCategory.value,
  )!;
});

let autoSwitchInterval: NodeJS.Timeout | null = null;

function startAutoSwitch() {
  if (autoSwitchInterval) {
    clearInterval(autoSwitchInterval);
  }

  autoSwitchInterval = setInterval(() => {
    const currentIndex = categories.value.findIndex(
      (category) => category.name === selectedCategory.value,
    );
    const nextIndex = (currentIndex + 1) % categories.value.length;
    selectedCategory.value = categories.value[nextIndex]!.name;
  }, 3000);
}

function stopAutoSwitch() {
  if (autoSwitchInterval) {
    clearInterval(autoSwitchInterval);
    autoSwitchInterval = null;
  }
}

// Override selectCategory to stop auto-switch when user interacts
function selectCategory(category: (typeof categories.value)[number]["name"]) {
  if (selectedCategory.value !== category) {
    selectedCategory.value = category;
    stopAutoSwitch();
    // Restart auto-switch after user interaction
    setTimeout(() => {
      startAutoSwitch();
    }, 3000); // Wait 3 seconds before resuming auto-switch
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
              :key="selectedCategoryInfo?.name"
              :initial="{ scale: 1.05, opacity: 0 }"
              :animate="{ scale: 1, opacity: 1 }"
              :exit="{ scale: 1.05, opacity: 0 }"
              class="relative -z-20 h-full w-full"
            >
              <ChannelsCategoryImage
                :category="selectedCategoryInfo?.name ?? 'sports'"
                :alt="`${selectedCategoryInfo?.name_i18n} background`"
                class="absolute inset-0 h-full w-full"
                img-class="absolute inset-0 scale-100 data-[state=loading]:scale-110 data-[state=ready]:scale-100"
              />
            </motion.div>
          </AnimatePresence>

          <div
            class="absolute inset-0 -z-10 bg-linear-to-tr from-bg-deep/80 from-40% to-transparent"
          ></div>
        </div>

        <div
          class="relative z-10 flex h-full flex-col justify-between gap-y-10 pb-[31px] max-lg:pt-40 lg:pt-[215px]"
        >
          <AnimatePresence mode="wait">
            <motion.div layout>
              <div
                class="bg-panel/80 ring-line mb-2.5 flex h-8.5 w-max items-center rounded-full px-3.5 ring-1 backdrop-blur-md"
              >
                <p
                  class="text-ink text-[18px]/[calc(21/18)] lg:line-clamp-7"
                >
                  {{ selectedCategoryInfo?.notice }}
                </p>
              </div>

              <Heading
                :title="selectedCategoryInfo?.title"
                :description="selectedCategoryInfo?.description"
                size="primary"
                align="left"
                gap="10"
                title-class="leading-[calc(90/80)]"
                description-class="max-w-[625px] text-[20px]/[calc(24/20)] tracking-normal opacity-100"
              />

              <Cta
                :key="selectedCategoryInfo?.name"
                size="small"
                variant="secondary"
                class="mt-5 w-max"
                btn-class="rounded-[10px] font-medium"
              >
                {{ t("common.buttons.watch_now") }}
              </Cta>
            </motion.div>
          </AnimatePresence>

          <div
            class="bg-panel ring-line rounded-card ring-1 max-lg:p-3 lg:p-[18px] lg:pt-[21px]"
          >
            <div
              class="grid grid-cols-2 items-center max-lg:gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-[18px]"
            >
              <button
                v-for="category in categories"
                :key="category.name"
                type="button"
                :class="[
                  'shadow-black-15 relative cursor-pointer overflow-hidden rounded-xl ring-1 transition duration-300 ease-[var(--ease-brand)]',
                  selectedCategory === category.name
                    ? 'ring-line-2'
                    : 'ring-line hover:ring-line-2',
                ]"
                @click="() => selectCategory(category.name)"
              >
                <div
                  class="absolute inset-0 bg-linear-to-b from-transparent to-bg-deep/85"
                ></div>

                <ChannelsCategoryImage
                  :category="category.name"
                  :alt="`${category.name_i18n} category`"
                  class="mx-auto h-[90px] w-full"
                  img-class="mx-auto object-cover object-center"
                />

                <p
                  class="text-ink absolute bottom-[13px] line-clamp-1 w-full text-center text-[24px]/[calc(29/24)] font-bold break-all"
                >
                  {{ category.name_i18n }}
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
