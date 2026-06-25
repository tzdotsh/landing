<script lang="ts" setup>
import { Splide, SplideSlide, type Options } from "@splidejs/vue-splide";
import { Grid } from "@splidejs/splide-extension-grid";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { Intersection } from "@splidejs/splide-extension-intersection";

const options: Options = {
  rewind: true,
  arrows: false,
  pagination: false,
  fixedWidth: 254,
  fixedHeight: 588,
  type: "loop",
  focus: "center",
  drag: "free",
  updateOnMove: true,
  gap: 20,
  grid: {
    rows: 3,
    gap: {
      row: 16,
    },
  },
  autoScroll: {
    speed: 0.5,
  },
  intersection: {
    inView: {
      autoplay: true,
    },
    outView: {
      autoplay: false,
    },
  },
};

const features = [
  "Anti-Buffer V6™",
  "Multi-Devices",
  "PPV Events",
  "FHD & 4K Quality",
];
</script>

<template>
  <HomeBackground
    id="features"
    tag="section"
    class="overflow-x-hidden pt-[100px] pb-10 lg:pt-[125px] lg:pb-[100px]"
    color="dark"
  >
    <div class="container">
      <Heading
        class="mb-[100px] gap-y-[30px] lg:mb-[132px] lg:gap-y-6"
        title-tag="h2"
        title-class="max-w-[750px] font-bold"
        description-class="max-w-[906px]"
        size="normal"
        title="10,000+ Live Channels. Infinite Possibilities."
        description="Discover a world of entertainment with an unparalleled selection of over 10,000 channels, offering something for everyone, anytime, anywhere."
      />

      <div
        class="mx-auto grid max-w-[1100px] grid-cols-2 items-center gap-4 lg:grid-cols-4 lg:gap-x-[23px]"
      >
        <AnimatedBorder
          v-for="(feature, i) in features"
          :key="i"
          :delay="1 * -i"
          border-radius="20"
          border-size="2"
          class="bg-green-gradient lg: flex h-[clamp(52px,7vw,65px)] flex-1 items-center justify-center text-center text-[clamp(18px,3vw,26px)]/[clamp(21px,3vw,31px)] font-medium text-white transition duration-500 hover:scale-102"
        >
          {{ feature }}
        </AnimatedBorder>
      </div>

      <Splide
        :options="options"
        :extensions="{ Grid, Intersection, AutoScroll }"
        class="group relative left-1/2 w-screen -translate-x-1/2 pt-[58px] pb-[60px]"
      >
        <SplideSlide
          v-for="i in 30"
          :key="i"
          class="isolate flex flex-col justify-between overflow-hidden rounded-[15px] bg-white/10 transition duration-500 group-[:has(.splide\_\_slide\_\_row_.splide\_\_slide:hover)]:opacity-10 hover:z-50 hover:scale-130 hover:opacity-100!"
        >
          <div class="h-36 w-full">
            <MyNuxtImg
              src="/img/thumbnails/laliga@2x.webp"
              srcset="/img/thumbnails/laliga@1x.webp 1x, /img/thumbnails/laliga@2x.webp 2x"
              height="144"
              width="254"
              class="h-full w-full object-cover"
              alt="thumbnail image"
            />
          </div>

          <div
            class="flex flex-1 items-center justify-between px-[11px] font-bold text-white"
          >
            <p class="text-[18px]">M+ LALIGA TV FHD</p>

            <p class="flex items-center gap-x-1 uppercase">
              <span
                class="aspect-square h-auto w-3 flex-none animate-pulse rounded-full bg-[#FF2121]"
              ></span>
              LIVE
            </p>
          </div>
        </SplideSlide>
      </Splide>

      <Cta
        variant="secondary"
        notice-color="light"
        gap="10"
        btn-class="w-[440px] max-sm:w-full"
        reviews
      >
        Order Your IPTV Pass Today
      </Cta>
    </div>
  </HomeBackground>
</template>

<style scoped lang="scss">
:deep(.splide) {
  .splide__track {
    overflow: visible;
  }

  .splide__slide__row {
    position: relative;
    z-index: 20;
  }

  .splide__slide__row:has(*:hover) {
    z-index: 30;
  }
}
</style>
