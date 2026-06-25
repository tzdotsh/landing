<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    staticMotion?: boolean;
  }>(),
  {
    staticMotion: false,
  },
);

const { t } = useI18n();
</script>

<template>
  <div
    class="relative overflow-hidden rounded-[12px] bg-panel-2"
  >
    <div
      class="grid grid-cols-2 gap-px bg-line"
      aria-hidden="true"
    >
      <div
        v-for="tile in 4"
        :key="tile"
        class="bg-panel-2 flex aspect-372/214 items-center justify-center"
      >
        <div class="bg-line h-8 w-16 rounded-md opacity-60" />
      </div>
    </div>

    <div
      class="border-line absolute top-1/2 left-1/2 z-10 flex min-w-[min(88%,280px)] -translate-x-1/2 -translate-y-1/2 items-center gap-x-3 rounded-card border bg-panel/95 px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-md"
    >
      <div class="relative shrink-0">
        <MotionWrapper
          :enabled="!staticMotion"
          :animate="{ scale: [1, 1.45, 1], opacity: [0.45, 0, 0.45] }"
          :transition="{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }"
          class="bg-success absolute inset-0 rounded-full"
        />
        <div
          class="bg-success relative h-3.5 w-3.5 rounded-full shadow-[0_0_12px_var(--color-glow)]"
          :class="{ 'animate-pulse': !staticMotion }"
        />
      </div>

      <div class="min-w-0 flex-1">
        <p
          class="font-heading text-ink text-[clamp(1.125rem,2.5vw,1.5rem)]/none font-bold tracking-[-0.02em]"
        >
          99.9%
        </p>
        <p class="text-muted text-[12px]/snug font-medium">
          {{ t("home.assurances.no_downtime.status") }}
        </p>
      </div>

      <SvgoSignal class="text-muted h-5 w-auto shrink-0" aria-hidden="true" />
    </div>
  </div>
</template>
