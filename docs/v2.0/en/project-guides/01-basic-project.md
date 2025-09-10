---
title: "Guide 1: Basic Project"
position: 1
---

# Guide 1: Basic Project (No Versions or Languages)

This is the simplest use case, ideal for documentation that doesn't require multiple versions or translations.

### 1. Configuration in `constants.ts`

Disable both `I18N_CONFIG` and `VERSION_CONFIG`.

```typescript
// constants.ts

export const I18N_CONFIG = {
    enabled: false, // Disabled
    defaultLang: 'en',
    languages: [{ code: 'en', name: 'English' }],
};

export const VERSION_CONFIG = {
    enabled: false, // Disabled
    defaultVersion: 'v1.0',
    versions: ['v1.0'],
};
```

### 2. Folder Structure

Your content files go directly inside the `docs/` folder.

```bash
docs/
├── assets/
│   └── logo.svg
├── file-manifest.json
├── index.md
├── getting-started/
│   ├── index.md
│   └── installation.md
└── components/
    ├── index.md
    └── buttons.md
```
- `index.md`: This is the homepage for your site.
- `getting-started/index.md`: Acts as the main page for the "Getting Started" section.

### 3. `file-manifest.json`

This file is **required** when `DOCS_CONFIG.source` is `'local'`. It must list all the paths to your Markdown files relative to the `docs/` folder.

```json
{
  "files": [
    "index.md",
    "getting-started/index.md",
    "getting-started/installation.md",
    "components/index.md",
    "components/buttons.md"
  ]
}
```
The order does not matter, but every file you want to appear must be listed.
