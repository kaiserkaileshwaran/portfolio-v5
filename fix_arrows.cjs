const fs = require('fs');
let jsx = fs.readFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', 'utf8');

const oldCluster = `        if (type === "ARROW_CLUSTER") {
          // Left Arrow (Half Height)
          k.push({
            x: currentX + (1 * u) / 2, z: z + (keyDepth / 4) + (gapZ / 4), w: 1 * u, d: (keyDepth / 2) - (gapZ / 2),
            label: "LEFT_ARROW"
          });
          currentX += (1 * u) + gapX;
          // Up Arrow (Half Height)
          k.push({
            x: currentX + (1 * u) / 2, z: z - (keyDepth / 4) - (gapZ / 4), w: 1 * u, d: (keyDepth / 2) - (gapZ / 2),
            label: "▲"
          });
          // Down Arrow (Half Height)
          k.push({
            x: currentX + (1 * u) / 2, z: z + (keyDepth / 4) + (gapZ / 4), w: 1 * u, d: (keyDepth / 2) - (gapZ / 2),
            label: "▼"
          });
          currentX += (1 * u) + gapX;
          // Right Arrow (Half Height)
          k.push({
            x: currentX + (1 * u) / 2, z: z + (keyDepth / 4) + (gapZ / 4), w: 1 * u, d: (keyDepth / 2) - (gapZ / 2),
            label: "RIGHT_ARROW"
          });
          currentX += (1 * u) + gapX;
        }`;

const newCluster = `        if (type === "ARROW_CLUSTER") {
          const arrowGapZ = 0.008; // Hairline gap
          const arrowD = (keyDepth - arrowGapZ) / 2;
          const upZ = z - (keyDepth / 2) + (arrowD / 2);
          const downZ = z + (keyDepth / 2) - (arrowD / 2);
          
          // Left Arrow (Half Height, aligns with Down Arrow)
          k.push({
            x: currentX + (1 * u) / 2, z: downZ, w: 1 * u, d: arrowD,
            label: "LEFT_ARROW"
          });
          currentX += (1 * u) + gapX;
          // Up Arrow
          k.push({
            x: currentX + (1 * u) / 2, z: upZ, w: 1 * u, d: arrowD,
            label: "▲"
          });
          // Down Arrow
          k.push({
            x: currentX + (1 * u) / 2, z: downZ, w: 1 * u, d: arrowD,
            label: "▼"
          });
          currentX += (1 * u) + gapX;
          // Right Arrow
          k.push({
            x: currentX + (1 * u) / 2, z: downZ, w: 1 * u, d: arrowD,
            label: "RIGHT_ARROW"
          });
          currentX += (1 * u) + gapX;
        }`;

jsx = jsx.replace(oldCluster, newCluster);

fs.writeFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', jsx);
console.log("Arrows patched!");
