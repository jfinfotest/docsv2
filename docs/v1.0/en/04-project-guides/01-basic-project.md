---
title: "Guide: Basic Project"
position: 1
---

# Guide: Basic Project

Ideal for simple documentation that needs neither versions nor languages.

### 1. `constants.ts`
Disable both features.
```typescript
export const I18N_CONFIG = { enabled: false, /*...*/ };
export const VERSION_CONFIG = { enabled: false, /*...*/ };
```

### 2. Folder Structure
```bash
docs/
├── file-manifest.json
├── index.md
└── guide.md
```

### 3. `file-manifest.json`
```json
{
  "files": [
    "index.md",
    "guide.md"
  ]
}
```
