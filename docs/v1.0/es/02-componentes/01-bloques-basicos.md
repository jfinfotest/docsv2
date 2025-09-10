---
title: "Bloques Básicos"
position: 1
---

# Bloques Básicos

Estos son los componentes fundamentales para estructurar tu contenido.

## Avisos (Admonitions)

Resalta información clave. Usa un bloque de código con el lenguaje `admonition`.

```admonition
---
type: warning
title: "Importante"
---
Este es un aviso de advertencia. Es útil para información crítica.
```

- **Tipos comunes**: `note`, `tip`, `warning`, `danger`, `success`.

## Bloques de Código

Usa la sintaxis estándar de Markdown para bloques de código con resaltado de sintaxis.

````markdown
```python
def hello():
  print("Hello, World!")
```
````

**Resultado:**
```python
def hello():
  print("Hello, World!")
```

## Bloques de Código con Pestañas

Muestra el mismo código en diferentes lenguajes.

````markdown
```tabs
---[tab title="Python" lang="py"]---
print("Hola")
---[tab title="JavaScript" lang="js"]---
console.log("Hola");
```
````

**Resultado:**
```tabs
---[tab title="Python" lang="py"]---
print("Hola")
---[tab title="JavaScript" lang="js"]---
console.log("Hola");
```
