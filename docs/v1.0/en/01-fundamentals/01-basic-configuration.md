---
title: "Basic Configuration"
position: 1
---

# Basic Configuration

The `constants.ts` file is the control center for your site's customization. Here you can define the site's identity, appearance, and enable or disable specific UI components.

## Main Configuration (`APP_CONFIG`)

Define the visual identity of your site.

```typescript
export const APP_CONFIG = {
    title: 'Documentation v1.0',
    subtitle: 'Reference Guide',
    icon: 'assets/logo.svg', // Path relative to your docs folder
};
```
- **`title`**: The name that appears in the main header.
- **`subtitle`**: An optional line of text below the main title.
- **`icon`**: The path to your site's logo.

## Appearance (`THEME_CONFIG`)

Control the colors, typography, and default light/dark mode.

```typescript
export const THEME_CONFIG = {
    defaultTheme: 'light',      // 'light' or 'dark'
    defaultAppTheme: 'green',     // e.g., 'blue', 'green', 'purple'
    defaultFont: 'Roboto',      // e.g., 'Inter', 'Roboto', 'Source Sans Pro'
};
```
- **`defaultTheme`**: Sets the initial theme when a user visits for the first time.
- **`defaultAppTheme`**: Defines the primary color palette for links, buttons, and highlights.
- **`defaultFont`**: Sets the default font for the entire site.

## UI Customization

Enable or disable specific interface elements.

### Announcement Banner
A dismissible banner at the top of the site, perfect for important announcements.
```typescript
export const ANNOUNCEMENT_BANNER_CONFIG = {
    enabled: true,
    id: 'v1.0-info', // A unique ID for the banner
    content: 'You are viewing the documentation for **v1.0**, which is our stable release.',
};
```

### Footer
The global fixed footer at the bottom of the page.
```typescript
export const FOOTER_CONFIG = {
    enabled: true,
    text: '© {year} My Company. All rights reserved.', // {year} is replaced automatically
};
```

### Maintenance Mode
Replaces the entire site with a maintenance page, useful during major updates.
```typescript
export const MAINTENANCE_MODE_CONFIG = {
    enabled: false,
    message: "We are updating the documentation. We'll be back soon.",
};
```
