<script lang="ts" setup>
type Review = {
  author: string;
  text: string;
  image: string;
  platform: string;
};

const { t, tm } = useI18n();

const allReviews = computed(() =>
  tm<any, any, any, any, Review[]>("resellers.reviews.testimonials"),
);

const visibleReviews = computed(() => allReviews.value.slice(0, 6));
</script>

<template>
  <section id="reviews">
    <div class="container flex flex-col gap-y-14 lg:gap-y-16">
      <div class="flex flex-col gap-y-6">
        <h2
          class="font-heading text-[clamp(2rem,4vw,2.75rem)]/[1.1] font-bold text-ink"
        >
          {{ t("resellers.reviews.title") }}
        </h2>
        <p class="text-muted max-w-[720px] text-[18px]/[1.55]">
          {{ t("resellers.reviews.description") }}
        </p>
      </div>

      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <CommonReview
          v-for="(review, index) in visibleReviews"
          :key="`${index}-${review.image}`"
          :review="review"
          theme="panel"
        />
      </div>
    </div>
  </section>
</template>
