---
title: "API and AI Features"
position: 1
---

# API and AI Features

The platform includes powerful tools for interacting with APIs and utilizing Google Gemini's artificial intelligence.

## REST Client

An interactive HTTP client to make API requests directly from your documentation.

**Syntax:**

````markdown
```rest-client
---
method: "GET"
url: "https://jsonplaceholder.typicode.com/posts/1"
headers:
  Content-Type: "application/json"
body: ""
---
```
````

**Result:**

```rest-client
---
method: "GET"
url: "https://jsonplaceholder.typicode.com/posts/1"
headers:
  Content-Type: "application/json"
body: ""
---
```

## API Explorer

Document and test your API endpoints in a structured, user-friendly way, similar to Swagger UI.

**Syntax:**

````markdown
```api-explorer
---
baseUrl: "https://jsonplaceholder.typicode.com"
endpoints:
  - path: "/posts/{id}"
    method: "GET"
    title: "Get Post by ID"
    description: "Retrieves a single post by its ID."
    parameters:
      - name: "id"
        in: "path"
        description: "The ID of the post to retrieve."
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
  - path: "/posts/{id}"
    method: "GET"
    title: "Get Post by ID"
    description: "Retrieves a single post by its ID."
    parameters:
      - name: "id"
        in: "path"
        description: "The ID of the post to retrieve."
        required: true
        schema:
          type: "integer"
          example: 1
  - path: "/posts"
    method: "POST"
    title: "Create a New Post"
    description: "Adds a new post to the blog."
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: "object"
            properties:
              title:
                type: "string"
                example: "foo"
              body:
                type: "string"
                example: "bar"
              userId:
                type: "integer"
                example: 1
---
```

## AI Features with Gemini

On each content page, a floating action bar appears in the bottom-right corner. These actions use Google Gemini AI to interact with the content of the current page.

**Requirement:** To use these features, you must enter a **Gemini API Key** in the **Settings** panel.

### Available Actions

- **Chat with document**: Start a conversation with an AI assistant that will answer questions based *solely* on the content of the current page. It's context-aware and will not use external knowledge, ensuring answers are relevant to your documentation.
- **Generate AI Quiz**: Creates a quiz with open-ended questions to test your comprehension of the document. The AI then grades your answers, providing a score and constructive feedback.
- **Generate Glossary**: Automatically scans the document to identify key terms and generates clear, concise definitions for each, based on the context provided in the text.
- **Generate Summary**: Creates a concise, easy-to-read summary of the entire page, presented as a list of key bullet points.
- **Simplify Concept**: Identifies the most complex or technical concept on the page and explains it in simple terms using a helpful analogy.
- **Analyze Code**: Allows you to select any code block from the page and ask the AI to either explain what it does in plain language or translate it into another programming language.
- **AI Podcast Generator**: Transforms the document's content into a short audio podcast. You can choose between a single-narrator style (monologue) or a two-person conversation (dialogue) and select from various AI voices.
