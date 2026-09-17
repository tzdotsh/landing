<script lang="ts" setup>
import { useAppTutorialQuery } from "~/queries/apps";

defineProps<{
  title?: string;
}>();

const { t } = useI18n();
const route = useRoute("apps-device-app___en-en");
const selectedDevice = computed(() => route.params.device?.toString() ?? "");
const selectedApp = computed(() => route.params.app?.toString() ?? "");
const tutorialQuery = useAppTutorialQuery(selectedDevice, selectedApp);

const post = computed(() => tutorialQuery.state.value.data?.content ?? null);
const isTutorialLoading = computed(
  () =>
    tutorialQuery.state.value.status === "pending" ||
    tutorialQuery.asyncStatus.value === "loading",
);

const { pending: mdPending, data: ast } = await useParseMarkdown(
  `app-tutorial-${selectedDevice.value}-${selectedApp.value}`,
  post,
);
</script>

<template>
  <section id="doc">
    <div class="container flex flex-col gap-y-10">
      <h1
        v-if="title"
        class="font-heading text-ink text-[clamp(2rem,4vw,2.75rem)]/none font-semibold tracking-normal text-pretty"
      >
        {{ title }}
      </h1>

      <SectionTitle>{{ t("apps.post.title") }}</SectionTitle>

      <CommonMarkdownRender
        :loading="mdPending || isTutorialLoading"
        class="markdown-panel min-h-50 p-5 sm:p-8 lg:p-10"
      >
        <LazyMDCRenderer v-if="ast" :body="ast.body" :data="ast.data" />
      </CommonMarkdownRender>
    </div>
  </section>
</template>
