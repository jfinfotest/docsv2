---
title: "Automating Updates"
position: 5
---

# Automating Manifest Updates

To avoid manually editing `docs/file-manifest.json` every time you add or remove a file, you can use a simple script.

## How It Works

We have added a command in your project's `package.json` file. To update the manifest, simply run this command in your terminal:

```bash
npm run update-manifest
```

This command will scan your `docs/` folder for all `.md` files and rewrite the `file-manifest.json` with the updated list.

**Remember to run this command every time you change your file structure!**
