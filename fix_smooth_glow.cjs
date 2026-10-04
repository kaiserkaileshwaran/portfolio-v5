const fs = require('fs');
let jsx = fs.readFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', 'utf8');

// 1. Add isGlowing state and logoMaterialRef
jsx = jsx.replace('const [isOpen, setIsOpen] = useState(false);', 'const [isOpen, setIsOpen] = useState(false);\n  const [isGlowing, setIsGlowing] = useState(false);\n  const logoMaterialRef = React.useRef();');

// 2. Update the timeline effect
const oldEffect = `  useEffect(() => {
    // Wait for 1.5 seconds in Night mode so the user can admire the glowing logo before it opens!
    const lidDelay = theme === 'night' ? 1500 : 300;
    
    const t1 = setTimeout(() => setIsOpen(true), lidDelay);
    const t2 = setTimeout(() => setIsAppOpen(true), lidDelay + 900);
    const t3 = setTimeout(() => setIsTyping(true), lidDelay + 1500);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2); 
      clearTimeout(t3);
    };
  }, []);`;

const newEffect = `  useEffect(() => {
    let timers = [];
    if (theme === 'night') {
      // Smooth cinematic timeline for Night (within 2s max delay before open)
      timers.push(setTimeout(() => setIsGlowing(true), 200)); // Start smooth glow
      timers.push(setTimeout(() => setIsOpen(true), 1500)); // Open after glow finishes
      timers.push(setTimeout(() => setIsAppOpen(true), 2300));
      timers.push(setTimeout(() => setIsTyping(true), 2800));
    } else {
      // Daytime fast timeline
      timers.push(setTimeout(() => setIsOpen(true), 300));
      timers.push(setTimeout(() => setIsAppOpen(true), 1200));
      timers.push(setTimeout(() => setIsTyping(true), 1800));
    }
    
    return () => timers.forEach(clearTimeout);
  }, []);`;

jsx = jsx.replace(oldEffect, newEffect);

// 3. Update the useFrame logic to include the glow lerp and make the lid open smoother
const oldUseFrame = `  useFrame((state) => {
    if (!screenRef.current) return;
    const targetAngle = isOpen ? Math.PI / 2 : 0;
    screenRef.current.rotation.x = THREE.MathUtils.lerp(screenRef.current.rotation.x, targetAngle, 0.08);
  });`;

const newUseFrame = `  useFrame((state) => {
    if (screenRef.current) {
      const targetAngle = isOpen ? Math.PI / 2 : 0;
      // Made lerp slightly smaller (0.05) for a smoother, less instantaneous mechanical open
      screenRef.current.rotation.x = THREE.MathUtils.lerp(screenRef.current.rotation.x, targetAngle, 0.05);
    }
    
    if (logoMaterialRef.current && theme === 'night') {
      // Smoothly animate the glowing effect (fades in)
      const targetGlow = isGlowing ? 2.5 : 0;
      logoMaterialRef.current.emissiveIntensity = THREE.MathUtils.lerp(logoMaterialRef.current.emissiveIntensity, targetGlow, 0.08);
    }
  });`;

jsx = jsx.replace(oldUseFrame, newUseFrame);

// 4. Attach the ref and set the initial emissiveIntensity to 0
const oldLogoMaterial = `<meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2.5} depthTest={false} />`;
const newLogoMaterial = `<meshStandardMaterial ref={logoMaterialRef} color="#ffffff" emissive="#ffffff" emissiveIntensity={0} depthTest={false} />`;

jsx = jsx.replace(oldLogoMaterial, newLogoMaterial);

fs.writeFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', jsx);
console.log("Smooth glow patched!");
