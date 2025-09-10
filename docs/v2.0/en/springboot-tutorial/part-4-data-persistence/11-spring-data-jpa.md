---
title: "Session 11: Introduction to Spring Data JPA"
position: 1
author: "The Spring Boot Team"
date: "2024-10-01"
---

# Session 11: Introduction to Spring Data JPA

Spring Data JPA aims to significantly reduce the amount of boilerplate code required to implement the data access layer.

## Configuration

1.  Add `spring-boot-starter-data-jpa` to your `pom.xml`.
2.  Add a database driver, such as H2 (for development) or PostgreSQL.
    ```xml
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>runtime</scope>
    </dependency>
    ```
3.  Configure the database connection in `application.properties`.

    ```properties
    spring.datasource.url=jdbc:h2:mem:testdb
    spring.datasource.driverClassName=org.h2.Driver
    spring.datasource.username=sa
    spring.datasource.password=password
    spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
    ```
    For an in-memory H2 database, Spring Boot can auto-configure this for you.