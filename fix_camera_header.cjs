const fs = require('fs');
let jsx = fs.readFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', 'utf8');

// 1. Fix Camera Lens (make it visible, glassy, slightly larger)
const oldCamera = `{/* The actual Camera Lens */}
            <mesh position={[0, -0.01, 0.001]}>
              <circleGeometry args={[0.015, 32]} />
              <meshBasicMaterial color="#0a1a2a" />
            </mesh>
            <mesh position={[0, -0.01, 0.002]}>
              <circleGeometry args={[0.006, 16]} />
              <meshBasicMaterial color="#112233" />
            </mesh>`;

const newCamera = `{/* The actual Camera Lens (Glassy, visible) */}
            <mesh position={[0, -0.01, 0.001]}>
              <circleGeometry args={[0.02, 32]} />
              <meshStandardMaterial color="#0a2a4a" roughness={0.1} metalness={0.9} />
            </mesh>
            <mesh position={[0, -0.01, 0.002]}>
              <circleGeometry args={[0.01, 16]} />
              <meshBasicMaterial color="#1a4a7a" />
            </mesh>`;

jsx = jsx.replace(oldCamera, newCamera);


// 2. Reduce App Window Header Space
const oldHeader = `{/* Window Top Bar (Top edge 1.395, height 0.2, center 1.295) */}
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
            </mesh>`;

const newHeader = `{/* Window Top Bar (Top edge 1.395, height 0.12, center 1.335) */}
            <RoundedPlane width={4.275} height={0.12} radius={0.06} position={[0, 1.335, 0.001]}>
              <meshBasicMaterial color={theme === 'night' ? "#161b22" : "#d1d5db"} />
            </RoundedPlane>
            
            {/* Mac Traffic Light Buttons (Scaled down and moved up) */}
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

jsx = jsx.replace(oldHeader, newHeader);

fs.writeFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', jsx);
console.log("Camera and Header patched!");
