<script lang="ts" setup>
import { formatBlogDate, type BlogPost } from "~/utils/blog";

defineProps<{
  post?: BlogPost | null;
  loading?: boolean;
}>();

const { locale, t } = useI18n();
</script>

<template>
  <section id="hero">
    <div class="container flex flex-col items-center gap-y-10">
      <div class="flex w-full flex-col items-center gap-y-8">
        <template v-if="loading">
          <div class="flex h-10 w-full items-center justify-center">
            <div class="h-8 w-1/2 animate-pulse rounded-full bg-white/10" />
          </div>

          <div class="h-4.25 w-25 animate-pulse rounded-full bg-white/10" />
        </template>

        <template v-else-if="post">
          <Heading
            :title="post.title"
            :description="post.description"
            title-tag="h1"
            size="normal"
            title-class="tracking-normal"
            description-class="tracking-normal"
          />

          <p class="text-muted text-center text-[14px]/[1.4]">
            {{
              t("blog.post.last_updated", {
                date: formatBlogDate(post.dateUpdated ?? post.datePublished, locale),
              })
            }}
            ·
            {{
              t("blog.post.reading_time", {
                minutes: post.readingTimeMinutes,
              })
            }}
          </p>
        </template>
      </div>

      <div
        class="glass-effect-ring shadow-black-15 aspect-video h-auto w-full overflow-hidden rounded-[25px]"
      >
        <NuxtImg
          v-if="post && !loading"
          :src="post.image ?? '/og-image.webp'"
          :alt="post.title"
          class="h-full w-full object-cover"
          format="webp"
        />

        <div v-else class="h-full w-full animate-pulse bg-white/10" />
      </div>
    </div>
  </section>
</template>
