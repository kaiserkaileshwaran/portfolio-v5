const fs = require('fs');
let jsx = fs.readFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', 'utf8');

// 1. Fix base height to 3.82 to perfectly match screen
jsx = jsx.replace('<RoundedChassis width={5.8} height={4.0} depth={0.1}', '<RoundedChassis width={5.8} height={3.82} depth={0.1}');

// 2. Fix screenRef Z pivot to -1.91
jsx = jsx.replace('screenRef.current.position.z = -2 - (screenF * 0.8);', 'screenRef.current.position.z = -1.91 - (screenF * 0.8);');
jsx = jsx.replace('<group ref={screenRef} position={[0, 0.05, -2]}', '<group ref={screenRef} position={[0, 0.05, -1.91]}');

// 3. Rebuild the SCREEN block with the exact new measurements for smaller notch and glass menu
const startIndex = jsx.indexOf('{/* ================= SCREEN ================= */}');
const endIndex = jsx.indexOf('</Float>');

const newScreenBlock = `{/* ================= SCREEN ================= */}
        {/* Hinge Pivot Point at Z=-1.91. Y is 0.05 to perfectly seal the gap when closed */}
        <group ref={screenRef} position={[0, 0.05, -1.91]} rotation={[Math.PI / 2, 0, 0]}>
          
          {/* Aluminum Screen Casing (Height 3.82, perfectly matches Base chassis!) */}
          <RoundedChassis width={5.8} height={3.82} depth={0.06} radius={0.25} position={[0, 1.91, -0.03]}>
            <meshStandardMaterial map={casingTexture} metalness={0.7} roughness={0.25} color="#ffffff" />
          </RoundedChassis>

          {/* Authentic MacBook Air Hinge Barrel (Black plastic antenna/vent cover) */}
          <mesh position={[0, 0, -0.03]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.04, 0.04, 4.4, 32]} />
            <meshStandardMaterial color="#111111" roughness={0.8} metalness={0.1} />
          </mesh>

          {/* Developer Logo (Back of Screen) */}
          <Text position={[0, 1.91, -0.071]} rotation={[0, Math.PI, 0]} fontSize={0.8} color="#ffffff" anchorX="center" anchorY="middle">
            {'</>'}
            <meshBasicMaterial color="#ffffff" transparent={false} depthTest={false} />
          </Text>
          
          {/* Edge-to-Edge Black Glass Bezel (Center 1.91, Height 3.78) */}
          <RoundedPlane width={5.76} height={3.78} radius={0.24} position={[0, 1.91, 0.005]}>
            <meshStandardMaterial color="#000000" metalness={1} roughness={0} />
          </RoundedPlane>

          {/* Native 16:10 Wallpaper Background (Center 1.85, Height 3.6) */}
          <mesh position={[0, 1.85, 0.006]}>
            <planeGeometry args={[5.7, 3.6]} />
            <meshBasicMaterial map={wallpaperTex} toneMapped={false} />
          </mesh>

          {/* MacOS Top Menu Bar (Subtle translucent glass over wallpaper, Height 0.15, Center 3.725) */}
          <mesh position={[0, 3.725, 0.007]}>
            <planeGeometry args={[5.7, 0.15]} />
            <meshBasicMaterial color={theme === 'night' ? "#000000" : "#ffffff"} transparent opacity={0.15} />
          </mesh>

          {/* MacBook Air Realistic Camera Notch (Smaller, Height 0.15, Center 3.725) */}
          <group position={[0, 3.725, 0.009]}>
            <CameraNotch width={0.6} height={0.15} radius={0.04}>
              <meshBasicMaterial color="#000000" />
            </CameraNotch>
            {/* The actual Camera Lens */}
            <mesh position={[0, -0.01, 0.001]}>
              <circleGeometry args={[0.02, 32]} />
              <meshBasicMaterial color="#0a1a2a" />
            </mesh>
            <mesh position={[0, -0.01, 0.002]}>
              <circleGeometry args={[0.008, 16]} />
              <meshBasicMaterial color="#112233" />
            </mesh>
            {/* Camera LED Indicator */}
            <mesh position={[0.1, -0.01, 0.001]}>
              <circleGeometry args={[0.006, 16]} />
              <meshBasicMaterial color="#020202" />
            </mesh>
          </group>
          
          {/* The App Window (Centered vertically in the display area 1.85) */}
          <group ref={appWindowRef} position={[0, 1.85, 0.0075]} scale={0}>
            
            {/* Window Background */}
            <mesh position={[0, 0, 0]}>
              <planeGeometry args={[4.275, 2.79]} />
              <meshBasicMaterial color={theme === 'night' ? "#050505" : "#e5e7eb"} />
            </mesh>

            {/* Window Top Bar (Top edge 1.395, height 0.2, center 1.295) */}
            <mesh position={[0, 1.295, 0.001]}>
              <planeGeometry args={[4.275, 0.2]} />
              <meshBasicMaterial color={theme === 'night' ? "#161b22" : "#d1d5db"} />
            </mesh>
            
            {/* Mac Traffic Light Buttons */}
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

fs.writeFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', jsx);
console.log("V3 patch applied!");
