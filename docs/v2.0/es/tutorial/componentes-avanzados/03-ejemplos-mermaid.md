---
title: "Ejemplos Completos de Mermaid"
position: 3
---

# Ejemplos Completos de Diagramas Mermaid

Esta guía presenta ejemplos detallados de diferentes tipos de diagramas que puedes crear usando el componente Mermaid.

## Diagramas de Flujo (Flowcharts)

### Ejemplo 1: Proceso de Desarrollo de Software

````markdown
```mermaid
flowchart TD
    A[Inicio del Proyecto] --> B[Análisis de Requisitos]
    B --> C{¿Requisitos Claros?}
    C -->|Sí| D[Diseño del Sistema]
    C -->|No| E[Reunión con Cliente]
    E --> B
    D --> F[Implementación]
    F --> G[Pruebas]
    G --> H{¿Pruebas Exitosas?}
    H -->|Sí| I[Despliegue]
    H -->|No| J[Corrección de Errores]
    J --> F
    I --> K[Mantenimiento]
    K --> L[Fin]
    
    style A fill:#e1f5fe
    style I fill:#c8e6c9
    style L fill:#ffcdd2
```
````

**Resultado:**
```mermaid
flowchart TD
    A[Inicio del Proyecto] --> B[Análisis de Requisitos]
    B --> C{¿Requisitos Claros?}
    C -->|Sí| D[Diseño del Sistema]
    C -->|No| E[Reunión con Cliente]
    E --> B
    D --> F[Implementación]
    F --> G[Pruebas]
    G --> H{¿Pruebas Exitosas?}
    H -->|Sí| I[Despliegue]
    H -->|No| J[Corrección de Errores]
    J --> F
    I --> K[Mantenimiento]
    K --> L[Fin]
    
    style A fill:#e1f5fe
    style I fill:#c8e6c9
    style L fill:#ffcdd2
```

### Ejemplo 2: Sistema de Autenticación

````markdown
```mermaid
flowchart LR
    U[Usuario] --> L[Login]
    L --> V{Validar Credenciales}
    V -->|Válidas| T[Generar Token]
    V -->|Inválidas| E[Error de Login]
    T --> D[Dashboard]
    E --> L
    D --> A[Acciones Autorizadas]
    A --> S[Logout]
    S --> L
```
````

**Resultado:**
```mermaid
flowchart LR
    U[Usuario] --> L[Login]
    L --> V{Validar Credenciales}
    V -->|Válidas| T[Generar Token]
    V -->|Inválidas| E[Error de Login]
    T --> D[Dashboard]
    E --> L
    D --> A[Acciones Autorizadas]
    A --> S[Logout]
    S --> L
```

## Diagramas de Secuencia

### Ejemplo 3: API REST - Proceso de Compra

````markdown
```mermaid
sequenceDiagram
    participant C as Cliente
    participant F as Frontend
    participant A as API Gateway
    participant P as Servicio de Productos
    participant O as Servicio de Órdenes
    participant Pa as Servicio de Pagos
    participant D as Base de Datos
    
    C->>F: Seleccionar producto
    F->>A: GET /productos/{id}
    A->>P: Obtener detalles del producto
    P->>D: Consultar producto
    D-->>P: Datos del producto
    P-->>A: Información del producto
    A-->>F: Respuesta del producto
    F-->>C: Mostrar producto
    
    C->>F: Agregar al carrito
    F->>A: POST /carrito
    A->>O: Crear orden temporal
    O->>D: Guardar orden
    D-->>O: Confirmación
    O-->>A: Orden creada
    A-->>F: Carrito actualizado
    
    C->>F: Proceder al pago
    F->>A: POST /pagos
    A->>Pa: Procesar pago
    Pa->>D: Validar información
    D-->>Pa: Validación exitosa
    Pa-->>A: Pago confirmado
    A->>O: Confirmar orden
    O->>D: Actualizar estado
    D-->>O: Orden confirmada
    O-->>A: Orden finalizada
    A-->>F: Compra exitosa
    F-->>C: Confirmación de compra
```
````

