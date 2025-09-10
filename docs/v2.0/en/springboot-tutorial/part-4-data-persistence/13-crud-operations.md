---
title: "Session 13: CRUD Operations"
position: 3
author: "The Spring Boot Team"
date: "2024-10-07"
---

# Session 13: Performing CRUD Operations

Once you have your entity and repository, you can inject the repository into other components (like a service or controller) to interact with the database.

The `JpaRepository` interface already provides standard CRUD methods:
- `save()`: Saves or updates an entity.
- `findById()`: Finds an entity by its ID.
- `findAll()`: Returns all entities.
- `deleteById()`: Deletes an entity by its ID.

## Example Usage in a Service

```java
@Service
public class CustomerService {

    private final CustomerRepository repository;

    @Autowired
    public CustomerService(CustomerRepository repository) {
        this.repository = repository;
    }

    public Customer createCustomer(String firstName, String lastName) {
        Customer newCustomer = new Customer(firstName, lastName);
        return repository.save(newCustomer);
    }

    public Optional<Customer> getCustomer(Long id) {
        return repository.findById(id);
    }

    public List<Customer> getAllCustomers() {
        return repository.findAll();
    }
}
```