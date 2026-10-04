const fs = require('fs');
let jsx = fs.readFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', 'utf8');

// 1. Fix Traffic Lights spacing (move closer to the left edge)
const oldTrafficLights = `{/* Mac Traffic Light Buttons (Scaled down and moved up) */}
            <mesh position={[-1.9, 1.335, 0.002]}>
              <circleGeometry args={[0.025, 16]} />
              <meshBasicMaterial color="#ff5f56" />
            </mesh>
            <mesh position={[-1.75, 1.335, 0.002]}>
              <circleGeometry args={[0.025, 16]} />
              <meshBasicMaterial color="#ffbd2e" />
            </mesh>
            <mesh position={[-1.6, 1.335, 0.002]}>
              <circleGeometry args={[0.025, 16]} />
              <meshBasicMaterial color="#27c93f" />
            </mesh>`;

const newTrafficLights = `{/* Mac Traffic Light Buttons (Moved tight to the left edge) */}
            <mesh position={[-2.05, 1.335, 0.002]}>
              <circleGeometry args={[0.025, 16]} />
              <meshBasicMaterial color="#ff5f56" />
            </mesh>
            <mesh position={[-1.95, 1.335, 0.002]}>
              <circleGeometry args={[0.025, 16]} />
              <meshBasicMaterial color="#ffbd2e" />
            </mesh>
            <mesh position={[-1.85, 1.335, 0.002]}>
              <circleGeometry args={[0.025, 16]} />
              <meshBasicMaterial color="#27c93f" />
            </mesh>`;

jsx = jsx.replace(oldTrafficLights, newTrafficLights);

// 2. Fix the Logo visibility on the back of the screen
const oldLogo = `{/* Developer Logo (Back of Screen) */}
          <Text position={[0, 1.91, -0.071]} rotation={[0, Math.PI, 0]} fontSize={0.8} color="#ffffff" anchorX="center" anchorY="middle">
            {'</>'}
            <meshBasicMaterial color="#ffffff" transparent={false} depthTest={false} />
          </Text>`;

const newLogo = `{/* Developer Logo (Back of Screen - highly polished dark chrome mirror finish to prevent washout) */}
          <Text position={[0, 1.91, -0.071]} rotation={[0, Math.PI, 0]} fontSize={0.8} anchorX="center" anchorY="middle">
            {'</>'}
            <meshStandardMaterial color="#222222" metalness={1.0} roughness={0.1} depthTest={false} />
          </Text>`;

jsx = jsx.replace(oldLogo, newLogo);

// 3. Fix Sunrise Color Density
jsx = jsx.replace('sunrise: { codeColor: "#FFB75E" }', 'sunrise: { codeColor: "#FF5500" }');

fs.writeFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', jsx);
console.log("Details patched!");
