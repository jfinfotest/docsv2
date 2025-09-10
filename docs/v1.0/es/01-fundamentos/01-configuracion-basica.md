---
title: "Configuración Básica"
position: 1
---

# Configuración Básica

El archivo `constants.ts` es el centro de control para la personalización de tu sitio. Aquí puedes definir la identidad del sitio, la apariencia y habilitar o deshabilitar componentes específicos de la interfaz.

## Configuración Principal (`APP_CONFIG`)

Define la identidad visual de tu sitio.

```typescript
export const APP_CONFIG = {
    title: 'Documentación v1.0',
    subtitle: 'Guía de Referencia',
    icon: 'assets/logo.svg', // Ruta relativa a tu carpeta de docs
};
```
- **`title`**: El nombre que aparece en la cabecera principal.
- **`subtitle`**: Una línea de texto opcional debajo del título principal.
- **`icon`**: La ruta al logo de tu sitio.

## Apariencia (`THEME_CONFIG`)

Controla los colores, la tipografía y el modo oscuro/claro por defecto.

```typescript
export const THEME_CONFIG = {
    defaultTheme: 'light',      // 'light' o 'dark'
    defaultAppTheme: 'green',     // ej: 'blue', 'green', 'purple'
    defaultFont: 'Roboto',      // ej: 'Inter', 'Roboto', 'Source Sans Pro'
};
```
- **`defaultTheme`**: Establece el tema inicial cuando un usuario visita por primera vez.
- **`defaultAppTheme`**: Define la paleta de colores primaria para enlaces, botones y resaltados.
- **`defaultFont`**: Establece la fuente por defecto para todo el sitio.

## Personalización de la UI

Habilita o deshabilita componentes específicos de la interfaz.

### Banner de Anuncios
Un banner que se puede descartar en la parte superior del sitio, perfecto para anuncios importantes.
```typescript
export const ANNOUNCEMENT_BANNER_CONFIG = {
    enabled: true,
    id: 'v1.0-info', // Un ID único para el banner
    content: 'Estás viendo la documentación de la **v1.0**, que es nuestra versión estable.',
};
```

### Pie de Página
El pie de página global fijo en la parte inferior de la página.
```typescript
export const FOOTER_CONFIG = {
    enabled: true,
    text: '© {year} Mi Empresa. Todos los derechos reservados.', // {year} se reemplaza automáticamente
};
```

### Modo Mantenimiento
Reemplaza todo el sitio con una página de mantenimiento, útil durante actualizaciones importantes.
```typescript
export const MAINTENANCE_MODE_CONFIG = {
    enabled: false,
    message: "Estamos actualizando la documentación. Volveremos pronto.",
};
```
