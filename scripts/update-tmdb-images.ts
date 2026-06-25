import { promises as fs, existsSync } from "fs";
import { join } from "path";
import sharp from "sharp";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

interface TMDBTVShow {
  id: number;
  name: string;
  poster_path: string;
  first_air_date: string;
}

interface TMDBMovieResponse {
  results: TMDBMovie[];
}

interface TMDBTVResponse {
  results: TMDBTVShow[];
}

type TMDBItem = TMDBMovie | TMDBTVShow;

// Helper function to get display name
function getDisplayName(item: TMDBItem): string {
  return "title" in item ? item.title : item.name;
}

// Image size configurations
const IMAGE_SIZES = {
  "1x": { width: 155, height: 231 },
  "2x": { width: 310, height: 462 },
} as const;

const QUALITY_SETTINGS = {
  low: 30,
  high: 100,
} as const;

// Helper function to generate and save image variant
async function generateImageVariant(
  inputBuffer: Buffer,
  width: number,
  height: number,
  quality: number,
  outputPath: string,
): Promise<Buffer> {
  const compressedBuffer = await sharp(inputBuffer)
    .resize(width, height, { fit: "cover" })
    .webp({ quality })
    .toBuffer();

  await fs.writeFile(outputPath, compressedBuffer);
  return compressedBuffer;
}

async function checkExistingImages(tmdbDir: string): Promise<string[]> {
  try {
    const files = await fs.readdir(tmdbDir);
    const imageFiles = files.filter(
      (file) =>
        (file.toLowerCase().endsWith(".webp") ||
          file.toLowerCase().endsWith(".jpg") ||
          file.toLowerCase().endsWith(".jpeg") ||
          file.toLowerCase().endsWith(".png")) &&
        (file.includes("@1x") || file.includes("@2x")),
    );
    return imageFiles;
  } catch {
    return [];
  }
}

async function downloadItemPoster(
  item: TMDBItem,
  tempLowDir: string,
  tempHighDir: string,
  index: number,
  fetchWithTimeout: (
    url: string,
    options?: RequestInit,
    retries?: number,
  ) => Promise<Response>,
) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
  const baseFileName = `${index + 1}.webp`;

  const response = await fetchWithTimeout(imageUrl, {}, 5); // 5 retries for images
  if (!response.ok) {
    throw new Error(
      `Failed to fetch image: ${response.status} ${response.statusText}`,
    );
  }

  const buffer = await response.arrayBuffer();
  const originalSize = buffer.byteLength;

  console.log(
    `✓ Downloaded ${index + 1}/68: ${baseFileName} - ${getDisplayName(item)}`,
  );

  const inputBuffer = Buffer.from(buffer);

  // Generate all image variants using configuration
  const variants = [
    {
      name: "Low@1x",
      buffer: await generateImageVariant(
        inputBuffer,
        IMAGE_SIZES["1x"].width,
        IMAGE_SIZES["1x"].height,
        QUALITY_SETTINGS.low,
        join(tempLowDir, baseFileName.replace(".webp", "@1x.webp")),
      ),
    },
    {
      name: "Low@2x",
      buffer: await generateImageVariant(
        inputBuffer,
        IMAGE_SIZES["2x"].width,
        IMAGE_SIZES["2x"].height,
        QUALITY_SETTINGS.low,
        join(tempLowDir, baseFileName.replace(".webp", "@2x.webp")),
      ),
    },
    {
      name: "High@1x",
      buffer: await generateImageVariant(
        inputBuffer,
        IMAGE_SIZES["1x"].width,
        IMAGE_SIZES["1x"].height,
        QUALITY_SETTINGS.high,
        join(tempHighDir, baseFileName.replace(".webp", "@1x.webp")),
      ),
    },
    {
      name: "High@2x",
      buffer: await generateImageVariant(
        inputBuffer,
        IMAGE_SIZES["2x"].width,
        IMAGE_SIZES["2x"].height,
        QUALITY_SETTINGS.high,
        join(tempHighDir, baseFileName.replace(".webp", "@2x.webp")),
      ),
    },
  ];

  // Calculate compression statistics
  const totalCompressedSize = variants.reduce(
    (sum, variant) => sum + variant.buffer.byteLength,
    0,
  );
  const compressionRatio = (
    ((originalSize - totalCompressedSize) / originalSize) *
    100
  ).toFixed(1);

  const variantSizes = variants
    .map(
      (variant) =>
        `${variant.name} ${(variant.buffer.byteLength / 1024).toFixed(1)}KB`,
    )
    .join(" + ");

  console.log(
    `🗜️ Generated ${baseFileName}: Original ${(originalSize / 1024).toFixed(1)}KB → ${variantSizes} (${compressionRatio}% total reduction)`,
  );
}

