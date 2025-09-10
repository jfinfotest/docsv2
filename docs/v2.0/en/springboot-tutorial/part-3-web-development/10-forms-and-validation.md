---
title: "Session 10: Forms and Validation"
position: 4
author: "The Spring Boot Team"
date: "2024-09-28"
---

# Session 10: Handling Forms and Data Validation

Spring Boot makes it easy to handle form submissions and validate the input data.

## Validation Setup

Add the `spring-boot-starter-validation` dependency to your `pom.xml`.

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

## Form Object (DTO)

Create a class that represents the form data and add validation annotations (from `jakarta.validation.constraints`).

```java
public class UserForm {

    @NotEmpty
    @Size(min = 2, max = 30)
    private String name;

    @NotEmpty
    @Email
    private String email;

    // Getters and Setters...
}
```

## Controller and View

The controller will have two methods: one to display the form (GET) and one to process it (POST).

**Controller:**
```java
@Controller
public class FormController {

    @GetMapping("/register")
    public String showForm(Model model) {
        model.addAttribute("userForm", new UserForm());
        return "register-form";
    }

    @PostMapping("/register")
    public String processForm(@Valid UserForm userForm, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "register-form"; // Redisplay the form with errors
        }
        // Logic to save the user
        return "redirect:/success";
    }
}
```

**View (using Thymeleaf):**
```html
<form action="#" th:action="@{/register}" th:object="${userForm}" method="post">
    <div>
        <label>Name:</label>
        <input type="text" th:field="*{name}" />
        <p th:if="${#fields.hasErrors('name')}" th:errors="*{name}">Name Error</p>
    </div>
    <!-- Fields for email, etc. -->
    <button type="submit">Register</button>
</form>
```