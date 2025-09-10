---
title: "Session 14: Database Migrations"
position: 4
author: "The Spring Boot Team"
date: "2024-10-10"
---

# Session 14: Database Migrations with Flyway

As your application evolves, your database schema will change. Managing these changes manually is error-prone. Tools like Flyway or Liquibase help you version your database.

## Using Flyway

1.  Add the Flyway dependency to your `pom.xml`.
2.  Create SQL migration files in `src/main/resources/db/migration`.
3.  Disable Hibernate's DDL generation: `spring.jpa.hibernate.ddl-auto=validate`.

### Migration Timeline Example

This timeline illustrates how migrations version your database over time.

```timeline
### V1__Create_customer_table.sql | 2024-10-10
The initial schema is created with the `customer` table.

---

### V2__Add_email_to_customer.sql | 2024-10-12
A new `email` column is added to the `customer` table to store user emails.

---

### V3__Add_orders_table.sql | 2024-10-15
A new `orders` table is introduced to track customer purchases.
```