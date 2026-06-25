import {
  fetchChannelsWithLogos,
  pickLiveChannels,
} from "../../utils/channelLogos";

export default cachedEventHandler(
  async () => {
    const channels = await fetchChannelsWithLogos();
    return pickLiveChannels(channels);
  },
  { maxAge: 60 * 60 * 1000 },
);
