const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (
      entry.isDirectory() &&
      !entry.name.includes('node_modules') &&
      !entry.name.startsWith('.')
    ) {
      walk(fullPath);
    } else if (
      entry.isFile() &&
      (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx'))
    ) {
      checkForAny(fullPath);
    }
  }
}

function checkForAny(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  lines.forEach((line, index) => {
    if (line.includes(': any') || line.includes('<any>')) {
      console.log(`❗ ${filePath}:${index + 1}: ${line.trim()}`);
    }
  });
}

walk(srcDir);