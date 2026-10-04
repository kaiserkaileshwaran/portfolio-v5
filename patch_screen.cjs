const fs = require('fs');
let jsx = fs.readFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', 'utf8');

// 1. Add useTexture to drei imports
if (!jsx.includes('useTexture')) {
  jsx = jsx.replace('Environment, ContactShadows}', 'Environment, ContactShadows, useTexture}');
}

// 2. Add isAppOpen state and animation timeline
if (!jsx.includes('const [isAppOpen, setIsAppOpen] = useState(false);')) {
  jsx = jsx.replace(
    'const [isTyping, setIsTyping] = useState(false);',
    'const [isTyping, setIsTyping] = useState(false);\n  const [isAppOpen, setIsAppOpen] = useState(false);'
  );
  
  jsx = jsx.replace(
    'const t2 = setTimeout(() => setIsTyping(true), 1000);',
    'const t2 = setTimeout(() => setIsAppOpen(true), 1200);\n    const t3 = setTimeout(() => setIsTyping(true), 1800);'
  );
  
  jsx = jsx.replace('clearTimeout(t2);', 'clearTimeout(t2); \n      clearTimeout(t3);');
}

// 3. Add App Window scale animation state
if (!jsx.includes('const appScale = useRef(0);')) {
  jsx = jsx.replace(
    'const scrollRef = useRef(0);',
    'const scrollRef = useRef(0);\n  const appScale = useRef(0);'
  );
  
  jsx = jsx.replace(
    'if (groupRef.current) {',
    `// Spring animation for App Window
    if (isAppOpen) {
      appScale.current = THREE.MathUtils.lerp(appScale.current, 1.0, delta * 8.0);
    } else {
      appScale.current = 0;
    }
    
    if (groupRef.current) {`
  );
}

// 4. Update the Screen section to fix Z-fighting and add Wallpaper + App Window
const oldDisplayStart = '{/* MacBook Air Realistic Camera Notch';
const oldDisplayEnd = '</group>\n\n        </group>'; // right before Float

const newScreenBlock = `{/* ================= SCREEN ================= */}
        {/* Hinge Pivot Point at Z=-2.0. Y is 0.05 to perfectly seal the gap when closed */}
        <group ref={screenRef} position={[0, 0.05, -2]} rotation={[Math.PI / 2, 0, 0]}>
          
          {/* Aluminum Screen Casing */}
          <RoundedChassis width={5.8} height={4.0} depth={0.06} radius={0.25} position={[0, 2.0, -0.03]}>
            <meshStandardMaterial map={casingTexture} metalness={0.7} roughness={0.25} color="#ffffff" />
          </RoundedChassis>

          {/* Developer Logo */}
          <Text position={[0, 2.0, -0.071]} rotation={[0, Math.PI, 0]} fontSize={0.8} color="#ffffff" anchorX="center" anchorY="middle">
            {'</>'}
            <meshBasicMaterial color="#ffffff" transparent={false} depthTest={false} />
          </Text>
          
          {/* Edge-to-Edge Black Glass Bezel */}
          <RoundedPlane width={5.76} height={3.96} radius={0.24} position={[0, 2.0, 0.005]}>
            <meshStandardMaterial color="#000000" metalness={1} roughness={0} />
          </RoundedPlane>

          {/* Wallpaper Background (Z=0.006) */}
          <mesh position={[0, 2.0, 0.006]}>
            <planeGeometry args={[5.7, 3.9]} />
            <meshBasicMaterial map={useTexture('/images/wallpaper.png')} toneMapped={false} />
          </mesh>

          {/* MacOS Top Menu Bar (Translucent glass over wallpaper) */}
          <mesh position={[0, 3.85, 0.007]}>
            <planeGeometry args={[5.7, 0.2]} />
            <meshBasicMaterial color="#000000" transparent opacity={0.3} />
          </mesh>

          {/* MacBook Air Realistic Camera Notch (Z=0.009 to prevent any Z-fighting!) */}
          <group position={[0, 3.865, 0.009]}>
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
          {/* Z=0.0075 to be above wallpaper but below notch */}
          <group position={[0, 1.95, 0.0075]} scale={appScale.current}>
            
            {/* Window Background */}
            <mesh position={[0, 0, 0]}>
              <planeGeometry args={[4.275, 2.925]} />
              <meshBasicMaterial color={theme === 'night' ? "#050505" : "#e5e7eb"} />
            </mesh>

            {/* Window Top Bar */}
            <mesh position={[0, 1.3625, 0.001]}>
              <planeGeometry args={[4.275, 0.2]} />
              <meshBasicMaterial color={theme === 'night' ? "#161b22" : "#d1d5db"} />
            </mesh>
            
            {/* Mac Traffic Light Buttons on the Window */}
            <mesh position={[-1.9, 1.3625, 0.002]}>
              <circleGeometry args={[0.035, 16]} />
              <meshBasicMaterial color="#ff5f56" />
            </mesh>
            <mesh position={[-1.75, 1.3625, 0.002]}>
              <circleGeometry args={[0.035, 16]} />
              <meshBasicMaterial color="#ffbd2e" />
            </mesh>
            <mesh position={[-1.6, 1.3625, 0.002]}>
              <circleGeometry args={[0.035, 16]} />
              <meshBasicMaterial color="#27c93f" />
            </mesh>

            {/* Typing Code Animation inside the App Window */}
            <group position={[0, 0.1, 0.002]}>
              <AnimatedCodeLines color={config.codeColor} isTyping={isTyping} />
            </group>

          </group>

        </group>`;

// Find the screen block and replace it
const startIndex = jsx.indexOf('{/* ================= SCREEN ================= */}');
const endIndex = jsx.indexOf('</Float>');
if (startIndex !== -1 && endIndex !== -1) {
  const before = jsx.substring(0, startIndex);
  const after = jsx.substring(endIndex - 11); // keep </group>\n      </Float>
  jsx = before + newScreenBlock + '\n' + after;
  fs.writeFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', jsx);
  console.log("Screen patched!");
} else {
  console.log("Could not find screen block boundaries.");
}
