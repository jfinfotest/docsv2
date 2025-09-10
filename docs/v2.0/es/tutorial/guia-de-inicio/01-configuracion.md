---
title: "Configuración y Puesta en Marcha"
position: 1
---

# 1. Configuración y Puesta en Marcha

Toda la configuración de tu sitio de documentación se centraliza en el archivo `constants.ts`. Este enfoque te permite personalizar fácilmente cada aspecto sin tocar el código de la aplicación.

## I18n y Versionado

Estas secciones te permiten habilitar y configurar la internacionalización y el versionado de la documentación.

```typescript
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

- `I18N_CONFIG.enabled`: `true` para activar el selector de idioma.
- `VERSION_CONFIG.enabled`: `true` para activar el selector de versión.
- Para que esto funcione, tus archivos deben estar en una estructura de carpetas como `docs/{version}/{lang}/...`. Consulta la [guía de i18n y versionado](./04-i18n-y-versionado.md) para más detalles.
- **Nota**: Además de traducir tu contenido, puedes traducir la interfaz de la aplicación (botones, etiquetas, etc.) en el objeto `UI_TEXT` dentro de `constants.ts`.

## Configuración General de la App (`APP_CONFIG`)

Aquí defines la identidad de tu sitio.

```typescript
export const APP_CONFIG = {
    title: 'JFDocs',
    subtitle: 'Versión_de_documentación',
    icon: '/assets/logo.svg',
};
```

- `title`: El nombre que aparece en la cabecera principal.
- `subtitle`: Un subtítulo opcional que aparece debajo del título principal.
- `icon`: Ruta al logo de tu aplicación. Puede ser una ruta absoluta desde la raíz del proyecto (ej: `/assets/logo.svg`) o una URL completa.

## Fuente de Documentos (`DOCS_CONFIG` y `GITHUB_CONFIG`)

Define de dónde se obtienen los archivos de documentación.

```typescript
export const DOCS_CONFIG = {
    source: 'local', // o 'github'
};
```

- `source`:
    - `'local'`: Carga los archivos desde una carpeta `docs` pública. Requiere un `file-manifest.json`. Consulta la [guía para automatizar actualizaciones](./05-automatizando-actualizaciones.md) para simplificar este proceso.
    - `'github'`: Carga los archivos en tiempo de real desde un repositorio de GitHub usando su API.

Si usas `'github'`, debes configurar `GITHUB_CONFIG`:

```typescript
export const GITHUB_CONFIG = {
    owner: 'your-github-username',
    repo: 'your-repo-name',
    branch: 'main',
    docsPath: 'docs', // Carpeta raíz de los docs en el repo
};
```

## Apariencia y Tema (`THEME_CONFIG` y `FONTS`)

Personaliza la apariencia visual.

```typescript
export const THEME_CONFIG = {
    defaultTheme: 'dark', // 'light' o 'dark'
    defaultAppTheme: 'blue', // ID de uno de los temas en themes.ts
    defaultFont: 'Inter', // ID de una de las fuentes en FONTS
};
```

- `defaultTheme`: El modo oscuro o claro por defecto.
- `defaultAppTheme`: La paleta de colores principal (azul, verde, etc.).
- `defaultFont`: La fuente tipográfica para todo el sitio.

## Componentes de la UI

Configura elementos específicos de la interfaz.

### `HEADER_LINKS`
Enlaces a redes sociales en la cabecera.

```typescript
export const HEADER_LINKS = [
    { icon: 'GitHub', url: '#', label: 'GitHub' },
    { icon: 'Twitter', url: '#', label: 'Twitter' },
];
```

### `SIDEBAR_BUSINESS_INFO_CONFIG`
Una sección de marca en la parte inferior de la barra lateral.

```typescript
export const SIDEBAR_BUSINESS_INFO_CONFIG = {
    enabled: true,
    logo: 'assets/company-logo.svg',
    title: 'Powered by Us',
    link: '#',
    footerText: '© {year} Our Company. All rights reserved.',
};
```
- `{year}` se reemplaza dinámicamente.

### `FOOTER_CONFIG`
El pie de página global fijo en la parte inferior.

```typescript
export const FOOTER_CONFIG = {
    enabled: true,
    text: '© {year} My Company. Built with love.',
};
```

### `EDIT_PAGE_BUTTON_CONFIG`
Muestra un botón "Editar esta página" que enlaza a GitHub. Solo funciona si `DOCS_CONFIG.source` es `'github'`.

```typescript
export const EDIT_PAGE_BUTTON_CONFIG = {
    enabled: true,
};
```

### `ANNOUNCEMENT_BANNER_CONFIG`
Un banner de anuncios en la parte superior de la página.

```typescript
export const ANNOUNCEMENT_BANNER_CONFIG = {
    enabled: false,
    id: 'v2.0-release', // ID único para el localStorage
    content: '🚀 **¡La nueva versión ya está aquí!** Echa un vistazo a las nuevas características.',
    link: {
        text: 'Aprender Más',
        href: '/tutorial/guia-de-inicio/01-configuracion',
    },
};
```

## Modo Mantenimiento (`MAINTENANCE_MODE_CONFIG`)

Reemplaza todo el sitio con una página de mantenimiento.

```typescript
export const MAINTENANCE_MODE_CONFIG = {
    enabled: false,
    message: "Actualmente estamos realizando un mantenimiento programado. El sitio volverá a estar en línea en breve.",
};
```
