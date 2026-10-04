const fs = require('fs');
let jsx = fs.readFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', 'utf8');

const oldRoundedPlane = `const RoundedPlane = React.forwardRef(({ width, height, radius, ...props }, ref) => {
  const shape = React.useMemo(() => {`;

const newRoundedPlane = `const RoundedPlane = React.forwardRef(({ width, height, radius, ...props }, ref) => {
  const geomRef = React.useRef();
  
  React.useEffect(() => {
    if (geomRef.current) {
      const pos = geomRef.current.attributes.position;
      const uvs = new Float32Array(pos.count * 2);
      for (let i = 0; i < pos.count; i++) {
        uvs[i * 2] = (pos.getX(i) + width / 2) / width;
        uvs[i * 2 + 1] = (pos.getY(i) + height / 2) / height;
      }
      geomRef.current.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
      geomRef.current.attributes.uv.needsUpdate = true;
    }
  }, [width, height, radius]);

  const shape = React.useMemo(() => {`;

jsx = jsx.replace(oldRoundedPlane, newRoundedPlane);

// Add geomRef to shapeGeometry
jsx = jsx.replace('<shapeGeometry args={[shape]} />', '<shapeGeometry args={[shape]} ref={geomRef} />');

fs.writeFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', jsx);
console.log("RoundedPlane UVs fixed!");
