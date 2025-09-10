---
title: "Guía: Proyecto con Versiones"
position: 2
---

# Guía: Proyecto con Versiones

Para cuando necesitas documentar varias versiones de tu producto.

### 1. `constants.ts`
Habilita solo `VERSION_CONFIG`.
```typescript
export const I18N_CONFIG = { enabled: false, /*...*/ };
export const VERSION_CONFIG = {
    enabled: true,
    defaultVersion: 'v1.0',
    versions: ['v1.0', 'v0.9'],
};
```

### 2. Estructura de Carpetas
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
