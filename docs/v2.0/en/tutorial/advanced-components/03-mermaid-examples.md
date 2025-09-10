---
title: "Complete Mermaid Examples"
position: 3
---

# Complete Mermaid Diagram Examples

This guide presents detailed examples of different types of diagrams you can create using the Mermaid component.

## Flowcharts

### Example 1: Software Development Process

````markdown
```mermaid
flowchart TD
    A[Project Start] --> B[Requirements Analysis]
    B --> C{Requirements Clear?}
    C -->|Yes| D[System Design]
    C -->|No| E[Client Meeting]
    E --> B
    D --> F[Implementation]
    F --> G[Testing]
    G --> H{Tests Successful?}
    H -->|Yes| I[Deployment]
    H -->|No| J[Bug Fixes]
    J --> F
    I --> K[Maintenance]
    K --> L[End]
    
    style A fill:#e1f5fe
    style I fill:#c8e6c9
    style L fill:#ffcdd2
```
````

**Result:**
```mermaid
flowchart TD
    A[Project Start] --> B[Requirements Analysis]
    B --> C{Requirements Clear?}
    C -->|Yes| D[System Design]
    C -->|No| E[Client Meeting]
    E --> B
    D --> F[Implementation]
    F --> G[Testing]
    G --> H{Tests Successful?}
    H -->|Yes| I[Deployment]
    H -->|No| J[Bug Fixes]
    J --> F
    I --> K[Maintenance]
    K --> L[End]
    
    style A fill:#e1f5fe
    style I fill:#c8e6c9
    style L fill:#ffcdd2
```

### Example 2: Authentication System

````markdown
```mermaid
flowchart LR
    U[User] --> L[Login]
    L --> V{Validate Credentials}
    V -->|Valid| T[Generate Token]
    V -->|Invalid| E[Login Error]
    T --> D[Dashboard]
    E --> L
    D --> A[Authorized Actions]
    A --> S[Logout]
    S --> L
```
````

**Result:**
```mermaid
flowchart LR
    U[User] --> L[Login]
    L --> V{Validate Credentials}
    V -->|Valid| T[Generate Token]
    V -->|Invalid| E[Login Error]
    T --> D[Dashboard]
    E --> L
    D --> A[Authorized Actions]
    A --> S[Logout]
    S --> L
```

## Sequence Diagrams

### Example 3: REST API - Purchase Process

````markdown
```mermaid
sequenceDiagram
    participant C as Client
    participant F as Frontend
    participant A as API Gateway
    participant P as Product Service
    participant O as Order Service
    participant Pa as Payment Service
    participant D as Database
    
    C->>F: Select product
    F->>A: GET /products/{id}
    A->>P: Get product details
    P->>D: Query product
    D-->>P: Product data
    P-->>A: Product information
    A-->>F: Product response
    F-->>C: Display product
    
    C->>F: Add to cart
    F->>A: POST /cart
    A->>O: Create temporary order
    O->>D: Save order
    D-->>O: Confirmation
    O-->>A: Order created
    A-->>F: Cart updated
    
    C->>F: Proceed to payment
    F->>A: POST /payments
    A->>Pa: Process payment
    Pa->>D: Validate information
    D-->>Pa: Validation successful
    Pa-->>A: Payment confirmed
    A->>O: Confirm order
    O->>D: Update status
    D-->>O: Order confirmed
    O-->>A: Order finalized
    A-->>F: Purchase successful
    F-->>C: Purchase confirmation
```
````

**Result:**
```mermaid
sequenceDiagram
    participant C as Client
    participant F as Frontend
    participant A as API Gateway
    participant P as Product Service
    participant O as Order Service
    participant Pa as Payment Service
    participant D as Database
    
    C->>F: Select product
    F->>A: GET /products/{id}
    A->>P: Get product details
    P->>D: Query product
    D-->>P: Product data
    P-->>A: Product information
    A-->>F: Product response
    F-->>C: Display product
    
    C->>F: Add to cart
    F->>A: POST /cart
    A->>O: Create temporary order
    O->>D: Save order
    D-->>O: Confirmation
    O-->>A: Order created
    A-->>F: Cart updated
    
    C->>F: Proceed to payment
    F->>A: POST /payments
    A->>Pa: Process payment
    Pa->>D: Validate information
    D-->>Pa: Validation successful
    Pa-->>A: Payment confirmed
    A->>O: Confirm order
    O->>D: Update status
    D-->>O: Order confirmed
    O-->>A: Order finalized
    A-->>F: Purchase successful
    F-->>C: Purchase confirmation
```

