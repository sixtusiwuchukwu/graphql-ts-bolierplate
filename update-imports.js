import fs from 'fs';
import path from 'path';

const dir = './dist'; // your output directory

function updateImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Update only local imports
  content = content.replace(/import\s+(.*)\s+from\s+['"](\.\.?.*?)['"]/g, (match, imports, module) => {
    // Add .js if it's not already present
    if (!module.endsWith('.js')) {
      module += '.js';
    }
    return `import ${imports} from '${module}'`;
  });

  fs.writeFileSync(filePath, content);
}

function traverseDir(currentDir) {
  const files = fs.readdirSync(currentDir);
  files.forEach(file => {
    const filePath = path.join(currentDir, file);
    if (fs.statSync(filePath).isDirectory()) {
      traverseDir(filePath);
    } else if (file.endsWith('.js')) { // target only .js files
      updateImports(filePath);
    }
  });
}

// Start traversal
traverseDir(dir);
