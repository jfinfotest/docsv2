---
title: "Guía 3: Proyecto Multilingüe"
position: 3
---

# Guía 3: Proyecto Multilingüe (i18n)

Perfecto para documentación que necesita estar disponible en varios idiomas, pero no tiene diferentes versiones de producto.

### 1. Configuración en `constants.ts`

Habilita `I18N_CONFIG` y define los idiomas. Mantén `VERSION_CONFIG` deshabilitado.

```typescript
// constants.ts

export const I18N_CONFIG = {
    enabled: true, // Habilitado
    defaultLang: 'es',
    languages: [
        { code: 'es', name: 'Español' },
        { code: 'en', name: 'English' },
    ],
};

export const VERSION_CONFIG = {
    enabled: false, // Deshabilitado
    // ...
};
```

### 2. Estructura de Carpetas

Crea una carpeta para cada idioma dentro de `docs/` usando su código de idioma.

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

El manifiesto debe incluir todos los archivos de todos los idiomas.

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
