---
title: "Session 9: Views with Thymeleaf"
position: 3
author: "The Spring Boot Team"
date: "2024-09-25"
---

# Session 9: Working with Server-Side Views using Thymeleaf

While REST APIs are common, sometimes you need to render HTML on the server. Thymeleaf is the recommended template engine for Spring Boot.

## Configuration

Add the `spring-boot-starter-thymeleaf` dependency to your `pom.xml`.

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

## Controller and View

1.  Use the `@Controller` annotation (instead of `@RestController`).
2.  The controller method should return a `String` with the name of the view.
3.  Use a `Model` object to pass data to the view.

**Controller:**
```java
@Controller
public class WebController {

    @GetMapping("/greeting")
    public String greeting(@RequestParam String name, Model model) {
        model.addAttribute("name", name);
        return "greeting"; // Name of the HTML file without extension
    }
}
```

**View (`src/main/resources/templates/greeting.html`):**
```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Greeting</title>
</head>
<body>
    <h1 th:text="|Hello, ${name}!|">Hello, Guest!</h1>
</body>
</html>
```

### Interactive Example

The `live-code` embed below shows a simple user profile card with HTML and CSS. In a real Thymeleaf application, the data like the username and image would be dynamically passed from the controller.

```live-code
---
src: "https://codepen.io/Tolu_A/pen/xxZxyMM"
title: "Rendered Profile Card Example"
---
```

Visit `http://localhost:8080/greeting?name=World` to see the result from your application.
