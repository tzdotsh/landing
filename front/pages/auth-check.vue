<script lang="ts" setup>
const authStore = useAuthCheckStore();

const { t } = useI18n();

usePageSeoMeta(
  t("seo.pages.auth_check.title"),
  t("seo.pages.auth_check.description"),
);

onBeforeRouteLeave(() => {
  authStore.$reset();
});
</script>

<template>
  <div class="home-page-depth relative isolate min-h-full">
    <HomeSectionGlow
      class="left-1/2 top-[28%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 sm:h-80 sm:w-80"
      strength="5%"
    />

    <AuthCheck class="relative pt-[174px] pb-25" />
  </div>
</template>
