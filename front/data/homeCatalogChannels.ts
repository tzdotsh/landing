/**
 * Curated home catalog marquee channels.
 * Logos sourced from mediaportal-uk-logos (Dark variants for panel bg):
 * https://github.com/Jasmeet181/mediaportal-uk-logos
 *
 * Sync assets: `python3 scripts/sync-channel-logos.py`
 */
export type HomeCatalogChannel = {
  id: number;
  name: string;
  logo: string;
};

export const HOME_CATALOG_CHANNELS: HomeCatalogChannel[] = [
  // UK
  { id: 1, name: "BBC One", logo: "/img/channel-logos/bbc-one-hd.png" },
  { id: 2, name: "BBC Two", logo: "/img/channel-logos/bbc-two-hd.png" },
  { id: 3, name: "ITV1", logo: "/img/channel-logos/itv1-hd.png" },
  { id: 4, name: "Channel 4", logo: "/img/channel-logos/channel-4-hd.png" },
  { id: 5, name: "Channel 5", logo: "/img/channel-logos/channel-5-hd.png" },
  {
    id: 6,
    name: "Sky Sports PL",
    logo: "/img/channel-logos/sky-sports-premier-league-hd.png",
  },
  {
    id: 7,
    name: "Sky Sports",
    logo: "/img/channel-logos/sky-sports-main-event-hd.png",
  },
  {
    id: 8,
    name: "Sky Atlantic",
    logo: "/img/channel-logos/sky-atlantic-hd.png",
  },
  // Sports
  {
    id: 9,
    name: "Premier Sports",
    logo: "/img/channel-logos/premier-sports-1-hd.png",
  },
  {
    id: 10,
    name: "Viaplay Sports",
    logo: "/img/channel-logos/viaplay-sports-1.png",
  },
  { id: 11, name: "Eurosport", logo: "/img/channel-logos/eurosport-1-hd.png" },
  { id: 12, name: "BT Sport", logo: "/img/channel-logos/bt-sport-1-hd.png" },
];
