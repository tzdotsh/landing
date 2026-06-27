/** Inlined in document head before any stylesheet — first paint must be dark. */
export const CRITICAL_THEME_COLOR = "#081623";
export const CRITICAL_INK_COLOR = "#edf3f8";

export const CRITICAL_THEME_CSS = `:root{color-scheme:dark}html,body{background-color:${CRITICAL_THEME_COLOR};color:${CRITICAL_INK_COLOR};margin:0;min-height:100%}@font-face{font-family:Poppins;font-style:normal;font-weight:800;font-display:swap;src:url("/fonts/poppins-800-latin.woff2") format("woff2")}`;

export const CRITICAL_HEAD = {
  htmlAttrs: {
    style: `background-color:${CRITICAL_THEME_COLOR}`,
  },
  bodyAttrs: {
    style: `background-color:${CRITICAL_THEME_COLOR}`,
  },
  meta: [
    { name: "theme-color", content: CRITICAL_THEME_COLOR },
    { name: "color-scheme", content: "dark" },
  ],
  style: [
    {
      key: "critical-theme",
      innerHTML: CRITICAL_THEME_CSS,
    },
  ],
  link: [
    {
      key: "preload-poppins-800",
      rel: "preload",
      href: "/fonts/poppins-800-latin.woff2",
      as: "font",
      type: "font/woff2",
      crossorigin: "anonymous",
      fetchpriority: "high",
    },
  ],
} as const;
