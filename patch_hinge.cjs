const fs = require('fs');
let jsx = fs.readFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', 'utf8');

const hingeJSX = `
          {/* Authentic MacBook Hinge Barrel (Black antenna/vent cover) */}
          <mesh position={[0, 0, -0.03]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.04, 0.04, 4.2, 32]} />
            <meshStandardMaterial color="#111111" roughness={0.8} metalness={0.1} />
          </mesh>
`;

// Insert it right after the aluminum screen casing
jsx = jsx.replace('</RoundedChassis>', '</RoundedChassis>\n' + hingeJSX);

fs.writeFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', jsx);
console.log("Hinge added!");
