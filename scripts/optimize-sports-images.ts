/**
 * Compresses sport category images in public/sports/ for web delivery.
 * Run: bun run optimize:sports-images
 */
import { readdirSync, renameSync } from "fs";
import { join } from "path";
import sharp from "sharp";

const SPORTS_DIR = join(process.cwd(), "public/sports");

/** Match existing football.jpg / formula-1.jpg — 1280px max edge, ~300–400 KB. */
const MAX_EDGE = 1280;
const JPEG_QUALITY = 82;

const TARGETS = new Set([
  "tennis.jpg",
  "rugby.jpg",
  "golf.jpg",
  "darts.jpg",
  "cricket.jpg",
  "basketball.jpg",
  "combat-ppv.jpg",
  "boxing-ufc.jpg",
]);

function formatKb(bytes: number) {
  return `${(bytes / 1024).toFixed(0)} KB`;
}

async function optimizeImage(fileName: string) {
  const inputPath = join(SPORTS_DIR, fileName);
  const tempPath = join(SPORTS_DIR, `.${fileName}.tmp`);

  const before = await sharp(inputPath).metadata();
  const beforeStat = (await Bun.file(inputPath).arrayBuffer()).byteLength;

  await sharp(inputPath)
    .rotate()
    .resize(MAX_EDGE, MAX_EDGE, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({
      quality: JPEG_QUALITY,
      mozjpeg: true,
      progressive: true,
    })
    .toFile(tempPath);

  renameSync(tempPath, inputPath);

  const after = await sharp(inputPath).metadata();
  const afterStat = (await Bun.file(inputPath).arrayBuffer()).byteLength;
  const reduction = ((1 - afterStat / beforeStat) * 100).toFixed(0);

  console.log(
    `✓ ${fileName}: ${before.width}×${before.height} ${formatKb(beforeStat)} → ${after.width}×${after.height} ${formatKb(afterStat)} (−${reduction}%)`,
  );
}

async function main() {
  const files = readdirSync(SPORTS_DIR).filter(
    (file) => file.endsWith(".jpg") && TARGETS.has(file),
  );

  if (!files.length) {
    console.log("No target sports images found.");
    return;
  }

  console.log(`Optimizing ${files.length} sports images (max ${MAX_EDGE}px, q${JPEG_QUALITY})…\n`);

  for (const file of files.sort()) {
    await optimizeImage(file);
  }

  console.log("\nDone.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
