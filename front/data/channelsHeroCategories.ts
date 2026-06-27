export type ChannelsHeroCategoryId = "sports" | "cinema" | "channels";

export type ChannelsHeroCategorySource =
  | "static-sports"
  | "curated-cinema"
  | "static-ftv";

export type ChannelsHeroCategoryConfig = {
  id: ChannelsHeroCategoryId;
  /** i18n key under channels.hero.categories */
  i18nKey: "sports" | "cinema" | "tdt";
  source: ChannelsHeroCategorySource;
};

/** Top-level channels hero tabs — data resolved in Hero.vue by source. */
export const CHANNELS_HERO_CATEGORIES: ChannelsHeroCategoryConfig[] = [
  {
    id: "sports",
    i18nKey: "sports",
    source: "static-sports",
  },
  {
    id: "cinema",
    i18nKey: "cinema",
    source: "curated-cinema",
  },
  {
    id: "channels",
    i18nKey: "tdt",
    source: "static-ftv",
  },
];
