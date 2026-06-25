<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    id: string;
    imgClass?: string;
    class?: string;
  }>(),
  {
    imgClass: "h-full w-full object-cover",
    class: "",
  },
);

const failed = ref(false);

watch(
  () => props.id,
  () => {
    failed.value = false;
  },
);

function posterSrc(id: string) {
  return `/tmdb/low/${id}@1x.webp`;
}

function posterSrcset(id: string) {
  return `/tmdb/low/${id}@1x.webp 1x, /tmdb/low/${id}@2x.webp 2x`;
}
</script>

<template>
  <img
    v-if="!failed"
    :src="posterSrc(id)"
    :srcset="posterSrcset(id)"
    alt=""
    decoding="async"
    :class="[imgClass, $props.class]"
    @error="failed = true"
  />

  <div
    v-else
    :class="
      [
        'flex h-full w-full items-center justify-center bg-[linear-gradient(145deg,var(--color-panel-2),var(--color-bg-deep))]',
        $props.class,
      ]
    "
  >
    <span
      class="brand-gradient font-heading flex h-[70%] min-h-[1.25rem] min-w-[1.25rem] aspect-square max-h-8 max-w-8 items-center justify-center rounded-full text-[9px] font-bold text-on-accent"
      aria-hidden="true"
    >
      {{ id.padStart(2, "0") }}
    </span>
  </div>
</template>
