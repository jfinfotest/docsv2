---
title: "Internacionalización y Versionado"
position: 4
---

# Internacionalización (i18n) y Versionado

La plataforma soporta la gestión de múltiples idiomas y versiones de la documentación de forma nativa. Esto te permite servir el contenido adecuado a tu audiencia global y mantener la documentación de versiones antiguas.

## Configuración en `constants.ts`

El control principal sobre estas características se encuentra en `constants.ts`.

### Configuración de i18n
```typescript
export const I18N_CONFIG = {
    enabled: true,
    defaultLang: 'es',
    languages: [
        { code: 'es', name: 'Español' },
        { code: 'en', name: 'English' },
    ],
};
```
- `enabled`: Ponlo en `true` para activar el selector de idiomas en la cabecera.
- `defaultLang`: El idioma que se cargará por defecto si no hay ninguno seleccionado.
- `languages`: Un array de los idiomas disponibles. El `code` debe coincidir con el nombre de la carpeta.

### Configuración de Versionado
```typescript
export const VERSION_CONFIG = {
    enabled: true,
    defaultVersion: 'v2.0',
    versions: ['v2.0', 'v1.0'],
};
```
- `enabled`: Ponlo en `true` para activar el selector de versiones en la cabecera.
- `defaultVersion`: La versión que se cargará por defecto.
- `versions`: Un array con todas las versiones disponibles, en el orden en que quieres que aparezcan.

## Estructura del Proyecto

La forma en que organices tus archivos en la carpeta `docs/` es crucial para que estas características funcionen. Cada carpeta que representa una sección principal o subsección debería contener un archivo `index.md` que sirva como página de inicio para esa sección.

### Escenario 1: Sin i18n ni Versionado
Si ambas opciones están en `false`, la estructura es plana.
```bash
docs/
├── index.md            # Página principal del sitio
├── pagina-1.md
├── pagina-2.md
└── subcarpeta/
    ├── index.md        # Página principal de 'subcarpeta'
    └── pagina-3.md
```

### Escenario 2: Solo Versionado Habilitado
La primera subcarpeta debe ser el nombre de la versión.
```bash
docs/
├── v1.0/
│   ├── index.md        # Página principal de la v1.0
│   ├── pagina-1.md
│   └── pagina-2.md
└── v2.0/
    ├── index.md        # Página principal de la v2.0
    ├── pagina-1.md
    └── caracteristicas-nuevas.md
```

### Escenario 3: Solo i18n Habilitado
La primera subcarpeta debe ser el código del idioma.
```bash
docs/
├── es/
│   ├── index.md        # Página principal en Español
│   ├── pagina-1.md
│   └── pagina-2.md
└── en/
    ├── index.md        # Página principal en Inglés
    ├── page-1.md
    └── page-2.md
```

### Escenario 4: i18n y Versionado Habilitados (Recomendado)
La estructura debe ser `version/idioma/contenido`. Esto proporciona la máxima flexibilidad.
```bash
docs/
├── v1.0/
│   ├── es/
│   │   ├── index.md    # Página principal de v1.0 en Español
│   │   └── pagina-1.md
│   └── en/
│       ├── index.md    # Página principal de v1.0 en Inglés
│       └── page-1.md
└── v2.0/
    ├── es/
    │   ├── index.md    # Página principal de v2.0 en Español
    │   ├── pagina-1.md
    │   └── caracteristicas-nuevas.md
    └── en/
        ├── index.md    # Página principal de v2.0 en Inglés
        ├── page-1.md
        └── new-features.md
```

## Traducción de la Interfaz (`UI_TEXT`)

Además de traducir tu contenido en Markdown, puedes traducir los textos fijos de la interfaz (botones, etiquetas, etc.) en `constants.ts`, dentro del objeto `UI_TEXT`.

```typescript
export const UI_TEXT = {
    es: {
        // ...
        searchPlaceholder: 'Buscar',
        editThisPage: 'Editar esta página',
        // ...
    },
    en: {
        // ...
        searchPlaceholder: 'Search',
        editThisPage: 'Edit this page',
        // ...
    }
};
```
Añade o modifica las claves para cada idioma que hayas configurado en `I18N_CONFIG`.