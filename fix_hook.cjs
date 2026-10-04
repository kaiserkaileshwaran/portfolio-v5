const fs = require('fs');
let jsx = fs.readFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', 'utf8');

// Add the hook call safely at the top of the component
jsx = jsx.replace(
  'const groupRef = useRef();',
  "const wallpaperTex = useTexture('/images/wallpaper.png');\n  wallpaperTex.colorSpace = THREE.SRGBColorSpace;\n  const groupRef = useRef();"
);

// Replace the inline hook call with the variable
jsx = jsx.replace(
  'map={useTexture(\'/images/wallpaper.png\')}',
  'map={wallpaperTex}'
);

fs.writeFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', jsx);
console.log("Hook fixed!");
