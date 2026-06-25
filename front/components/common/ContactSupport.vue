<script lang="ts" setup>
import { twMerge, type ClassNameValue } from "tailwind-merge";

const { t } = useI18n();

type PropsType = {
  class?: ClassNameValue;
};

defineProps<PropsType>();
</script>

<template>
  <section id="need-help" :class="twMerge('pt-[50px] pb-[70px]', $props.class)">
    <div class="container flex flex-col gap-y-4 text-white">
      <p class="text-center text-[22px]/[calc(26/22)] font-bold">
        {{ t("common.contact_support.need_help_title") }}
      </p>

      <p class="text-center text-[20px]/[calc(24/20)]">
        {{ t("common.contact_support.support_description") }}
      </p>

      <Cta
        :external="false"
        :to="{ name: 'vversion-support___en-en' }"
        variant="secondary"
        class="mx-auto flex w-max items-center gap-x-2.5 px-9"
      >
        <SvgoContactSupport />
        {{ t("common.contact_support.contact_button") }}
      </Cta>
    </div>
  </section>
</template>
