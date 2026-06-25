import { defineQueryOptions, useQuery } from "@pinia/colada";
import { computed, toValue, type MaybeRefOrGetter } from "vue";

export type Device = {
  id: number;
  name: string;
  slug: string;
};

export type App = {
  id: number;
  name: string;
  slug: string;
};

export type Tutorial = {
  id: number;
  device: Device;
  app: App;
  title: string;
  content: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

type ContentLocale = "en" | "es";

const METADATA_SELECT = {
  id: true,
  device: true,
  app: true,
  title: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
} as const;

const TUTORIAL_SELECT = {
  ...METADATA_SELECT,
  content: true,
} as const;

function toContentLocale(locale: string): ContentLocale {
  return locale.startsWith("es") ? "es" : "en";
}

function useContentLocale() {
  const locale = useLocale();

  return computed(() => toContentLocale(locale.value));
}

export const APPS_QUERY_KEYS = {
  root: ["apps"] as const,
  metadata: (locale: ContentLocale) =>
    [...APPS_QUERY_KEYS.root, "metadata", { locale }] as const,
  tutorial: (params: {
    locale: ContentLocale;
    deviceSlug: string;
    appSlug: string;
  }) => [...APPS_QUERY_KEYS.root, "tutorial", params] as const,
};

export const appsMetadataQuery = defineQueryOptions(
  (locale: ContentLocale) => ({
    key: APPS_QUERY_KEYS.metadata(locale),
    query: async () => {
      const payload = usePayload();
      const result = await payload.find({
        collection: "tutorials",
        locale,
        depth: 2,
        limit: 1000,
        select: METADATA_SELECT,
      });

      return (result.docs ?? []) as Tutorial[];
    },
    staleTime: 1000 * 60 * 10,
  }),
);

export const appTutorialQuery = defineQueryOptions(
  ({
    locale,
    deviceSlug,
    appSlug,
  }: {
    locale: ContentLocale;
    deviceSlug: string;
    appSlug: string;
  }) => ({
    key: APPS_QUERY_KEYS.tutorial({ locale, deviceSlug, appSlug }),
    query: async () => {
      const payload = usePayload();
      const result = await payload.find({
        collection: "tutorials",
        locale,
        depth: 2,
        limit: 1,
        where: {
          and: [
            { "device.slug": { equals: deviceSlug } },
            { "app.slug": { equals: appSlug } },
          ],
        },
        select: TUTORIAL_SELECT,
      });

      return (result.docs?.[0] as Tutorial | undefined) ?? null;
    },
    staleTime: 1000 * 60 * 10,
  }),
);

export function useAppsMetadataQuery() {
  return useAppsMetadataQueryWithOptions();
}

export function useAppsMetadataQueryWithOptions(
  options: {
    server?: boolean;
  } = {},
) {
  const locale = useContentLocale();

  return useQuery(() => ({
    ...appsMetadataQuery(locale.value),
    enabled: import.meta.client || Boolean(options.server),
  }));
}

export function useAppTutorialQuery(
  deviceSlug: MaybeRefOrGetter<string>,
  appSlug: MaybeRefOrGetter<string>,
) {
  return useAppTutorialQueryWithOptions(deviceSlug, appSlug);
}

export function useAppTutorialQueryWithOptions(
  deviceSlug: MaybeRefOrGetter<string>,
  appSlug: MaybeRefOrGetter<string>,
  options: {
    server?: boolean;
  } = {},
) {
  const locale = useContentLocale();

  return useQuery(() => {
    const resolvedDeviceSlug = toValue(deviceSlug);
    const resolvedAppSlug = toValue(appSlug);

    return {
      ...appTutorialQuery({
        locale: locale.value,
        deviceSlug: resolvedDeviceSlug,
        appSlug: resolvedAppSlug,
      }),
      enabled:
        Boolean(resolvedDeviceSlug && resolvedAppSlug) &&
        (import.meta.client || Boolean(options.server)),
    };
  });
}

export function getDevicesFromTutorials(tutorials: Tutorial[] | undefined) {
  const uniqueDevices = new Map<string, Device>();

  for (const tutorial of tutorials ?? []) {
    if (!uniqueDevices.has(tutorial.device.slug)) {
      uniqueDevices.set(tutorial.device.slug, tutorial.device);
    }
  }

  return Array.from(uniqueDevices.values());
}

export function getAppsForDevice(
  tutorials: Tutorial[] | undefined,
  deviceSlug: string,
) {
  if (!deviceSlug) {
    return [];
  }

  const uniqueApps = new Map<string, App>();

  for (const tutorial of tutorials ?? []) {
    if (
      tutorial.device.slug === deviceSlug &&
      !uniqueApps.has(tutorial.app.slug)
    ) {
      uniqueApps.set(tutorial.app.slug, tutorial.app);
    }
  }

  return Array.from(uniqueApps.values());
}
