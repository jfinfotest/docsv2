---
title: "Mermaid Examples"
position: 5
---

# Mermaid Diagram Examples

This guide presents practical examples of different types of diagrams you can create using Mermaid.

## Flowcharts

### Example 1: Login Process

````markdown
```mermaid
flowchart TD
    A[User enters credentials] --> B{Valid credentials?}
    B -->|Yes| C[Generate JWT token]
    B -->|No| D[Show error]
    C --> E[Redirect to dashboard]
    D --> F[Return to login]
    E --> G[User authenticated]
    F --> A
    
    style A fill:#e3f2fd
    style G fill:#e8f5e8
    style D fill:#ffebee
```
````

**Result:**
```mermaid
flowchart TD
    A[User enters credentials] --> B{Valid credentials?}
    B -->|Yes| C[Generate JWT token]
    B -->|No| D[Show error]
    C --> E[Redirect to dashboard]
    D --> F[Return to login]
    E --> G[User authenticated]
    F --> A
    
    style A fill:#e3f2fd
    style G fill:#e8f5e8
    style D fill:#ffebee
```

### Example 2: Task Lifecycle

````markdown
```mermaid
flowchart LR
    A[New Task] --> B[In Progress]
    B --> C[Under Review]
    C --> D{Approved?}
    D -->|Yes| E[Completed]
    D -->|No| F[Needs Changes]
    F --> B
    E --> G[Archived]
```
````

**Result:**
```mermaid
flowchart LR
    A[New Task] --> B[In Progress]
    B --> C[Under Review]
    C --> D{Approved?}
    D -->|Yes| E[Completed]
    D -->|No| F[Needs Changes]
    F --> B
    E --> G[Archived]
```

## Sequence Diagrams

### Example 3: Online Purchase Process

````markdown
```mermaid
sequenceDiagram
    participant U as User
    participant W as Web App
    participant A as API
    participant D as Database
    participant P as Payment Gateway
    
    U->>W: Select product
    W->>A: GET /product/{id}
    A->>D: Query product
    D-->>A: Product data
    A-->>W: Product information
    W-->>U: Display product
    
    U->>W: Add to cart
    W->>A: POST /cart
    A->>D: Save to cart
    D-->>A: Confirmation
    A-->>W: Cart updated
    
    U->>W: Proceed to payment
    W->>P: Initialize transaction
    P-->>U: Payment form
    U->>P: Payment data
    P->>A: Confirm payment
    A->>D: Create order
    D-->>A: Order created
    A-->>W: Payment successful
    W-->>U: Purchase confirmation
```
````

**Result:**
```mermaid
sequenceDiagram
    participant U as User
    participant W as Web App
    participant A as API
    participant D as Database
    participant P as Payment Gateway
    
    U->>W: Select product
    W->>A: GET /product/{id}
    A->>D: Query product
    D-->>A: Product data
    A-->>W: Product information
    W-->>U: Display product
    
    U->>W: Add to cart
    W->>A: POST /cart
    A->>D: Save to cart
    D-->>A: Confirmation
    A-->>W: Cart updated
    
    U->>W: Proceed to payment
    W->>P: Initialize transaction
    P-->>U: Payment form
    U->>P: Payment data
    P->>A: Confirm payment
    A->>D: Create order
    D-->>A: Order created
    A-->>W: Payment successful
    W-->>U: Purchase confirmation
```

## Class Diagrams

### Example 4: Blog System

````markdown
```mermaid
classDiagram
    class User {
        -id: number
        -name: string
        -email: string
        +login()
        +logout()
        +createPost()
    }
    
    class Post {
        -id: number
        -title: string
        -content: string
        -createdAt: Date
        +publish()
        +edit()
        +delete()
    }
    
    class Comment {
        -id: number
        -text: string
        -date: Date
        +create()
        +edit()
        +delete()
    }
    
    class Category {
        -id: number
        -name: string
        -description: string
        +add()
        +remove()
    }
    
    User ||--o{ Post : writes
    Post ||--o{ Comment : has
    User ||--o{ Comment : makes
    Post }o--|| Category : belongs to
```
````

