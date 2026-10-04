const fs = require('fs');
let jsx = fs.readFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', 'utf8');

// 1. Add appWindowRef
jsx = jsx.replace(
  'const appScale = useRef(0);',
  'const appScale = useRef(0);\n  const appWindowRef = useRef();'
);

// 2. Update useFrame to apply scale directly to the ref
jsx = jsx.replace(
  `// Spring animation for App Window
    if (isAppOpen) {
      appScale.current = THREE.MathUtils.lerp(appScale.current, 1.0, delta * 8.0);
    } else {
      appScale.current = 0;
    }
    
    if (groupRef.current) {`,
  `// Spring animation for App Window
    if (isAppOpen) {
      appScale.current = THREE.MathUtils.lerp(appScale.current, 1.0, delta * 8.0);
    } else {
      appScale.current = 0;
    }
    
    if (appWindowRef.current) {
      appWindowRef.current.scale.setScalar(appScale.current);
    }
    
    if (groupRef.current) {`
);

// 3. Attach ref to the group and remove the static scale prop
jsx = jsx.replace(
  '<group position={[0, 1.95, 0.0075]} scale={appScale.current}>',
  '<group ref={appWindowRef} position={[0, 1.95, 0.0075]} scale={0}>'
);

fs.writeFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', jsx);
console.log("Animation fixed!");
