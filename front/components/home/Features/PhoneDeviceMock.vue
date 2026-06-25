<script lang="ts" setup>
import LogoIcon from "~/assets/icons/logo-icon.svg";

import TmdbPosterThumb from "./TmdbPosterThumb.vue";

defineProps<{
  livePulse?: boolean;
}>();

const listRows = [
  { id: "21", title: "Sky Sports Main Event" },
  { id: "22", title: "Premier League Live" },
  { id: "23", title: "Eurosport 1 HD" },
] as const;
</script>

<template>
  <div class="mx-auto w-full max-w-[min(100%,210px)]">
    <div
      class="border-line bg-panel rounded-[28px] border-2 p-1 shadow-[0_20px_56px_rgba(0,0,0,0.32)]"
    >
      <div
        class="bg-bg-deep overflow-hidden rounded-[22px] border border-line"
      >
        <div
          class="flex items-center justify-between px-3 pt-2 pb-1"
          aria-hidden="true"
        >
          <span class="text-muted text-[8px] font-semibold tabular-nums">
            9:41
          </span>
          <div class="flex items-center gap-0.5">
            <span class="bg-muted/70 h-1 w-2 rounded-[1px]" />
            <span class="bg-muted/70 h-1 w-1 rounded-[1px]" />
            <span class="bg-muted/70 h-1.5 w-2.5 rounded-[2px]" />
          </div>
        </div>

        <div
          class="border-line flex items-center justify-between border-b px-2.5 py-1.5"
        >
          <LogoIcon class="h-3 w-auto shrink-0 opacity-95" aria-hidden="true" />

          <svg
            viewBox="0 0 20 20"
            class="text-muted h-3.5 w-3.5 shrink-0"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            aria-hidden="true"
          >
            <circle cx="8.5" cy="8.5" r="5.25" />
            <path d="M13 13l3.5 3.5" stroke-linecap="round" />
          </svg>
        </div>

        <div class="p-2">
          <div
            class="border-line relative aspect-[16/10] overflow-hidden rounded-[8px] border"
          >
            <TmdbPosterThumb
              id="20"
              class="absolute inset-0 h-full w-full"
            />
            <div
              class="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(5,13,22,0.75)_100%)]"
              aria-hidden="true"
            />
            <span
              class="brand-gradient text-on-accent absolute top-1.5 left-1.5 rounded-full px-1 py-0.5 text-[6px] font-bold tracking-[0.08em] uppercase"
            >
              Live
            </span>
          </div>
        </div>

        <div class="flex flex-col gap-1.5 px-2 pb-2.5">
          <div
            v-for="row in listRows"
            :key="`phone-row-${row.id}`"
            class="border-line bg-panel/60 flex items-center gap-2 rounded-[7px] border px-1.5 py-1"
          >
            <div
              class="border-line h-8 w-6 shrink-0 overflow-hidden rounded-[4px] border"
            >
              <TmdbPosterThumb
                :id="row.id"
                class="h-full w-full"
              />
            </div>

            <p
              class="text-ink min-w-0 flex-1 truncate text-[8px] font-medium"
            >
              {{ row.title }}
            </p>

            <span
              class="brand-gradient aspect-square h-1.5 w-1.5 shrink-0 rounded-full"
              :class="{ 'animate-pulse': livePulse }"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
