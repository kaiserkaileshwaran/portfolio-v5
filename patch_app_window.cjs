const fs = require('fs');
let jsx = fs.readFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', 'utf8');

// 1. Z-index fixes for notch
jsx = jsx.replace('<group position={[0, 3.74, 0.0061]}>', '<group position={[0, 3.74, 0.007]}>');

// 2. Fix App Window code to use RoundedPlane and fix Z-fighting
const startIndex = jsx.indexOf('{/* The App Window');
const endIndex = jsx.indexOf('{/* Typing Code Animation inside the App Window */}');

const newBlock = `{/* The App Window */}
          <group ref={appWindowRef} position={[0, 1.91, 0.01]} scale={0}>
            
            {/* Window Background */}
            <RoundedPlane width={4.275} height={2.79} radius={0.06} position={[0, 0, 0]}>
              <meshBasicMaterial color={theme === 'night' ? "#050505" : "#e5e7eb"} />
            </RoundedPlane>

            {/* Window Top Bar (Top edge 1.395, height 0.2, center 1.295) */}
            {/* Using a RoundedPlane here so it doesn't clip out of the top rounded corners! */}
            <RoundedPlane width={4.275} height={0.2} radius={0.06} position={[0, 1.295, 0.001]}>
              <meshBasicMaterial color={theme === 'night' ? "#161b22" : "#d1d5db"} />
            </RoundedPlane>
            
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

            `;

const before = jsx.substring(0, startIndex);
const after = jsx.substring(endIndex);

jsx = before + newBlock + after;
fs.writeFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', jsx);
console.log("App window corners rounded!");
