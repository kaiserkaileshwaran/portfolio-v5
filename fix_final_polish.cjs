const fs = require('fs');
let jsx = fs.readFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', 'utf8');

// 1. Fix Logo (Glossy Aluminum in Day, Glowing in Night when open)
const oldLogo = `{/* Developer Logo (Back of Screen - highly polished dark chrome mirror finish to prevent washout) */}
          <Text position={[0, 1.91, -0.071]} rotation={[0, Math.PI, 0]} fontSize={0.8} anchorX="center" anchorY="middle">
            {'</>'}
            <meshStandardMaterial color="#222222" metalness={1.0} roughness={0.1} depthTest={false} />
          </Text>`;

const newLogo = `{/* Developer Logo (Back of Screen - Glossy aluminum in day, glowing white at night when open!) */}
          <Text position={[0, 1.91, -0.071]} rotation={[0, Math.PI, 0]} fontSize={0.8} anchorX="center" anchorY="middle">
            {'</>'}
            {theme === 'night' ? (
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={isOpen ? 2.0 : 0} depthTest={false} />
            ) : (
              <meshStandardMaterial color="#e0e0e0" metalness={1.0} roughness={0.05} depthTest={false} />
            )}
          </Text>`;

jsx = jsx.replace(oldLogo, newLogo);

// 2. Remove tray icons, restore subtle full-width glass line
const oldTray = `{/* macOS System Tray (Glass Morphism Pill on Right Side) */}
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
          </group>`;

const newTray = `{/* Subtle Full-Width Glass Line (Menu Bar styling without elements) */}
          <mesh position={[0, 3.725, 0.0065]}>
            <planeGeometry args={[5.7, 0.15]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
          </mesh>`;

jsx = jsx.replace(oldTray, newTray);

// 3. Darken wallpaper in Nighttime
const oldWallpaper = `<meshBasicMaterial map={wallpaperTex} toneMapped={false} />`;
const newWallpaper = `<meshBasicMaterial map={wallpaperTex} toneMapped={false} color={theme === 'night' ? "#777777" : "#ffffff"} />`;

jsx = jsx.replace(oldWallpaper, newWallpaper);

fs.writeFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', jsx);
console.log("Final polish patched!");
