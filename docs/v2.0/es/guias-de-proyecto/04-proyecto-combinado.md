---
title: "Guía 4: Proyecto Combinado"
position: 4
---

# Guía 4: Proyecto Combinado (Versiones e Idiomas)

Esta es la configuración más completa y flexible, ideal para proyectos grandes con una audiencia global y un ciclo de vida de producto con múltiples versiones.

### 1. Configuración en `constants.ts`

Habilita tanto `VERSION_CONFIG` como `I18N_CONFIG`.

```typescript
// constants.ts

export const I18N_CONFIG = {
    enabled: true,
    defaultLang: 'es',
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

### 2. Estructura de Carpetas

La estructura anidada es crucial. El primer nivel es la **versión**, y el segundo nivel es el **idioma**.

```bash
docs/
├── assets/
├── file-manifest.json
├── v1.0/
│   ├── es/
│   │   ├── index.md
│   │   └── guia-v1-es.md
│   └── en/
│       ├── index.md
│       └── guide-v1-en.md
└── v2.0/
    ├── es/
    │   ├── index.md
    │   └── guia-v2-es.md
    └── en/
        ├── index.md
        └── guide-v2-en.md
```

### 3. `file-manifest.json`

Una vez más, el manifiesto debe contener las rutas a **todos** los archivos de Markdown de todas las combinaciones de versión e idioma.

```json
{
  "files": [
    "v1.0/es/index.md",
    "v1.0/es/guia-v1-es.md",
    "v1.0/en/index.md",
    "v1.0/en/guide-v1-en.md",
    "v2.0/es/index.md",
    "v2.0/es/guia-v2-es.md",
    "v2.0/en/index.md",
    "v2.0/en/guide-v2-en.md"
  ]
}
```
