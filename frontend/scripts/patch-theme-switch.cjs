const fs = require('fs');
const path = require('path');

const distPath = path.resolve(__dirname, '../node_modules/react-theme-switch-animation/dist/index.js');
const srcPath = path.resolve(__dirname, '../node_modules/react-theme-switch-animation/src/index.ts');

function patchDist() {
  if (!fs.existsSync(distPath)) {
    console.log('[patch-theme-switch] dist/index.js not found, skipping.');
    return;
  }
  let content = fs.readFileSync(distPath, 'utf8');

  // Check if already patched
  if (content.includes('clip-path: circle(')) {
    console.log('[patch-theme-switch] dist/index.js is already patched.');
    return;
  }

  // Target pattern for CIRCLE animation in dist/index.js
  const circleSearch = `if (animationType === ThemeAnimationType.CIRCLE || (animationType === ThemeAnimationType.GIF && !gifUrl)) {`;
  if (!content.includes(circleSearch)) {
    console.warn('[patch-theme-switch] Could not find circle animation block in dist/index.js.');
    return;
  }

  // Find the block and replace styleElement.textContent assignment
  const targetOld = `if (animationType === ThemeAnimationType.CIRCLE || (animationType === ThemeAnimationType.GIF && !gifUrl)) {
                        circleEasing = animationType === ThemeAnimationType.CIRCLE ? easing : 'ease-in-out';
                        finalMaskSize = Math.ceil(maxRadius * 2.1);
                        circleMask = "url('data:image/svg+xml,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"-50 -50 100 100\\"><circle cx=\\"0\\" cy=\\"0\\" r=\\"50\\" fill=\\"white\\"/></svg>')";
                        styleElement = document.createElement('style');
                        styleElement.id = styleId;
                        styleElement.textContent = "\\n        ".concat(pseudoElement, " {\\n          mask: ").concat(circleMask, " 0 0 / 0 no-repeat;\\n          animation: circleReveal ").concat(duration, "ms ease-in-out;\\n          animation: circleReveal ").concat(duration, "ms ").concat(circleEasing, ";\\n          animation-fill-mode: both;\\n          will-change: mask-size, mask-position;\\n        }\\n\\n        @keyframes circleReveal {\\n          from {\\n            mask-size: 0px;\\n            mask-position: ").concat(x, "px ").concat(y, "px;\\n          }\\n          to {\\n            mask-size: ").concat(finalMaskSize, "px;\\n            mask-position: ").concat(x - finalMaskSize / 2, "px ").concat(y - finalMaskSize / 2, "px;\\n          }\\n        }\\n      ");
                        document.head.appendChild(styleElement);
                    }`;

  const replacement = `if (animationType === ThemeAnimationType.CIRCLE || (animationType === ThemeAnimationType.GIF && !gifUrl)) {
                        circleEasing = animationType === ThemeAnimationType.CIRCLE ? easing : 'ease-in-out';
                        finalMaskSize = Math.ceil(maxRadius * 2.1);
                        circleMask = "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%22-50 -50 100 100%22%3E%3Ccircle cx=%220%22 cy=%220%22 r=%2250%22 fill=%22white%22/%3E%3C/svg%3E')";
                        styleElement = document.createElement('style');
                        styleElement.id = styleId;
                        styleElement.textContent = "\\n        ::view-transition-old(root) {\\n          animation: none !important;\\n          z-index: 1 !important;\\n        }\\n\\n        ".concat(pseudoElement, " {\\n          mask: ").concat(circleMask, " 0 0 / 0 no-repeat;\\n          -webkit-mask: ").concat(circleMask, " 0 0 / 0 no-repeat;\\n          animation: circleReveal ").concat(duration, "ms ease-in-out;\\n          animation: circleReveal ").concat(duration, "ms ").concat(circleEasing, " !important;\\n          animation-fill-mode: both !important;\\n          will-change: clip-path, -webkit-clip-path, mask-size, mask-position;\\n          z-index: 9999 !important;\\n        }\\n\\n        @keyframes circleReveal {\\n          from {\\n            clip-path: circle(0px at ").concat(x, "px ").concat(y, "px);\\n            -webkit-clip-path: circle(0px at ").concat(x, "px ").concat(y, "px);\\n            mask-size: 0px;\\n            -webkit-mask-size: 0px;\\n            mask-position: ").concat(x, "px ").concat(y, "px;\\n            -webkit-mask-position: ").concat(x, "px ").concat(y, "px;\\n          }\\n          to {\\n            clip-path: circle(").concat(maxRadius, "px at ").concat(x, "px ").concat(y, "px);\\n            -webkit-clip-path: circle(").concat(maxRadius, "px at ").concat(x, "px ").concat(y, "px);\\n            mask-size: ").concat(finalMaskSize, "px;\\n            -webkit-mask-size: ").concat(finalMaskSize, "px;\\n            mask-position: ").concat(x - finalMaskSize / 2, "px ").concat(y - finalMaskSize / 2, "px;\\n            -webkit-mask-position: ").concat(x - finalMaskSize / 2, "px ").concat(y - finalMaskSize / 2, "px;\\n          }\\n        }\\n      ");
                        document.head.appendChild(styleElement);
                    }`;

  if (content.includes(targetOld)) {
    content = content.replace(targetOld, replacement);
    fs.writeFileSync(distPath, content, 'utf8');
    console.log('[patch-theme-switch] Successfully patched dist/index.js');
  } else {
    // Regex-based fallback replacement if whitespace differs
    const regex = /if\s*\(animationType\s*===\s*ThemeAnimationType\.CIRCLE[\s\S]*?document\.head\.appendChild\(styleElement\);\s*\}/;
    if (regex.test(content)) {
      content = content.replace(regex, replacement);
      fs.writeFileSync(distPath, content, 'utf8');
      console.log('[patch-theme-switch] Successfully patched dist/index.js via regex fallback');
    } else {
      console.error('[patch-theme-switch] Failed to match pattern in dist/index.js');
    }
  }
}

