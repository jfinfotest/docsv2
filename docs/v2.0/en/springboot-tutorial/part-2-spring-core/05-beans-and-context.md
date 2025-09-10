---
title: "Session 5: Spring Beans and ApplicationContext"
position: 2
author: "The Spring Boot Team"
date: "2024-09-13"
---

# Session 5: Spring Beans and the ApplicationContext

## What is a Spring Bean?

In Spring, the objects that form the backbone of your application and are managed by the Spring IoC container are known as "beans." A bean is simply an object that is instantiated, assembled, and otherwise managed by a Spring IoC container.

These beans, and the dependencies between them, are reflected in the configuration metadata used by a container.

## The `ApplicationContext`

The `ApplicationContext` is the central interface within a Spring application for providing configuration information. It is the Spring container that holds and manages all the beans. When your Spring Boot application starts, it creates and initializes an `ApplicationContext`. You can think of it as a registry of all your application's components.

## Stereotype Annotations

Instead of manually defining beans in XML, Spring Boot uses classpath scanning to find classes annotated with special "stereotype" annotations and register them as beans in the `ApplicationContext`.

```grid
---
columns: 2
---
### `@Component`
This is a generic stereotype for any Spring-managed component. It is the base for other more specific annotations.

---
### `@Service`
This indicates that an annotated class is a "Service," typically used in the service layer for business logic.

---
### `@Repository`
This indicates that an annotated class is a "Repository," typically used in the persistence layer for data access. It also enables Spring's exception translation feature.

---
### `@Controller` / `@RestController`
These annotations mark a class as a web controller, used in the presentation layer to handle incoming HTTP requests.
```