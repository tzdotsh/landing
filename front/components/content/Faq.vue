<script lang="ts" setup>
defineProps<{
  question: string;
  answer: string;
}>();
</script>

<template>
  <div class="border-line bg-panel/50 my-6 rounded-card border px-5 py-4">
    <p class="text-ink text-[16px]/[1.45] font-semibold">
      {{ question }}
    </p>
    <p class="text-muted mt-2 text-[15px]/[1.55]">
      {{ answer }}
    </p>
  </div>
</template>
