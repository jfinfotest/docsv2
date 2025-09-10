---
title: "Sesión 18: Despliegue de Aplicaciones"
position: 4
author: "El Equipo de Spring Boot"
date: "2025-01-08"
---

# Sesión 18: Despliegue de Aplicaciones Spring Boot

Una de las grandes ventajas de Spring Boot es la facilidad de despliegue. Exploremos los métodos más comunes.

### 1. Construir el Jar Ejecutable

Primero, empaqueta tu aplicación en un "fat jar". Este único archivo contiene todas las dependencias y un servidor web embebido.

```tabs
---[tab title="Unix/macOS" lang="sh"]---
./mvnw clean package
---[tab title="Windows" lang="sh"]---
mvnw.cmd clean package
```

### 2. Opciones de Despliegue

Usa el slider interactivo a continuación para aprender sobre las diferentes estrategias de despliegue.

```tutorial-slider
---
steps:
  - media:
      type: code
      lang: sh
      code: |
        # El JAR estará en el directorio 'target'
        java -jar target/demo-0.0.1-SNAPSHOT.jar
    content: |
      ### Opción 1: JAR Ejecutable
      La forma más sencilla de ejecutar tu aplicación es usando `java -jar`. Esto es ideal para despliegues simples en cualquier máquina con Java instalado.
  - media:
      type: code
      lang: "dockerfile"
      code: |
        FROM openjdk:17-jdk-slim
        ARG JAR_FILE=target/*.jar
        COPY ${JAR_FILE} app.jar
        ENTRYPOINT ["java","-jar","/app.jar"]
    content: |
      ### Opción 2: Contenedor Docker
      Contenerizar tu aplicación con Docker es el estándar moderno. Encapsula tu app y su entorno, asegurando consistencia en todas partes. Construye la imagen con `docker build -t mi-app .` y ejecútala con `docker run -p 8080:8080 mi-app`.
  - media:
      type: image
      src: "https://raw.githubusercontent.com/Mody-D/fusion-doc-assets/main/scrollytelling/cloud.png"
      alt: "Logos de proveedores de la nube"
    content: |
      ### Opción 3: Plataformas en la Nube
      Despliega tu aplicación contenerizada en servicios en la nube como AWS, Google Cloud o Azure para obtener escalabilidad, fiabilidad y servicios gestionados.
---
```

### Principales Proveedores de Nube

```gallery
---
columns: 3
items:
  - src: "https://raw.githubusercontent.com/Mody-D/fusion-doc-assets/main/gallery/aws.svg"
    alt: "Amazon Web Services"
  - src: "https://raw.githubusercontent.com/Mody-D/fusion-doc-assets/main/gallery/gcp.svg"
    alt: "Google Cloud Platform"
  - src: "https://raw.githubusercontent.com/Mody-D/fusion-doc-assets/main/gallery/azure.svg"
    alt: "Microsoft Azure"
---
```

```cta
---
title: "¡Has Completado el Tutorial!"
buttons:
  - text: "Explorar Más Características"
    url: "/tutorial"
    variant: "primary"
    icon: "RocketIcon"
  - text: "Estrella en GitHub"
    url: "https://github.com/cog-creators/fusion-doc"
    variant: "secondary"
---
Ahora tienes las herramientas para construir y desplegar tus propias aplicaciones Spring Boot. ¡Sigue explorando!
```