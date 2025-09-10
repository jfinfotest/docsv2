---
title: "Guide 2: Versioned Project"
position: 2
---

# Guide 2: Versioned Project

Use this setup if your product has multiple versions and you need to maintain documentation for each one.

### 1. Configuration in `constants.ts`

Enable `VERSION_CONFIG` and define your versions. Keep `I18N_CONFIG` disabled.

```typescript
// constants.ts

export const I18N_CONFIG = {
    enabled: false, // Disabled
    // ...
};

export const VERSION_CONFIG = {
    enabled: true,  // Enabled
    defaultVersion: 'v2.0',
    versions: ['v2.0', 'v1.0'], // The first is the most recent
};
```

### 2. Folder Structure

Create a folder for each version inside `docs/`. Within each version folder, the structure is the same as a basic project.

```bash
docs/
├── assets/
├── file-manifest.json
├── v1.0/
│   ├── index.md
│   └── v1-guide.md
└── v2.0/
    ├── index.md
    ├── v2-guide.md
    └── new-features/
        └── index.md
```
- `v1.0/index.md`: Homepage for version 1.0.

### 3. `file-manifest.json`

The manifest must list **all** files from **all** versions. The application will filter the correct files based on the version selected by the user.

```json
{
  "files": [
    "v1.0/index.md",
    "v1.0/v1-guide.md",
    "v2.0/index.md",
    "v2.0/v2-guide.md",
    "v2.0/new-features/index.md"
  ]
}
```
