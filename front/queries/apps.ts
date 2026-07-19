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

type ContentLocale = "en" | "es" | "pt";

/** A reachable setup guide — one per device/app pair (see getGuideCards). */
export type GuideCard = {
  /** Tutorial id used as list key. */
  id: number;
  title: string;
  deviceSlug: string;
  deviceName: string;
  appSlug: string;
  updatedAt: string;
};

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
  if (locale.startsWith("es")) {
    return "es";
  }

  if (locale.startsWith("pt")) {
    return "pt";
  }

  return "en";
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
  tutorialBySlug: (params: { locale: ContentLocale; slug: string }) =>
    [...APPS_QUERY_KEYS.root, "tutorialBySlug", params] as const,
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

export const appTutorialBySlugQuery = defineQueryOptions(
  ({ locale, slug }: { locale: ContentLocale; slug: string }) => ({
    key: APPS_QUERY_KEYS.tutorialBySlug({ locale, slug }),
    query: async () => {
      const payload = usePayload();
      const result = await payload.find({
        collection: "tutorials",
        locale,
        depth: 1,
        limit: 1,
        where: {
          slug: { equals: slug },
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

export function useAppTutorialBySlugQueryWithOptions(
  slug: MaybeRefOrGetter<string>,
  options: {
    server?: boolean;
  } = {},
) {
  const locale = useContentLocale();

  return useQuery(() => {
    const resolvedSlug = toValue(slug);

    return {
      ...appTutorialBySlugQuery({ locale: locale.value, slug: resolvedSlug }),
      enabled:
        Boolean(resolvedSlug) &&
        (import.meta.client || Boolean(options.server)),
    };
  });
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

/**
 * Reachable setup guides for the /apps index: one card per device/app pair.
 * The detail page (`/apps/{device}/{app}`) runs `where device+app, limit:1` with
 * no sort, so Payload's default order returns the FIRST matching tutorial. The
 * metadata query shares that collection/order, so keeping the first tutorial
 * seen per pair makes each index card resolve to exactly the tutorial its
 * detail page renders — deterministic, no duplicate links to a single page.
 */
export function getGuideCards(
  tutorials: Tutorial[] | undefined,
): GuideCard[] {
  const byPair = new Map<string, GuideCard>();

  for (const tutorial of tutorials ?? []) {
    if (!tutorial.device?.slug || !tutorial.app?.slug) {
      continue;
    }

    const key = `${tutorial.device.slug}/${tutorial.app.slug}`;

    if (byPair.has(key)) {
      continue;
    }

    byPair.set(key, {
      id: tutorial.id,
      title: tutorial.title,
      deviceSlug: tutorial.device.slug,
      deviceName: tutorial.device.name,
      appSlug: tutorial.app.slug,
      updatedAt: tutorial.updatedAt,
    });
  }

  return Array.from(byPair.values());
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
