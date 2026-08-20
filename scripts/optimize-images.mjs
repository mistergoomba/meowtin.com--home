// Generates optimized .webp siblings for source PNG/JPG images in public/.
// Runs as `prebuild` so the build always picks up fresh outputs. Skips files
// whose .webp is newer than the source. Per-file overrides set max width and
// quality based on how the image is actually displayed in the app.

import { readdir, stat } from "node:fs/promises";
import { join, parse, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const PUBLIC_DIR = fileURLToPath(new URL("../public", import.meta.url));

const defaults = { maxWidth: 1200, quality: 80 };

// Per-file overrides keyed by path relative to public/.
// Widths are roughly 2x the largest CSS pixel size the image renders at.
const config = {
  "background.png":              { maxWidth: 1920, quality: 78 },
  "grid-background.png":         { maxWidth: 1920, quality: 78 },
  "me.png":                      { maxWidth: 800,  quality: 82 },
  "me-hero.png":                 { maxWidth: 1100, quality: 82 },
  "focus/ai.png":                { maxWidth: 800,  quality: 82 },
  "focus/massage.png":           { maxWidth: 800,  quality: 82 },
  "focus/creative.png":          { maxWidth: 800,  quality: 82 },
  "projects/warboy-site.png":       { maxWidth: 420, quality: 76 },
  "projects/massage-site.png":      { maxWidth: 420, quality: 76 },
  "projects/aittala-ashes.jpg":     { maxWidth: 420, quality: 76 },
  "projects/apocalyptic-times.jpg": { maxWidth: 420, quality: 76 },
  "projects/ai-casino.png":         { maxWidth: 420, quality: 78 },
  "projects/ai-avatar.png":         { maxWidth: 420, quality: 78 },
  // Flagship card renders at ~600 CSS px (half of the 1200px container).
  "projects/agent-platform-thumb.png":    { maxWidth: 1200, quality: 80 },
  // Portrait crop for the 3:4 home-page tile (~200 CSS px).
  "projects/agent-platform-portrait.png": { maxWidth: 420,  quality: 80 },
  // Detail-page architecture diagrams (~530 CSS px in the 2-col grid).
  "projects/agent-platform-tools.png":    { maxWidth: 1100, quality: 80 },
  "projects/agent-platform-orgs.png":     { maxWidth: 1100, quality: 80 },
  "massage-card.png":            { maxWidth: 800,  quality: 82 },
  "dj-flyer.png":                { maxWidth: 800,  quality: 82 },
  "qr-header.png":               { maxWidth: 900,  quality: 82 },
  "eye.png":                     { maxWidth: 400,  quality: 85 },
  "footer-eye.png":              { maxWidth: 1000, quality: 82 },
  "star.png":                    { maxWidth: 400,  quality: 85 },
  "hand-cursor.png":             { maxWidth: 200,  quality: 85 },
  "logo.png":                    { maxWidth: 1000, quality: 82 },
  "fart-bubble-logo.png":        { maxWidth: 900,  quality: 82 },
  "short-fuse-logo.png":         { maxWidth: 1200, quality: 82 },
  "okie-dokie-logo.png":         { maxWidth: 1400, quality: 82 },
  "okie-dokie-karaoke-logo.png": { maxWidth: 1400, quality: 82 },
  "kink-logo.png":               { maxWidth: 800,  quality: 82 },
  "care2-logo.png":              { maxWidth: 800,  quality: 82 },
  "yahoo-logo.png":              { maxWidth: 800,  quality: 82 },
  "nmn-logo.png":                { maxWidth: 800,  quality: 82 },
  "grimslug-logo.png":           { maxWidth: 800,  quality: 82 },
  "mistergoomba-logo.png":       { maxWidth: 800,  quality: 82 },
  // OG/social share images: 1200x630 is the standard. Quality slightly lower
  // since these are only ever shown as previews.
  "share-image.jpg":             { maxWidth: 1200, quality: 80 },
  "share-image-art.png":         { maxWidth: 1200, quality: 78 },
  "share-image-music.png":       { maxWidth: 1200, quality: 78 },
  "share-image-videos.png":      { maxWidth: 1200, quality: 78 },
  "share-image-dev.png":         { maxWidth: 1200, quality: 78 },
};

// Source images we don't want a .webp for (e.g. raster favicons that need a
// specific format for browser compat).
const SKIP = new Set([
  "favicon.png",
]);

const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)}MB`;
};

const isSourceImage = (name) => /\.(png|jpe?g)$/i.test(name);

async function fileExists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile()) {
      yield full;
    }
  }
}

async function processFile(absPath) {
  const relPath = relative(PUBLIC_DIR, absPath);
  const { dir, name: base } = parse(relPath);
  const outputPath = join(PUBLIC_DIR, dir, `${base}.webp`);

  const inputStat = await stat(absPath);

  if (await fileExists(outputPath)) {
    const outputStat = await stat(outputPath);
    if (outputStat.mtimeMs >= inputStat.mtimeMs) {
      return { status: "skip", relPath };
    }
  }

  const settings = { ...defaults, ...(config[relPath] ?? {}) };
  const image = sharp(absPath);
  const meta = await image.metadata();

  await image
    .resize({ width: settings.maxWidth, withoutEnlargement: true })
    .webp({ quality: settings.quality })
    .toFile(outputPath);

  const outputStat = await stat(outputPath);
  const targetWidth = Math.min(meta.width ?? settings.maxWidth, settings.maxWidth);

  return {
    status: "write",
    relPath,
    inSize: inputStat.size,
    outSize: outputStat.size,
    fromWidth: meta.width,
    toWidth: targetWidth,
  };
}

async function main() {
  console.log(`optimizing images in ${PUBLIC_DIR}`);

  const sources = [];
  for await (const file of walk(PUBLIC_DIR)) {
    const rel = relative(PUBLIC_DIR, file);
    const base = parse(rel).base;
    if (isSourceImage(base) && !SKIP.has(base)) sources.push(file);
  }

  if (sources.length === 0) {
    console.log("  no source images found");
    return;
  }

  let written = 0;
  let totalIn = 0;
  let totalOut = 0;

  for (const file of sources) {
    try {
      const result = await processFile(file);
      if (result.status === "write") {
        written++;
        totalIn += result.inSize;
        totalOut += result.outSize;
        console.log(
          `  write  ${result.relPath} (${formatBytes(result.inSize)} \u2192 ${formatBytes(result.outSize)}, ${result.fromWidth}\u2192${result.toWidth}px)`
        );
      }
    } catch (err) {
      console.error(`  error  ${relative(PUBLIC_DIR, file)}:`, err.message);
      process.exitCode = 1;
    }
  }

  if (written === 0) {
    console.log("  all webp outputs are up to date");
  } else {
    console.log(
      `  done: ${written} file(s), ${formatBytes(totalIn)} \u2192 ${formatBytes(totalOut)}`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
