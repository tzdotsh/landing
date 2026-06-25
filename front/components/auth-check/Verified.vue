<script lang="ts" setup>
const { t } = useI18n();
</script>

<template>
  <div class="px-[25px] pt-[50px] pb-[54px] text-white">
    <div class="mb-10 flex flex-col items-center gap-y-[30px]">
      <SvgoShieldCheck class="h-25 w-auto" />

      <Heading
        :title="t('auth_check.verified.title')"
        title-class="px-1 text-[40px]/[52px] font-black tracking-normal!"
      ></Heading>
    </div>

    <InfoCard
      :title="t('auth_check.verified.card_title')"
      class="mb-12"
      type="success"
    >
      {{ t("auth_check.verified.card_description") }}
    </InfoCard>

    <div class="mb-[30px]">
      <h4>{{ t("auth_check.verified.quick_actions") }}</h4>
    </div>

    <!-- Actions -->
    <div class="flex flex-col gap-y-[15px]">
      <Cta
        to="/dashboard"
        class="items-stretch"
        btn-class="brand-gradient text-on-accent w-full transition duration-300 ease-[var(--ease-brand)]"
        target="_blank"
      >
        <template #icon><SvgoManage /> </template>

        {{ t("common.buttons.manage_account") }}
      </Cta>
    </div>
  </div>
</template>
