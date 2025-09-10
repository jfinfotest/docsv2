---
title: "Guide 4: Combined Project"
position: 4
---

# Guide 4: Combined Project (Versions & Languages)

This is the most comprehensive and flexible setup, ideal for large projects with a global audience and a product lifecycle with multiple versions.

### 1. Configuration in `constants.ts`

Enable both `VERSION_CONFIG` and `I18N_CONFIG`.

```typescript
// constants.ts

export const I18N_CONFIG = {
    enabled: true,
    defaultLang: 'en',
    languages: [
        { code: 'es', name: 'Español' },
        { code: 'en', name: 'English' },
    ],
};

export const VERSION_CONFIG = {
    enabled: true,
    defaultVersion: 'v2.0',
    versions: ['v2.0', 'v1.0'],
};
```

### 2. Folder Structure

The nested structure is crucial. The first level is the **version**, and the second level is the **language**.

```bash
docs/
├── assets/
├── file-manifest.json
├── v1.0/
│   ├── es/
│   │   ├── index.md
│   │   └── guide-v1-es.md
│   └── en/
│       ├── index.md
│       └── guide-v1-en.md
└── v2.0/
    ├── es/
    │   ├── index.md
    │   └── guide-v2-es.md
    └── en/
        ├── index.md
        └── guide-v2-en.md
```

### 3. `file-manifest.json`

Once again, the manifest must contain the paths to **all** Markdown files from all version and language combinations.

```json
{
  "files": [
    "v1.0/es/index.md",
    "v1.0/es/guide-v1-es.md",
    "v1.0/en/index.md",
    "v1.0/en/guide-v1-en.md",
    "v2.0/es/index.md",
    "v2.0/es/guide-v2-es.md",
    "v2.0/en/index.md",
    "v2.0/en/guide-v2-en.md"
  ]
}
```
