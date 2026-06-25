<script lang="ts" setup>
type PropsType = {
  title: string;
  description: string;
  loading?: boolean;
};

defineProps<PropsType>();
</script>

<template>
  <section id="hero">
    <div class="container">
      <Heading
        :title="title"
        :description="description"
        :loading="loading"
        title-tag="h1"
        gap="30"
        size="primary"
        title-class="tracking-normal"
        description-class="max-w-[1012px] text-[22px]/[calc(26/22)] tracking-normal"
      />
    </div>
  </section>
</template>
