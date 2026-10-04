const fs = require('fs');
let jsx = fs.readFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', 'utf8');

// 1. Fix Keys scroll lag
const oldKeys = `      mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, targetY, delta * 15.0);
      mesh.position.x = keys[i].x;
      mesh.position.z = keys[i].z;
      mesh.rotation.set(0, 0, 0);`;

const newKeys = `      if (keysFactor > 0.001) {
        // Scroll physics: absolute 1:1 responsiveness, no smoothing!
        mesh.position.y = targetY;
      } else {
        // Hover physics: smooth lerp
        mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, targetY, delta * 15.0);
      }
      mesh.position.x = keys[i].x;
      mesh.position.z = keys[i].z;
      mesh.rotation.set(0, 0, 0);`;

jsx = jsx.replace(oldKeys, newKeys);

// 2. Fix Screen scroll lag while preserving smooth opening
const oldScreenFrame = `    if (screenRef.current) {
      const targetRotation = isOpen ? -0.15 : Math.PI / 2; 
      const explodeRot = targetRotation - (screenF * 0.5);
      
      screenRef.current.rotation.x = THREE.MathUtils.lerp(
        screenRef.current.rotation.x,
        explodeRot,
        Math.min(1.0, delta * 5.0) 
      );
      
      screenRef.current.position.y = 0.05 + (screenF * 1.5);
      screenRef.current.position.z = -1.91 - (screenF * 0.8);
    }`;

const newScreenFrame = `    if (screenRef.current) {
      // Smoothly animate the base open/close state (time-based)
      if (!screenRef.current.openProgress) screenRef.current.openProgress = 0;
      screenRef.current.openProgress = THREE.MathUtils.lerp(screenRef.current.openProgress, isOpen ? 1 : 0, 0.05);
      
      const targetRotation = THREE.MathUtils.lerp(Math.PI / 2, -0.15, screenRef.current.openProgress);
      
      // Apply exact 1:1 scroll physics on top of the base rotation!
      screenRef.current.rotation.x = targetRotation - (screenF * 0.5);
      
      screenRef.current.position.y = 0.05 + (screenF * 1.5);
      screenRef.current.position.z = -1.91 - (screenF * 0.8);
    }`;

jsx = jsx.replace(oldScreenFrame, newScreenFrame);

fs.writeFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', jsx);
console.log("Scroll physics patched!");
