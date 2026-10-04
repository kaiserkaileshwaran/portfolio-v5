const fs = require('fs');
let jsx = fs.readFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', 'utf8');

const startIndex = jsx.indexOf('{/* Native 16:10 Wallpaper Background');
const endIndex = jsx.indexOf('{/* The App Window');

const newBlock = `{/* Native 16:10 Wallpaper Background (Rounded corners to perfectly fit inside the glass bezel!) */}
          <RoundedPlane width={5.7} height={3.72} radius={0.21} position={[0, 1.91, 0.006]}>
            <meshBasicMaterial map={wallpaperTex} toneMapped={false} />
          </RoundedPlane>

          {/* MacBook Air Realistic Camera Notch (Restored, Very Shallow height, flush against screen Z-index) */}
          <group position={[0, 3.74, 0.0061]}>
            <CameraNotch width={0.5} height={0.12} radius={0.03}>
              <meshBasicMaterial color="#000000" />
            </CameraNotch>
            {/* The actual Camera Lens */}
            <mesh position={[0, -0.01, 0.001]}>
              <circleGeometry args={[0.015, 32]} />
              <meshBasicMaterial color="#0a1a2a" />
            </mesh>
            <mesh position={[0, -0.01, 0.002]}>
              <circleGeometry args={[0.006, 16]} />
              <meshBasicMaterial color="#112233" />
            </mesh>
            {/* Camera LED Indicator */}
            <mesh position={[0.08, -0.01, 0.001]}>
              <circleGeometry args={[0.004, 16]} />
              <meshBasicMaterial color="#020202" />
            </mesh>
          </group>
          
          `;

const before = jsx.substring(0, startIndex);
const after = jsx.substring(endIndex);

jsx = before + newBlock + after;
fs.writeFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', jsx);
console.log("Wallpaper rounded and Notch restored!");
