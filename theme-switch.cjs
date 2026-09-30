const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  // App Background
  { regex: /bg-\[#090b0e\]/g, replacement: 'bg-slate-50' },
  { regex: /bg-\[#0c0f15\]/g, replacement: 'bg-white' },
  { regex: /bg-\[#07090c\]/g, replacement: 'bg-slate-100' },
  
  // Text Colors
  { regex: /text-slate-100/g, replacement: 'text-slate-900' },
  { regex: /text-slate-200/g, replacement: 'text-slate-800' },
  { regex: /text-slate-300/g, replacement: 'text-slate-700' },
  { regex: /text-slate-400/g, replacement: 'text-slate-600' },
  { regex: /text-slate-500/g, replacement: 'text-slate-500' },
  { regex: /text-white/g, replacement: 'text-slate-900' },
  
  // Background/Borders for subtle elements
  { regex: /bg-white\/5/g, replacement: 'bg-slate-900/5' },
  { regex: /bg-white\/10/g, replacement: 'bg-slate-900/10' },
  { regex: /bg-white\/15/g, replacement: 'bg-slate-900/10' },
  { regex: /bg-white\/\[0\.04\]/g, replacement: 'bg-slate-900/5' },
  { regex: /bg-white\/\[0\.05\]/g, replacement: 'bg-slate-900/5' },
  { regex: /bg-white\/\[0\.06\]/g, replacement: 'bg-slate-900/5' },
  
  { regex: /border-white\/10/g, replacement: 'border-slate-900/10' },
  { regex: /border-white\/20/g, replacement: 'border-slate-900/20' },
  { regex: /border-white\/30/g, replacement: 'border-slate-900/30' },
  { regex: /border-white\/\[0\.06\]/g, replacement: 'border-slate-900/10' },
  { regex: /border-white\/\[0\.08\]/g, replacement: 'border-slate-900/10' },
  
  // Specific Overlays
  { regex: /bg-black\/40/g, replacement: 'bg-white/40' },
  { regex: /bg-black\/20/g, replacement: 'bg-white/20' },
  { regex: /to-\[#090b0e\]/g, replacement: 'to-slate-50' },
  
  // Hover states
  { regex: /hover:text-white/g, replacement: 'hover:text-amber-600' },
  { regex: /hover:text-slate-950/g, replacement: 'hover:text-amber-700' },
  { regex: /hover:bg-white\/10/g, replacement: 'hover:bg-slate-900/10' },
  
  // Fix specific contrast issues
  { regex: /text-amber-300/g, replacement: 'text-amber-600' },
  { regex: /text-amber-400/g, replacement: 'text-amber-600' },
  { regex: /text-emerald-400/g, replacement: 'text-emerald-600' },
  { regex: /text-emerald-300/g, replacement: 'text-emerald-600' },
  { regex: /text-cyan-400/g, replacement: 'text-cyan-600' },
  
  { regex: /border-amber-500\/30/g, replacement: 'border-amber-600/30' },
  { regex: /bg-amber-500\/10/g, replacement: 'bg-amber-600/10' },
  
  // Dark elements that should be light
  { regex: /bg-black\/60/g, replacement: 'bg-white/80' },
  { regex: /bg-black\/70/g, replacement: 'bg-white/80' },
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      processDir(filePath);
    } else if (filePath.endsWith('.jsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      for (const { regex, replacement } of replacements) {
        content = content.replace(regex, replacement);
      }
      
      fs.writeFileSync(filePath, content);
      console.log('Updated:', filePath);
    }
  }
}

processDir(srcDir);
console.log('Theme switch completed.');
