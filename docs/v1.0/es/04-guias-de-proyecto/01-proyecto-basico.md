---
title: "Guía: Proyecto Básico"
position: 1
---

# Guía: Proyecto Básico

Ideal para documentación simple que no necesita ni versiones ni idiomas.

### 1. `constants.ts`
Deshabilita ambas características.
```typescript
export const I18N_CONFIG = { enabled: false, /*...*/ };
export const VERSION_CONFIG = { enabled: false, /*...*/ };
```

### 2. Estructura de Carpetas
```bash
docs/
├── file-manifest.json
├── index.md
└── guia.md
```

### 3. `file-manifest.json`
```json
{
  "files": [
    "index.md",
    "guia.md"
  ]
}
```
