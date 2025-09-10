---
title: "Interactive Elements"
position: 3
---

# Interactive Elements

Engage your users with components that respond to their actions.

## Accordion

Organize content into expandable sections.

````markdown
```accordion
---
### First Question
Answer to the first question.
### Second Question
Answer to the second question.
```
````
**Result:**
```accordion
---
### First Question
Answer to the first question.
### Second Question
Answer to the second question.
```

## Quiz

Test knowledge with a multiple-choice quiz.

````markdown
```quiz
---
questions:
  - text: "What does `**text**` render as in Markdown?"
    choices:
      - "Italic text"
      - "Bold text"
      - "A link"
    answer: "Bold text"
---
```
````
**Result:**
```quiz
---
questions:
  - text: "What does `**text**` render as in Markdown?"
    choices:
      - "Italic text"
      - "Bold text"
      - "A link"
    answer: "Bold text"
---
```

## Carousel

Display images in a slider.

````markdown
```carousel
---
items:
  - src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&h=400&fit=crop"
    alt: "Abstract colorful wave"
  - src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&h=400&fit=crop"
    alt: "Snowy mountains under a starry sky"
---
```
````
**Result:**
```carousel
---
items:
  - src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&h=400&fit=crop"
    alt: "Abstract colorful wave"
  - src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&h=400&fit=crop"
    alt: "Snowy mountains under a starry sky"
---
```

## Tutorial Slider

Combine media and text for a guided tutorial.

````markdown
```tutorial-slider
---
steps:
  - media:
      type: image
      src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&h=300&fit=crop"
      alt: "Code on a screen"
    content: "### Step A: The Problem"
  - media:
      type: image
      src: "https://images.unsplash.com/photo-1516116216624-53e697303d34?q=80&w=400&h=300&fit=crop"
      alt: "Another code on screen"
    content: "### Step B: The Solution"
---
```
````
**Result:**
```tutorial-slider
---
steps:
  - media:
      type: image
      src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&h=300&fit=crop"
      alt: "Code on a screen"
    content: "### Step A: The Problem"
  - media:
      type: image
      src: "https://images.unsplash.com/photo-1516116216624-53e697303d34?q=80&w=400&h=300&fit=crop"
      alt: "Another code on screen"
    content: "### Step B: The Solution"
---
```