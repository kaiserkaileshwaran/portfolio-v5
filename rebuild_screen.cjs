const fs = require('fs');
let jsx = fs.readFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', 'utf8');

const startIndex = jsx.indexOf('{/* ================= SCREEN ================= */}');
const endIndex = jsx.indexOf('</Float>');

const newScreenBlock = `{/* ================= SCREEN ================= */}
        {/* Hinge Pivot Point at Z=-2.0. Y is 0.05 to perfectly seal the gap when closed */}
        <group ref={screenRef} position={[0, 0.05, -2]} rotation={[Math.PI / 2, 0, 0]}>
          
          {/* Aluminum Screen Casing (Height 3.82, perfectly matches 16:10 native ratio) */}
          <RoundedChassis width={5.8} height={3.82} depth={0.06} radius={0.25} position={[0, 1.91, -0.03]}>
            <meshStandardMaterial map={casingTexture} metalness={0.7} roughness={0.25} color="#ffffff" />
          </RoundedChassis>

          {/* Authentic MacBook Air Aluminum Hinge Barrel */}
          <mesh position={[0, 0, -0.03]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.05, 0.05, 4.4, 32]} />
            <meshStandardMaterial map={casingTexture} metalness={0.8} roughness={0.3} color="#e0e0e0" />
          </mesh>

          {/* Developer Logo (Back of Screen) */}
          <Text position={[0, 1.91, -0.071]} rotation={[0, Math.PI, 0]} fontSize={0.8} color="#ffffff" anchorX="center" anchorY="middle">
            {'</>'}
            <meshBasicMaterial color="#ffffff" transparent={false} depthTest={false} />
          </Text>
          
          {/* Edge-to-Edge Black Glass Bezel */}
          <RoundedPlane width={5.76} height={3.78} radius={0.24} position={[0, 1.91, 0.005]}>
            <meshStandardMaterial color="#000000" metalness={1} roughness={0} />
          </RoundedPlane>

          {/* Native 16:10 Wallpaper Background (Z=0.006) */}
          <mesh position={[0, 1.91, 0.006]}>
            <planeGeometry args={[5.7, 3.72]} />
            <meshBasicMaterial map={wallpaperTex} toneMapped={false} />
          </mesh>

          {/* MacOS Top Menu Bar (Translucent glass over wallpaper, spans 3.57 to 3.77) */}
          <mesh position={[0, 3.67, 0.007]}>
            <planeGeometry args={[5.7, 0.2]} />
            <meshBasicMaterial color="#000000" transparent opacity={0.3} />
          </mesh>

          {/* MacBook Air Realistic Camera Notch (Flushes with top bezel 3.8 and hangs to 3.57) */}
          <group position={[0, 3.685, 0.009]}>
            <CameraNotch width={0.9} height={0.23} radius={0.06}>
              <meshBasicMaterial color="#000000" />
            </CameraNotch>
            {/* The actual Camera Lens */}
            <mesh position={[0, -0.01, 0.001]}>
              <circleGeometry args={[0.025, 32]} />
              <meshBasicMaterial color="#0a1a2a" />
            </mesh>
            <mesh position={[0, -0.01, 0.002]}>
              <circleGeometry args={[0.01, 16]} />
              <meshBasicMaterial color="#112233" />
            </mesh>
            {/* Camera LED Indicator (off) */}
            <mesh position={[0.15, -0.01, 0.001]}>
              <circleGeometry args={[0.008, 16]} />
              <meshBasicMaterial color="#020202" />
            </mesh>
          </group>
          
          {/* The App Window (3/4 size, scales up smoothly when opened) */}
          {/* Centered at 1.91, Height 2.79, Width 4.275 */}
          <group ref={appWindowRef} position={[0, 1.91, 0.0075]} scale={0}>
            
            {/* Window Background */}
            <mesh position={[0, 0, 0]}>
              <planeGeometry args={[4.275, 2.79]} />
              <meshBasicMaterial color={theme === 'night' ? "#050505" : "#e5e7eb"} />
            </mesh>

            {/* Window Top Bar (Top edge is 1.395, height 0.2, center 1.295) */}
            <mesh position={[0, 1.295, 0.001]}>
              <planeGeometry args={[4.275, 0.2]} />
              <meshBasicMaterial color={theme === 'night' ? "#161b22" : "#d1d5db"} />
            </mesh>
            
            {/* Mac Traffic Light Buttons on the Window */}
            <mesh position={[-1.9, 1.295, 0.002]}>
              <circleGeometry args={[0.035, 16]} />
              <meshBasicMaterial color="#ff5f56" />
            </mesh>
            <mesh position={[-1.75, 1.295, 0.002]}>
              <circleGeometry args={[0.035, 16]} />
              <meshBasicMaterial color="#ffbd2e" />
            </mesh>
            <mesh position={[-1.6, 1.295, 0.002]}>
              <circleGeometry args={[0.035, 16]} />
              <meshBasicMaterial color="#27c93f" />
            </mesh>

            {/* Typing Code Animation inside the App Window */}
            <group position={[0, 0.1, 0.002]}>
              <AnimatedCodeLines color={config.codeColor} isTyping={isTyping} />
            </group>

          </group>

        </group>`;

const before = jsx.substring(0, startIndex);
const after = jsx.substring(endIndex - 11);
jsx = before + newScreenBlock + '\n' + after;

// Since we fixed the screen ratio physically, we don't need the crazy texture cropping scale logic anymore!
// The screen is natively 16:10.
const hookFix = `  const wallpaperTex = useTexture('/images/wallpaper.png');
  wallpaperTex.colorSpace = THREE.SRGBColorSpace;`;

// Remove the old crazy cropping logic
const regex = /const wallpaperTex = useTexture\('\/images\/wallpaper\.png'\);\n  wallpaperTex\.colorSpace = THREE\.SRGBColorSpace;\n  \/\/ Apply object-fit: cover logic to prevent stretching\n  const screenRatio = 5\.7 \/ 3\.9; \n  const imageRatio = 1\.6; \n  if \(imageRatio > screenRatio\) \{\n    const scaleX = screenRatio \/ imageRatio;\n    wallpaperTex\.repeat\.set\(scaleX, 1\);\n    wallpaperTex\.offset\.set\(\(1 - scaleX\) \/ 2, 0\);\n  \} else \{\n    const scaleY = imageRatio \/ screenRatio;\n    wallpaperTex\.repeat\.set\(1, scaleY\);\n    wallpaperTex\.offset\.set\(0, \(1 - scaleY\) \/ 2\);\n  \}/g;

jsx = jsx.replace(regex, hookFix);

fs.writeFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', jsx);
console.log("Screen ratio and hinge rebuilt!");
