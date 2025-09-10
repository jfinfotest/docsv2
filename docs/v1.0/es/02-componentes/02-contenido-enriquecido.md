---
title: "Contenido Enriquecido"
position: 2
---

# Contenido Enriquecido

Incorpora multimedia y embebidos para hacer tu documentación más visual.

## Imágenes con Opciones

Personaliza imágenes directamente desde el `alt` text.

```markdown
![Un bosque{align=center width=500px shadow=true}](https://images.unsplash.com/photo-1447752875215-b2761acb3c5d)
```

**Resultado:**
![Un bosque{align=center width=500px shadow=true}](https://images.unsplash.com/photo-1447752875215-b2761acb3c5d)

## Galería de Imágenes

Crea una cuadrícula de imágenes clicables.

````markdown
```gallery
---
columns: 4
items:
  - src: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=150&h=150&fit=crop"
    alt: "Escritorio con café"
  - src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=150&h=150&fit=crop"
    alt: "Portátil y libreta"
  - src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=150&h=150&fit=crop"
    alt: "Gente trabajando con portátiles"
  - src: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=150&h=150&fit=crop"
    alt: "Fondo abstracto de tecnología"
---
```
````
**Result:**
```gallery
---
columns: 4
items:
  - src: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=150&h=150&fit=crop"
    alt: "Escritorio con café"
  - src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=150&h=150&fit=crop"
    alt: "Portátil y libreta"
  - src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=150&h=150&fit=crop"
    alt: "Gente trabajando con portátiles"
  - src: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=150&h=150&fit=crop"
    alt: "Fondo abstracto de tecnología"
---
```

## Video Embebido

Incrusta videos de YouTube o Vimeo.

````markdown
```video
---
src: "https://vimeo.com/545102023"
---
```
````
**Resultado:**
```video
---
src: "https://vimeo.com/545102023"
---
```

## Embebido de Código en Vivo

Incrusta editores de código de CodePen, JSFiddle o CodeSandbox.

````markdown
```live-code
---
src: "https://jsfiddle.net/Lx4dsqc2/"
---
```
````
**Resultado:**
```live-code
---
src: "https://jsfiddle.net/Lx4dsqc2/"
---
```