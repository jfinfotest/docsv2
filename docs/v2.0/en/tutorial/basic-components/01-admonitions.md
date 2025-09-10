---
title: "Admonitions"
position: 1
---

# Admonitions

Admonitions are highlighted blocks of text that draw the reader's attention to important information. They are created using a code block with the `admonition` language.

The basic syntax is:

````markdown
```admonition
---
type: note
title: "Custom Title (Optional)"
---
The content of the admonition goes here. It can include **Markdown**.
```
````

### Available Types

Here are examples of all available admonition types:

```admonition
---
type: note
---
This is a `note` type admonition. It's useful for general information.
```

```admonition
---
type: info
---
This is an `info` type admonition, similar to `note`.
```

```admonition
---
type: tip
---
This is a `tip` type admonition. Perfect for giving advice or suggestions.
```

```admonition
---
type: success
---
This is a `success` type admonition. Ideal for indicating that something went well.
```

```admonition
---
type: warning
title: "Be Careful"
---
This is a `warning` type admonition. Use it to warn about potential issues.
```

```admonition
---
type: important
---
This is an `important` type admonition. For information that should not be ignored.
```

```admonition
---
type: danger
---
This is a `danger` type admonition. For critical warnings or dangerous actions.
```

```admonition
---
type: error
---
This is an `error` type admonition, similar to `danger`.
```

```admonition
---
type: bug
---
This is a `bug` type admonition. Useful for documenting known bugs.
```

```admonition
---
type: example
---
This is an `example` type admonition. Perfect for showing examples.
```

```admonition
---
type: abstract
---
This is an `abstract` or summary type admonition.
```

```admonition
---
type: question
---
This is a `question` type admonition. For posing frequently asked questions.
```

```admonition
---
type: quote
---
This is a `quote` type admonition. Ideal for quoting phrases or testimonials.
```
