const fs = require('fs');
let jsx = fs.readFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', 'utf8');

// 1. Remove the CameraNotch wrapper, leaving only the lenses
jsx = jsx.replace(/<CameraNotch width=\{0\.6\} height=\{0\.15\} radius=\{0\.04\}>\s*<meshBasicMaterial color="#000000" \/>\s*<\/CameraNotch>/, '');

// 2. Make wallpaper fill the screen (Height 3.72, Center 1.91)
jsx = jsx.replace('<mesh position={[0, 1.85, 0.006]}>', '<mesh position={[0, 1.91, 0.006]}>');
jsx = jsx.replace('<planeGeometry args={[5.7, 3.6]} />', '<planeGeometry args={[5.7, 3.72]} />');

// 3. Move App Window to Center 1.91 to match the new screen center
jsx = jsx.replace('<group ref={appWindowRef} position={[0, 1.85, 0.0075]} scale={0}>', '<group ref={appWindowRef} position={[0, 1.91, 0.0075]} scale={0}>');

fs.writeFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', jsx);
console.log("Wallpaper filled and Notch removed!");
