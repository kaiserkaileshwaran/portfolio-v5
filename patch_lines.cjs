const fs = require('fs');
let jsx = fs.readFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', 'utf8');

// 1. Remove lines 11 to 14
const oldSubmain2 = `    // Space and Submain 2 opens and closes
    addLine(10, 0, 0, delay); 
    delay += 0.15; // Realistic pause for developer hitting Enter
    
    addLine(11, 1, 2.0, delay);
    addLine(14, 1, 0.5, delay);
    delay += 0.15;

    // Code inside Submain 2 (2 lines)
    addLine(12, 2, 2.2, delay); delay += 0.15;
    addLine(13, 2, 1.6, delay); delay += 0.15;

    // Space and Return statement after both functions
    addLine(15, 0, 0, delay); 
    delay += 0.15; // Realistic pause for developer hitting Enter
    
    addLine(16, 1, 1.2, delay); // return statement
    delay += 0.15;`;

const newSubmain2 = `    // Space and Return statement
    addLine(10, 0, 0, delay); 
    delay += 0.15;
    
    addLine(11, 1, 1.2, delay); // return statement
    delay += 0.15;`;

jsx = jsx.replace(oldSubmain2, newSubmain2);

// 2. Adjust xBase and position.y
jsx = jsx.replace('const xBase = -2.2 + (line.indent * 0.4);', 'const xBase = -1.9 + (line.indent * 0.4);');
jsx = jsx.replace('lineRefs.current[i].position.y = 1.2 - (yIndex * 0.15);', 'lineRefs.current[i].position.y = 1.0 - (yIndex * 0.15);');

fs.writeFileSync('/Users/kailesh/Downloads/website/src/components/ThreeDObject.jsx', jsx);
console.log("AnimatedCodeLines patched!");
