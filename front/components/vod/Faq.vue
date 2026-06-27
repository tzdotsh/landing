<script lang="ts" setup>
import type { AccordionItemType } from "~/components/common/Accordions.vue";

const { t, tm } = useI18n();

const items = tm<any, any, any, any, AccordionItemType[]>("vod.faq.items");
</script>

<template>
  <section id="faq" class="relative py-14 md:py-20">
    <div class="container flex flex-col gap-y-10">
      <h2
        class="font-heading text-[clamp(1.875rem,3.5vw,2.5rem)]/[1.12] font-bold text-ink"
      >
        {{ t("vod.faq.heading") }}
      </h2>

      <CommonAccordions :items="items" />
    </div>
  </section>
</template>