**Resultado:**
```mermaid
sequenceDiagram
    participant C as Cliente
    participant F as Frontend
    participant A as API Gateway
    participant P as Servicio de Productos
    participant O as Servicio de Órdenes
    participant Pa as Servicio de Pagos
    participant D as Base de Datos
    
    C->>F: Seleccionar producto
    F->>A: GET /productos/{id}
    A->>P: Obtener detalles del producto
    P->>D: Consultar producto
    D-->>P: Datos del producto
    P-->>A: Información del producto
    A-->>F: Respuesta del producto
    F-->>C: Mostrar producto
    
    C->>F: Agregar al carrito
    F->>A: POST /carrito
    A->>O: Crear orden temporal
    O->>D: Guardar orden
    D-->>O: Confirmación
    O-->>A: Orden creada
    A-->>F: Carrito actualizado
    
    C->>F: Proceder al pago
    F->>A: POST /pagos
    A->>Pa: Procesar pago
    Pa->>D: Validar información
    D-->>Pa: Validación exitosa
    Pa-->>A: Pago confirmado
    A->>O: Confirmar orden
    O->>D: Actualizar estado
    D-->>O: Orden confirmada
    O-->>A: Orden finalizada
    A-->>F: Compra exitosa
    F-->>C: Confirmación de compra
```

## Diagramas de Clases

### Ejemplo 4: Sistema de Gestión de Biblioteca

````markdown
```mermaid
classDiagram
    class Usuario {
        -id: String
        -nombre: String
        -email: String
        -fechaRegistro: Date
        +login()
        +logout()
        +buscarLibro()
    }
    
    class Libro {
        -isbn: String
        -titulo: String
        -autor: String
        -fechaPublicacion: Date
        -disponible: Boolean
        +prestar()
        +devolver()
        +obtenerInfo()
    }
    
    class Prestamo {
        -id: String
        -fechaPrestamo: Date
        -fechaDevolucion: Date
        -estado: String
        +crear()
        +finalizar()
        +extender()
    }
    
    class Biblioteca {
        -nombre: String
        -direccion: String
        +agregarLibro()
        +eliminarLibro()
        +buscarLibro()
        +generarReporte()
    }
    
    Usuario ||--o{ Prestamo : realiza
    Libro ||--o{ Prestamo : incluye
    Biblioteca ||--o{ Libro : contiene
    Biblioteca ||--o{ Usuario : registra
```
````

**Resultado:**
```mermaid
classDiagram
    class Usuario {
        -id: String
        -nombre: String
        -email: String
        -fechaRegistro: Date
        +login()
        +logout()
        +buscarLibro()
    }
    
    class Libro {
        -isbn: String
        -titulo: String
        -autor: String
        -fechaPublicacion: Date
        -disponible: Boolean
        +prestar()
        +devolver()
        +obtenerInfo()
    }
    
    class Prestamo {
        -id: String
        -fechaPrestamo: Date
        -fechaDevolucion: Date
        -estado: String
        +crear()
        +finalizar()
        +extender()
    }
    
    class Biblioteca {
        -nombre: String
        -direccion: String
        +agregarLibro()
        +eliminarLibro()
        +buscarLibro()
        +generarReporte()
    }
    
    Usuario ||--o{ Prestamo : realiza
    Libro ||--o{ Prestamo : incluye
    Biblioteca ||--o{ Libro : contiene
    Biblioteca ||--o{ Usuario : registra
```

## Diagramas de Estado

### Ejemplo 5: Estados de una Orden de Compra

````markdown
```mermaid
stateDiagram-v2
    [*] --> Creada
    Creada --> Pendiente : Confirmar
    Pendiente --> Procesando : Iniciar procesamiento
    Procesando --> Enviada : Envío confirmado
    Procesando --> Cancelada : Cancelar orden
    Enviada --> Entregada : Confirmar entrega
    Enviada --> Devuelta : Iniciar devolución
    Entregada --> [*]
    Cancelada --> [*]
    Devuelta --> Reembolsada : Procesar reembolso
    Reembolsada --> [*]
    
    Pendiente --> Cancelada : Timeout
    
    note right of Procesando
        La orden está siendo
        preparada para envío
    end note
    
    note left of Devuelta
        El cliente puede devolver
        el producto en 30 días
    end note
```
````

