/**
 * This repository is the marketing origin itself. Keep shared-shell links
 * relative so the same build works on every domain that serves the landing
 * site; satellite applications retain the inherited absolute-origin behavior.
 */
export function usePublicOrigin() {
  return computed(() => "");
}