## Class Diagrams

### Example 4: Library Management System

````markdown
```mermaid
classDiagram
    class User {
        -id: String
        -name: String
        -email: String
        -registrationDate: Date
        +login()
        +logout()
        +searchBook()
    }
    
    class Book {
        -isbn: String
        -title: String
        -author: String
        -publicationDate: Date
        -available: Boolean
        +lend()
        +return()
        +getInfo()
    }
    
    class Loan {
        -id: String
        -loanDate: Date
        -returnDate: Date
        -status: String
        +create()
        +finalize()
        +extend()
    }
    
    class Library {
        -name: String
        -address: String
        +addBook()
        +removeBook()
        +searchBook()
        +generateReport()
    }
    
    User ||--o{ Loan : makes
    Book ||--o{ Loan : includes
    Library ||--o{ Book : contains
    Library ||--o{ User : registers
```
````

**Result:**
```mermaid
classDiagram
    class User {
        -id: String
        -name: String
        -email: String
        -registrationDate: Date
        +login()
        +logout()
        +searchBook()
    }
    
    class Book {
        -isbn: String
        -title: String
        -author: String
        -publicationDate: Date
        -available: Boolean
        +lend()
        +return()
        +getInfo()
    }
    
    class Loan {
        -id: String
        -loanDate: Date
        -returnDate: Date
        -status: String
        +create()
        +finalize()
        +extend()
    }
    
    class Library {
        -name: String
        -address: String
        +addBook()
        +removeBook()
        +searchBook()
        +generateReport()
    }
    
    User ||--o{ Loan : makes
    Book ||--o{ Loan : includes
    Library ||--o{ Book : contains
    Library ||--o{ User : registers
```

## State Diagrams

### Example 5: Purchase Order States

````markdown
```mermaid
stateDiagram-v2
    [*] --> Created
    Created --> Pending : Confirm
    Pending --> Processing : Start processing
    Processing --> Shipped : Shipping confirmed
    Processing --> Cancelled : Cancel order
    Shipped --> Delivered : Confirm delivery
    Shipped --> Returned : Start return
    Delivered --> [*]
    Cancelled --> [*]
    Returned --> Refunded : Process refund
    Refunded --> [*]
    
    Pending --> Cancelled : Timeout
    
    note right of Processing
        Order is being
        prepared for shipping
    end note
    
    note left of Returned
        Customer can return
        product within 30 days
    end note
```
````

**Result:**
```mermaid
stateDiagram-v2
    [*] --> Created
    Created --> Pending : Confirm
    Pending --> Processing : Start processing
    Processing --> Shipped : Shipping confirmed
    Processing --> Cancelled : Cancel order
    Shipped --> Delivered : Confirm delivery
    Shipped --> Returned : Start return
    Delivered --> [*]
    Cancelled --> [*]
    Returned --> Refunded : Process refund
    Refunded --> [*]
    
    Pending --> Cancelled : Timeout
    
    note right of Processing
        Order is being
        prepared for shipping
    end note
    
    note left of Returned
        Customer can return
        product within 30 days
    end note
```

## Entity Relationship Diagrams

### Example 6: E-commerce Database

````markdown
```mermaid
erDiagram
    USER {
        int id PK
        string name
        string email UK
        string password
        date registration_date
        boolean active
    }
    
    PRODUCT {
        int id PK
        string name
        text description
        decimal price
        int stock
        int category_id FK
        boolean available
    }
    
    CATEGORY {
        int id PK
        string name
        string description
        int parent_id FK
    }
    
    ORDER {
        int id PK
        int user_id FK
        date order_date
        decimal total
        string status
        text shipping_address
    }
    
    ORDER_DETAIL {
        int id PK
        int order_id FK
        int product_id FK
        int quantity
        decimal unit_price
        decimal subtotal
    }
    
    CART {
        int id PK
        int user_id FK
        int product_id FK
        int quantity
        date date_added
    }
    
    USER ||--o{ ORDER : "places"
    USER ||--o{ CART : "has"
    ORDER ||--o{ ORDER_DETAIL : "contains"
    PRODUCT ||--o{ ORDER_DETAIL : "included in"
    PRODUCT ||--o{ CART : "added to"
    CATEGORY ||--o{ PRODUCT : "classifies"
    CATEGORY ||--o{ CATEGORY : "subcategory of"
```
````

