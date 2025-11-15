const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create res folder structure if it doesn't exist
const resPath = path.join(__dirname, 'android', 'app', 'src', 'main', 'res');

const mipmapDirs = [
  'mipmap-mdpi',
  'mipmap-hdpi',
  'mipmap-xhdpi',
  'mipmap-xxhdpi',
  'mipmap-xxxhdpi'
];

// Create directories
mipmapDirs.forEach(dir => {
  const dirPath = path.join(resPath, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created: ${dirPath}`);
  }
});

console.log('Icon directories created successfully!');
console.log('Now run: npx expo prebuild --skip-dependency-update android');
