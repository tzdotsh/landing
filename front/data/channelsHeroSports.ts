export type ChannelsHeroSlide = {
  id: string;
  /** i18n key under channels.hero.slides.{category}.{i18nKey} */
  i18nKey: string;
  src: string;
  srcset?: string;
  alt: string;
};

/** Static sports hero slides — assets in public/channels/sports/ */
export const CHANNELS_HERO_SPORTS_SLIDES: ChannelsHeroSlide[] = [
  {
    id: "la-liga",
    i18nKey: "la-liga",
    src: "/channels/sports/la-liga.jpg",
    alt: "La Liga football coverage",
  },
  {
    id: "formula-1",
    i18nKey: "formula-1",
    src: "/channels/sports/formula-1.jpg",
    alt: "Formula 1 racing coverage",
  },
  {
    id: "premier-league",
    i18nKey: "premier-league",
    src: "/channels/sports/premier-league.jpg",
    alt: "Premier League football coverage",
  },
  {
    id: "uefa",
    i18nKey: "uefa",
    src: "/channels/sports/uefa.jpg",
    alt: "UEFA Champions League coverage",
  },
];