**Result:**
```mermaid
erDiagram
    USER {
        int id PK
        string name
        string email UK
        string password
        date registration_date
        boolean active
    }
    
    PRODUCT {
        int id PK
        string name
        text description
        decimal price
        int stock
        int category_id FK
        boolean available
    }
    
    CATEGORY {
        int id PK
        string name
        string description
        int parent_id FK
    }
    
    ORDER {
        int id PK
        int user_id FK
        date order_date
        decimal total
        string status
        text shipping_address
    }
    
    ORDER_DETAIL {
        int id PK
        int order_id FK
        int product_id FK
        int quantity
        decimal unit_price
        decimal subtotal
    }
    
    CART {
        int id PK
        int user_id FK
        int product_id FK
        int quantity
        date date_added
    }
    
    USER ||--o{ ORDER : "places"
    USER ||--o{ CART : "has"
    ORDER ||--o{ ORDER_DETAIL : "contains"
    PRODUCT ||--o{ ORDER_DETAIL : "included in"
    PRODUCT ||--o{ CART : "added to"
    CATEGORY ||--o{ PRODUCT : "classifies"
    CATEGORY ||--o{ CATEGORY : "subcategory of"
```

## Gantt Charts

### Example 7: Project Timeline

````markdown
```mermaid
gantt
    title Web Application Development Timeline
    dateFormat  YYYY-MM-DD
    section Planning
    Requirements analysis    :done,    req, 2024-01-01, 2024-01-15
    Architecture design      :done,    arch, 2024-01-10, 2024-01-25
    UI/UX design            :done,    ui, 2024-01-20, 2024-02-05
    
    section Development
    Project setup           :done,    setup, 2024-02-01, 2024-02-03
    Backend API             :active,  backend, 2024-02-03, 2024-03-15
    Frontend                :         frontend, 2024-02-20, 2024-04-01
    Integration             :         integration, 2024-03-15, 2024-04-05
    
    section Testing
    Unit testing            :         unit, 2024-03-01, 2024-04-10
    Integration testing     :         int-test, 2024-04-05, 2024-04-15
    User testing            :         user-test, 2024-04-10, 2024-04-20
    
    section Deployment
    Server configuration    :         server, 2024-04-15, 2024-04-18
    Production deployment   :         deploy, 2024-04-18, 2024-04-20
    Initial monitoring      :         monitor, 2024-04-20, 2024-04-25
```
````

**Result:**
```mermaid
gantt
    title Web Application Development Timeline
    dateFormat  YYYY-MM-DD
    section Planning
    Requirements analysis    :done,    req, 2024-01-01, 2024-01-15
    Architecture design      :done,    arch, 2024-01-10, 2024-01-25
    UI/UX design            :done,    ui, 2024-01-20, 2024-02-05
    
    section Development
    Project setup           :done,    setup, 2024-02-01, 2024-02-03
    Backend API             :active,  backend, 2024-02-03, 2024-03-15
    Frontend                :         frontend, 2024-02-20, 2024-04-01
    Integration             :         integration, 2024-03-15, 2024-04-05
    
    section Testing
    Unit testing            :         unit, 2024-03-01, 2024-04-10
    Integration testing     :         int-test, 2024-04-05, 2024-04-15
    User testing            :         user-test, 2024-04-10, 2024-04-20
    
    section Deployment
    Server configuration    :         server, 2024-04-15, 2024-04-18
    Production deployment   :         deploy, 2024-04-18, 2024-04-20
    Initial monitoring      :         monitor, 2024-04-20, 2024-04-25
```

## Tips for Using Mermaid

### Best Practices

1. **Keep it simple**: Don't overload diagrams with too much information
2. **Use consistent colors**: Define a color scheme and stick to it
3. **Clear labels**: Use descriptive names for nodes and relationships
4. **Documentation**: Always include a brief explanation of the diagram

### Customization with Styles

You can customize the appearance of your diagrams:

````markdown
```mermaid
flowchart TD
    A[Start] --> B[Process]
    B --> C[End]
    
    classDef startClass fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef processClass fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef endClass fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
    
    class A startClass
    class B processClass
    class C endClass
```
````

**Result:**
```mermaid
flowchart TD
    A[Start] --> B[Process]
    B --> C[End]
    
    classDef startClass fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef processClass fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef endClass fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
    
    class A startClass
    class B processClass
    class C endClass
```

## Additional Resources

- [Official Mermaid Documentation](https://mermaid.js.org/)
- [Mermaid Live Editor](https://mermaid.live/)
- [Example Gallery](https://mermaid.js.org/syntax/examples.html)

Experiment with different diagram types to find the one that best fits your documentation needs!