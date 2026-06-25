<script lang="ts" setup>
import { twMerge } from "tailwind-merge";
import type { Props as ButtonProps } from "./Button.vue";
import type { RouteLocationRaw } from "vue-router";

const { t } = useI18n();

withDefaults(
  defineProps<
    {
      reviews?: boolean;
      guarantee?: boolean;
      gap?: string | number;
      noticeColor?: "dark" | "light";
      to?: RouteLocationRaw;
      external?: boolean;
      target?: "_blank" | "_self" | "_parent" | "_top";
    } & Pick<ButtonProps, "variant" | "size" | "radius" | "btnClass">
  >(),

  {
    theme: "primary",
    reviews: false,
    guarantee: false,
    gap: 10,
    noticeColor: "dark",
    to: "/checkout",
    external: true,
    target: "_self",
  },
);
</script>

<template>
  <div
    :style="`--gap: ${gap}px`"
    class="flex flex-col items-center gap-y-(--gap)"
  >
    <NuxtLinkLocale :to="to" :external="external" :target="target">
      <MotionWrapper
        :while-hover="{ scale: 1.03 }"
        :while-tap="{ scale: 0.95 }"
        :transition="{ type: 'spring', stiffness: 400, damping: 17 }"
      >
        <Button
          :size="size"
          :radius="radius"
          :variant="variant"
          :class="twMerge(btnClass)"
        >
          <template #icon><slot name="icon"></slot></template>

          <slot></slot>
        </Button>
      </MotionWrapper>
    </NuxtLinkLocale>

    <div v-if="reviews" class="flex flex-col gap-y-[7px]">
      <div class="flex items-center justify-center gap-x-[3.5px]">
        <MyNuxtImg
          src="/img/reviewers@2x.webp"
          srcset="/img/reviewers@1x.webp 1x, /img/reviewers@2x.webp 2x"
          class="h-6 w-auto"
          alt="Reviewer"
          loading="lazy"
        />

        <div class="flex items-center gap-x-0.5">
          <MyNuxtImg
            v-for="starIndex in 5"
            :key="starIndex"
            src="/img/star.webp"
            srcset="/img/star.webp 1x, /img/star@2x.webp 2x"
            alt="Star"
            height="13"
            width="14"
            class="h-3.5 w-auto"
          />
        </div>
      </div>

      <p
        :class="{
          'text-[#404040]': noticeColor === 'dark',
          'text-white': noticeColor === 'light',
        }"
        class="text-center text-[14px]/[17px] font-medium"
      >
        {{ t("common.notices.trusted_customers") }}
      </p>
    </div>

    <div v-if="guarantee" class="flex items-center justify-center gap-x-1">
      <SvgoMoneyBack
        :class="{
          'fill-[#202020]': noticeColor === 'dark',
          'fill-white': noticeColor === 'light',
        }"
        class="flex-none"
      />

      <p
        :class="{
          'text-[#404040]': noticeColor === 'dark',
          'text-white': noticeColor === 'light',
        }"
        class="text-[12px]/[15px] opacity-81 text-shadow-[0_1px_0_rgb(0_0_0_/0.12)]"
      >
        {{ t("common.notices.money_back_guarantee") }}
      </p>
    </div>
  </div>
</template>
