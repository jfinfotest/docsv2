---
title: "Interactive Components"
position: 1
---

# Interactive Components

These components allow users to interact with the content.

## Accordion

An accordion is perfect for hiding and showing content, such as in an FAQ section.

**Syntax:**

````markdown
```accordion
---
allowMultiple: false # Optional: true to allow opening multiple items at once
---
### What is the first item?
This is the content of the first item. It can contain **Markdown**.

### What is the second item?
This is the content of the second item.

### And the third?
Content of the third item.
```
````

**Result:**

```accordion
---
allowMultiple: false
---
### What is the first item?
This is the content of the first item. It can contain **Markdown**.

### What is the second item?
This is the content of the second item.

### And the third?
Content of the third item.
```

## Quiz

Create a multiple-choice quiz to test user comprehension.

**Syntax:**

````markdown
```quiz
---
questions:
  - text: "What color is the sky?"
    choices:
      - Green
      - Blue
      - Red
    answer: "Blue"
  - text: "What is 2 + 2?"
    choices:
      - 3
      - 4
      - 5
    answer: 4
---
```
````

**Result:**

```quiz
---
questions:
  - text: "What color is the sky?"
    choices:
      - Green
      - Blue
      - Red
    answer: "Blue"
  - text: "What is 2 + 2?"
    choices:
      - 3
      - 4
      - 5
    answer: "4"
---
```

## Carousel

Display a series of images in an interactive carousel.

**Syntax:**

````markdown
```carousel
---
autoPlay: true
interval: 3000 # in milliseconds
showDots: true
items:
  - src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&h=400&fit=crop"
    alt: "Abstract colorful wave"
  - src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&h=400&fit=crop"
    alt: "Snowy mountains under a starry sky"
  - src: "https://images.unsplash.com/photo-1483401757487-2131b2621388?q=80&w=800&h=400&fit=crop"
    alt: "Lush green forest path"
---
```
````

**Result:**

```carousel
---
autoPlay: true
interval: 3000
showDots: true
items:
  - src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&h=400&fit=crop"
    alt: "Abstract colorful wave"
  - src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&h=400&fit=crop"
    alt: "Snowy mountains under a starry sky"
  - src: "https://images.unsplash.com/photo-1483401757487-2131b2621388?q=80&w=800&h=400&fit=crop"
    alt: "Lush green forest path"
---
```

## Tutorial Slider

Combines a media panel (image, code) with a text panel to create a step-by-step tutorial.

**Syntax:**
````markdown
```tutorial-slider
---
steps:
  - media:
      type: image
      src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&h=300&fit=crop"
      alt: "Code on a screen"
    content: |
      ### Installation
      This is the first step. It talks about how to install the software.
  - media:
      type: code
      lang: javascript
      code: |
        console.log("Hello, World!");
    content: |
      ### Hello World
      This is the second step. It shows a basic code example.
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
    content: |
      ### Installation
      This is the first step. It talks about how to install the software.
  - media:
      type: code
      lang: javascript
      code: |
        console.log("Hello, World!");
    content: |
      ### Hello World
      This is the second step. It shows a basic code example.
---
```