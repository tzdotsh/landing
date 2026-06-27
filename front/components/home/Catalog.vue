<script lang="ts" setup>
import { HOME_CATALOG_CHANNELS } from "~/data/homeCatalogChannels";

const { t } = useI18n();
const reducedMotion = usePreferredReducedMotion();

const staticMotion = computed(() => reducedMotion.value === "reduce");

const channels = HOME_CATALOG_CHANNELS;

const marqueeChannels = computed(() => [...channels, ...channels]);
</script>

<template>
  <HomeBackground
    id="catalog"
    tag="section"
    color="dark"
    class="relative left-1/2 w-screen max-w-full -translate-x-1/2 overflow-hidden py-12 md:py-16"
  >
    <div class="container mb-6 text-center md:mb-8">
      <h2
        class="font-heading text-ink text-[clamp(1.25rem,2.5vw,1.5rem)] leading-[1.2] font-semibold tracking-[-0.01em] text-balance"
      >
        {{ t("home.catalog.title") }}
      </h2>
    </div>

    <div
      v-if="staticMotion"
      class="container flex flex-wrap items-center justify-center gap-3"
    >
      <div
        v-for="channel in channels"
        :key="`catalog-static-${channel.id}`"
        class="border-line bg-panel flex h-14 min-w-[112px] items-center justify-center rounded-card border px-4 transition-[border-color,transform,box-shadow] duration-300 ease-[var(--ease-brand)] hover:-translate-y-0.5 hover:border-line-2 hover:shadow-[0_8px_28px_rgba(0,0,0,0.22)]"
      >
        <CommonChannelLogo
          :name="channel.name"
          :logo="channel.logo"
          class="h-8 w-[120px]"
          img-class="max-h-8 max-w-[120px]"
        />
      </div>
    </div>

    <div
      v-else
      class="relative [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
    >
      <CommonMarquee class="relative flex w-max items-center justify-start">
        <div
          v-for="(channel, index) in marqueeChannels"
          :key="`catalog-${channel.id}-${index}`"
          class="border-line bg-panel mx-2 flex h-14 min-w-[112px] items-center justify-center rounded-card border px-4 transition-[border-color,transform,box-shadow] duration-300 ease-[var(--ease-brand)] hover:-translate-y-0.5 hover:border-line-2 hover:shadow-[0_8px_28px_rgba(0,0,0,0.22)] lg:mx-2.5"
        >
          <CommonChannelLogo
            :name="channel.name"
            :logo="channel.logo"
            class="h-8 w-[120px]"
            img-class="max-h-8 max-w-[120px]"
          />
        </div>
      </CommonMarquee>
    </div>
  </HomeBackground>
</template>
