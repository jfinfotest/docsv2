---
title: "Guía 2: Proyecto con Versiones"
position: 2
---

# Guía 2: Proyecto con Versiones

Utiliza esta configuración si tu producto tiene múltiples versiones y necesitas mantener la documentación para cada una de ellas.

### 1. Configuración en `constants.ts`

Habilita `VERSION_CONFIG` y define tus versiones. Mantén `I18N_CONFIG` deshabilitado.

```typescript
// constants.ts

export const I18N_CONFIG = {
    enabled: false, // Deshabilitado
    // ...
};

export const VERSION_CONFIG = {
    enabled: true,  // Habilitado
    defaultVersion: 'v2.0',
    versions: ['v2.0', 'v1.0'], // La primera es la más reciente
};
```

### 2. Estructura de Carpetas

Crea una carpeta para cada versión dentro de `docs/`. Dentro de cada carpeta de versión, la estructura es la misma que en un proyecto básico.

```bash
docs/
├── assets/
├── file-manifest.json
├── v1.0/
│   ├── index.md
│   └── guia-v1.md
└── v2.0/
    ├── index.md
    ├── guia-v2.md
    └── nuevas-caracteristicas/
        └── index.md
```
- `v1.0/index.md`: Página de inicio para la versión 1.0.

### 3. `file-manifest.json`

El manifiesto debe listar **todos** los archivos de **todas** las versiones. La aplicación filtrará los archivos correctos basándose en la versión seleccionada por el usuario.

```json
{
  "files": [
    "v1.0/index.md",
    "v1.0/guia-v1.md",
    "v2.0/index.md",
    "v2.0/guia-v2.md",
    "v2.0/nuevas-caracteristicas/index.md"
  ]
}
```
