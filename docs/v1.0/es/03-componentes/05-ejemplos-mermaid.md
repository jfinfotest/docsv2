---
title: "Ejemplos de Mermaid"
position: 5
---

# Ejemplos de Diagramas Mermaid

Esta guía presenta ejemplos prácticos de diferentes tipos de diagramas que puedes crear usando Mermaid.

## Diagramas de Flujo

### Ejemplo 1: Proceso de Login

````markdown
```mermaid
flowchart TD
    A[Usuario ingresa credenciales] --> B{¿Credenciales válidas?}
    B -->|Sí| C[Generar token JWT]
    B -->|No| D[Mostrar error]
    C --> E[Redirigir a dashboard]
    D --> F[Volver al login]
    E --> G[Usuario autenticado]
    F --> A
    
    style A fill:#e3f2fd
    style G fill:#e8f5e8
    style D fill:#ffebee
```
````

**Resultado:**
```mermaid
flowchart TD
    A[Usuario ingresa credenciales] --> B{¿Credenciales válidas?}
    B -->|Sí| C[Generar token JWT]
    B -->|No| D[Mostrar error]
    C --> E[Redirigir a dashboard]
    D --> F[Volver al login]
    E --> G[Usuario autenticado]
    F --> A
    
    style A fill:#e3f2fd
    style G fill:#e8f5e8
    style D fill:#ffebee
```

### Ejemplo 2: Ciclo de Vida de una Tarea

````markdown
```mermaid
flowchart LR
    A[Nueva Tarea] --> B[En Progreso]
    B --> C[En Revisión]
    C --> D{¿Aprobada?}
    D -->|Sí| E[Completada]
    D -->|No| F[Requiere cambios]
    F --> B
    E --> G[Archivada]
```
````

**Resultado:**
```mermaid
flowchart LR
    A[Nueva Tarea] --> B[En Progreso]
    B --> C[En Revisión]
    C --> D{¿Aprobada?}
    D -->|Sí| E[Completada]
    D -->|No| F[Requiere cambios]
    F --> B
    E --> G[Archivada]
```

## Diagramas de Secuencia

### Ejemplo 3: Proceso de Compra Online

````markdown
```mermaid
sequenceDiagram
    participant U as Usuario
    participant W as Web App
    participant A as API
    participant D as Base de Datos
    participant P as Pasarela de Pago
    
    U->>W: Seleccionar producto
    W->>A: GET /producto/{id}
    A->>D: Consultar producto
    D-->>A: Datos del producto
    A-->>W: Información del producto
    W-->>U: Mostrar producto
    
    U->>W: Agregar al carrito
    W->>A: POST /carrito
    A->>D: Guardar en carrito
    D-->>A: Confirmación
    A-->>W: Carrito actualizado
    
    U->>W: Proceder al pago
    W->>P: Iniciar transacción
    P-->>U: Formulario de pago
    U->>P: Datos de pago
    P->>A: Confirmar pago
    A->>D: Crear orden
    D-->>A: Orden creada
    A-->>W: Pago exitoso
    W-->>U: Confirmación de compra
```
````

**Resultado:**
```mermaid
sequenceDiagram
    participant U as Usuario
    participant W as Web App
    participant A as API
    participant D as Base de Datos
    participant P as Pasarela de Pago
    
    U->>W: Seleccionar producto
    W->>A: GET /producto/{id}
    A->>D: Consultar producto
    D-->>A: Datos del producto
    A-->>W: Información del producto
    W-->>U: Mostrar producto
    
    U->>W: Agregar al carrito
    W->>A: POST /carrito
    A->>D: Guardar en carrito
    D-->>A: Confirmación
    A-->>W: Carrito actualizado
    
    U->>W: Proceder al pago
    W->>P: Iniciar transacción
    P-->>U: Formulario de pago
    U->>P: Datos de pago
    P->>A: Confirmar pago
    A->>D: Crear orden
    D-->>A: Orden creada
    A-->>W: Pago exitoso
    W-->>U: Confirmación de compra
```

## Diagramas de Clases

### Ejemplo 4: Sistema de Blog

````markdown
```mermaid
classDiagram
    class Usuario {
        -id: number
        -nombre: string
        -email: string
        +login()
        +logout()
        +crearPost()
    }
    
    class Post {
        -id: number
        -titulo: string
        -contenido: string
        -fechaCreacion: Date
        +publicar()
        +editar()
        +eliminar()
    }
    
    class Comentario {
        -id: number
        -texto: string
        -fecha: Date
        +crear()
        +editar()
        +eliminar()
    }
    
    class Categoria {
        -id: number
        -nombre: string
        -descripcion: string
        +agregar()
        +eliminar()
    }
    
    Usuario ||--o{ Post : escribe
    Post ||--o{ Comentario : tiene
    Usuario ||--o{ Comentario : hace
    Post }o--|| Categoria : pertenece
```
````

