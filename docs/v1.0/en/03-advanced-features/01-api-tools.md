---
title: "API Tools"
position: 1
---

# API Tools

Document and test APIs directly on your site.

## REST Client

A simple HTTP client for making requests.

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
**Result:**
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

## API Explorer

A structured interface for exploring your API endpoints.

````markdown
```api-explorer
---
baseUrl: "https://jsonplaceholder.typicode.com"
endpoints:
  - path: "/users/{id}"
    method: "GET"
    title: "Get User"
    description: "Retrieves a user by their ID."
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
**Result:**
```api-explorer
---
baseUrl: "https://jsonplaceholder.typicode.com"
endpoints:
  - path: "/users/{id}"
    method: "GET"
    title: "Get User"
    description: "Retrieves a user by their ID."
    parameters:
      - name: "id"
        in: "path"
        required: true
        schema:
          type: "integer"
          example: 1
---
```
