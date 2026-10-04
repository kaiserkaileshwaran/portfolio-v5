const fs = require('fs');
let css = fs.readFileSync('/Users/kailesh/Downloads/website/src/main.css', 'utf8');
const searchStr = '/* Added to ensure text is readable over the 3D laptop background */';
if (css.includes(searchStr)) {
  css = css.substring(0, css.indexOf(searchStr));
  fs.writeFileSync('/Users/kailesh/Downloads/website/src/main.css', css);
  console.log("Reverted CSS hack.");
}