**Resultado:**
```mermaid
classDiagram
    class Usuario {
        -id: number
        -nombre: string
        -email: string
        +login()
        +logout()
        +crearPost()
    }
    
    class Post {
        -id: number
        -titulo: string
        -contenido: string
        -fechaCreacion: Date
        +publicar()
        +editar()
        +eliminar()
    }
    
    class Comentario {
        -id: number
        -texto: string
        -fecha: Date
        +crear()
        +editar()
        +eliminar()
    }
    
    class Categoria {
        -id: number
        -nombre: string
        -descripcion: string
        +agregar()
        +eliminar()
    }
    
    Usuario ||--o{ Post : escribe
    Post ||--o{ Comentario : tiene
    Usuario ||--o{ Comentario : hace
    Post }o--|| Categoria : pertenece
```

## Diagramas de Estado

### Ejemplo 5: Estados de un Pedido

````markdown
```mermaid
stateDiagram-v2
    [*] --> Pendiente
    Pendiente --> Confirmado : Pago recibido
    Confirmado --> Preparando : Iniciar preparación
    Preparando --> Enviado : Envío realizado
    Enviado --> Entregado : Entrega confirmada
    Entregado --> [*]
    
    Pendiente --> Cancelado : Cancelar pedido
    Confirmado --> Cancelado : Cancelar pedido
    Cancelado --> [*]
    
    Enviado --> Devuelto : Solicitar devolución
    Devuelto --> Reembolsado : Procesar reembolso
    Reembolsado --> [*]
```
````

**Resultado:**
```mermaid
stateDiagram-v2
    [*] --> Pendiente
    Pendiente --> Confirmado : Pago recibido
    Confirmado --> Preparando : Iniciar preparación
    Preparando --> Enviado : Envío realizado
    Enviado --> Entregado : Entrega confirmada
    Entregado --> [*]
    
    Pendiente --> Cancelado : Cancelar pedido
    Confirmado --> Cancelado : Cancelar pedido
    Cancelado --> [*]
    
    Enviado --> Devuelto : Solicitar devolución
    Devuelto --> Reembolsado : Procesar reembolso
    Reembolsado --> [*]
```

## Diagramas de Gantt

### Ejemplo 6: Planificación de Sprint

````markdown
```mermaid
gantt
    title Sprint 1 - Desarrollo de Funcionalidades
    dateFormat  YYYY-MM-DD
    section Análisis
    Definir historias de usuario    :done, analysis, 2024-01-01, 2024-01-03
    Estimación de tareas           :done, estimation, 2024-01-03, 2024-01-05
    
    section Desarrollo
    Setup del entorno             :done, setup, 2024-01-05, 2024-01-06
    Funcionalidad A               :active, featureA, 2024-01-06, 2024-01-12
    Funcionalidad B               :featureB, 2024-01-10, 2024-01-16
    
    section Testing
    Pruebas unitarias             :testing, 2024-01-12, 2024-01-18
    Pruebas de integración        :integration, 2024-01-16, 2024-01-20
    
    section Despliegue
    Preparar release              :release, 2024-01-18, 2024-01-20
    Deploy a producción           :deploy, 2024-01-20, 2024-01-21
```
````

**Resultado:**
```mermaid
gantt
    title Sprint 1 - Desarrollo de Funcionalidades
    dateFormat  YYYY-MM-DD
    section Análisis
    Definir historias de usuario    :done, analysis, 2024-01-01, 2024-01-03
    Estimación de tareas           :done, estimation, 2024-01-03, 2024-01-05
    
    section Desarrollo
    Setup del entorno             :done, setup, 2024-01-05, 2024-01-06
    Funcionalidad A               :active, featureA, 2024-01-06, 2024-01-12
    Funcionalidad B               :featureB, 2024-01-10, 2024-01-16
    
    section Testing
    Pruebas unitarias             :testing, 2024-01-12, 2024-01-18
    Pruebas de integración        :integration, 2024-01-16, 2024-01-20
    
    section Despliegue
    Preparar release              :release, 2024-01-18, 2024-01-20
    Deploy a producción           :deploy, 2024-01-20, 2024-01-21
```

## Consejos Útiles

### Personalización de Estilos

Puedes personalizar los colores y estilos de tus diagramas:

````markdown
```mermaid
flowchart TD
    A[Inicio] --> B[Proceso]
    B --> C[Fin]
    
    classDef inicio fill:#e1f5fe,stroke:#0277bd,stroke-width:3px
    classDef proceso fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef fin fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    
    class A inicio
    class B proceso
    class C fin
```
````

**Resultado:**
```mermaid
flowchart TD
    A[Inicio] --> B[Proceso]
    B --> C[Fin]
    
    classDef inicio fill:#e1f5fe,stroke:#0277bd,stroke-width:3px
    classDef proceso fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef fin fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    
    class A inicio
    class B proceso
    class C fin
```

### Mejores Prácticas

1. **Simplicidad**: Mantén los diagramas simples y fáciles de entender
2. **Consistencia**: Usa un esquema de colores consistente
3. **Etiquetas claras**: Utiliza nombres descriptivos
4. **Documentación**: Incluye explicaciones cuando sea necesario

## Recursos Adicionales

- [Documentación oficial de Mermaid](https://mermaid.js.org/)
- [Editor en línea](https://mermaid.live/)
- [Más ejemplos](https://mermaid.js.org/syntax/examples.html)

¡Experimenta con estos ejemplos y crea tus propios diagramas!