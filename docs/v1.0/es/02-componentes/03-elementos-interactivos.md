---
title: "Elementos Interactivos"
position: 3
---

# Elementos Interactivos

Involucra a tus usuarios con componentes que responden a sus acciones.

## Acordeón

Organiza contenido en secciones expandibles.

````markdown
```accordion
---
### Primera Pregunta
Respuesta a la primera pregunta.
### Segunda Pregunta
Respuesta a la segunda pregunta.
```
````
**Resultado:**
```accordion
---
### Primera Pregunta
Respuesta a la primera pregunta.
### Segunda Pregunta
Respuesta a la segunda pregunta.
```

## Cuestionario (Quiz)

Evalúa el conocimiento con un cuestionario de opción múltiple.

````markdown
```quiz
---
questions:
  - text: "¿Qué renderiza `**texto**` en Markdown?"
    choices:
      - "Texto en cursiva"
      - "Texto en negrita"
      - "Un enlace"
    answer: "Texto en negrita"
---
```
````
**Resultado:**
```quiz
---
questions:
  - text: "¿Qué renderiza `**texto**` en Markdown?"
    choices:
      - "Texto en cursiva"
      - "Texto en negrita"
      - "Un enlace"
    answer: "Texto en negrita"
---
```

## Carrusel

Muestra imágenes en un slider.

````markdown
```carousel
---
items:
  - src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&h=400&fit=crop"
    alt: "Ola abstracta de colores"
  - src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&h=400&fit=crop"
    alt: "Montañas nevadas"
---
```
````
**Result:**
```carousel
---
items:
  - src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&h=400&fit=crop"
    alt: "Ola abstracta de colores"
  - src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&h=400&fit=crop"
    alt: "Montañas nevadas"
---
```

## Tutorial Slider

Combina medios y texto para un tutorial guiado.

````markdown
```tutorial-slider
---
steps:
  - media:
      type: image
      src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&h=300&fit=crop"
      alt: "Código en una pantalla"
    content: "### Paso A: El Problema"
  - media:
      type: image
      src: "https://images.unsplash.com/photo-1516116216624-53e697303d34?q=80&w=400&h=300&fit=crop"
      alt: "Otro código en una pantalla"
    content: "### Paso B: La Solución"
---
```
````
**Resultado:**
```tutorial-slider
---
steps:
  - media:
      type: image
      src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&h=300&fit=crop"
      alt: "Código en una pantalla"
    content: "### Paso A: El Problema"
  - media:
      type: image
      src: "https://images.unsplash.com/photo-1516116216624-53e697303d34?q=80&w=400&h=300&fit=crop"
      alt: "Otro código en una pantalla"
    content: "### Paso B: La Solución"
---
```