---
title: "Guía: Proyecto Multilingüe"
position: 3
---

# Guía: Proyecto Multilingüe

Para documentación que debe estar disponible en varios idiomas.

### 1. `constants.ts`
Habilita solo `I18N_CONFIG`.
```typescript
export const I18N_CONFIG = {
    enabled: true,
    defaultLang: 'es',
    languages: [{ code: 'es', name: 'Español' }, { code: 'en', name: 'English' }],
};
export const VERSION_CONFIG = { enabled: false, /*...*/ };
```

### 2. Estructura de Carpetas
```bash
docs/
├── file-manifest.json
├── es/
│   └── index.md
└── en/
    └── index.md
```

### 3. `file-manifest.json`
```json
{
  "files": [
    "es/index.md",
    "en/index.md"
  ]
}
```
