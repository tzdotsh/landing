<script lang="ts" setup>
import { motion } from "motion-v";

const { tm, rt } = useI18n();

const faqs = tm<
  any,
  any,
  any,
  any,
  Record<
    string,
    { title: string; questions: { title: string; content: string }[] }
  >
>("faq.faqs");

const sections = computed(() =>
  Object.entries(faqs).map(([key, value]) => ({ key, title: value.title })),
);
const selectedSection = ref(sections.value[0]?.key);

const selectedSectionInfos = computed(
  () =>
    Object.entries(faqs).find(([key]) => key === selectedSection.value)?.[1],
);

function selectSection(section: string) {
  if (selectedSection.value !== section) {
    selectedSection.value = section;
  }
}
</script>

<template>
  <section id="question-response">
    <div class="container flex flex-col gap-y-15">
      <div
        class="glass-effect-ring mx-auto flex w-full max-w-max flex-wrap items-center justify-center rounded-[20px] p-1.5 lg:rounded-full"
      >
        <button
          v-for="section in sections"
          :key="section.key"
          type="button"
          class="relative flex h-15 items-center rounded-[10px] px-8"
          @click="selectSection(section.key)"
        >
          <p class="text-[18px]/[calc(21/18)] font-medium text-white">
            {{ rt(section.title) }}
          </p>

          <ClientOnly>
            <AnimatePresence>
              <motion.div
                v-if="selectedSection === section.key"
                layout-id="background"
                class="absolute inset-0 -z-10"
                :transition="{
                  type: 'spring',
                  stiffness: 300,
                  damping: 25,
                  duration: 0.3,
                }"
              >
                <AnimatedBorder border-radius="1000" class="h-full w-full">
                  <GradientBg />
                </AnimatedBorder>
              </motion.div>
            </AnimatePresence>
          </ClientOnly>
        </button>
      </div>

      <CommonAccordions
        v-if="selectedSectionInfos"
        :items="selectedSectionInfos.questions"
      />
    </div>
  </section>
</template>
