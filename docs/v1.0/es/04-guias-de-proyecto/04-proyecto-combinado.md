---
title: "Guía: Proyecto Combinado"
position: 4
---

# Guía: Proyecto Combinado

La configuración más completa, para múltiples versiones e idiomas.

### 1. `constants.ts`
Habilita ambas características.
```typescript
export const I18N_CONFIG = {
    enabled: true,
    defaultLang: 'es',
    languages: [{ code: 'es', name: 'Español' }, { code: 'en', name: 'English' }],
};
export const VERSION_CONFIG = {
    enabled: true,
    defaultVersion: 'v1.0',
    versions: ['v1.0', 'v0.9'],
};
```

### 2. Estructura de Carpetas
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
