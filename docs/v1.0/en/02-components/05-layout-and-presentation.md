---
title: "Layout and Presentation"
position: 5
---

# Layout and Presentation

Create visually appealing pages with complex structures.

## Grid
Organize content into a flexible grid.
```grid
---
columns: 2
---
### Column One
Content for the first column.

---

### Column Two
Content for the second column.
```

## Hero Section
An impactful page header.
```hero-section
---
title: "My Awesome Project"
subtitle: "The best solution for your needs."
backgroundImage: "https://images.unsplash.com/photo-1554147090-e1221a04a025"
---
```

## Call to Action (CTA)
A block to direct users to an action.
```cta
---
title: "Ready to Start?"
buttons:
  - text: "Sign Up Now"
    url: "#"
---
Join our platform today.
```

## Animate
Apply animations from [Animate.css](https://animate.style/) to content.
```animate
---
animation: "bounceInLeft"
---
This content will bounce in!
```

## Scrollytelling
A visual narrative that changes with the scroll.
```scrollytelling
---
steps:
  - media:
      type: image
      src: "https://images.unsplash.com/photo-1504221507732-00163c469521?q=80&w=600&h=400&fit=crop"
    content: "### The Beginning"
  - media:
      type: image
      src: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=600&h=400&fit=crop"
    content: "### The End"
---
```

## Team Profile
Showcase your team members.
```team-profile
---
columns: 2
members:
  - name: "Jane Doe"
    role: "Developer"
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&h=150&fit=crop"
    bio: "Expert in React."
---
```
