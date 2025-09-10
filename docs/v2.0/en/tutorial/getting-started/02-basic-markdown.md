---
title: "Full Markdown Syntax Guide"
position: 2
---

# Full Markdown Syntax Guide

This platform supports the standard [GitHub Flavored Markdown (GFM)](https://github.github.com/gfm/) syntax and extends it with additional features like mathematical formulas and customizable images.

## Frontmatter

Each page can include a YAML metadata block at the top. Learn more about this in our [frontmatter usage guide](./03-frontmatter-usage.md).

## Text Styles

| Style | Syntax | Example |
| :--- | :--- | :--- |
| **Bold** | `**text**` or `__text__` | **Bold text** |
| *Italic* | `*text*` or `_text_` | *Italic text* |
| ~~Strikethrough~~ | `~~text~~` | ~~Strikethrough text~~ |
| `Inline Code` | `` `code` `` | `console.log()` |

## Headings

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
```
`##` and `###` headings automatically appear in the "On this page" table of contents.

## Blockquotes

> This is a blockquote. It can span multiple lines.
>
> > Blockquotes can also be nested.

## Lists

### Unordered
```markdown
* Apples
* Oranges
  * Valencia
  * Blood
* Bananas
```
* Apples
* Oranges
  * Valencia
  * Blood
* Bananas

### Ordered
```markdown
1. First step
2. Second step
3. Third step
```
1. First step
2. Second step
3. Third step

### Task List
```markdown
- [x] Completed task
- [ ] Pending task
```
- [x] Completed task
- [ ] Pending task

## Table

```markdown
| Left-aligned | Center-aligned | Right-aligned |
| :----------- | :------------: | ------------: |
| Content      |    Content     |       Content |
| Cell         |      Cell      |          Cell |
```
| Left-aligned | Center-aligned | Right-aligned |
| :----------- | :------------: | ------------: |
| Content      |    Content     |       Content |
| Cell         |      Cell      |          Cell |

## Images with Options

Images are interactive (they open in a lightbox) and you can control their appearance.

```markdown
![A landscape{width=400px align=center shadow=true}](https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800)
```
![A landscape{width=400px align=center shadow=true}](https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800)

## Math Formulas (KaTeX)

You can render mathematical expressions using LaTeX syntax.

**Inline:** `$E = mc^2$` renders as $E = mc^2$.

**Block:**
```markdown
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

## Footnotes

Footnotes are a great way to add additional information or citations.[^1]

Just add another reference for a second note.[^long-note]

[^1]: This is the content of the first footnote.
[^long-note]: And this is the content of the second note, which can be longer and contain multiple paragraphs.
