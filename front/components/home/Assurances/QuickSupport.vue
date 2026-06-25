<script setup lang="ts">
import Bubble from "./Bubble.vue";

const props = withDefaults(
  defineProps<{
    staticMotion?: boolean;
  }>(),
  {
    staticMotion: false,
  },
);

const { t } = useI18n();
</script>

<template>
  <div
    class="mx-auto grid aspect-372/222 h-auto w-full grid-cols-[267fr_242fr] gap-x-3 overflow-hidden rounded-[12px] bg-panel-2 p-3 lg:mr-0 lg:gap-x-4 lg:p-4"
  >
    <div
      class="bg-panel-2 relative flex flex-col justify-end overflow-hidden rounded-card border border-line pb-3 lg:pb-4"
    >
      <div
        class="border-line absolute inset-x-3 top-3 flex items-center gap-x-2 border-b pb-2"
      >
        <span
          class="brand-gradient h-2 w-2 shrink-0 rounded-full shadow-[0_0_10px_var(--color-glow)]"
          aria-hidden="true"
        />
        <p class="text-ink text-[11px] font-semibold tracking-wide lg:text-[12px]">
          {{ t("home.assurances.quick_support.chat.agent_label") }}
        </p>
      </div>

      <div class="relative z-10 mt-10 flex flex-col gap-y-3 px-3 lg:gap-y-4 lg:px-4">
        <template v-if="staticMotion">
          <Bubble admin>
            {{ t("home.assurances.quick_support.chat.admin_greeting") }}
          </Bubble>
          <Bubble text-class="max-w-[85%]">
            {{ t("home.assurances.quick_support.chat.user_question") }}
          </Bubble>
        </template>

        <template v-else>
          <MotionWrapper
            :initial="{ opacity: 0, y: 10, scale: 0.95 }"
            :animate="{
              opacity: [0, 1, 1, 0, 0],
              y: [10, 0, 0, 10, 10],
              scale: [0.95, 1, 1, 0.95, 0.95],
            }"
            :transition="{
              duration: 6,
              times: [0, 0.04, 0.9, 0.95, 1],
              ease: ['easeOut', 'linear', 'easeIn', 'linear'],
              repeat: Infinity,
            }"
          >
            <Bubble admin>
              {{ t("home.assurances.quick_support.chat.admin_greeting") }}
            </Bubble>
          </MotionWrapper>

          <MotionWrapper
            :initial="{ opacity: 0, y: 10, scale: 0.95 }"
            :animate="{
              opacity: [0, 0, 1, 1, 0, 0],
              y: [10, 10, 0, 0, 10, 10],
              scale: [0.95, 0.95, 1, 1, 0.95, 0.95],
            }"
            :transition="{
              duration: 6,
              times: [0, 0.166, 0.208, 0.9, 0.95, 1],
              ease: ['linear', 'easeOut', 'linear', 'easeIn', 'linear'],
              repeat: Infinity,
            }"
          >
            <Bubble text-class="max-w-[85%]">
              {{ t("home.assurances.quick_support.chat.user_question") }}
            </Bubble>
          </MotionWrapper>
        </template>
      </div>
    </div>

    <div class="flex flex-col justify-center gap-y-3 py-1 lg:gap-y-4">
      <template v-if="staticMotion">
        <Bubble text-class="max-w-[95%]" admin>
          {{ t("home.assurances.quick_support.chat.admin_answer") }}
        </Bubble>
        <Bubble>
          {{ t("home.assurances.quick_support.chat.user_thanks") }}
        </Bubble>
        <Bubble text-class="max-w-[95%]" admin>
          {{ t("home.assurances.quick_support.chat.admin_closing") }}
        </Bubble>
      </template>

      <template v-else>
        <MotionWrapper
          :initial="{ opacity: 0, y: 10, scale: 0.95 }"
          :animate="{
            opacity: [0, 0, 1, 1, 0, 0],
            y: [10, 10, 0, 0, 10, 10],
            scale: [0.95, 0.95, 1, 1, 0.95, 0.95],
          }"
          :transition="{
            duration: 6,
            times: [0, 0.333, 0.375, 0.9, 0.95, 1],
            ease: ['linear', 'easeOut', 'linear', 'easeIn', 'linear'],
            repeat: Infinity,
          }"
        >
          <Bubble text-class="max-w-[95%]" admin>
            {{ t("home.assurances.quick_support.chat.admin_answer") }}
          </Bubble>
        </MotionWrapper>

        <MotionWrapper
          :initial="{ opacity: 0, y: 10, scale: 0.95 }"
          :animate="{
            opacity: [0, 0, 1, 1, 0, 0],
            y: [10, 10, 0, 0, 10, 10],
            scale: [0.95, 0.95, 1, 1, 0.95, 0.95],
          }"
          :transition="{
            duration: 6,
            times: [0, 0.5, 0.541, 0.9, 0.95, 1],
            ease: ['linear', 'easeOut', 'linear', 'easeIn', 'linear'],
            repeat: Infinity,
          }"
        >
          <Bubble>
            {{ t("home.assurances.quick_support.chat.user_thanks") }}
          </Bubble>
        </MotionWrapper>

        <MotionWrapper
          :initial="{ opacity: 0, y: 10, scale: 0.95 }"
          :animate="{
            opacity: [0, 0, 1, 1, 0, 0],
            y: [10, 10, 0, 0, 10, 10],
            scale: [0.95, 0.95, 1, 1, 0.95, 0.95],
          }"
          :transition="{
            duration: 6,
            times: [0, 0.666, 0.708, 0.9, 0.95, 1],
            ease: ['linear', 'easeOut', 'linear', 'easeIn', 'linear'],
            repeat: Infinity,
          }"
        >
          <Bubble text-class="max-w-[95%]" admin>
            {{ t("home.assurances.quick_support.chat.admin_closing") }}
          </Bubble>
        </MotionWrapper>
      </template>
    </div>
  </div>
</template>
