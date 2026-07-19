/**
 * Landing-owned LiveChat bootstrap (matches the proven checkout loader).
 * Loads when the bubble mounts — no dependency on tv-layout plugins or runtime
 * config keys being merged correctly from layers.
 */

const DEFAULT_HOSTS = [
  "maxco.one",
  "www.maxco.one",
  "web.maxcotv.com",
  "maxcotv.com",
];

const DEFAULT_LICENSE = 16979592;
const TRACKING_SRC = "https://cdn.livechatinc.com/tracking.js";

function hostAllowed(hostname: string, configured: string[]) {
  const allowed = configured.length ? configured : DEFAULT_HOSTS;
  return allowed.some(
    (host) => hostname === host || hostname.endsWith(`.${host}`),
  );
}

function injectLiveChatStub(license: number) {
  window.__lc = window.__lc || {};
  window.__lc.license = license;
  window.__lc.integration_name = "manual_channels";
  window.__lc.product_name = "livechat";

  if (window.LiveChatWidget?.call) {
    return;
  }

  // Official LiveChat async loader (same snippet as checkout / trial).
  (function inject(n, t, _c) {
    function enqueue(entry: unknown[]) {
      return widget._h
        ? widget._h.apply(null, entry)
        : widget._q.push(entry);
    }

    const widget: LiveChatWidgetApi = {
      _q: [],
      _h: null,
      _v: "2.0",
      on(...args: unknown[]) {
        enqueue(["on", args]);
      },
      once(...args: unknown[]) {
        enqueue(["once", args]);
      },
      off(...args: unknown[]) {
        enqueue(["off", args]);
      },
      get(...args: unknown[]) {
        if (!widget._h) {
          throw new Error(
            "[LiveChatWidget] You can't use getters before load.",
          );
        }
        return enqueue(["get", args]);
      },
      call(...args: unknown[]) {
        enqueue(["call", args]);
      },
      init() {
        if (t.querySelector(`script[src="${TRACKING_SRC}"]`)) {
          return;
        }
        const script = t.createElement("script");
        script.async = true;
        script.type = "text/javascript";
        script.src = TRACKING_SRC;
        t.head.appendChild(script);
      },
    };

    if (!n.__lc?.asyncInit) {
      widget.init();
    }

    n.LiveChatWidget = n.LiveChatWidget || widget;
  })(window, document, [].slice);
}

export function useLiveChat() {
  const config = useRuntimeConfig();

  const configuredHosts = computed(() =>
    String(config.public.validHostnames || "")
      .split(",")
      .map((host) => host.trim().toLowerCase())
      .filter(Boolean),
  );

  function resolveLicense() {
    const raw = String(config.public.livechatLicense || DEFAULT_LICENSE).trim();
    const parsed = Number(raw);
    return Number.isNaN(parsed) ? DEFAULT_LICENSE : parsed;
  }

  /** Returns true when the widget stub (or full widget) is present. */
  function ensureLoaded(): boolean {
    if (!import.meta.client) {
      return false;
    }

    const hostname = window.location.hostname;
    if (!hostAllowed(hostname, configuredHosts.value) && !import.meta.dev) {
      return false;
    }

    injectLiveChatStub(resolveLicense());
    return typeof window.LiveChatWidget?.call === "function";
  }

  function openChat() {
    if (!ensureLoaded()) {
      return;
    }

    window.LiveChatWidget!.call("maximize");
  }

  function whenReady(onReady: () => void, maxAttempts = 40, intervalMs = 250) {
    if (!import.meta.client) {
      return () => {};
    }

    let attempts = 0;
    const timer = setInterval(() => {
      attempts += 1;

      if (ensureLoaded() && typeof window.LiveChatWidget?.on === "function") {
        clearInterval(timer);
        onReady();
      } else if (attempts >= maxAttempts) {
        clearInterval(timer);
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }

  return {
    ensureLoaded,
    openChat,
    whenReady,
  };
}