**Result:**
```mermaid
classDiagram
    class User {
        -id: number
        -name: string
        -email: string
        +login()
        +logout()
        +createPost()
    }
    
    class Post {
        -id: number
        -title: string
        -content: string
        -createdAt: Date
        +publish()
        +edit()
        +delete()
    }
    
    class Comment {
        -id: number
        -text: string
        -date: Date
        +create()
        +edit()
        +delete()
    }
    
    class Category {
        -id: number
        -name: string
        -description: string
        +add()
        +remove()
    }
    
    User ||--o{ Post : writes
    Post ||--o{ Comment : has
    User ||--o{ Comment : makes
    Post }o--|| Category : belongs to
```

## State Diagrams

### Example 5: Order States

````markdown
```mermaid
stateDiagram-v2
    [*] --> Pending
    Pending --> Confirmed : Payment received
    Confirmed --> Preparing : Start preparation
    Preparing --> Shipped : Shipment made
    Shipped --> Delivered : Delivery confirmed
    Delivered --> [*]
    
    Pending --> Cancelled : Cancel order
    Confirmed --> Cancelled : Cancel order
    Cancelled --> [*]
    
    Shipped --> Returned : Request return
    Returned --> Refunded : Process refund
    Refunded --> [*]
```
````

**Result:**
```mermaid
stateDiagram-v2
    [*] --> Pending
    Pending --> Confirmed : Payment received
    Confirmed --> Preparing : Start preparation
    Preparing --> Shipped : Shipment made
    Shipped --> Delivered : Delivery confirmed
    Delivered --> [*]
    
    Pending --> Cancelled : Cancel order
    Confirmed --> Cancelled : Cancel order
    Cancelled --> [*]
    
    Shipped --> Returned : Request return
    Returned --> Refunded : Process refund
    Refunded --> [*]
```

## Gantt Charts

### Example 6: Sprint Planning

````markdown
```mermaid
gantt
    title Sprint 1 - Feature Development
    dateFormat  YYYY-MM-DD
    section Analysis
    Define user stories           :done, analysis, 2024-01-01, 2024-01-03
    Task estimation              :done, estimation, 2024-01-03, 2024-01-05
    
    section Development
    Environment setup            :done, setup, 2024-01-05, 2024-01-06
    Feature A                    :active, featureA, 2024-01-06, 2024-01-12
    Feature B                    :featureB, 2024-01-10, 2024-01-16
    
    section Testing
    Unit testing                 :testing, 2024-01-12, 2024-01-18
    Integration testing          :integration, 2024-01-16, 2024-01-20
    
    section Deployment
    Prepare release              :release, 2024-01-18, 2024-01-20
    Deploy to production         :deploy, 2024-01-20, 2024-01-21
```
````

**Result:**
```mermaid
gantt
    title Sprint 1 - Feature Development
    dateFormat  YYYY-MM-DD
    section Analysis
    Define user stories           :done, analysis, 2024-01-01, 2024-01-03
    Task estimation              :done, estimation, 2024-01-03, 2024-01-05
    
    section Development
    Environment setup            :done, setup, 2024-01-05, 2024-01-06
    Feature A                    :active, featureA, 2024-01-06, 2024-01-12
    Feature B                    :featureB, 2024-01-10, 2024-01-16
    
    section Testing
    Unit testing                 :testing, 2024-01-12, 2024-01-18
    Integration testing          :integration, 2024-01-16, 2024-01-20
    
    section Deployment
    Prepare release              :release, 2024-01-18, 2024-01-20
    Deploy to production         :deploy, 2024-01-20, 2024-01-21
```

## Useful Tips

### Style Customization

You can customize colors and styles of your diagrams:

````markdown
```mermaid
flowchart TD
    A[Start] --> B[Process]
    B --> C[End]
    
    classDef start fill:#e1f5fe,stroke:#0277bd,stroke-width:3px
    classDef process fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef end fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    
    class A start
    class B process
    class C end
```
````

**Result:**
```mermaid
flowchart TD
    A[Start] --> B[Process]
    B --> C[End]
    
    classDef start fill:#e1f5fe,stroke:#0277bd,stroke-width:3px
    classDef process fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef end fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    
    class A start
    class B process
    class C end
```

### Best Practices

1. **Simplicity**: Keep diagrams simple and easy to understand
2. **Consistency**: Use a consistent color scheme
3. **Clear labels**: Use descriptive names
4. **Documentation**: Include explanations when necessary

## Additional Resources

- [Official Mermaid Documentation](https://mermaid.js.org/)
- [Live Editor](https://mermaid.live/)
- [More Examples](https://mermaid.js.org/syntax/examples.html)

Experiment with these examples and create your own diagrams!