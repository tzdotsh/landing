<script lang="ts" setup>
import { useAppTutorialQuery } from "~/queries/apps";

const { t } = useI18n();
const route = useRoute("vversion-apps-device-app___en-en");
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
      <SectionTitle>{{ t("apps.post.title") }}</SectionTitle>

      <CommonMarkdownRender
        :loading="mdPending || isTutorialLoading"
        class="inverse-navbar box-bg min-h-50 px-3 py-5 lg:px-11.25 lg:py-10.5"
      >
        <LazyMDCRenderer v-if="ast" :body="ast.body" :data="ast.data" />
      </CommonMarkdownRender>
    </div>
  </section>
</template>
