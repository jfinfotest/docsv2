---
title: "Guide 3: Multilingual Project"
position: 3
---

# Guide 3: Multilingual Project (i18n)

Perfect for documentation that needs to be available in multiple languages but doesn't have different product versions.

### 1. Configuration in `constants.ts`

Enable `I18N_CONFIG` and define your languages. Keep `VERSION_CONFIG` disabled.

```typescript
// constants.ts

export const I18N_CONFIG = {
    enabled: true, // Enabled
    defaultLang: 'en',
    languages: [
        { code: 'es', name: 'Español' },
        { code: 'en', name: 'English' },
    ],
};

export const VERSION_CONFIG = {
    enabled: false, // Disabled
    // ...
};
```

### 2. Folder Structure

Create a folder for each language inside `docs/` using its language code.

```bash
docs/
├── assets/
├── file-manifest.json
├── es/
│   ├── index.md
│   └── guia-es.md
└── en/
    ├── index.md
    └── guide-en.md
```

### 3. `file-manifest.json`

The manifest must include all files from all languages.

```json
{
  "files": [
    "es/index.md",
    "es/guia-es.md",
    "en/index.md",
    "en/guide-en.md"
  ]
}
```
