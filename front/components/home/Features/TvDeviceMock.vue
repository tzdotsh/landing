<script lang="ts" setup>
import LogoIcon from "~/assets/icons/logo-icon.svg";

import TmdbPosterThumb from "./TmdbPosterThumb.vue";

const thumbIds = ["2", "3", "4", "5", "6"] as const;
</script>

<template>
  <div class="mx-auto w-full max-w-[min(100%,520px)]">
    <div
      class="border-line bg-panel rounded-card overflow-hidden border shadow-[0_20px_56px_rgba(0,0,0,0.32)]"
    >
      <div class="bg-panel-2 h-1.5 w-full" aria-hidden="true" />

      <div class="p-2 md:p-2.5">
        <div
          class="bg-bg-deep relative aspect-[16/10] overflow-hidden rounded-[10px] border border-line"
        >
          <div
            class="border-line flex items-center justify-between border-b px-2.5 py-1.5 md:px-3"
          >
            <LogoIcon
              class="h-[14px] w-auto shrink-0 opacity-95 md:h-4"
              aria-hidden="true"
            />

            <div class="flex items-center gap-1" aria-hidden="true">
              <span class="bg-line h-1 w-1 rounded-full" />
              <span class="brand-gradient h-1 w-3 rounded-full" />
              <span class="bg-line h-1 w-1 rounded-full" />
            </div>
          </div>

          <div class="flex h-[calc(100%-2rem)] flex-col gap-1.5 p-2 md:gap-2 md:p-2.5">
            <div
              class="border-line relative min-h-0 flex-[1.35] overflow-hidden rounded-[8px] border"
            >
              <TmdbPosterThumb
                id="1"
                class="absolute inset-0 h-full w-full"
              />

              <div
                class="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,22,35,0.15)_0%,rgba(8,22,35,0.55)_45%,rgba(5,13,22,0.92)_100%)]"
                aria-hidden="true"
              />

              <span
                class="brand-gradient text-on-accent absolute top-2 left-2 rounded-full px-1.5 py-0.5 text-[7px] font-bold tracking-[0.08em] uppercase md:text-[8px]"
              >
                Live
              </span>

              <div
                class="absolute inset-x-2 bottom-2 flex items-end justify-between gap-2 md:inset-x-2.5 md:bottom-2.5"
              >
                <p
                  class="text-ink line-clamp-2 max-w-[72%] text-[9px] leading-tight font-semibold md:text-[10px]"
                >
                  Featured · Live sport
                </p>

                <div
                  class="border-line-2 bg-panel/85 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border shadow-[0_0_0_1px_var(--color-glow)] md:h-7 md:w-7"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 16 16"
                    class="text-ink ml-0.5 h-2.5 w-2.5 fill-current md:h-3 md:w-3"
                    aria-hidden="true"
                  >
                    <path d="M4 3.5v9l8-4.5-8-4.5z" />
                  </svg>
                </div>
              </div>
            </div>

            <div class="flex min-h-0 flex-1 gap-1 md:gap-1.5">
              <div
                v-for="posterId in thumbIds"
                :key="`tv-thumb-${posterId}`"
                class="border-line min-w-0 flex-1 overflow-hidden rounded-[6px] border"
              >
                <TmdbPosterThumb
                  :id="posterId"
                  class="aspect-[2/3] h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="border-line bg-panel-2 mx-auto mt-2 h-2 w-[26%] rounded-b-md border border-t-0"
      aria-hidden="true"
    />
  </div>
</template>
