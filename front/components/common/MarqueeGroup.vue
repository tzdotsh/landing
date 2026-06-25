<script lang="ts" setup>
type PropsType = {
  pauseOnHover?: boolean;
};

const props = withDefaults(defineProps<PropsType>(), {
  pauseOnHover: false,
});

const isGroupPaused = ref(false);

const pauseGroup = () => {
  if (props.pauseOnHover) {
    isGroupPaused.value = true;
  }
};

const resumeGroup = () => {
  if (props.pauseOnHover) {
    isGroupPaused.value = false;
  }
};

provide("pauseOnHoverGroup", props.pauseOnHover);
provide("isGroupPaused", readonly(isGroupPaused));
provide("pauseGroup", pauseGroup);
provide("resumeGroup", resumeGroup);
</script>

<template>
  <slot></slot>
</template>
