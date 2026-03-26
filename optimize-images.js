import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inputDir = './public/images'; // Donde pones tus fotos pesadas
const outputDir = './public/img'; // Donde irán las optimizadas

// Crear carpeta de salida si no existe
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdirSync(inputDir).forEach(file => {
    const fileName = path.parse(file).name;
    const inputPath = path.join(inputDir, file);

    // 1. Convertir a WebP (Calidad profesional 80%)
    sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(path.join(outputDir, `${fileName}.webp`))
        .then(() => console.log(`✓ ${file} optimizada a WebP`));

    // 2. Opcional: Crear una versión pequeña para móviles
    sharp(inputPath)
        .resize(600) // 600px de ancho para móviles
        .webp({ quality: 70 })
        .toFile(path.join(outputDir, `${fileName}-mobile.webp`));
});