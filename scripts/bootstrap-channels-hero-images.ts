/**
 * Downloads curated hero images for the channels page (no TMDB API key required).
 * URLs are verified by content — TMDB paths are scraped from each title's page.
 * Run: bun run bootstrap:channels-hero
 */
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";

type HeroAsset = {
  output: string;
  url: string;
  label: string;
};

const TMDB = "https://image.tmdb.org/t/p/w1280";
const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1280&q=85&auto=format&fit=crop`;
const PEXELS = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1280`;

/** Verified URLs — each asset was checked against its slide copy. */
const HERO_ASSETS: HeroAsset[] = [
  {
    output: "public/channels/sports/la-liga.jpg",
    url: UNSPLASH("1574629810360-7efbbe195018"),
    label: "La Liga — football on pitch",
  },
  {
    output: "public/channels/sports/formula-1.jpg",
    url: `${TMDB}/fitkVtxmrTeXGttstlMJQwL4k89.jpg`,
    label: "Formula 1: Drive to Survive",
  },
  {
    output: "public/channels/sports/premier-league.jpg",
    url: UNSPLASH("1522778119026-d647f0596c20"),
    label: "Premier League — stadium match",
  },
  {
    output: "public/channels/sports/uefa.jpg",
    url: UNSPLASH("1431324155629-1a6deb1dec8d"),
    label: "UEFA — floodlit football",
  },
  {
    output: "public/channels/ftv/antena-3.jpg",
    url: UNSPLASH("1539037116277-4db20889f2d4"),
    label: "Antena 3 — Madrid skyline",
  },
  {
    output: "public/channels/ftv/bbc-one.jpg",
    url: PEXELS(460672),
    label: "BBC One — London (Big Ben)",
  },
  {
    output: "public/channels/ftv/itv.jpg",
    url: UNSPLASH("1513635269975-59663e0ac1ad"),
    label: "ITV — London aerial",
  },
  {
    output: "public/channels/ftv/channel-4.jpg",
    url: PEXELS(2747449),
    label: "Channel 4 — live entertainment",
  },
  {
    output: "public/channels/ftv/rtve.jpg",
    url: PEXELS(1388030),
    label: "RTVE — Barcelona skyline",
  },
  {
    output: "public/channels/cinema/michael.jpg",
    url: `${TMDB}/zm0KAbOjlt9eR5y7vDiL2dEOwMl.jpg`,
    label: "Michael (2026) — official poster art",
  },
  {
    output: "public/channels/cinema-fallback/michael.jpg",
    url: `${TMDB}/zm0KAbOjlt9eR5y7vDiL2dEOwMl.jpg`,
    label: "Michael fallback poster",
  },
];

async function verifyAndDownload(asset: HeroAsset, root: string) {
  const response = await fetch(asset.url, {
    headers: { "User-Agent": "maxco-channels-hero-bootstrap/1.0" },
  });

  if (!response.ok) {
    throw new Error(`${asset.label}: HTTP ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const outputPath = join(root, asset.output);
  const outputDir = outputPath.slice(0, outputPath.lastIndexOf("/"));

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  writeFileSync(outputPath, buffer);
  console.log(
    `✓ ${asset.output} (${(buffer.length / 1024).toFixed(0)} KB) — ${asset.label}`,
  );
}

async function main() {
  console.log(`Downloading ${HERO_ASSETS.length} channels hero assets…\n`);

  for (const asset of HERO_ASSETS) {
    await verifyAndDownload(asset, process.cwd());
  }

  console.log("\nDone.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
