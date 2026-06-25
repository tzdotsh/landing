import { defineStore, acceptHMRUpdate } from "pinia";

export type StatesEnum = "form" | "unauthorized" | "verified";

export const useAuthCheckStore = defineStore("auth-check", function () {
  const DEFAULT_STATE: StatesEnum = "form";

  const state = ref<StatesEnum>(DEFAULT_STATE);
  const config = useRuntimeConfig();

  function checkIfAuthentic(link: string): boolean {
    try {
      const url = new URL(link);
      const validDomain = config.public.validDomain;

      if (!validDomain) {
        console.warn("VALID_DOMAIN environment variable is not set");
        return false;
      }

      const validUrl = new URL(validDomain);

      function getRootDomain(host: string): string {
        const parts = host.split('.');
        if (parts.length <= 2) return host;
        return parts.slice(-2).join('.');
      }

      return getRootDomain(url.hostname) === getRootDomain(validUrl.hostname);
    } catch (error) {
      console.error("Invalid URL provided:", error);
      return false;
    }
  }

  function $reset() {
    state.value = DEFAULT_STATE;
  }

  return { state, checkIfAuthentic, $reset };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthCheckStore, import.meta.hot));
}