async function downloadLatestMovieThumbnails() {
  const TMDB_API_KEY =
    process.env.TMDB_API_KEY || process.env.NUXT_TMDB_API_KEY;

  if (!TMDB_API_KEY) {
    throw new Error(
      "TMDB API key is required. Set TMDB_API_KEY or NUXT_TMDB_API_KEY environment variable.",
    );
  }

  // Common headers for TMDB API requests
  const headers = {
    Authorization: `Bearer ${TMDB_API_KEY}`,
    accept: "application/json",
  };

  // Fetch options with 60-second timeout and retry logic
  const createFetchWithTimeout = async (
    url: string,
    options: RequestInit = {},
    retries = 3,
  ): Promise<Response> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 seconds

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        clearTimeout(timeoutId);

        if (attempt === retries) {
          throw error;
        }

        console.log(`⚠️ Attempt ${attempt} failed, retrying... (${url})`);
        // Wait before retrying (exponential backoff)
        await wait(1000 * attempt);
      }
    }

    throw new Error("All retry attempts failed");
  };

  // Create tmdb directories if they don't exist
  const tmdbDir = join(process.cwd(), "public", "tmdb");
  const lowQualityDir = join(tmdbDir, "low");
  const highQualityDir = join(tmdbDir, "high");
  const tempLowDir = join(tmdbDir, ".temp-low");
  const tempHighDir = join(tmdbDir, ".temp-high");

  if (!existsSync(tmdbDir)) {
    await fs.mkdir(tmdbDir, { recursive: true });
  }
  if (!existsSync(lowQualityDir)) {
    await fs.mkdir(lowQualityDir, { recursive: true });
  }
  if (!existsSync(highQualityDir)) {
    await fs.mkdir(highQualityDir, { recursive: true });
  }

  // Create temporary directories for new downloads
  if (existsSync(tempLowDir)) {
    await fs.rm(tempLowDir, { recursive: true, force: true });
  }
  if (existsSync(tempHighDir)) {
    await fs.rm(tempHighDir, { recursive: true, force: true });
  }
  await fs.mkdir(tempLowDir, { recursive: true });
  await fs.mkdir(tempHighDir, { recursive: true });
  console.log("📁 Created temporary directories for new images...");

  // Fetch 48 movies from 3 pages (20 per page, but we'll take 48 total)
  console.log("📡 Fetching 48 movies from TMDB...");
  const allMovies: TMDBMovie[] = [];

  for (let page = 1; page <= 3; page++) {
    const response = await createFetchWithTimeout(
      `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`,
      { headers },
    );

    if (!response.ok) {
      throw new Error(
        `TMDB Movies API request failed for page ${page}: ${response.status} ${response.statusText}`,
      );
    }

    const data: TMDBMovieResponse = await response.json();
    allMovies.push(...data.results);
    console.log(`✓ Fetched movie page ${page}: ${data.results.length} movies`);
  }

  // Fetch 20 TV series from 1 page
  console.log("📺 Fetching 20 TV series from TMDB...");
  const allTVShows: TMDBTVShow[] = [];

  const tvResponse = await createFetchWithTimeout(
    `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1`,
    { headers },
  );

  if (!tvResponse.ok) {
    throw new Error(
      `TMDB TV API request failed: ${tvResponse.status} ${tvResponse.statusText}`,
    );
  }

  const tvData: TMDBTVResponse = await tvResponse.json();
  allTVShows.push(...tvData.results);
  console.log(`✓ Fetched TV series: ${tvData.results.length} shows`);

  // Take first 48 movies and first 20 TV shows
  const movies = allMovies.slice(0, 48);
  const tvShows = allTVShows.slice(0, 20);
  const allItems: TMDBItem[] = [...movies, ...tvShows];

  console.log(
    `📥 Total content collected: ${movies.length} movies + ${tvShows.length} TV series = ${allItems.length} items to download`,
  );

  // Execute downloads with limited concurrency
  const DELAY_BETWEEN_DOWNLOADS = 50; // 50ms delay between downloads

  try {
    for (const [index, item] of allItems.entries()) {
      try {
        await downloadItemPoster(
          item,
          tempLowDir,
          tempHighDir,
          index,
          createFetchWithTimeout,
        );

        await wait(DELAY_BETWEEN_DOWNLOADS);
      } catch (error) {
        console.error(
          `❌ Failed to download poster for ${getDisplayName(item)}:`,
          error,
        );

        throw error; // Re-throw to trigger cleanup
      }
    }

    console.log("✅ All downloads completed successfully!");
    console.log("🔄 Replacing old images with new ones...");

    // Get list of old images BEFORE moving new ones
    const oldLowImages = await checkExistingImages(lowQualityDir);
    const oldHighImages = await checkExistingImages(highQualityDir);

    // Get list of new images to be moved
    const newLowImages = await fs.readdir(tempLowDir);
    const newHighImages = await fs.readdir(tempHighDir);

    // Delete old low quality images BEFORE moving new ones
    if (oldLowImages.length > 0) {
      console.log(
        `🗑️ Removing ${oldLowImages.length} old low quality images...`,
      );
      const deletePromises = oldLowImages.map((file) =>
        fs.unlink(join(lowQualityDir, file)).catch((err) => {
          console.error(`Failed to delete ${file}:`, err);
        }),
      );
      await Promise.all(deletePromises);
    }

    // Delete old high quality images BEFORE moving new ones
    if (oldHighImages.length > 0) {
      console.log(
        `🗑️ Removing ${oldHighImages.length} old high quality images...`,
      );
      const deletePromises = oldHighImages.map((file) =>
        fs.unlink(join(highQualityDir, file)).catch((err) => {
          console.error(`Failed to delete ${file}:`, err);
        }),
      );
      await Promise.all(deletePromises);
    }

    console.log("✅ Old images removed successfully!");

    // Now move new low quality images from temp to main directory
    for (const file of newLowImages) {
      const tempPath = join(tempLowDir, file);
      const finalPath = join(lowQualityDir, file);
      await fs.rename(tempPath, finalPath);
    }
    console.log(`✓ Moved ${newLowImages.length} new low quality images`);

    // Move new high quality images from temp to main directory
    for (const file of newHighImages) {
      const tempPath = join(tempHighDir, file);
      const finalPath = join(highQualityDir, file);
      await fs.rename(tempPath, finalPath);
    }
    console.log(`✓ Moved ${newHighImages.length} new high quality images`);

    // Clean up temp directories
    await fs.rm(tempLowDir, { recursive: true, force: true });
    await fs.rm(tempHighDir, { recursive: true, force: true });
    console.log("✨ Image replacement completed successfully!");
  } catch (error) {
    console.error(
      "❌ Download failed! Keeping old images and cleaning up temp directories...",
    );
    // Clean up temp directories on failure
    if (existsSync(tempLowDir)) {
      await fs.rm(tempLowDir, { recursive: true, force: true });
    }
    if (existsSync(tempHighDir)) {
      await fs.rm(tempHighDir, { recursive: true, force: true });
    }
    throw error;
  }
}

// Main execution
(async () => {
  console.log("🎬📺 Starting TMDB content download (movies + TV series)...");
  try {
    await downloadLatestMovieThumbnails();
    console.log("✅ TMDB content download completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to download TMDB content:", error);
    process.exit(1);
  }
})();
