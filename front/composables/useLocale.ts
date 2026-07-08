/**
 * Shadows tv-layout/front/composables/useLocale.ts, which collapses every
 * locale that isn't "es-es" down to "en-en" and breaks pt-pt content queries.
 * Landing supports en-en / es-es / pt-pt, so pass the i18n locale through.
 */
export default function useLocale() {
  const i18n = useI18n();

  return computed(() => i18n.locale.value);
}
