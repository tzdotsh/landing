<script lang="ts" setup>
import { Splide, SplideSlide, type Options } from "@splidejs/vue-splide";
import { Intersection } from "@splidejs/splide-extension-intersection";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

// import "@splidejs/vue-splide/css/core";

import type { Review } from "~/types/review";

const { tm } = useI18n();

const options1: Options = {
  rewind: true,
  arrows: false,
  pagination: false,
  fixedWidth: 270,
  fixedHeight: 220,
  type: "loop",
  focus: "center",
  drag: "free",
  gap: 13.5,
  autoScroll: {
    pauseOnHover: false,
    speed: 0.3,
  },
  intersection: {
    inView: {
      autoplay: true,
    },
    outView: {
      autoplay: false,
    },
  },
  breakpoints: {
    640: {
      gap: 12.5,
      fixedWidth: 243,
      fixedHeight: 198,
    },
  },
};
const options2 = { ...options1 };

options2.autoScroll = {
  speed: -0.3,
  pauseOnHover: false,
};

const options = [options1, options2];

const reviews = computed(() =>
  tm<any, any, any, any, Review[]>("home.reviews.testimonials"),
);

// divide reviews to 2 arrays
const reviews1 = reviews.value.slice(0, Math.ceil(reviews.value.length / 2));
const reviews2 = reviews.value.slice(Math.ceil(reviews.value.length / 2));
</script>

<template>
  <HomeBackground id="reviews" tag="section" class="pt-25 pb-10 lg:pt-30">
    <div class="container">
      <Heading
        class="mb-[70px] lg:mb-[95px]"
        title-tag="h2"
        title-class="max-w-[750px] font-bold"
        description-class="max-w-[906px]"
        size="normal"
        color="dark"
        title="Trusted by Thousands. Loved by All"
        description="Join a community of satisfied viewers who enjoy seamless streaming and unmatched content every day."
        gap="30"
      />

      <div
        class="mb-[70px] flex items-center justify-center gap-x-4 gap-y-2.5 text-[clamp(26px,3vw,28.8px)]/[clamp(31px,3vw,35px)] font-bold text-[#1E1E1E] max-lg:flex-col-reverse"
      >
        <div class="flex items-end gap-x-4 max-lg:flex-row-reverse">
          <p>Excellent</p>

          <div class="flex items-center gap-x-1 lg:gap-x-[5px]">
            <SvgoSingleStar
              v-for="starIndex in 5"
              :key="starIndex"
              class="w-auto flex-none max-lg:h-[31px]"
            />
          </div>
        </div>

        <div class="flex items-end gap-x-4 max-lg:flex-row-reverse">
          <p>8.9 out of 10</p>

          <SvgoTrustpilot class="w-auto flex-none max-lg:h-11" />
        </div>
      </div>

      <div
        class="relative left-1/2 mb-12 flex w-screen -translate-x-1/2 flex-col text-white lg:mb-[46.5px]"
      >
        <Splide
          v-for="(reviewsArray, i) in [reviews1, reviews2]"
          :key="`reviews-row-${i}`"
          :extensions="{ AutoScroll, Intersection }"
          :options="options[i]"
        >
          <SplideSlide
            v-for="(review, reviewIndex) in reviewsArray"
            :key="`${review.image}-${reviewIndex}`"
            class="pb-3 lg:pb-[13.5px]"
          >
            <CommonReview :review="review" />
          </SplideSlide>
        </Splide>
      </div>

      <Cta
        variant="secondary"
        gap="15"
        btn-class="w-[367px] max-sm:w-full"
        reviews
      >
        Order Your IPTV Pass Today
      </Cta>
    </div>
  </HomeBackground>
</template>
