import { HOME_CATALOG_CHANNELS } from "../../../front/data/homeCatalogChannels";

/** Static curated list only — never proxy live stream_icon URLs (often country flags). */
export default defineEventHandler(() => HOME_CATALOG_CHANNELS);
