# Guía de Despliegue en GitHub Pages

Este documento explica cómo desplegar el proyecto de documentación estática en GitHub Pages.

## Configuración Automática

El proyecto ya está configurado para desplegarse automáticamente en GitHub Pages mediante GitHub Actions.

### Archivos de Configuración

1. **vite.config.ts**: Configurado con el `base` path correcto para GitHub Pages
2. **package.json**: Incluye scripts específicos para el build de producción
3. **.github/workflows/deploy.yml**: Workflow de GitHub Actions para despliegue automático

## Scripts Disponibles

### Build para GitHub Pages
```bash
npm run build:gh-pages
```
Este comando:
- Establece NODE_ENV=production
- Ejecuta TypeScript compiler
- Genera el build optimizado en la carpeta `dist/`

### Despliegue Manual (Opcional)
```bash
npm run deploy
```
Este comando:
- Ejecuta el build de GitHub Pages
- Despliega usando gh-pages (requiere configuración adicional)

## Configuración en GitHub

### 1. Habilitar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Navega a **Settings** > **Pages**
3. En **Source**, selecciona **GitHub Actions**

### 2. Configurar Permisos

Asegúrate de que el repositorio tenga los permisos necesarios:
- **Settings** > **Actions** > **General**
- En **Workflow permissions**, selecciona **Read and write permissions**
- Marca **Allow GitHub Actions to create and approve pull requests**

## Despliegue Automático

El despliegue se ejecuta automáticamente cuando:
- Se hace push a la rama `main`
- Se crea un pull request hacia `main`

### Proceso del Workflow

1. **Checkout**: Descarga el código del repositorio
2. **Setup Node.js**: Configura Node.js v18
3. **Install dependencies**: Instala las dependencias con `npm ci`
4. **Build**: Ejecuta el build de producción
5. **Deploy**: Despliega los archivos a GitHub Pages

## URL del Sitio

Una vez desplegado, el sitio estará disponible en:
```
https://[tu-usuario].github.io/docsv1/
```

## Solución de Problemas

### Error de Dependencias
Si encuentras errores de peer dependencies durante la instalación:
```bash
npm install --legacy-peer-deps
```

### Build Fallido
Si el build falla, verifica:
1. Que todas las dependencias estén instaladas
2. Que no haya errores de TypeScript
3. Que los archivos de configuración estén correctos

### Permisos de GitHub Actions
Si el despliegue falla por permisos:
1. Verifica la configuración de permisos en Settings > Actions
2. Asegúrate de que GitHub Pages esté configurado para usar GitHub Actions

## Estructura de Archivos Generados

```
dist/
├── index.html          # Página principal
├── assets/            # Archivos estáticos (CSS, JS, fuentes)
│   ├── *.css         # Estilos compilados
│   ├── *.js          # JavaScript compilado
│   └── fonts/        # Fuentes web
└── docs/             # Documentación markdown procesada
```

## Notas Importantes

- El proyecto usa Vite como bundler
- Se genera un build optimizado para producción
- Los archivos se sirven desde la carpeta `dist/`
- El base path está configurado como `/docsv1/` para GitHub Pages
- Se incluyen source maps para debugging

## Comandos de Desarrollo

```bash
# Desarrollo local
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Build específico para GitHub Pages
npm run build:gh-pages
```