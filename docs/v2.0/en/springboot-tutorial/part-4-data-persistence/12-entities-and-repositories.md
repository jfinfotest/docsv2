---
title: "Session 12: Entities and Repositories"
position: 2
author: "The Spring Boot Team"
date: "2024-10-04"
---

# Session 12: Creating Entities and Repositories

## JPA Entities

An entity is a Java class that maps to a database table. It is annotated with `@Entity`.

```java
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Customer {

    @Id
    @GeneratedValue
    private Long id;
    private String firstName;
    private String lastName;

    // Constructors, Getters, and Setters...
}
```

## Spring Data Repositories

A repository is an interface that provides methods for CRUD operations. You simply extend one of the Spring Data Repository interfaces, such as `JpaRepository`.

```java
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    // Spring Data automatically creates the implementation for this method
    List<Customer> findByLastName(String lastName);
}
```

Spring Data JPA will parse the method name `findByLastName` and automatically create a query to find customers by their last name. You don't need to write the implementation!