# Deploy a GitHub Pages

Este proyecto está configurado para desplegarse automáticamente en GitHub Pages.

## Configuración Automática

El proyecto incluye:

### 1. Configuración de Vite optimizada para GitHub Pages
- Base path configurado automáticamente para producción (`/docsv1/`)
- Build optimizado con minificación y code splitting
- Chunks separados por categorías (vendor, router, markdown, charts, icons)
- Assets con hash para cache busting

### 2. Scripts de NPM
```bash
# Build para desarrollo local
npm run build

# Build optimizado para GitHub Pages
npm run build:gh-pages

# Preview local con base path de GitHub Pages
npm run preview:gh-pages

# Deploy manual (requiere gh-pages instalado)
npm run deploy
```

### 3. GitHub Actions Workflow
El archivo `.github/workflows/deploy.yml` automatiza el deploy:
- Se ejecuta en cada push a la rama `main`
- Instala dependencias y ejecuta el build
- Despliega automáticamente a GitHub Pages

## Configuración en GitHub

### Paso 1: Habilitar GitHub Pages
1. Ve a Settings > Pages en tu repositorio
2. En "Source", selecciona "GitHub Actions"
3. El workflow se ejecutará automáticamente

### Paso 2: Configurar Variables de Entorno (Opcional)
Si tu aplicación usa la API de Gemini:
1. Ve a Settings > Secrets and variables > Actions
2. Agrega `GEMINI_API_KEY` como secret

### Paso 3: Verificar el Base Path
Asegúrate de que el nombre del repositorio coincida con el base path en `vite.config.ts`:
```typescript
base: isProduction ? '/nombre-del-repo/' : '/'
```

## Deploy Manual

Si prefieres hacer deploy manual:

```bash
# Instalar gh-pages si no está instalado
npm install -g gh-pages

# Hacer deploy
npm run deploy
```

## Estructura de Archivos Generados

```
dist/
├── assets/
│   ├── vendor-[hash].js     # React, React DOM
│   ├── router-[hash].js     # React Router
│   ├── markdown-[hash].js   # Componentes de Markdown
│   ├── charts-[hash].js     # Chart.js
│   ├── icons-[hash].js      # Lucide React
│   └── index-[hash].css     # Estilos principales
├── docs/                    # Archivos de documentación
├── .nojekyll               # Evita procesamiento Jekyll
└── index.html              # Punto de entrada
```

## Solución de Problemas

### El sitio no carga correctamente
- Verifica que el base path en `vite.config.ts` coincida con el nombre del repositorio
- Asegúrate de que GitHub Pages esté configurado para usar GitHub Actions

### Assets no se cargan
- Confirma que el archivo `.nojekyll` esté presente en la carpeta `public/`
- Verifica que los paths relativos estén correctos

### Error en el build
- Revisa que todas las dependencias estén instaladas
- Verifica que no haya errores de TypeScript
- Comprueba que las variables de entorno estén configuradas si son necesarias