const fs = require('fs');
let jsx = fs.readFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', 'utf8');

// 1. Fix the logo to always glow at night (so it glows while closed!)
jsx = jsx.replace('emissiveIntensity={isOpen ? 2.0 : 0}', 'emissiveIntensity={2.5}'); // bumped to 2.5 for an even better bloom

// 2. Add the dynamic delay for Nighttime
const oldEffect = `  useEffect(() => {
    const t1 = setTimeout(() => setIsOpen(true), 300);
    const t2 = setTimeout(() => setIsAppOpen(true), 1200);
    const t3 = setTimeout(() => setIsTyping(true), 1800);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2); 
      clearTimeout(t3);
    };
  }, []);`;

const newEffect = `  useEffect(() => {
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

jsx = jsx.replace(oldEffect, newEffect);

fs.writeFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', jsx);
console.log("Nighttime delay patched!");
