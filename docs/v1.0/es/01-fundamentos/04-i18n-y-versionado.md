---
title: "I18n y Versionado"
position: 4
---

# Internacionalización (i18n) y Versionado

Gestiona múltiples idiomas y versiones de tu documentación fácilmente.

## Configuración en `constants.ts`

Habilita y configura estas características en `constants.ts`:

```typescript
// Para idiomas
export const I18N_CONFIG = {
    enabled: true,
    defaultLang: 'es',
    languages: [{ code: 'es', name: 'Español' }, { code: 'en', name: 'English' }],
};

// Para versiones
export const VERSION_CONFIG = {
    enabled: true,
    defaultVersion: 'v1.0',
    versions: ['v1.0', 'v2.0'],
};
```

## Estructura de Carpetas

La estructura de tus archivos en `docs/` debe seguir el patrón `version/idioma/archivo.md` si ambas opciones están habilitadas.

**Ejemplo:**
```bash
docs/
├── v1.0/
│   ├── es/
│   │   └── introduccion.md
│   └── en/
│       └── introduction.md
└── v2.0/
    ├── es/
    │   └── introduccion.md
    └── en/
        └── introduction.md
```
