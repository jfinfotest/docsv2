---
title: "Basic Blocks"
position: 1
---

# Basic Blocks

These are the fundamental components for structuring your content.

## Admonitions

Highlight key information. Use a code block with the `admonition` language.

```admonition
---
type: warning
title: "Important"
---
This is a warning admonition. It is useful for critical information.
```

- **Common types**: `note`, `tip`, `warning`, `danger`, `success`.

## Code Blocks

Use standard Markdown syntax for code blocks with syntax highlighting.

````markdown
```python
def hello():
  print("Hello, World!")
```
````

**Result:**
```python
def hello():
  print("Hello, World!")
```

## Tabbed Code Blocks

Display the same code in different languages.

````markdown
```tabs
---[tab title="Python" lang="py"]---
print("Hello")
---[tab title="JavaScript" lang="js"]---
console.log("Hello");
```
````

**Result:**
```tabs
---[tab title="Python" lang="py"]---
print("Hello")
---[tab title="JavaScript" lang="js"]---
console.log("Hello");
```
