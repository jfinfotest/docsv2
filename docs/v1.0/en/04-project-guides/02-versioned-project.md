---
title: "Guide: Versioned Project"
position: 2
---

# Guide: Versioned Project

For when you need to document multiple versions of your product.

### 1. `constants.ts`
Enable only `VERSION_CONFIG`.
```typescript
export const I18N_CONFIG = { enabled: false, /*...*/ };
export const VERSION_CONFIG = {
    enabled: true,
    defaultVersion: 'v1.0',
    versions: ['v1.0', 'v0.9'],
};
```

### 2. Folder Structure
```bash
docs/
├── file-manifest.json
├── v0.9/
│   └── index.md
└── v1.0/
    └── index.md
```

### 3. `file-manifest.json`
```json
{
  "files": [
    "v0.9/index.md",
    "v1.0/index.md"
  ]
}
```
