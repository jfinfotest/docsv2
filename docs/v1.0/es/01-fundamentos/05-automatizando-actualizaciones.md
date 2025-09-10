---
title: "Automatizando Actualizaciones"
position: 5
---

# Automatizando Actualizaciones del Manifiesto

Para evitar editar manualmente `docs/file-manifest.json` cada vez que añades o eliminas un archivo, puedes usar un script simple.

## Cómo Funciona

Hemos añadido un comando en el archivo `package.json` de tu proyecto. Para actualizar el manifiesto, simplemente ejecuta este comando en tu terminal:

```bash
npm run update-manifest
```

Este comando buscará todos los archivos `.md` en tu carpeta `docs/` y reescribirá el `file-manifest.json` con la lista actualizada.

**¡Recuerda ejecutar este comando cada vez que cambies la estructura de tus archivos!**
