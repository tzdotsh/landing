<script lang="ts" setup generic="T extends Record<string, string>">
import { twMerge } from "tailwind-merge";

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

const items = computed(() =>
  props.items.map((item) => ({
    title: item[props.titleKey] as string,
    content: item[props.contentKey] as string,
  })),
);

const openItems = ref<Record<number, boolean>>({});

function onToggle(index: number, event: Event) {
  openItems.value[index] = (event.target as HTMLDetailsElement).open;
}
</script>

<template>
  <div class="flex flex-col gap-y-[15px]">
    <details
      v-for="(item, j) in items"
      :key="`item-${j}`"
      class="faq-details group"
      @toggle="onToggle(j, $event)"
    >
      <AnimatedBorder
        class="text-white before:overflow-hidden before:transition"
        border-radius="15"
        :enabled="openItems[j] ?? false"
      >
        <GradientBg :enabled="openItems[j] ?? false">
          <summary
            class="flex w-full cursor-pointer list-none items-center justify-between gap-x-2 pt-4 pr-[21px] pb-4.5 pl-[24.5px] text-left text-[22px]/[calc(26/22)] marker:content-none active:scale-100"
          >
            {{ rt(item.title) }}

            <div class="relative aspect-square h-auto w-[19px] flex-none">
              <div
                v-for="lineIndex in 2"
                :key="lineIndex"
                :class="
                  twMerge(
                    'absolute top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-white transition group-open:odd:scale-x-0 odd:rotate-90',
                  )
                "
              />
            </div>
          </summary>

          <div
            class="-mt-1 pr-[21px] pb-4.5 pl-[24.5px] text-[18px]/[calc(22/18)] opacity-60"
          >
            {{ rt(item.content) }}
          </div>
        </GradientBg>
      </AnimatedBorder>
    </details>
  </div>
</template>

<style scoped>
.faq-details summary::-webkit-details-marker {
  display: none;
}
</style>
