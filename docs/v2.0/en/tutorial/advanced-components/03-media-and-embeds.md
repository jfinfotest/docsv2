---
title: "Media and Embeds"
position: 3
---

# Media and Embeds

Easily integrate images, galleries, videos, and interactive content from other platforms.

## Images with Lightbox

All standard Markdown images are automatically enhanced with lightbox (fullscreen) functionality and customization options.

**Basic Syntax:**
```markdown
![A beautiful view of a mountain with a lake.](https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070)
```

**Syntax with Options:**
You can add options like alignment and shadow in the `alt` text.

```markdown
![A beautiful view{align=right width=300px shadow=true}](https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800)
```

**Result:**

![A beautiful view{align=right width=300px shadow=true}](https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800)
This is a demonstration of how text flows around an aligned image. The image component respects alignment and width options to integrate seamlessly into your content. Click the image to open it in the fullscreen viewer.

<br clear="all" />

## Image Gallery

Displays multiple images in an interactive grid. All images open in a shared lightbox.

**Syntax:**
````markdown
```gallery
---
columns: 3
items:
  - src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400"
    alt: "Town on a lake"
  - src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=400"
    alt: "Cabin in the mountains"
  - src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400"
    alt: "Misty forest"
---
```
````
**Result:**
```gallery
---
columns: 3
items:
  - src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400"
    alt: "Town on a lake"
  - src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=400"
    alt: "Cabin in the mountains"
  - src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400"
    alt: "Misty forest"
---
```

## Video Embed

Easily embed videos from YouTube or Vimeo.

**Syntax:**
````markdown
```video
---
src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
title: "YouTube Video Example"
---
```
````
**Result:**
```video
---
src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
title: "YouTube Video Example"
---
```

## Live Code Embed

Embed interactive code editors from services like CodePen, JSFiddle, or CodeSandbox.

**Syntax:**
````markdown
```live-code
---
src: "https://codepen.io/chriscoyier/pen/gOMdOr"
title: "CodePen Example"
---
```
````
**Result:**
```live-code
---
src: "https://codepen.io/chriscoyier/pen/gOMdOr"
title: "CodePen Example"
---
```
