<script lang="ts"></script>

<script lang="ts" setup generic="T extends Record<string, string>">
import { twMerge } from "tailwind-merge";
import { AnimatePresence } from "motion-v";

import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from "reka-ui";
export type AccordionItemType = {
  title: string;
  content: string;
};

type PropsType = {
  items: T[];
  titleKey?: keyof T;
  contentKey?: keyof T;
};

const props = withDefaults(defineProps<PropsType>(), {
  titleKey: "title",
  contentKey: "content",
});

const { rt } = useI18n();

const items = computed(() => {
  return props.items.map((item) => ({
    title: item[props.titleKey] as string,
    content: item[props.contentKey] as string,
  }));
});
</script>

<template>
  <AccordionRoot class="flex flex-col gap-y-[15px]">
    <AccordionItem
      v-for="(item, j) in items"
      :key="`item-${j}`"
      #="{ open }"
      :value="`item-${j}`"
    >
      <AnimatedBorder
        :enabled="open"
        class="text-white before:overflow-hidden before:transition"
        border-radius="15"
      >
        <GradientBg :enabled="open">
          <AccordionHeader>
            <AccordionTrigger
              class="group flex w-full items-center justify-between gap-x-2 pt-4 pr-[21px] pb-4.5 pl-[24.5px] text-left text-[22px]/[calc(26/22)] active:scale-100"
            >
              {{ rt(item.title) }}

              <div class="relative aspect-square h-auto w-[19px] flex-none">
                <div
                  v-for="lineIndex in 2"
                  :key="lineIndex"
                  :class="
                    twMerge(
                      'absolute top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-white transition odd:rotate-90',
                      open && 'odd:scale-x-0',
                    )
                  "
                />
              </div>
            </AccordionTrigger>
          </AccordionHeader>

          <AccordionContent force-mount>
            <AnimatePresence>
              <MotionWrapper
                v-if="open"
                :initial="{ height: 0, opacity: 0 }"
                :animate="{ height: 'auto', opacity: 1 }"
                :exit="{ height: 0, opacity: 0 }"
                :transition="{
                  type: 'spring',
                  stiffness: 300,
                  damping: 25,
                  duration: 0.3,
                }"
                class="overflow-hidden"
              >
                <div
                  class="-mt-1 pr-[21px] pb-4.5 pl-[24.5px] text-[18px]/[calc(22/18)] opacity-60"
                >
                  {{ rt(item.content) }}
                </div>
              </MotionWrapper>
            </AnimatePresence>
          </AccordionContent>
        </GradientBg>
      </AnimatedBorder>
    </AccordionItem>
  </AccordionRoot>
</template>
