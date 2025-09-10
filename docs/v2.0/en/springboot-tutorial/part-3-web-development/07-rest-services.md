---
title: "Session 7: Building a RESTful Web Service"
position: 1
author: "The Spring Boot Team"
date: "2024-09-19"
---

# Session 7: Building a RESTful Web Service

Spring Boot makes creating RESTful web services incredibly simple thanks to the `spring-boot-starter-web` dependency.

## `@RestController`

This annotation is a combination of `@Controller` and `@ResponseBody`. It tells Spring that this class will handle web requests and that the return values of its methods should be written directly to the response body (e.g., as JSON).

## Example of a REST Controller

Let's create a controller to manage a simple entity, like a `Product`.

```java
package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

// Record for a simple DTO
record Product(long id, String name) {}

@RestController
public class ProductController {

    @GetMapping("/products/{id}")
    public Product getProductById(@PathVariable long id) {
        // In a real app, you would fetch this from a database.
        return new Product(id, "Sample Product");
    }
}
```

### Try it out!

Use the REST client below to test the endpoint you just created. Run your application and click "Send".

```rest-client
---
method: "GET"
url: "http://localhost:8080/products/123"
---
```