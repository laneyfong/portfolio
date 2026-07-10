import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminWebp from 'imagemin-webp';
import fs from 'fs';
import path from 'path';

const assetsDir = 'src/assets';

// Compress JPEGs
await imagemin(['src/assets/*.jpg'], {
  destination: 'src/assets',
  plugins: [
    imageminMozjpeg({ quality: 75 })
  ]
});

console.log('✓ JPEGs compressed');

// Compress PNGs
await imagemin(['src/assets/*.png'], {
  destination: 'src/assets',
  plugins: [
    imageminPngquant({
      quality: [0.6, 0.8]
    })
  ]
});

console.log('✓ PNGs compressed');

// Create WebP versions
await imagemin(['src/assets/*.{jpg,png}'], {
  destination: 'src/assets',
  plugins: [
    imageminWebp({ quality: 75 })
  ]
});

console.log('✓ WebP versions created');
console.log('Image optimization complete!');
