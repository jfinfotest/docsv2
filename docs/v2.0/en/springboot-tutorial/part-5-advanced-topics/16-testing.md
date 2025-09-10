---
title: "Session 16: Unit and Integration Testing"
position: 2
author: "The Spring Boot Team"
date: "2024-10-16"
---

# Session 16: Unit and Integration Testing

Spring Boot provides excellent support for testing.

```comparison-table
---
headers:
  - "Aspect"
  - { text: "Unit Test", highlight: false }
  - { text: "Integration Test", highlight: true }
rows:
  - ["Scope", "Single class", "Multiple components collaborating"]
  - ["Speed", "Very Fast", "Slower"]
  - ["Dependencies", "Mocked (using Mockito)", "Real (or in-memory versions)"]
  - ["Spring Context", "No", "Yes (`@SpringBootTest`)"]
---
```

## Unit Tests

Unit tests focus on a single component in isolation. Mockito is used to simulate dependencies.

```java
@ExtendWith(MockitoExtension.class)
class MyServiceTest {
    // ... test code
}
```

## Integration Tests

Integration tests check the interaction between multiple components. `@SpringBootTest` is used for this.

```java
@SpringBootTest
class MyApplicationTests {
    // ... test code
}
```

### Test Your Knowledge!

```quiz
---
questions:
  - text: "Which annotation is used to load the full Spring ApplicationContext for an integration test?"
    choices:
      - "@WebMvcTest"
      - "@DataJpaTest"
      - "@SpringBootTest"
    answer: "@SpringBootTest"
  - text: "What library is commonly used to create 'mocks' for unit testing in Spring?"
    choices:
      - "JUnit 5"
      - "Mockito"
      - "AssertJ"
    answer: "Mockito"
---
```