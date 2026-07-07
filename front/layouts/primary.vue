<script lang="ts" setup>
import { Toaster } from "vue-sonner";

useHead({
  htmlAttrs: {
    style: "background-color:#081623",
  },
  bodyAttrs: {
    class: "bg-bg",
    style: "background-color:#081623",
  },
});
</script>

<template>
  <div class="relative flex min-h-screen flex-col">
    <div class="relative flex flex-1 flex-col">
      <div
        class="primary-ambient pointer-events-none absolute inset-0 overflow-hidden bg-bg"
        aria-hidden="true"
        style="transform: translateZ(0); will-change: transform; contain: paint;"
      >
        <div class="absolute inset-0 bg-bg-deep/35" />

        <MotionFade
          :transition="{ duration: 1.6 }"
          class="absolute inset-0"
        >
          <div
            class="animate-ambient-drift absolute -top-[18%] left-[8%] h-[min(52vh,520px)] w-[min(52vw,520px)] rounded-full opacity-[0.10] blur-[70px] motion-reduce:animate-none"
            style="
              background: radial-gradient(
                circle,
                rgba(34, 200, 160, 0.95) 0%,
                transparent 68%
              );
            "
          />

          <div
            class="animate-ambient-drift-reverse absolute top-[18%] right-[4%] h-[min(46vh,460px)] w-[min(46vw,460px)] rounded-full opacity-[0.09] blur-[65px] motion-reduce:animate-none"
            style="
              background: radial-gradient(
                circle,
                rgba(68, 215, 122, 0.9) 0%,
                transparent 70%
              );
            "
          />

          <div
            class="animate-ambient-drift absolute bottom-[-8%] left-1/2 h-[min(40vh,400px)] w-[min(70vw,680px)] -translate-x-1/2 rounded-full opacity-[0.08] blur-[75px] motion-reduce:animate-none"
            style="
              background: radial-gradient(
                ellipse,
                rgba(212, 240, 77, 0.75) 0%,
                transparent 72%
              );
            "
          />
        </MotionFade>

        <div
          class="absolute inset-0"
          style="
            background: radial-gradient(
              ellipse 90% 60% at 50% 0%,
              rgba(8, 22, 35, 0) 0%,
              rgba(5, 13, 22, 0.55) 100%
            );
          "
        />
      </div>

      <div class="relative z-10 flex flex-1 flex-col" style="transform: translateZ(0);">
        <Navbar />

        <div class="flex-1">
          <slot />
        </div>
      </div>
    </div>

    <div style="transform: translateZ(0);"><Footer /></div>

    <Toaster
      :toastOptions="{
        style: {
          '--z-index': 1000,
          'z-index': 'calc(var(--z-index) - var(--index))',
        },
      }"
      richColors
      closeButton
    />
  </div>
</template>
