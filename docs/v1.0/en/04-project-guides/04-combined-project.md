---
title: "Guide: Combined Project"
position: 4
---

# Guide: Combined Project

The most comprehensive setup, for multiple versions and languages.

### 1. `constants.ts`
Enable both features.
```typescript
export const I18N_CONFIG = {
    enabled: true,
    defaultLang: 'en',
    languages: [{ code: 'es', name: 'Español' }, { code: 'en', name: 'English' }],
};
export const VERSION_CONFIG = {
    enabled: true,
    defaultVersion: 'v1.0',
    versions: ['v1.0', 'v0.9'],
};
```

### 2. Folder Structure
```bash
docs/
├── v0.9/
│   └── en/
│       └── index.md
└── v1.0/
    ├── es/
    │   └── index.md
    └── en/
        └── index.md
```

### 3. `file-manifest.json`
```json
{
  "files": [
    "v0.9/en/index.md",
    "v1.0/es/index.md",
    "v1.0/en/index.md"
  ]
}
```
