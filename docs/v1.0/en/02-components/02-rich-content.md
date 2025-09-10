---
title: "Rich Content"
position: 2
---

# Rich Content

Incorporate multimedia and embeds to make your documentation more visual.

## Images with Options

Customize images directly from the `alt` text.

```markdown
![A forest{align=center width=500px shadow=true}](https://images.unsplash.com/photo-1447752875215-b2761acb3c5d)
```

**Result:**
![A forest{align=center width=500px shadow=true}](https://images.unsplash.com/photo-1447752875215-b2761acb3c5d)

## Image Gallery

Create a grid of clickable images.

````markdown
```gallery
---
columns: 4
items:
  - src: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=150&h=150&fit=crop"
    alt: "Desk with coffee"
  - src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=150&h=150&fit=crop"
    alt: "Laptop and notebook"
  - src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=150&h=150&fit=crop"
    alt: "People working on laptops"
  - src: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=150&h=150&fit=crop"
    alt: "Abstract technology background"
---
```
````
**Result:**
```gallery
---
columns: 4
items:
  - src: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=150&h=150&fit=crop"
    alt: "Desk with coffee"
  - src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=150&h=150&fit=crop"
    alt: "Laptop and notebook"
  - src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=150&h=150&fit=crop"
    alt: "People working on laptops"
  - src: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=150&h=150&fit=crop"
    alt: "Abstract technology background"
---
```

## Video Embed

Embed videos from YouTube or Vimeo.

````markdown
```video
---
src: "https://vimeo.com/545102023"
---
```
````
**Result:**
```video
---
src: "https://vimeo.com/545102023"
---
```

## Live Code Embed

Embed code editors from CodePen, JSFiddle, or CodeSandbox.

````markdown
```live-code
---
src: "https://jsfiddle.net/Lx4dsqc2/"
---
```
````
**Result:**
```live-code
---
src: "https://jsfiddle.net/Lx4dsqc2/"
---
```