<template>
  <!-- Background color -->
  <div class="absolute inset-0 -z-30 bg-[#203C91]"></div>

  <!-- Background Video -->
  <div class="absolute inset-0 isolate -z-20">
    <video
      ref="heroVideo"
      class="absolute inset-0 z-10 h-[506px] w-full object-cover object-top lg:h-[764px]"
      preload="auto"
      autoplay
      muted
      loop
      playsinline
    >
      <source src="/video/hero-bg.mp4" />
    </video>

    <div class="absolute inset-0 z-20 h-full w-full bg-[#204396]/60"></div>
  </div>

  <!-- <MyNuxtImg
    class="absolute -bottom-[600px] left-1/2 -z-10 h-[1767px] w-[3616px] max-w-none -translate-x-1/2 -rotate-21"
    width="3616"
    height="1767"
    src="/img/hero-bg.webp"
    preload
  ></MyNuxtImg> -->

  <div
    class="absolute top-[350px] left-1/2 -z-10 -translate-x-1/2 blur-[30px] drop-shadow-[-130px_-130px_120px_#2B479E]"
  >
    <div
      class="aspect-1971/962 h-auto w-[150dvw] min-w-[1000px] -rotate-21 bg-linear-to-b from-[#2B479E] to-[#203C91] [clip-path:ellipse(50%_50%_at_center)]"
    ></div>
  </div>
</template>
