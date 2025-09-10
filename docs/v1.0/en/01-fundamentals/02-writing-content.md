---
title: "Writing Content"
position: 2
---

# Complete Markdown Syntax Guide v1.0

This platform supports [GitHub Flavored Markdown (GFM)](https://github.github.com/gfm/) and extends it with additional features.

## Text and Headings

```markdown
# Heading 1
## Heading 2

**Bold text** and *italic text*.
~~Strikethrough text~~ and `inline code`.
```

## Lists

**Unordered:**
* Item 1
* Item 2

**Ordered:**
1. First item
2. Second item

## Tables

| Header 1 | Header 2 |
| :--- | :--- |
| Cell 1.1 | Cell 1.2 |
| Cell 2.1 | Cell 2.2 |

## Blockquotes
> This is a blockquote.

## Math Formulas (KaTeX)

Render inline LaTeX expressions like $E=mc^2$ or in block form:
$$
\sum_{i=1}^n i = \frac{n(n+1)}{2}
$$

## Footnotes
You can add footnotes[^1] for extra information.

[^1]: Content of the footnote.
