<script lang="ts" setup>
const { t } = useI18n();
</script>

<template>
  <HomeBackground
    tag="section"
    color="dark"
    class="py-10 md:py-12"
    aria-label="Start watching"
  >
    <div class="container flex justify-center">
      <Cta
        gap="15"
        btn-class="brand-gradient text-on-accent h-[62px] w-[min(100%,440px)] rounded-btn text-[18px] font-semibold transition duration-300 ease-[var(--ease-brand)]"
      >
        {{ t("home.features.cta") }}
      </Cta>
    </div>
  </HomeBackground>
</template>
