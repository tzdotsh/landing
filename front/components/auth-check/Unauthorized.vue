<script lang="ts" setup>
const { t, rt, tm } = useI18n();

const { version } = useProject();

const means_list = tm<any, any, any, any, string[]>(
  "auth_check.unauthorized.means_list",
);
</script>

<template>
  <div class="px-[25px] pt-[50px] pb-[54px] text-white">
    <div class="mb-10 flex flex-col items-center gap-y-[30px]">
      <SvgoShieldOff />

      <Heading
        :title="t('auth_check.unauthorized.title')"
        title-class="px-1 text-[40px]/[52px] font-black tracking-normal!"
      ></Heading>
    </div>

    <InfoCard
      :title="t('auth_check.unauthorized.card_title')"
      class="mb-[49px]"
      type="warning"
    >
      {{ t("auth_check.unauthorized.card_description") }}
    </InfoCard>

    <div class="mb-10">
      <h4>{{ t("auth_check.unauthorized.what_means") }}</h4>

      <ul class="text-[18px]/[26px]">
        <li v-for="item in means_list" :key="item">- {{ rt(item) }}</li>
      </ul>
    </div>

    <div class="mb-10">
      <h4>{{ t("auth_check.unauthorized.recommended_actions") }}</h4>

      <p class="text-[18px]/[26px]">
        {{ t("auth_check.unauthorized.recommended_description") }}
      </p>
    </div>

    <!-- Actions -->
    <div class="grid grid-cols-1 gap-y-[15px]">
      <Cta variant="gradient" class="grid grid-cols-1" btn-class="w-full">
        <template #icon><SvgoShieldCheck /> </template>

        {{ t("auth_check.unauthorized.get_official_access") }}
      </Cta>

      <Cta
        :to="`/v${version}/support`"
        :external="false"
        variant="danger"
        class="items-stretch"
        btn-class="w-full"
      >
        <template #icon><SvgoSupport /></template>

        {{ t("auth_check.unauthorized.contact_support") }}
      </Cta>
    </div>
  </div>
</template>
