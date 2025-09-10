// scripts/update-manifest.js
const fs = require('fs');
const path = require('path');

// Define the root directory for documentation, relative to the project root.
const DOCS_ROOT = 'docs';
const MANIFEST_PATH = path.join(DOCS_ROOT, 'file-manifest.json');

/**
 * Recursively finds all .md files in a directory.
 * @param {string} currentPath - The current directory to search in.
 * @returns {string[]} An array of relative file paths.
 */
function findMarkdownFiles(currentPath) {
  let files = [];
  const entries = fs.readdirSync(currentPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(currentPath, entry.name);
    
    if (entry.isDirectory()) {
      files = files.concat(findMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      // Make the path relative to the DOCS_ROOT directory
      const relativePath = path.relative(DOCS_ROOT, fullPath);
      // Normalize path separators to forward slashes for consistency across OS
      files.push(relativePath.replace(/\\/g, '/'));
    }
  }
  return files;
}

try {
  console.log(`Scanning for Markdown files in '${DOCS_ROOT}'...`);

  const markdownFiles = findMarkdownFiles(DOCS_ROOT);

  const manifestContent = {
    files: markdownFiles.sort(), // Sort for consistent output
  };

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifestContent, null, 2), 'utf8');

  console.log(`✅ Success! Updated '${MANIFEST_PATH}' with ${markdownFiles.length} files.`);
} catch (error) {
  console.error(`❌ Failed to update manifest file: ${error.message}`);
  process.exit(1);
}
