<script lang="ts" setup>
const localePath = useLocalePath();

await navigateTo(localePath("/iptv-vod"), {
  redirectCode: 301,
  replace: true,
});
</script>

<template>
  <div />
</template>
