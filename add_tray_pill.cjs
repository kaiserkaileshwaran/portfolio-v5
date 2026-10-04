const fs = require('fs');
let jsx = fs.readFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', 'utf8');

const cameraNotchIndex = jsx.indexOf('{/* MacBook Air Realistic Camera Notch');

const trayPill = `{/* macOS System Tray (Glass Morphism Pill on Right Side) */}
          <group position={[2.1, 3.73, 0.007]}>
            <RoundedPlane width={0.8} height={0.12} radius={0.06} position={[0, 0, 0]}>
              <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
            </RoundedPlane>
            {/* Functional feature lines (representing battery/wifi/clock) */}
            <mesh position={[-0.2, 0, 0.001]}>
              <planeGeometry args={[0.1, 0.02]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
            </mesh>
            <mesh position={[0.0, 0, 0.001]}>
              <planeGeometry args={[0.15, 0.02]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
            </mesh>
            <mesh position={[0.25, 0, 0.001]}>
              <planeGeometry args={[0.1, 0.04]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
            </mesh>
          </group>

          `;

const before = jsx.substring(0, cameraNotchIndex);
const after = jsx.substring(cameraNotchIndex);

jsx = before + trayPill + after;

fs.writeFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', jsx);
console.log("Tray pill added!");
