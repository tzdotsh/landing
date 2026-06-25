<script lang="ts" setup>
import type { AccordionItemType } from "@/components/common/Accordions.vue";

const { tm, t } = useI18n();

const questions = tm<any, any, any, any, AccordionItemType[]>(
  "faq.faqs.resellers.questions",
);
</script>

<template>
  <section id="faq">
    <div class="container flex flex-col gap-y-12 lg:gap-y-16">
      <h2
        class="font-heading text-[clamp(2rem,4vw,2.75rem)]/[1.1] font-bold text-ink"
      >
        {{ t("resellers.faq.title") }}
      </h2>

      <CommonAccordions :items="questions" />
    </div>
  </section>
</template>
