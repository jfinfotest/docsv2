---
title: "Session 8: Request Handling"
position: 2
author: "The Spring Boot Team"
date: "2024-09-22"
---

# Session 8: Handling Requests

Spring MVC offers a set of annotations to map web requests to specific methods in your controllers.

## Mapping Annotations

- `@RequestMapping`: The most general annotation. You can specify the HTTP method (`method = RequestMethod.GET`).
- `@GetMapping`: A shortcut for `@RequestMapping(method = RequestMethod.GET)`.
- `@PostMapping`: For POST requests.
- `@PutMapping`: For PUT requests.
- `@DeleteMapping`: For DELETE requests.
- `@PatchMapping`: For PATCH requests.

## Extracting Data from the Request

- `@PathVariable`: Extracts values from the URL path. Example: `/users/{userId}`.
- `@RequestParam`: Extracts parameters from the query string. Example: `/search?q=spring`.
- `@RequestBody`: Deserializes the request body (e.g., JSON) into a Java object.

### Combined Example

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    // GET /api/users?role=admin
    @GetMapping
    public List<User> getUsersByRole(@RequestParam(defaultValue = "user") String role) {
        // Logic to filter users by role
        return List.of(new User(1L, "Admin User"));
    }

    // POST /api/users
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User newUser) {
        // Logic to save the new user
        User savedUser = userService.save(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }
}
```