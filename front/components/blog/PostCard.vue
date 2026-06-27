<script lang="ts" setup>
import { twMerge } from "tailwind-merge";

import {
  formatBlogDate,
  resolveBlogSlug,
  type BlogPost,
} from "~/utils/blog";

const props = withDefaults(
  defineProps<{
    post?: BlogPost;
    latest?: boolean;
    borderRadius?: number;
  }>(),
  { borderRadius: 15 },
);

const { locale } = useI18n();
const imageSrc = computed(() => props.post?.image ?? "/og-image.webp");
</script>

<template>
  <div
    :class="
      twMerge(
        'group @container/card relative flex cursor-pointer text-white',
        !post && 'cursor-progress',
      )
    "
    :aria-disabled="!post"
  >
    <AnimatedBorder
      :enable-on-hover="!!post"
      :enabled="false"
      :border-radius="borderRadius"
      as="article"
      border-size="2"
      class="shadow-black-15 w-full"
    >
      <GradientBg :enabled="false">
        <div
          class="grid h-full overflow-hidden rounded-[inherit] @min-md:grid-cols-[1fr_min(50%,389px)]"
        >
          <div class="h-46 w-full flex-none overflow-hidden @min-md:h-95.25">
            <div
              class="h-full w-full transition duration-700 group-hover:scale-110 group-hover:brightness-75"
            >
              <NuxtImg
                v-if="post"
                :src="imageSrc"
                :alt="post.title"
                class="h-full w-full scale-105 object-cover transition data-[state=ready]:scale-100 data-[state=ready]:opacity-100"
                loading="lazy"
                format="webp"
              />

              <div v-else class="h-full w-full animate-pulse bg-white/10" />
            </div>
          </div>

          <div class="flex w-full flex-col gap-y-5 px-5 pt-7 pb-5">
            <AnimatedBorder
              v-if="latest"
              border-size="2"
              class="h-5.75 max-w-max text-[12.8px]/[15px] font-bold"
            >
              <GradientBg class="flex w-full items-center px-2.75">
                {{ $t("blog.articles.latest") }}
              </GradientBg>
            </AnimatedBorder>

            <Heading
              v-if="post"
              :title="post.title"
              :description="post.description"
              size="small"
              align="left"
              gap="20"
              title-class="line-clamp-3 h-30 text-[26px]/[40px] font-black tracking-normal @min-md:h-37.5 @min-md:text-[32px]/[50px]"
              description-class="line-clamp-2 text-[15px]/[1.45] opacity-80"
            />

            <div v-else class="flex flex-col gap-y-2">
              <div
                class="my-1.75 h-6.5 w-4/5 animate-pulse rounded-full bg-white/10 @min-md:h-8"
              />

              <div
                class="my-1.75 h-6.5 w-2/5 animate-pulse rounded-full bg-white/10 @min-md:h-8"
              />
            </div>

            <div
              v-if="post"
              class="text-muted mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]/[1.4]"
            >
              <time :datetime="String(post.datePublished)">
                {{ formatBlogDate(post.datePublished, locale) }}
              </time>
              <span aria-hidden="true">·</span>
              <span>
                {{
                  $t("blog.post.reading_time", {
                    minutes: post.readingTimeMinutes,
                  })
                }}
              </span>
            </div>

            <div
              v-else
              class="my-1.75 h-3.5 w-1/5 animate-pulse rounded-full bg-white/10"
            />
          </div>
        </div>
      </GradientBg>
    </AnimatedBorder>
  </div>
</template>
