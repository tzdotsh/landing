<script lang="ts" setup>
import { useAffiliateApplyMutation } from "~/mutations/affiliate";

import { H3Error } from "h3";
import type { FormKitNode } from "@formkit/core";

type FormData = {
  name: string;
  email: string;
  website?: string;
  channels: string;
  audience: string;
  promotion: string;
  experience?: string;
};

const applyMutation = useAffiliateApplyMutation();
const { t } = useI18n();
const { user, loggedIn } = useUserSession();

const open = ref(false);

const audienceOptions = computed(() => [
  {
    label: t("affiliate-program.form.audience-options.small"),
    value: "0-1k",
  },
  {
    label: t("affiliate-program.form.audience-options.medium"),
    value: "1k-10k",
  },
  {
    label: t("affiliate-program.form.audience-options.large"),
    value: "10k-100k",
  },
  {
    label: t("affiliate-program.form.audience-options.xlarge"),
    value: "100k+",
  },
]);

async function submit(payload: FormData, node?: FormKitNode) {
  node?.clearErrors();

  try {
    await applyMutation.mutateAsync(payload);

    useToast().success(t("affiliate-program.form.success"));

    node?.reset();
    open.value = false;
  } catch (error) {
    node?.setErrors(
      error instanceof H3Error
        ? error.data.message
        : t("affiliate-program.form.error"),
    );
  }
}
</script>

<template>
  <section id="join">
    <div v-auto-animate class="container">
      <div v-if="!open" class="flex justify-center">
        <Button size="large" @click="open = true">
          {{ t("affiliate-program.form.join") }}
        </Button>
      </div>

      <FormKit
        v-else
        #="{ state }"
        :actions="false"
        type="form"
        form-class="glass-effect-ring mx-auto flex max-w-[633px] flex-col gap-y-[30px] rounded-[15px] px-3 pt-3 pb-4 lg:px-4 lg:pt-[38px] lg:pb-[29px]"
        @submit="submit"
      >
        <div v-auto-animate class="flex flex-col gap-y-5">
          <FormKit
            :placeholder="t('affiliate-program.form.name')"
            type="text"
            name="name"
            validation="required|length:2,50"
            autocomplete="name"
            input-class="text-[#404040]!"
          />

          <FormKit
            :placeholder="t('affiliate-program.form.email')"
            :readonly="loggedIn"
            :value="loggedIn ? user?.email : ''"
            :validation="!loggedIn ? 'required|email' : undefined"
            type="email"
            name="email"
            autocomplete="email"
          />

          <FormKit
            :placeholder="t('affiliate-program.form.website')"
            type="text"
            name="website"
            validation="length:0,200"
            autocomplete="url"
            input-class="text-[#404040]!"
          />

          <FormKit
            :placeholder="t('affiliate-program.form.channels')"
            type="text"
            name="channels"
            validation="required|length:2,200"
            input-class="text-[#404040]!"
          />

          <FormKit
            :label="t('affiliate-program.form.audience')"
            :options="audienceOptions"
            type="select"
            name="audience"
            validation="required"
            label-class="inline-block mb-[15px] text-[22px]/[30px] font-bold tracking-normal"
            inner-class="shadow-input relative inverse-navbar bg-white rounded-lg"
            input-class="bg-transparent h-[62px] w-full text-[18px] font-medium text-[#404040]! px-[29px]"
          />

          <FormKit
            :placeholder="t('affiliate-program.form.promotion')"
            validation="required|length:30,1000"
            type="textarea"
            name="promotion"
            input-class="h-[180px]"
          />

          <FormKit
            :placeholder="t('affiliate-program.form.experience')"
            validation="length:0,1000"
            type="textarea"
            name="experience"
            input-class="h-[120px]"
          />
        </div>

        <FormKitSubmit
          :loading="state.loading || applyMutation.asyncStatus === 'loading'"
          :disabled="state.loading || applyMutation.asyncStatus === 'loading'"
          input-class="w-full"
          type="submit"
        >
          {{ t("affiliate-program.form.submit") }}
        </FormKitSubmit>
      </FormKit>
    </div>
  </section>
</template>
