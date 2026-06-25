<script lang="ts" setup>
import { isLegalPageSlug } from "~/data/legal-documents";

const route = useRoute();
const { locale } = useI18n();

const slug = computed(() => {
  const param = route.params.slug;
  return (Array.isArray(param) ? param[0] : param)?.toString() ?? "";
});

if (!isLegalPageSlug(slug.value)) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const { pending: legalMdPending, data: legalDoc } = await useAsyncData(
  () => `legal-${slug.value}-${locale.value}`,
  () =>
    $fetch(`/api/legal/${slug.value}`, {
      query: { locale: locale.value },
    }),
  { watch: [slug, locale] },
);

if (!legalDoc.value && !legalMdPending.value) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const title = computed(() => legalDoc.value?.title ?? "");
const description = computed(() => legalDoc.value?.description ?? "");

useReactiveSeoMeta({
  title,
  description,
  type: "article",
});
</script>

<template>
  <div class="home-page-depth relative isolate min-h-full">
    <HomeSectionGlow
      class="left-1/2 top-[28%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 sm:h-80 sm:w-80"
      strength="5%"
    />

    <LegalHero
      :title="legalDoc?.title ?? ''"
      :description="legalDoc?.description ?? ''"
      :loading="legalMdPending"
      class="relative pt-[186px] pb-[66px]"
    />

    <section id="doc" class="relative">
      <div class="container">
        <div
          class="inverse-navbar box-bg min-h-50 max-lg:px-3 max-lg:py-5 lg:px-7.5 lg:py-10.5"
        >
          <CommonMarkdownRender :loading="legalMdPending">
            <div v-if="legalDoc?.html" v-html="legalDoc.html" />
          </CommonMarkdownRender>
        </div>
      </div>
    </section>

    <CommonContactSupport class="relative" />
  </div>
</template>
