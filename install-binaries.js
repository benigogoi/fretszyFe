// install-binaries.js
import { execSync } from 'child_process';
import fs from 'fs';

console.log('Ensuring native binaries are installed...');

try {
  // Try to directly install the specific binary packages that are causing issues
  execSync('npm install @rollup/rollup-linux-x64-gnu @tailwindcss/oxide-linux-x64-gnu --no-save', {
    stdio: 'inherit'
  });
  
  console.log('Successfully installed native binaries');
} catch (error) {
  console.error('Error installing binaries:', error);
  process.exit(1);
}