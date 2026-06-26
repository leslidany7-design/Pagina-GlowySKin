import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.resolve('public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const CATALOG_OUT = path.join(IMAGES_DIR, 'Catalogo');
const ORIGINALS_DIR = path.resolve('_originals');

// Ensure output directories exist
[IMAGES_DIR, CATALOG_OUT, ORIGINALS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Map of source files to optimize
const filesToProcess = [];

// 1. Catalog images from public/Catalogo
const catalogSrc = path.join(PUBLIC_DIR, 'Catalogo');
if (fs.existsSync(catalogSrc)) {
  const files = fs.readdirSync(catalogSrc);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (['.png', '.jpeg', '.jpg'].includes(ext)) {
      // Sanitize filename: lowercase, replace spaces with hyphens
      const baseName = path.basename(file, ext)
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\-_.]/g, '');
      filesToProcess.push({
        src: path.join(catalogSrc, file),
        outDir: CATALOG_OUT,
        baseName,
        category: 'catalog'
      });
    }
  }
}

// 2. Root-level public images
const publicImages = [
  { file: 'Logo1.png', baseName: 'logo1' },
  { file: 'logo_transparente.png', baseName: 'logo-transparente' },
  { file: 'Skincaresinfondo.svg', baseName: null }, // SVG - just copy
  { file: 'skincare.svg', baseName: null }, // SVG - just copy
  { file: 'deep_hydration.png', baseName: 'deep-hydration' },
  { file: 'hero_model_cream.png', baseName: 'hero-model-cream' },
  { file: 'hero_model_cream_transparent.png', baseName: 'hero-model-cream-transparent' },
  { file: 'korean_model_skincare.png', baseName: 'korean-model-skincare' },
  { file: 'natural_ingredients.png', baseName: 'natural-ingredients' },
  { file: 'skin_barrier.png', baseName: 'skin-barrier' },
];

for (const img of publicImages) {
  const srcPath = path.join(PUBLIC_DIR, img.file);
  if (fs.existsSync(srcPath)) {
    if (img.baseName === null) {
      // SVG: just copy to images/
      const dest = path.join(IMAGES_DIR, img.file.toLowerCase().replace(/\s+/g, '-'));
      if (!fs.existsSync(dest)) {
        fs.copyFileSync(srcPath, dest);
        console.log(`  [SVG] Copied ${img.file} → images/${path.basename(dest)}`);
      }
    } else {
      filesToProcess.push({
        src: srcPath,
        outDir: IMAGES_DIR,
        baseName: img.baseName,
        category: 'public'
      });
    }
  }
}

console.log(`\n🌸 GLOWYSKIN Image Optimizer`);
console.log(`   Found ${filesToProcess.length} images to convert\n`);

let totalOriginal = 0;
let totalWebp = 0;
let totalAvif = 0;

for (const item of filesToProcess) {
  const srcStats = fs.statSync(item.src);
  const srcSizeKB = (srcStats.size / 1024).toFixed(0);
  totalOriginal += srcStats.size;

  const webpPath = path.join(item.outDir, `${item.baseName}.webp`);
  const avifPath = path.join(item.outDir, `${item.baseName}.avif`);

  try {
    // Generate WebP
    await sharp(item.src)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(webpPath);
    const webpSize = fs.statSync(webpPath).size;
    totalWebp += webpSize;

    // Generate AVIF
    await sharp(item.src)
      .resize({ width: 1200, withoutEnlargement: true })
      .avif({ quality: 65 })
      .toFile(avifPath);
    const avifSize = fs.statSync(avifPath).size;
    totalAvif += avifSize;

    const savingsWebp = ((1 - webpSize / srcStats.size) * 100).toFixed(0);
    const savingsAvif = ((1 - avifSize / srcStats.size) * 100).toFixed(0);

    console.log(`  ✓ ${item.baseName}`);
    console.log(`    Original: ${srcSizeKB}KB → WebP: ${(webpSize/1024).toFixed(0)}KB (-${savingsWebp}%) | AVIF: ${(avifSize/1024).toFixed(0)}KB (-${savingsAvif}%)`);
  } catch (err) {
    console.error(`  ✗ Error processing ${item.baseName}: ${err.message}`);
  }
}

// Move originals from public to _originals for backup
console.log(`\n📦 Moving original files to _originals/...`);

// Move root-level duplicates
const rootFilesToMove = ['Catalogo', 'Logo1.png', 'logo_transparente.png', 'Fondo.mp4', 'Precios.docx', 'PROMPT PAGINA.txt'];
for (const item of rootFilesToMove) {
  const src = path.resolve(item);
  const dest = path.join(ORIGINALS_DIR, item);
  if (fs.existsSync(src)) {
    // Create parent dir if needed
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    fs.renameSync(src, dest);
    console.log(`  Moved ./${item} → _originals/${item}`);
  }
}

// Summary
console.log(`\n📊 Summary:`);
console.log(`   Original total:  ${(totalOriginal / 1024 / 1024).toFixed(1)} MB`);
console.log(`   WebP total:      ${(totalWebp / 1024 / 1024).toFixed(1)} MB (-${((1 - totalWebp/totalOriginal)*100).toFixed(0)}%)`);
console.log(`   AVIF total:      ${(totalAvif / 1024 / 1024).toFixed(1)} MB (-${((1 - totalAvif/totalOriginal)*100).toFixed(0)}%)`);
console.log(`\n✅ Done! Images optimized and saved to public/images/\n`);
