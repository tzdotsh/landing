<script lang="ts" setup>
import { useReportMutation } from "~/mutations/report";
import { H3Error } from "h3";

import type { FormKitNode } from "@formkit/core";

const reportMutation = useReportMutation();
const { t } = useI18n();

async function submit(data: Record<string, string>, node?: FormKitNode) {
  node?.clearErrors();

  try {
    await reportMutation.mutateAsync(data);

    useToast().success(t("report.form.success"));

    node?.reset();
  } catch (error) {
    node?.setErrors(
      error instanceof H3Error ? error.data.message : t("report.form.error"),
    );
  }
}
</script>

<template>
  <section id="form">
    <div class="container">
      <FormKit
        :actions="false"
        type="form"
        form-class="glass-effect-ring mx-auto flex max-w-[1012px] flex-col gap-y-[30px] rounded-[30px] px-3 pt-7 pb-6 lg:px-[25px] lg:pt-[38px] lg:pb-8"
        #="{ state }"
        @submit="submit"
      >
        <div class="flex flex-col gap-y-5">
          <FormKit
            type="text"
            name="name"
            :placeholder="t('report.form.full_name')"
            validation="required"
            input-class="text-[#404040]!"
            autocomplete="family-name given-name"
          />

          <FormKit
            type="email"
            name="email"
            :placeholder="t('report.form.email')"
            validation="required|email"
            input-class="text-[#404040]!"
            autocomplete="email"
          />

          <FormKit
            type="text"
            name="business_name"
            :placeholder="t('report.form.business_name')"
            validation="required"
            input-class="text-[#404040]!"
            autocomplete="organization"
          />

          <FormKit
            type="textarea"
            name="channels"
            :placeholder="t('report.form.channels')"
            validation="required"
            input-class="h-50!"
            auto-height
          />

          <FormKit
            type="textarea"
            name="description"
            :placeholder="t('report.form.description')"
            validation="required|length:30"
            input-class="h-50!"
            auto-height
          />

          <FormKit
            type="textarea"
            name="evidence"
            :placeholder="t('report.form.evidence')"
            validation="required|length:30"
            input-class="h-50!"
            auto-height
          />

          <FormKit
            type="textarea"
            name="comments"
            :placeholder="t('report.form.comments')"
            input-class="h-50!"
            auto-height
          />
        </div>

        <FormKitSubmit
          :loading="state.loading || reportMutation.asyncStatus === 'loading'"
          input-class="mx-auto block max-lg:w-full"
          type="submit"
        >
          {{ t("report.form.submit") }}
        </FormKitSubmit>
      </FormKit>
    </div>
  </section>
</template>
