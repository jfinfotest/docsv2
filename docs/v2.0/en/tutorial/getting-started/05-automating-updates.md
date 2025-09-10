---
title: "Automating Updates"
position: 5
---

# Automating Manifest Updates

When working in `local` mode, the application relies on the `docs/file-manifest.json` file to know which documentation files exist. Manually keeping this file updated can be tedious and error-prone, especially in large projects.

To solve this, we've included a script that automatically scans your `docs/` directory and updates the `file-manifest.json` for you.

## `package.json`

To use the script, we've added a `package.json` file to the root of your project with the following command:

```json
{
  "scripts": {
    "update-manifest": "node scripts/update-manifest.js"
  }
}
```

## How to Use It

Whenever you **add, remove, or rename** a Markdown file or folder within your `docs/` directory, simply run the following command in your terminal from the project root:

```bash
npm run update-manifest
```

This command will execute the `scripts/update-manifest.js` script, which will rebuild the manifest with the current file structure.

> **Note:** If this is your first time running an `npm` command, you might need to run `npm install` first to ensure your local environment is set up.
