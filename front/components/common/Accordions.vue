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
    title: item[props.titleKey],
    content: item[props.contentKey],
  })),
);

function itemText(value: unknown) {
  return typeof value === "string" ? value : rt(value as string);
}
</script>

<template>
  <div class="flex flex-col gap-y-[15px]">
    <details
      v-for="(item, j) in items"
      :key="`item-${j}`"
      class="faq-details group"
    >
      <summary
        class="faq-summary flex w-full cursor-pointer list-none items-center justify-between gap-x-2 pt-4 pr-[21px] pb-4.5 pl-[24.5px] text-left text-[22px]/[calc(26/22)] text-ink active:scale-100"
      >
        <span class="min-w-0 flex-1 text-pretty">
          {{ itemText(item.title) }}
        </span>

        <span
          class="relative aspect-square h-auto w-[19px] shrink-0"
          aria-hidden="true"
        >
          <span
            v-for="lineIndex in 2"
            :key="lineIndex"
            :class="
              twMerge(
                'absolute top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-white transition-transform duration-300 ease-[var(--ease-brand)] odd:rotate-90',
                'group-open:odd:scale-x-0',
              )
            "
          />
        </span>
      </summary>

      <div
        class="faq-answer text-muted -mt-1 pr-[21px] pb-4.5 pl-[24.5px] text-[18px]/[calc(22/18)] opacity-80"
      >
        {{ itemText(item.content) }}
      </div>
    </details>
  </div>
</template>

<style scoped>
.faq-details {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  border-radius: 15px;
  border: 1px solid var(--color-line);
  background: color-mix(in srgb, var(--color-panel) 70%, transparent);
  transition:
    border-color 0.3s var(--ease-brand, cubic-bezier(0.16, 1, 0.3, 1)),
    box-shadow 0.3s var(--ease-brand, cubic-bezier(0.16, 1, 0.3, 1));
}

.faq-details:hover {
  border-color: var(--color-line-2);
}

.faq-details::before,
.faq-details::after {
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  pointer-events: none;
  content: "";
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Glass ring — always visible (matches GradientBg panel shell) */
.faq-details::before {
  opacity: 1;
  box-shadow: 0 4px 24px rgb(0 0 0 / 15%);
  background: rgb(255 255 255 / 8%);
  outline: 1px solid rgb(255 255 255 / 16%);
}

/* Brand green wash — visible when open (matches GradientBg enabled) */
.faq-details::after {
  opacity: 0;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--color-green, #44d77a) 29%, transparent),
    color-mix(in srgb, var(--color-green, #44d77a) 51%, transparent)
  );
}

.faq-details[open] {
  border-color: color-mix(in srgb, rgb(116 255 223) 45%, var(--color-line-2));
}

.faq-details[open]::after {
  opacity: 1;
}

.faq-summary,
.faq-answer {
  position: relative;
  z-index: 1;
}

.faq-summary {
  list-style: none;
}

.faq-summary::-webkit-details-marker {
  display: none;
}

.faq-summary::marker {
  content: "";
}
</style>
