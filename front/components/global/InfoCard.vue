<script lang="ts" setup>
import { twMerge } from "tailwind-merge";

type PropsType = {
  title?: string;
  description?: string;
  titleClass?: string;
  descriptionClass?: string;
  class?: string;
  type?: "info" | "warning" | "success";
};

withDefaults(defineProps<PropsType>(), {
  title: "",
  description: "",
  titleClass: "",
  descriptionClass: "",
  class: "",
  type: "info",
});
</script>

<template>
  <div
    :class="
      twMerge(
        'glass-effect-ring flex items-start gap-x-2.5 rounded-[15px] pt-[15px] pr-[27px] pb-[18px] pl-5',
        $props.class,
      )
    "
  >
    <SvgoNotice v-if="type === 'info'" class="h-5.5 w-auto flex-none" />

    <SvgoWarning
      v-else-if="type === 'warning'"
      class="h-4.5 w-auto flex-none"
    />

    <SvgoValid v-else-if="type === 'success'" class="h-5 w-auto flex-none" />

    <div class="flex flex-col gap-y-5">
      <h3 :class="twMerge('text-[18px]/5 font-bold text-white', titleClass)">
        <slot name="title">{{ title }}</slot>
      </h3>

      <p
        :class="
          twMerge('text-[18px]/5 text-white opacity-66', descriptionClass)
        "
      >
        <slot>
          <slot name="description">
            {{ description }}
          </slot>
        </slot>
      </p>
    </div>
  </div>
</template>
