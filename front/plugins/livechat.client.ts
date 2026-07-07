/**
 * LiveChat loader — landing-owned (shadows tv-layout plugin).
 * Boots tracking.js; MaxcoChatBubble in app.vue is the visible trigger.
 */

const DEFAULT_ALLOWED_HOSTNAMES = [
  "maxco.one",
  "www.maxco.one",
  "web.maxcotv.com",
  "maxcotv.com",
];

const DEFAULT_LICENSE = "16979592";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const license = String(config.public.livechatLicense || DEFAULT_LICENSE).trim();
  if (!license || Number.isNaN(Number(license))) {
    return;
  }

  const hostname = window.location.hostname;

  const configured = String(config.public.validHostnames || "")
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);

  const allowed = configured.length ? configured : DEFAULT_ALLOWED_HOSTNAMES;

  const isAllowedHost = allowed.some(
    (host) => hostname === host || hostname.endsWith(`.${host}`),
  );

  // Allow local dev so the bubble can be exercised without polluting prod stats.
  if (!isAllowedHost && !import.meta.dev) {
    return;
  }

  if (window.LiveChatWidget || window.__lc) {
    return;
  }

  const lc: LiveChatConfig = (window.__lc = window.__lc || {});
  lc.license = Number(license);
  lc.integration_name = "manual_channels";
  lc.product_name = "livechat";

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
      const script = document.createElement("script");
      script.async = true;
      script.type = "text/javascript";
      script.src = "https://cdn.livechatinc.com/tracking.js";
      document.head.appendChild(script);
    },
  };

  function enqueue(entry: unknown[]) {
    return widget._h
      ? widget._h.apply(null, entry)
      : (widget._q as unknown[][]).push(entry);
  }

  if (!lc.asyncInit) {
    widget.init();
  }

  window.LiveChatWidget = window.LiveChatWidget || widget;
});
