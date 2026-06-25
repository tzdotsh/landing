import { HOME_CATALOG_CHANNELS } from "../../data/homeCatalogChannels";

export default cachedEventHandler(async () => HOME_CATALOG_CHANNELS, {
  maxAge: 60 * 60 * 24 * 7,
});
