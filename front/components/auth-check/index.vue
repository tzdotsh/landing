<script lang="ts" setup>
import { twMerge } from "tailwind-merge";

import { useAuthCheckStore, type StatesEnum } from "~/stores/auth-check";

import Form from "./Form.vue";
import Unauthorized from "./Unauthorized.vue";
import Verified from "./Verified.vue";

import type { HTMLAttributes } from "vue";

type State = {
  style?: HTMLAttributes["style"];
  gradient?: string;
};

const authCheckStore = useAuthCheckStore();

const { state } = storeToRefs(authCheckStore);

const statesStyle: Partial<Record<StatesEnum, State>> = {
  unauthorized: {
    style: {
      "--backgroundImage": `
      radial-gradient(circle at 50% 0, rgb(255, 0, 43), rgb(255, 0, 0, 0) 60%),
      linear-gradient(rgb(99, 255, 176, .2), rgb(81, 209, 255, 0)),
      linear-gradient(rgb(255, 255, 255, 0),rgb(255, 255, 255, .1))
      `,
      "--backgroundPosition": "0, 0 -400px, 0",
    },
    gradient:
      "radial-gradient(ellipse at center 20%, rgb(236,54,85) 0%, rgb(236,54,85,0) 100%)",
  },
  verified: {
    style: {
      "--backgroundImage": `
      radial-gradient(circle at 50% 0, rgb(0, 255, 43), rgb(0, 255, 43, .07) 75%,rgb(42, 255, 0, 0)),
      linear-gradient(rgb(99, 255, 176, .2), rgb(81, 209, 255, 0)),
      linear-gradient(rgb(255, 255, 255, 0),rgb(255, 255, 255, .1))
      `,
      "--backgroundPosition": "0, 0 -400px, 0",
    },
    gradient:
      "radial-gradient(ellipse at center 20%, rgb(92,236,54) 0%, rgb(57, 236, 54, 0) 100%)",
  },
};

const actualStateStyle = computed(() => statesStyle[state.value]);
</script>

<template>
  <section id="form">
    <div class="container">
      <FormKit :actions="false" type="form" form-class="mx-auto max-w-[633px]">
        <GradientBorder
          :enabled="state !== 'form'"
          :class="{ 'glass-effect-ring': state === 'form' }"
          class="shadow-black-15 after-full backdrop-blur-[18px] transition-[box-shadow,background-color] duration-1000"
          border-size="1"
          border-radius="30"
          v-bind="actualStateStyle"
        >
          <div
            v-auto-animate
            :class="
              twMerge(
                'before-full rounded-[inherit] before:origin-top before:scale-50 before:bg-(image:--backgroundImage) before:bg-position-(--backgroundPosition) before:bg-no-repeat before:opacity-0 before:duration-2000',
                state !== 'form' && 'before:scale-100 before:opacity-100',
              )
            "
          >
            <Form v-if="state === 'form'" />

            <Unauthorized v-else-if="state === 'unauthorized'" />

            <Verified v-else-if="state === 'verified'" />
          </div>
        </GradientBorder>
      </FormKit>
    </div>
  </section>
</template>
