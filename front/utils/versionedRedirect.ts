/** Server/client redirect to the active `/v{version}/…` marketing route. */
export async function redirectToVersionedRoute(segment: string) {
  const localePath = useLocalePath();
  const {
    public: { activeVersion },
  } = useRuntimeConfig();

  if (!activeVersion) {
    return;
  }

  await navigateTo(localePath(`/v${activeVersion}/${segment}`), {
    redirectCode: 301,
    replace: true,
  });
}
