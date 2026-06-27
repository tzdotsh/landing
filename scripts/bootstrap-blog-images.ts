/**
 * Downloads hero images for blog posts (Unsplash/Pexels — no API key).
 * Run: bun run bootstrap:blog-images
 */
import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import sharp from "sharp";

type BlogAsset = {
  output: string;
  url: string;
  label: string;
};

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1400&q=85&auto=format&fit=crop`;
const PEXELS = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1400`;

const WIKIMEDIA = (path: string) =>
  `https://upload.wikimedia.org/wikipedia/commons/thumb/${path}`;

const BLOG_ASSETS: BlogAsset[] = [
  {
    output: "public/blog/firestick-setup.webp",
    url: WIKIMEDIA("2/21/FireTV_Stick_3rd_Gen.jpg/1280px-FireTV_Stick_3rd_Gen.jpg"),
    label: "Firestick setup — Amazon Fire TV Stick + Alexa remote",
  },
  {
    output: "public/blog/spot-fake-reseller.webp",
    url: PEXELS(3949101),
    label: "Spot fake reseller — security warning",
  },
  {
    output: "public/blog/premier-league.webp",
    url: UNSPLASH("1522778119026-d647f0596c20"),
    label: "Premier League — stadium match",
  },
  {
    output: "public/blog/football-iptv.webp",
    url: UNSPLASH("1431324155629-1a6deb1dec8d"),
    label: "Football IPTV — live match",
  },
  {
    output: "public/blog/iptv-vs-cable.webp",
    url: PEXELS(1181244),
    label: "IPTV vs cable — living room TV",
  },
  {
    output: "public/blog/laliga-sin-cortes.webp",
    url: UNSPLASH("1574629810360-7efbbe195018"),
    label: "LaLiga — Spanish football",
  },
  {
    output: "public/blog/instalar-iptv.webp",
    url: UNSPLASH("1593784991095-a205069470b6"),
    label: "Instalar IPTV — Smart TV",
  },
];

async function downloadAsWebp(asset: BlogAsset, root: string) {
  const response = await fetch(asset.url, {
    headers: { "User-Agent": "maxco-blog-bootstrap/1.0" },
  });

  if (!response.ok) {
    throw new Error(`${asset.label}: HTTP ${response.status}`);
  }

  const input = Buffer.from(await response.arrayBuffer());
  const outputPath = join(root, asset.output);
  const outputDir = outputPath.slice(0, outputPath.lastIndexOf("/"));

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const webp = await sharp(input)
    .resize(1400, null, { withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer();

  await sharp(webp).toFile(outputPath);

  console.log(
    `✓ ${asset.output} (${(webp.length / 1024).toFixed(0)} KB) — ${asset.label}`,
  );
}

async function main() {
  console.log(`Downloading ${BLOG_ASSETS.length} blog hero assets…\n`);

  for (const asset of BLOG_ASSETS) {
    await downloadAsWebp(asset, process.cwd());
  }

  console.log("\nDone.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
