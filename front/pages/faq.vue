<script lang="ts" setup>
const { t, tm, rt } = useI18n();

const faqs = tm<
  any,
  any,
  any,
  any,
  Record<
    string,
    { title: string; questions: { title: string; content: string }[] }
  >
>("faq.faqs");

usePageSeoMeta(
  t("seo.pages.faq.title"),
  t("seo.pages.faq.description"),
  undefined,
  true,
);
useSchemaOrg({
  "@type": "FAQPage",
  mainEntity: Object.values(faqs).flatMap((q) =>
    q.questions.map((question) => ({
      "@type": "Question",

      name: rt(question.title),

      acceptedAnswer: {
        "@type": "Answer",
        text: rt(question.content),
      },
    })),
  ),
});
</script>

<template>
  <div class="home-page-depth relative isolate min-h-full">
    <HomeSectionGlow
      class="left-1/2 top-[28%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 sm:h-80 sm:w-80"
      strength="5%"
    />

    <FaqHero class="relative pt-[186px] pb-10" />
    <FaqQuestionResponse class="relative pt-10" />
    <CommonContactSupport class="relative" />
  </div>
</template>
