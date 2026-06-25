type RawChannel = {
  name: string;
  stream_id: number;
  stream_icon: string;
  category_id: string;
};

export type ChannelWithLogo = {
  id: number;
  name: string;
  logo: string | null;
};

export const LIVE_CHANNEL_IDS = [
  109316, 109319, 112675, 114287, 48388, 48512, 48526, 48536, 56222, 60298,
  109317, 109341, 112878, 48384, 48392, 48514, 48530, 48563, 60297, 82181,
] as const;

export const CATALOG_CHANNEL_LIMIT = 16;

function cleanChannelName(name: string): string {
  return name.replace(/\|[^|]*\|\s*/g, "");
}

function isValidChannel(name: string): boolean {
  return name !== "•●●•" && !name.includes("===") && !name.includes("▼•●•");
}

function normalizeLogo(icon: string | undefined | null): string | null {
  const logo = icon?.trim();
  return logo ? logo : null;
}

export async function fetchChannelsWithLogos(): Promise<ChannelWithLogo[]> {
  const config = useRuntimeConfig();
  const { CHANNELS_URL } = config.CHANNELS_API;
  const response = await $fetch<RawChannel[]>(CHANNELS_URL);

  return response
    .filter(({ name }) => isValidChannel(name))
    .map(({ stream_id, name, stream_icon }) => ({
      id: stream_id,
      name: cleanChannelName(name),
      logo: normalizeLogo(stream_icon),
    }));
}

export function pickCatalogChannels(
  channels: ChannelWithLogo[],
  limit = CATALOG_CHANNEL_LIMIT,
): ChannelWithLogo[] {
  const byId = new Map(channels.map((channel) => [channel.id, channel]));
  const picked: ChannelWithLogo[] = [];
  const seenLogos = new Set<string>();

  for (const id of LIVE_CHANNEL_IDS) {
    if (picked.length >= limit) break;

    const channel = byId.get(id);
    if (!channel?.logo || seenLogos.has(channel.logo)) continue;

    picked.push(channel);
    seenLogos.add(channel.logo);
  }

  for (const channel of channels) {
    if (picked.length >= limit) break;
    if (!channel.logo || seenLogos.has(channel.logo)) continue;

    picked.push(channel);
    seenLogos.add(channel.logo);
  }

  return picked;
}

export function pickLiveChannels(
  channels: ChannelWithLogo[],
): ChannelWithLogo[] {
  const byId = new Map(channels.map((channel) => [channel.id, channel]));

  return LIVE_CHANNEL_IDS.map((id) => byId.get(id)).filter(
    (channel): channel is ChannelWithLogo => Boolean(channel),
  );
}
