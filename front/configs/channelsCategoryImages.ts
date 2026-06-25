export type ChannelHeroCategory =
  | "sports"
  | "cinema"
  | "discovery"
  | "antena3"
  | "nickelodeon"
  | "f1";

export type ChannelCategoryImage = {
  src: string;
  srcset: string;
};

/** Local assets under public/img/channels-categories/ */
export const CHANNEL_CATEGORY_IMAGES: Record<
  ChannelHeroCategory,
  ChannelCategoryImage
> = {
  sports: {
    src: "/img/channels-categories/sports@2x.webp",
    srcset:
      "/img/channels-categories/sports@1x.webp 1x, /img/channels-categories/sports@2x.webp 2x",
  },
  cinema: {
    src: "/img/channels-categories/cinema@2x.webp",
    srcset:
      "/img/channels-categories/cinema.webp 1x, /img/channels-categories/cinema@2x.webp 2x",
  },
  discovery: {
    src: "/img/channels-categories/discovery@2x.webp",
    srcset:
      "/img/channels-categories/discovery.webp 1x, /img/channels-categories/discovery@2x.webp 2x",
  },
  antena3: {
    src: "/img/channels-categories/antena3@2x.webp",
    srcset:
      "/img/channels-categories/antena3.webp 1x, /img/channels-categories/antena3@2x.webp 2x",
  },
  nickelodeon: {
    src: "/img/channels-categories/nickelodeon@2x.webp",
    srcset:
      "/img/channels-categories/nickelodeon.webp 1x, /img/channels-categories/nickelodeon@2x.webp 2x",
  },
  f1: {
    src: "/img/channels-categories/f1@2x.webp",
    srcset:
      "/img/channels-categories/f1.webp 1x, /img/channels-categories/f1@2x.webp 2x",
  },
};

export function getChannelCategoryImage(
  name: string,
): ChannelCategoryImage | undefined {
  return CHANNEL_CATEGORY_IMAGES[name as ChannelHeroCategory];
}