function patchSrc() {
  if (!fs.existsSync(srcPath)) return;
  let content = fs.readFileSync(srcPath, 'utf8');
  if (content.includes('clip-path: circle(')) {
    console.log('[patch-theme-switch] src/index.ts is already patched.');
    return;
  }
  const targetRegex = /if\s*\(animationType\s*===\s*ThemeAnimationType\.CIRCLE[\s\S]*?document\.head\.appendChild\(styleElement\)\s*\}/;
  const replacement = `if (animationType === ThemeAnimationType.CIRCLE || (animationType === ThemeAnimationType.GIF && !gifUrl)) {
      const circleEasing = animationType === ThemeAnimationType.CIRCLE ? easing : 'ease-in-out'
      const finalMaskSize = Math.ceil(maxRadius * 2.1)
      const circleMask = \`url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%22-50 -50 100 100%22%3E%3Ccircle cx=%220%22 cy=%220%22 r=%2250%22 fill=%22white%22/%3E%3C/svg%3E')\`

      const styleElement = document.createElement('style')
      styleElement.id = styleId

      styleElement.textContent = \`
        ::view-transition-old(root) {
          animation: none !important;
          z-index: 1 !important;
        }

        \${pseudoElement} {
          mask: \${circleMask} 0 0 / 0 no-repeat;
          -webkit-mask: \${circleMask} 0 0 / 0 no-repeat;
          animation: circleReveal \${duration}ms ease-in-out;
          animation: circleReveal \${duration}ms \${circleEasing} !important;
          animation-fill-mode: both !important;
          will-change: clip-path, -webkit-clip-path, mask-size, mask-position;
          z-index: 9999 !important;
        }

        @keyframes circleReveal {
          from {
            clip-path: circle(0px at \${x}px \${y}px);
            -webkit-clip-path: circle(0px at \${x}px \${y}px);
            mask-size: 0px;
            -webkit-mask-size: 0px;
            mask-position: \${x}px \${y}px;
            -webkit-mask-position: \${x}px \${y}px;
          }
          to {
            clip-path: circle(\${maxRadius}px at \${x}px \${y}px);
            -webkit-clip-path: circle(\${maxRadius}px at \${x}px \${y}px);
            mask-size: \${finalMaskSize}px;
            -webkit-mask-size: \${finalMaskSize}px;
            mask-position: \${x - finalMaskSize / 2}px \${y - finalMaskSize / 2}px;
            -webkit-mask-position: \${x - finalMaskSize / 2}px \${y - finalMaskSize / 2}px;
          }
        }
      \`
      document.head.appendChild(styleElement)
    }`;

  if (targetRegex.test(content)) {
    content = content.replace(targetRegex, replacement);
    fs.writeFileSync(srcPath, content, 'utf8');
    console.log('[patch-theme-switch] Successfully patched src/index.ts');
  }
}

patchDist();
patchSrc();