**Resultado:**
```mermaid
stateDiagram-v2
    [*] --> Creada
    Creada --> Pendiente : Confirmar
    Pendiente --> Procesando : Iniciar procesamiento
    Procesando --> Enviada : Envío confirmado
    Procesando --> Cancelada : Cancelar orden
    Enviada --> Entregada : Confirmar entrega
    Enviada --> Devuelta : Iniciar devolución
    Entregada --> [*]
    Cancelada --> [*]
    Devuelta --> Reembolsada : Procesar reembolso
    Reembolsada --> [*]
    
    Pendiente --> Cancelada : Timeout
    
    note right of Procesando
        La orden está siendo
        preparada para envío
    end note
    
    note left of Devuelta
        El cliente puede devolver
        el producto en 30 días
    end note
```

## Diagramas de Entidad-Relación

### Ejemplo 6: Base de Datos de E-commerce

````markdown
```mermaid
erDiagram
    USUARIO {
        int id PK
        string nombre
        string email UK
        string password
        date fecha_registro
        boolean activo
    }
    
    PRODUCTO {
        int id PK
        string nombre
        text descripcion
        decimal precio
        int stock
        int categoria_id FK
        boolean disponible
    }
    
    CATEGORIA {
        int id PK
        string nombre
        string descripcion
        int padre_id FK
    }
    
    ORDEN {
        int id PK
        int usuario_id FK
        date fecha_orden
        decimal total
        string estado
        text direccion_envio
    }
    
    DETALLE_ORDEN {
        int id PK
        int orden_id FK
        int producto_id FK
        int cantidad
        decimal precio_unitario
        decimal subtotal
    }
    
    CARRITO {
        int id PK
        int usuario_id FK
        int producto_id FK
        int cantidad
        date fecha_agregado
    }
    
    USUARIO ||--o{ ORDEN : "realiza"
    USUARIO ||--o{ CARRITO : "tiene"
    ORDEN ||--o{ DETALLE_ORDEN : "contiene"
    PRODUCTO ||--o{ DETALLE_ORDEN : "incluido en"
    PRODUCTO ||--o{ CARRITO : "agregado a"
    CATEGORIA ||--o{ PRODUCTO : "clasifica"
    CATEGORIA ||--o{ CATEGORIA : "subcategoría de"
```
````

**Resultado:**
```mermaid
erDiagram
    USUARIO {
        int id PK
        string nombre
        string email UK
        string password
        date fecha_registro
        boolean activo
    }
    
    PRODUCTO {
        int id PK
        string nombre
        text descripcion
        decimal precio
        int stock
        int categoria_id FK
        boolean disponible
    }
    
    CATEGORIA {
        int id PK
        string nombre
        string descripcion
        int padre_id FK
    }
    
    ORDEN {
        int id PK
        int usuario_id FK
        date fecha_orden
        decimal total
        string estado
        text direccion_envio
    }
    
    DETALLE_ORDEN {
        int id PK
        int orden_id FK
        int producto_id FK
        int cantidad
        decimal precio_unitario
        decimal subtotal
    }
    
    CARRITO {
        int id PK
        int usuario_id FK
        int producto_id FK
        int cantidad
        date fecha_agregado
    }
    
    USUARIO ||--o{ ORDEN : "realiza"
    USUARIO ||--o{ CARRITO : "tiene"
    ORDEN ||--o{ DETALLE_ORDEN : "contiene"
    PRODUCTO ||--o{ DETALLE_ORDEN : "incluido en"
    PRODUCTO ||--o{ CARRITO : "agregado a"
    CATEGORIA ||--o{ PRODUCTO : "clasifica"
    CATEGORIA ||--o{ CATEGORIA : "subcategoría de"
```

