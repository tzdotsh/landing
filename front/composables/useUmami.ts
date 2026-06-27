/** Self-hosted Umami — deferred, production-only, injected once from app.vue. */
export function useUmami() {
  const config = useRuntimeConfig();

  useHead(() => {
    if (import.meta.dev || !config.public.umamiEnabled) {
      return {};
    }

    const baseUrl = config.public.umamiUrl?.replace(/\/$/, "");
    const websiteId = config.public.umamiWebsiteId;

    if (!baseUrl || !websiteId) {
      return {};
    }

    return {
      script: [
        {
          key: "umami",
          src: `${baseUrl}/script.js`,
          defer: true,
          "data-website-id": websiteId,
        },
      ],
    };
  });
}

/** Fire-and-forget conversion event; no-ops when Umami is blocked or not loaded. */
export function trackUmamiEvent(event: string) {
  if (import.meta.server) {
    return;
  }

  window.umami?.track(event);
}
