---
title: "I18n and Versioning"
position: 4
---

# Internationalization (i18n) and Versioning

Easily manage multiple languages and versions of your documentation.

## Configuration in `constants.ts`

Enable and configure these features in `constants.ts`:

```typescript
// For languages
export const I18N_CONFIG = {
    enabled: true,
    defaultLang: 'en',
    languages: [{ code: 'es', name: 'Español' }, { code: 'en', name: 'English' }],
};

// For versions
export const VERSION_CONFIG = {
    enabled: true,
    defaultVersion: 'v1.0',
    versions: ['v1.0', 'v2.0'],
};
```

## Folder Structure

The structure of your files in `docs/` must follow the pattern `version/language/file.md` if both options are enabled.

**Example:**
```bash
docs/
├── v1.0/
│   ├── es/
│   │   └── introduccion.md
│   └── en/
│       └── introduction.md
└── v2.0/
    ├── es/
    │   └── introduccion.md
    └── en/
        └── introduction.md
```