## Diagramas de Gantt

### Ejemplo 7: Cronograma de Proyecto

````markdown
```mermaid
gantt
    title Cronograma de Desarrollo de Aplicación Web
    dateFormat  YYYY-MM-DD
    section Planificación
    Análisis de requisitos    :done,    req, 2024-01-01, 2024-01-15
    Diseño de arquitectura    :done,    arch, 2024-01-10, 2024-01-25
    Diseño de UI/UX          :done,    ui, 2024-01-20, 2024-02-05
    
    section Desarrollo
    Setup del proyecto       :done,    setup, 2024-02-01, 2024-02-03
    Backend API              :active,  backend, 2024-02-03, 2024-03-15
    Frontend                 :         frontend, 2024-02-20, 2024-04-01
    Integración              :         integration, 2024-03-15, 2024-04-05
    
    section Testing
    Pruebas unitarias        :         unit, 2024-03-01, 2024-04-10
    Pruebas de integración   :         int-test, 2024-04-05, 2024-04-15
    Pruebas de usuario       :         user-test, 2024-04-10, 2024-04-20
    
    section Despliegue
    Configuración servidor   :         server, 2024-04-15, 2024-04-18
    Despliegue producción    :         deploy, 2024-04-18, 2024-04-20
    Monitoreo inicial        :         monitor, 2024-04-20, 2024-04-25
```
````

**Resultado:**
```mermaid
gantt
    title Cronograma de Desarrollo de Aplicación Web
    dateFormat  YYYY-MM-DD
    section Planificación
    Análisis de requisitos    :done,    req, 2024-01-01, 2024-01-15
    Diseño de arquitectura    :done,    arch, 2024-01-10, 2024-01-25
    Diseño de UI/UX          :done,    ui, 2024-01-20, 2024-02-05
    
    section Desarrollo
    Setup del proyecto       :done,    setup, 2024-02-01, 2024-02-03
    Backend API              :active,  backend, 2024-02-03, 2024-03-15
    Frontend                 :         frontend, 2024-02-20, 2024-04-01
    Integración              :         integration, 2024-03-15, 2024-04-05
    
    section Testing
    Pruebas unitarias        :         unit, 2024-03-01, 2024-04-10
    Pruebas de integración   :         int-test, 2024-04-05, 2024-04-15
    Pruebas de usuario       :         user-test, 2024-04-10, 2024-04-20
    
    section Despliegue
    Configuración servidor   :         server, 2024-04-15, 2024-04-18
    Despliegue producción    :         deploy, 2024-04-18, 2024-04-20
    Monitoreo inicial        :         monitor, 2024-04-20, 2024-04-25
```

## Consejos para Usar Mermaid

### Mejores Prácticas

1. **Mantén la simplicidad**: No sobrecargues los diagramas con demasiada información
2. **Usa colores consistentes**: Define un esquema de colores y manténlo
3. **Etiquetas claras**: Usa nombres descriptivos para nodos y relaciones
4. **Documentación**: Siempre incluye una breve explicación del diagrama

### Personalización con Estilos

Puedes personalizar la apariencia de tus diagramas:

````markdown
```mermaid
flowchart TD
    A[Inicio] --> B[Proceso]
    B --> C[Fin]
    
    classDef startClass fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef processClass fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef endClass fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
    
    class A startClass
    class B processClass
    class C endClass
```
````

**Resultado:**
```mermaid
flowchart TD
    A[Inicio] --> B[Proceso]
    B --> C[Fin]
    
    classDef startClass fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef processClass fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef endClass fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
    
    class A startClass
    class B processClass
    class C endClass
```

## Recursos Adicionales

- [Documentación oficial de Mermaid](https://mermaid.js.org/)
- [Editor en línea de Mermaid](https://mermaid.live/)
- [Galería de ejemplos](https://mermaid.js.org/syntax/examples.html)

¡Experimenta con diferentes tipos de diagramas para encontrar el que mejor se adapte a tus necesidades de documentación!