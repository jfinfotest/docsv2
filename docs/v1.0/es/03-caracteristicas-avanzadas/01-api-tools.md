---
title: "Herramientas para API"
position: 1
---

# Herramientas para API

Documenta y prueba APIs directamente en tu sitio.

## Cliente REST

Un cliente HTTP simple para realizar peticiones.

````markdown
```rest-client
---
method: "POST"
url: "https://jsonplaceholder.typicode.com/posts"
headers:
  Content-Type: "application/json"
body:
  title: "foo"
  body: "bar"
  userId: 1
---
```
````
**Resultado:**
```rest-client
---
method: "POST"
url: "https://jsonplaceholder.typicode.com/posts"
headers:
  Content-Type: "application/json"
body:
  title: "foo"
  body: "bar"
  userId: 1
---
```

## Explorador de API

Una interfaz estructurada para explorar los endpoints de tu API.

````markdown
```api-explorer
---
baseUrl: "https://jsonplaceholder.typicode.com"
endpoints:
  - path: "/users/{id}"
    method: "GET"
    title: "Obtener Usuario"
    description: "Recupera un usuario por su ID."
    parameters:
      - name: "id"
        in: "path"
        required: true
        schema:
          type: "integer"
          example: 1
---
```
````
**Resultado:**
```api-explorer
---
baseUrl: "https://jsonplaceholder.typicode.com"
endpoints:
  - path: "/users/{id}"
    method: "GET"
    title: "Obtener Usuario"
    description: "Recupera un usuario por su ID."
    parameters:
      - name: "id"
        in: "path"
        required: true
        schema:
          type: "integer"
          example: 1
---
```
