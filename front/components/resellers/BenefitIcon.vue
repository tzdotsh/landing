<script lang="ts" setup>
import type { Component } from "vue";

import {
  SvgoResellersApi,
  SvgoResellersDashboard,
  SvgoResellersDns,
  SvgoResellersPrivacy,
  SvgoResellersSupport,
  SvgoResellersTrials,
} from "#components";

type Variant =
  | "dashboard"
  | "api"
  | "dns"
  | "support"
  | "privacy"
  | "trials";

defineProps<{
  variant: Variant;
}>();

const icons: Record<Variant, Component> = {
  dashboard: SvgoResellersDashboard,
  api: SvgoResellersApi,
  dns: SvgoResellersDns,
  support: SvgoResellersSupport,
  privacy: SvgoResellersPrivacy,
  trials: SvgoResellersTrials,
};
</script>

<template>
  <div
    class="benefit-icon relative flex h-[72px] w-[72px] shrink-0 items-center justify-center"
    aria-hidden="true"
  >
    <div
      class="pointer-events-none absolute inset-0 rounded-[18px] bg-[radial-gradient(circle_at_50%_50%,color-mix(in_srgb,var(--color-teal)_16%,transparent),transparent_72%)]"
    />

    <div class="benefit-icon__ring">
      <div class="benefit-icon__inner">
        <component :is="icons[variant]" class="h-7 w-7" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.benefit-icon__ring {
  padding: 1px;
  border-radius: 18px;
  background: linear-gradient(
    110deg,
    var(--color-lime),
    var(--color-green) 52%,
    var(--color-teal)
  );
  box-shadow: 0 0 20px color-mix(in srgb, var(--color-glow) 22%, transparent);
}

.benefit-icon__inner {
  display: flex;
  height: 70px;
  width: 70px;
  align-items: center;
  justify-content: center;
  border-radius: 17px;
  background: var(--color-panel);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
}
</style>
