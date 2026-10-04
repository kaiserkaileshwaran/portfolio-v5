const fs = require('fs');
let jsx = fs.readFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', 'utf8');

const menuBarCode = `          {/* MacOS Top Menu Bar (Subtle translucent glass over wallpaper, Height 0.15, Center 3.725) */}
          <mesh position={[0, 3.725, 0.007]}>
            <planeGeometry args={[5.7, 0.15]} />
            <meshBasicMaterial color={theme === 'night' ? "#000000" : "#ffffff"} transparent opacity={0.15} />
          </mesh>`;

jsx = jsx.replace(menuBarCode, '');

fs.writeFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', jsx);
console.log("Menu bar removed!");
