<script lang="ts" setup>
import { useAuthCheckStore } from "~/stores/auth-check";

const { t } = useI18n();
const authStore = useAuthCheckStore();

function handleSubmit(data: { iptvAccess: string }) {
  const iptvUrl = data.iptvAccess;

  if (!iptvUrl) {
    return;
  }

  const isAuthentic = authStore.checkIfAuthentic(iptvUrl);

  if (isAuthentic) {
    authStore.state = "verified";
  } else {
    authStore.state = "unauthorized";
  }
}
</script>

<template>
  <div
    class="px-3 pt-10 pb-5 text-white lg:px-[25px] lg:pt-[50px] lg:pb-[54px]"
  >
    <div class="mb-10 flex flex-col items-center gap-y-[30px]">
      <Heading
        :title="t('auth_check.form.title')"
        title-class="px-1 text-[40px]/[52px] font-black tracking-normal!"
      ></Heading>
    </div>

    <InfoCard :title="t('auth_check.form.card_title')" class="mb-[49px]">
      {{ t("auth_check.form.card_description") }}
    </InfoCard>

    <FormKit
      type="form"
      :actions="false"
      form-class="flex flex-col"
      outer-class="mb-6"
      @submit="handleSubmit"
    >
      <FormKit
        type="text"
        name="iptvAccess"
        :label="t('auth_check.form.label')"
        placeholder="http://..."
        inner-class="glass-effect-ring $remove:bg-white rounded-[15px]"
        input-class="px-[31px] text-white lowercase placeholder:text-white/50"
        autocomplete="off"
        validation="required|url"
      >
        <template #label="{ id, label, classes }">
          <GradientText :class="classes.label" :for="id" tag="label">
            {{ label }}
          </GradientText>
        </template>
      </FormKit>

      <FormKit type="submit" outer-class="mt-[15px]" input-class="w-full">
        {{ t("common.buttons.verify") }}
      </FormKit>
    </FormKit>
  </div>
</template>
