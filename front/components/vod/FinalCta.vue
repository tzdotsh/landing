<script lang="ts" setup>
const { t } = useI18n();

const email = ref("");
const emailInvalid = ref(false);

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function externalAppPath(path: "/checkout" | "/trial", withEmail = false) {
  const trimmed = email.value.trim();

  if (!withEmail || !validateEmail(trimmed)) {
    return path;
  }

  return `${path}?${new URLSearchParams({ email: trimmed }).toString()}`;
}

const trialHref = computed(() => externalAppPath("/trial", true));

function handleSubmit() {
  emailInvalid.value = !validateEmail(email.value);
  if (emailInvalid.value) return;

  window.location.assign(externalAppPath("/checkout", true));
}
</script>

<template>
  <section id="final-cta" class="relative pb-20 md:pb-25">
    <HomeSectionGlow
      class="bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 translate-y-1/3 blur-[4rem]"
      strength="5%"
    />

    <div class="container relative">
      <div
        class="brand-gradient relative overflow-hidden rounded-card px-6 py-12 text-center shadow-[0_12px_48px_rgba(0,0,0,0.28)] sm:px-10 sm:py-14 lg:px-16 lg:py-16"
      >
        <div class="relative mx-auto flex max-w-[560px] flex-col items-center gap-y-6">
          <h2
            class="font-heading text-on-accent text-[clamp(1.75rem,4vw,2.5rem)]/[1.15] font-bold"
          >
            {{ t("vod.final_cta.title") }}
          </h2>

          <form
            class="flex w-full flex-col gap-3 sm:flex-row sm:items-stretch"
            @submit.prevent="handleSubmit"
          >
            <label class="sr-only" for="vod-final-email">
              {{ t("vod.final_cta.email_placeholder") }}
            </label>
            <input
              id="vod-final-email"
              v-model="email"
              type="email"
              name="email"
              autocomplete="email"
              inputmode="email"
              :placeholder="t('vod.final_cta.email_placeholder')"
              :aria-invalid="emailInvalid"
              :aria-describedby="emailInvalid ? 'vod-final-email-error' : undefined"
              class="text-ink placeholder:text-faint h-12 min-w-0 flex-1 rounded-[10px] bg-white/95 px-4 text-[16px] outline-none"
              @input="emailInvalid = false"
            />
            <Button
              type="submit"
              size="small"
              radius="small"
              :btn-class="'bg-bg-deep text-ink h-12 shrink-0 rounded-[10px] px-6 text-[16px] font-semibold sm:min-w-[10.5rem]'"
            >
              {{ t("vod.final_cta.cta_primary") }}
            </Button>
          </form>

          <p
            v-if="emailInvalid"
            id="vod-final-email-error"
            role="alert"
            class="text-on-accent/90 w-full text-left text-[12px]/[15px]"
          >
            {{ t("vod.final_cta.email_error") }}
          </p>

          <a
            :href="trialHref"
            class="text-on-accent border-on-accent/30 inline-flex h-12 min-w-[200px] items-center justify-center rounded-[10px] border bg-black/10 px-6 text-[16px] font-semibold transition duration-300 ease-[var(--ease-brand)] hover:bg-black/20"
          >
            {{ t("vod.final_cta.cta_secondary") }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
