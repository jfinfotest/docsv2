---
title: "Guía 1: Proyecto Básico"
position: 1
---

# Guía 1: Proyecto Básico (Sin Versiones ni Idiomas)

Este es el caso de uso más simple, ideal para documentación que no requiere múltiples versiones ni traducciones.

### 1. Configuración en `constants.ts`

Deshabilita tanto `I18N_CONFIG` como `VERSION_CONFIG`.

```typescript
// constants.ts

export const I18N_CONFIG = {
    enabled: false, // Deshabilitado
    defaultLang: 'en',
    languages: [{ code: 'en', name: 'English' }],
};

export const VERSION_CONFIG = {
    enabled: false, // Deshabilitado
    defaultVersion: 'v1.0',
    versions: ['v1.0'],
};
```

### 2. Estructura de Carpetas

Tus archivos de contenido van directamente dentro de la carpeta `docs/`.

```bash
docs/
├── assets/
│   └── logo.svg
├── file-manifest.json
├── index.md
├── guia-inicio/
│   ├── index.md
│   └── instalacion.md
└── componentes/
    ├── index.md
    └── botones.md
```
- `index.md`: Es la página de inicio de tu sitio.
- `guia-inicio/index.md`: Actúa como la página principal de la sección "Guía de Inicio".

### 3. `file-manifest.json`

Este archivo es **obligatorio** cuando `DOCS_CONFIG.source` es `'local'`. Debe listar todas las rutas de tus archivos Markdown relativas a la carpeta `docs/`.

```json
{
  "files": [
    "index.md",
    "guia-inicio/index.md",
    "guia-inicio/instalacion.md",
    "componentes/index.md",
    "componentes/botones.md"
  ]
}
```
El orden no importa, pero cada archivo que quieras que aparezca debe estar listado.
