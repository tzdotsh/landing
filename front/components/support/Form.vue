<script lang="ts" setup>
import { useSupportMutation } from "~/mutations/support";

import { H3Error } from "h3";
import type { FormKitNode } from "@formkit/core";

type FormData = {
  message: string;
  subject: string;
  email?: string;
  name?: string;
};

const supportMutation = useSupportMutation();
const { t } = useI18n();
const { user, loggedIn, clear: logOut } = useUserSession();

async function submit(payload: FormData, node?: FormKitNode) {
  node?.clearErrors();

  try {
    await supportMutation.mutateAsync(payload);

    useToast().success(t("support.form.success"));

    node?.reset();
  } catch (error) {
    node?.setErrors(
      error instanceof H3Error ? error.data.message : t("support.form.error"),
    );
  }
}
</script>

<template>
  <section id="form">
    <div class="container">
      <FormKit
        #="{ state }"
        :actions="false"
        type="form"
        form-class="glass-effect-ring mx-auto flex max-w-[633px] flex-col gap-y-[30px] rounded-[15px] px-3 pt-3 pb-4 lg:px-4 lg:pt-[38px] lg:pb-[29px]"
        @submit="submit"
      >
        <div v-auto-animate class="flex flex-col gap-y-5">
          <FormKit
            v-if="!loggedIn"
            :placeholder="t('support.form.name')"
            type="text"
            name="name"
            validation="required|length:2,16"
            autocomplete="family-name given-name"
            input-class="text-[#404040]!"
          />

          <FormKit
            :placeholder="t('support.form.email')"
            :readonly="loggedIn"
            :value="loggedIn ? user?.email : ''"
            :validation="!loggedIn ? 'required|email' : undefined"
            type="email"
            name="email"
            autocomplete="email"
          >
            <template #suffix>
              <Button
                v-if="loggedIn"
                variant="ghost"
                size="small"
                radius="small"
                class="absolute top-1/2 right-2 h-[calc(100%-16px)] -translate-y-1/2 text-[18px] font-semibold"
                @click="logOut"
              >
                Log out
              </Button>
            </template>
          </FormKit>

          <FormKit
            :placeholder="t('support.form.subject')"
            type="text"
            name="subject"
            validation="required|length:10,50"
            autocomplete="off"
            input-class="text-[#404040]!"
          />

          <FormKit
            :placeholder="t('support.form.message')"
            validation="required|length:30,1000"
            type="textarea"
            name="message"
            input-class="h-[252px]"
          />
        </div>

        <FormKitSubmit
          :loading="state.loading || supportMutation.asyncStatus === 'loading'"
          :disabled="state.loading || supportMutation.asyncStatus === 'loading'"
          input-class="w-full"
          type="submit"
        >
          {{ t("support.form.submit") }}
        </FormKitSubmit>
      </FormKit>
    </div>
  </section>
</template>
