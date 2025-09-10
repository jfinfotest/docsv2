---
title: "Advanced Layout"
position: 4
---

# Advanced Layout Components

These components help you create visually stunning pages, complex narratives, and flexible layouts.

## Grid

Creates a flexible grid layout to organize any kind of content. It's perfect for displaying items side-by-side.

**Syntax:**

````markdown
```grid
---
columns: 3 # You can use 2, 3, or 4 columns
---
### Column 1
This is the content for the first column. It can be any **Markdown**.

---

### Column 2
This is the content for the second column.

---

### Column 3
Content for the third column. You can include images, lists, etc.
```
````

**Result:**

```grid
---
columns: 3
---
#### Feature Card 1
- **Easy to use:** Simple syntax.
- **Flexible:** Supports multiple columns.

---

#### Feature Card 2
- **Nestable:** Can be used inside other components.
- **Responsive:** Adapts to different screen sizes.

---

#### Feature Card 3
- **Powerful:** Great for creating complex layouts quickly.
- **Versatile:** Combine it with cards, images, or text.
```

## Hero Section

Creates a stunning page header with a large title, subtitle, and buttons over a background image or video.

**Syntax:**

````markdown
```hero-section
---
title: "Impactful Main Title"
subtitle: "A subtitle that concisely and attractively describes your project."
backgroundImage: "https://images.unsplash.com/photo-1554147090-e1221a04a025?q=80&w=2070"
overlayOpacity: 0.6
buttons:
  - text: "Get Started"
    url: "#"
    variant: "primary"
    icon: "RocketIcon"
  - text: "View on GitHub"
    url: "#"
    variant: "secondary"
---
```
````

**Result:**

```hero-section
---
title: "Impactful Main Title"
subtitle: "A subtitle that concisely and attractively describes your project."
backgroundImage: "https://images.unsplash.com/photo-1554147090-e1221a04a025?q=80&w=2070"
overlayOpacity: 0.6
buttons:
  - text: "Get Started"
    url: "#"
    variant: "primary"
    icon: "RocketIcon"
  - text: "View on GitHub"
    url: "#"
    variant: "secondary"
---
```

## Call to Action (CTA)

A block designed to capture the user's attention and direct them to a specific action.

**Syntax:**

````markdown
```cta
---
title: "Ready to get started?"
buttons:
  - text: "Create an account"
    url: "#"
    variant: "primary"
  - text: "Read the docs"
    url: "#"
    variant: "secondary"
---
This is the main content of the CTA. You can explain why the user should take action.
```
````

**Result:**

```cta
---
title: "Ready to get started?"
buttons:
  - text: "Create an account"
    url: "#"
    variant: "primary"
  - text: "Read the docs"
    url: "#"
    variant: "secondary"
---
This is the main content of the CTA. You can explain why the user should take action.
```

## Animate

Applies dynamic animations to any content to add a visual flair. The animation triggers when the element scrolls into view. This component uses the popular [Animate.css](https://animate.style/) library, so you can use any of the animation names found in its documentation.

**Syntax:**

````markdown
```animate
---
animation: "tada"
duration: "2s"
iteration: "infinite"
---
### Animated Content!
This content will use the `tada` animation and repeat infinitely.
```
````

**Result:**

```animate
---
animation: "tada"
duration: "2s"
iteration: "infinite"
---
### Animated Content!
This content will use the `tada` animation and repeat infinitely.
```

## Scrollytelling

Creates a visual narrative where the media in a fixed panel changes as the user scrolls through text steps in another panel.

**Syntax:**

````markdown
```scrollytelling
---
steps:
  - media:
      type: image
      src: "https://images.unsplash.com/photo-1504221507732-00163c469521?q=80&w=600&h=400&fit=crop"
      alt: "Desk with laptop"
    content: |
      ### The Beginning
      As you scroll, the panel on the right will update.
      This is the **first step**.
  - media:
      type: image
      src: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=600&h=400&fit=crop"
      alt: "Another desk with laptop"
    content: |
      ### The Development
      Now you are seeing the **second step**. The image has changed to reflect the content.
  - media:
      type: code
      lang: "javascript"
      code: "const x = 'final';"
    content: |
      ### The Conclusion
      The final step can even display code or Mermaid diagrams.
---
```
````

**Result:**

```scrollytelling
---
steps:
  - media:
      type: image
      src: "https://images.unsplash.com/photo-1504221507732-00163c469521?q=80&w=600&h=400&fit=crop"
      alt: "Desk with laptop"
    content: |
      ### The Beginning
      As you scroll, the panel on the right (or bottom on mobile) will update.
      This is the **first step** of our story.
  - media:
      type: image
      src: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=600&h=400&fit=crop"
      alt: "Another desk with laptop"
    content: |
      ### The Development
      Now you are seeing the **second step**. The image has changed to reflect this new point in the narrative.
  - media:
      type: code
      lang: "javascript"
      code: "const conclusion = 'Scrollytelling is great!';"
    content: |
      ### The Conclusion
      The final step can even display code snippets, like this one.
---
```