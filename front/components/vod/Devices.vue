<script lang="ts" setup>
const { t } = useI18n();

const devices = [
  "firestick",
  "smart_tv",
  "android",
  "ios",
  "apple_tv",
  "android_box",
] as const;
</script>

<template>
  <section id="devices" class="relative py-12 md:py-16">
    <div class="container flex flex-col items-center gap-y-6 text-center">
      <p class="text-muted max-w-[640px] text-[17px]/[1.55] text-pretty">
        {{ t("vod.devices.line") }}
      </p>

      <div
        class="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
        role="list"
      >
        <span
          v-for="device in devices"
          :key="device"
          role="listitem"
          class="border-line bg-panel/60 text-ink rounded-full border px-3.5 py-2 text-[13px]/none font-medium sm:px-4 sm:text-[14px]/none"
        >
          {{ t(`vod.devices.items.${device}`) }}
        </span>
      </div>
    </div>
  </section>
</template>
