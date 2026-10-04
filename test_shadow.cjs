const fs = require('fs');
let css = fs.readFileSync('/Users/kailesh/Downloads/website/src/main.css', 'utf8');

if (!css.includes('text-shadow-mask')) {
  css += \`
/* Added to ensure text is readable over the 3D laptop background */
p:not(.no-shadow), h1, h2, h3, h4, h5, h6, span.readable-text, li {
  text-shadow: 
    0 0 10px var(--global-bg), 
    0 0 20px var(--global-bg), 
    0 0 30px var(--global-bg),
    0 0 40px var(--global-bg);
}

.theme-card p, .theme-card h3, .theme-card span, .theme-card h4, .theme-card h2, .theme-card li {
  text-shadow: none; /* Cards already have background/blur */
}
\`;
  fs.writeFileSync('/Users/kailesh/Downloads/website/src/main.css', css);
  console.log("Added text shadows!");
}
