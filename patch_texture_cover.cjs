const fs = require('fs');
let jsx = fs.readFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', 'utf8');

const hookFix = `  const wallpaperTex = useTexture('/images/wallpaper.png');
  wallpaperTex.colorSpace = THREE.SRGBColorSpace;
  // Apply object-fit: cover logic to prevent stretching
  const screenRatio = 5.7 / 3.9; 
  const imageRatio = 1.6; 
  if (imageRatio > screenRatio) {
    const scaleX = screenRatio / imageRatio;
    wallpaperTex.repeat.set(scaleX, 1);
    wallpaperTex.offset.set((1 - scaleX) / 2, 0);
  } else {
    const scaleY = imageRatio / screenRatio;
    wallpaperTex.repeat.set(1, scaleY);
    wallpaperTex.offset.set(0, (1 - scaleY) / 2);
  }`;

jsx = jsx.replace(/const wallpaperTex = useTexture\('\/images\/wallpaper\.png'\);\n  wallpaperTex\.colorSpace = THREE\.SRGBColorSpace;/, hookFix);

fs.writeFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', jsx);
console.log("Texture cover logic added!");
