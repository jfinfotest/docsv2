---
title: "Internationalization and Versioning"
position: 4
---

# Internationalization (i18n) and Versioning

The platform natively supports managing multiple languages and versions of your documentation. This allows you to serve the right content to your global audience and maintain documentation for older versions.

## Configuration in `constants.ts`

The main control over these features is located in `constants.ts`.

### i18n Configuration
```typescript
export const I18N_CONFIG = {
    enabled: true,
    defaultLang: 'en',
    languages: [
        { code: 'es', name: 'Español' },
        { code: 'en', name: 'English' },
    ],
};
```
- `enabled`: Set to `true` to activate the language switcher in the header.
- `defaultLang`: The language that will be loaded by default if none is selected.
- `languages`: An array of available languages. The `code` must match the folder name.

### Versioning Configuration
```typescript
export const VERSION_CONFIG = {
    enabled: true,
    defaultVersion: 'v2.0',
    versions: ['v2.0', 'v1.0'],
};
```
- `enabled`: Set to `true` to activate the version switcher in the header.
- `defaultVersion`: The version that will be loaded by default.
- `versions`: An array of all available versions, in the order you want them to appear.

## Project Structure

How you organize your files in the `docs/` folder is crucial for these features to work correctly. Each folder representing a main section or subsection should contain an `index.md` file to serve as the landing page for that section.

### Scenario 1: No i18n, No Versioning
If both options are `false`, the structure is flat.
```bash
docs/
├── index.md            # Main site page
├── page-1.md
├── page-2.md
└── subfolder/
    ├── index.md        # Main page for 'subfolder'
    └── page-3.md
```

### Scenario 2: Only Versioning Enabled
The first subdirectory must be the version name.
```bash
docs/
├── v1.0/
│   ├── index.md        # Main page for v1.0
│   ├── page-1.md
│   └── page-2.md
└── v2.0/
    ├── index.md        # Main page for v2.0
    ├── page-1.md
    └── new-features.md
```

### Scenario 3: Only i18n Enabled
The first subdirectory must be the language code.
```bash
docs/
├── es/
│   ├── index.md        # Main page in Spanish
│   ├── pagina-1.md
│   └── pagina-2.md
└── en/
    ├── index.md        # Main page in English
    ├── page-1.md
    └── page-2.md
```

### Scenario 4: i18n and Versioning Enabled (Recommended)
The structure must be `version/language/content`. This provides maximum flexibility.
```bash
docs/
├── v1.0/
│   ├── es/
│   │   ├── index.md    # Main page for v1.0 in Spanish
│   │   └── pagina-1.md
│   └── en/
│       ├── index.md    # Main page for v1.0 in English
│       └── page-1.md
└── v2.0/
    ├── es/
    │   ├── index.md    # Main page for v2.0 in Spanish
    │   ├── pagina-1.md
    │   └── caracteristicas-nuevas.md
    └── en/
        ├── index.md    # Main page for v2.0 in English
        ├── page-1.md
        └── new-features.md
```

## UI Translation (`UI_TEXT`)

In addition to translating your Markdown content, you can translate the fixed UI texts (buttons, labels, etc.) in `constants.ts`, within the `UI_TEXT` object.

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
Add or modify the keys for each language you have configured in `I18N_CONFIG`.