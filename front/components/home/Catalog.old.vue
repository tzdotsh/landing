<script lang="ts" setup>
const catalog = [
  { name: "apple-tv-plus", width: 98, height: 35, alt: "Apple TV Plus" },
  { name: "bein-sports", width: 85, height: 42, alt: "Bein Sports" },
  { name: "canal-plus", width: 117, height: 19, alt: "Canal Plus" },
  { name: "disney-plus", width: 111, height: 61, alt: "Disney Plus" },
  { name: "hbo", width: 79, height: 32, alt: "HBO" },
  { name: "hulu", width: 105, height: 34, alt: "Hulu" },
  { name: "netflix", width: 128, height: 35, alt: "Netflix" },
  { name: "prime-video", width: 151, height: 46, alt: "Prime Video" },
  { name: "sky-sports-plus", width: 146, height: 38, alt: "Sky Sports Plus" },
  { name: "dazn", width: 61, height: 61, alt: "DAZN" },
];
</script>

<template>
  <HomeBackground
    id="catalog"
    color="black"
    tag="section"
    class="relative pt-[45px] pb-[37px] lg:pt-[57px] lg:pb-10"
  >
    <div class="relative flex max-w-screen overflow-hidden">
      <div class="animate-marquee hover:paused flex w-max items-center">
        <div
          v-for="item in [...catalog, ...catalog]"
          :key="`${item.name}-${item.alt}`"
          class="flex h-full items-center px-[13px] lg:px-[19px]"
        >
          <MyNuxtImg
            :src="`/img/catalogs/${item.name}@2x.webp`"
            :srcset="`/img/catalogs/${item.name}@1x.webp 1x, /img/catalogs/${item.name}@2x.webp 2x`"
            :width="item.width"
            :height="item.height"
            :alt="item.alt"
            class="w-auto max-w-none max-lg:max-h-7"
          />
        </div>
      </div>
    </div>
  </HomeBackground>
</template>
