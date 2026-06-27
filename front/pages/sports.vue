<script lang="ts" setup>
const localePath = useLocalePath();

await navigateTo(localePath("/iptv-sports"), {
  redirectCode: 301,
  replace: true,
});
</script>

<template>
  <div />
</template>
