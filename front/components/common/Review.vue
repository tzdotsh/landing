<script lang="ts" setup>
import { twMerge } from "tailwind-merge";

export type Review = {
  author?: string;
  name?: string;
  location?: string;
  text: string;
  image?: string;
  platform?: "facebook" | "trustpilot" | "x";
};

type PropsType = {
  review: Review;
  class?: string;
  theme?: "light" | "dark" | "panel";
};

const props = withDefaults(defineProps<PropsType>(), {
  theme: "panel",
  class: "",
});

const { rt } = useI18n();

const displayName = computed(() => {
  const review = props.review;
  return rt(review.name ?? review.author ?? "");
});

const initials = computed(() =>
  displayName.value
    .split(/\s+/)
    .map((part) => part.replace(/[^A-Za-z]/g, "").charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase(),
);

const hasAvatar = computed(() => Boolean(props.review.image));
</script>

<template>
  <div
    :class="
      twMerge(
        'flex h-full w-full flex-col',
        theme === 'panel' &&
          'group rounded-card border border-line bg-panel p-4 transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-brand)] hover:-translate-y-0.5 hover:border-line-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.28)] lg:p-5',
        theme === 'dark' &&
          'lg:rounded-6 justify-between gap-y-2 rounded-[30px] px-[13px] pt-[13px] pb-[15px] ring ring-white/16 lg:px-3.5 lg:pt-4.5 lg:pb-[21px] bg-[#000312]/63 shadow-[0_2px_3px_rgb(0,0,0,.15)] backdrop-blur-[14px]',
        theme === 'light' &&
          'justify-between gap-y-2 rounded-[30px] px-[13px] pt-[13px] pb-[15px] shadow-black-15 bg-linear-to-b from-[#5FB5FF]/23 to-[#51D1FF]/10 to-50% text-white lg:px-3.5 lg:pt-4.5 lg:pb-[21px]',
        $props.class,
      )
    "
  >
    <template v-if="theme === 'panel'">
      <div class="mb-4 flex items-center gap-x-3">
        <MyNuxtImg
          v-if="hasAvatar"
          :src="`/img/reviewers/${rt(review.image!)}@1x.webp`"
          :srcset="`/img/reviewers/${rt(review.image!)}@1x.webp 1x, /img/reviewers/${rt(review.image!)}@2x.webp 2x`"
          class="aspect-square h-10 w-10 shrink-0 rounded-full object-cover"
          :alt="displayName"
          width="40"
          height="40"
          loading="lazy"
        />
        <div
          v-else
          class="bg-panel-2 text-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold tracking-wide"
          aria-hidden="true"
        >
          {{ initials }}
        </div>

        <div class="min-w-0">
          <p class="text-ink truncate text-[15px]/[1.2] font-semibold">
            {{ displayName }}
          </p>
          <p
            v-if="review.location"
            class="text-muted truncate text-[13px]/[1.2]"
          >
            {{ rt(review.location) }}
          </p>
        </div>
      </div>

      <div class="mb-3 flex items-center gap-x-0.5" aria-hidden="true">
        <svg
          v-for="starIndex in 5"
          :key="starIndex"
          viewBox="0 0 16 16"
          class="h-4 w-4 shrink-0"
          fill="#FFB800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.92L8 10.67 4.48 12.34l.67-3.92L2.3 5.64l3.94-.57L8 1.5z"
          />
        </svg>
      </div>

      <p
        class="text-muted mb-4 line-clamp-5 flex-1 text-[15px]/[1.45] text-pretty"
      >
        {{ rt(review.text) }}
      </p>

      <div class="mt-auto flex items-center justify-between gap-x-3">
        <span class="text-faint text-[11px]/none font-medium tracking-wide uppercase">
          Verified review
        </span>
        <SvgoTrustpilotIcon class="h-5 w-auto shrink-0" aria-label="Trustpilot" />
      </div>
    </template>

    <template v-else>
      <p
        :class="{
          'line-clamp-5 text-[15px]/[calc(21/15)]': theme === 'dark',
          'text-[18px]/[calc(26/18)]': theme === 'light',
        }"
        class="italic"
      >
        {{ rt(review.text) }}
      </p>

      <div class="flex flex-col gap-y-3 lg:gap-y-[13px]">
        <div class="flex items-center gap-x-[6.5px] lg:gap-x-[7px]">
          <NuxtImg
            v-for="starIndex in 5"
            :key="starIndex"
            src="/img/star.webp"
            srcset="/img/star.webp 1x, /img/star@2x.webp 2x"
            class="h-[15px] w-auto lg:h-4"
            width="16"
            height="16"
            alt="Star"
            loading="lazy"
          />
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-x-2 lg:gap-x-3">
            <MyNuxtImg
              v-if="hasAvatar"
              :src="`/img/reviewers/${rt(review.image!)}@1x.webp`"
              :srcset="`/img/reviewers/${rt(review.image!)}@1x.webp 1x, /img/reviewers/${rt(review.image!)}@2x.webp 2x`"
              :class="{
                'w-[21px] lg:w-6': theme === 'dark',
                'w-[30px]': theme === 'light',
              }"
              class="aspect-square h-auto rounded-full"
              alt="Reviewer"
              width="30"
              height="30"
              loading="lazy"
            />

            <p
              :class="{
                'text-[14px]/[calc(18/14)]': theme === 'dark',
                'text-[18px]/[calc(26/18)]': theme === 'light',
              }"
              class="italic"
            >
              {{ displayName }}
            </p>
          </div>

          <NuxtImg
            v-if="rt(review.platform ?? '') === 'trustpilot'"
            src="/img/trustpilot-icon.webp"
            srcset="/img/trustpilot-icon.webp 1x, /img/trustpilot-icon@2x.webp 2x"
            class="h-[21px] w-auto lg:h-[23px]"
            alt="Trustpilot"
            loading="lazy"
            width="23"
            height="22"
          />

          <NuxtImg
            v-if="rt(review.platform ?? '') === 'facebook'"
            src="/img/facebook-icon.webp"
            srcset="/img/facebook-icon.webp 1x, /img/facebook-icon@2x.webp 2x"
            class="h-[21px] w-auto lg:h-[23px]"
            alt="Facebook"
            loading="lazy"
            width="23"
            height="23"
          />

          <NuxtImg
            v-if="rt(review.platform ?? '') === 'x'"
            src="/img/x-icon.webp"
            srcset="/img/x-icon.webp 1x, /img/x-icon@2x.webp 2x"
            class="h-[21px] w-auto lg:h-[23px]"
            alt="X"
            loading="lazy"
            width="23"
            height="23"
          />
        </div>
      </div>
    </template>
  </div>
</template>
