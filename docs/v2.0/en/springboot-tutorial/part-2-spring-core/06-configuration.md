---
title: "Session 6: Configuration with Properties & YAML"
position: 3
author: "The Spring Boot Team"
date: "2024-09-16"
---

# Session 6: Configuration with `application.properties` and YAML

Spring Boot allows you to externalize configuration so you can work with the same application in different environments.

## `application.properties`

This is the default format. It is located in `src/main/resources`.

```properties
# Server port
server.port=8081

# Application name
spring.application.name=my-app
```

## `application.yml`

YAML is a popular alternative for its more readable and hierarchical syntax. Spring Boot supports it automatically if you have the `snakeyaml` dependency on your classpath (included in `spring-boot-starter`).

```yaml
server:
  port: 8081

spring:
  application:
    name: my-app
```

## Accessing Properties

You can inject configuration values into your beans using the `@Value` annotation.

```java
@Component
public class MyComponent {

    @Value("${spring.application.name}")
    private String appName;

    // ...
}
```