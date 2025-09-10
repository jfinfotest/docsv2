---
title: "Session 18: Deploying Applications"
position: 4
author: "The Spring Boot Team"
date: "2025-01-08"
---

# Session 18: Deploying Spring Boot Applications

One of the great advantages of Spring Boot is the ease of deployment. Let's explore the most common methods.

### 1. Build the Executable Jar

First, package your application into a "fat jar". This single file contains all dependencies and an embedded web server.

```tabs
---[tab title="Unix/macOS" lang="sh"]---
./mvnw clean package
---[tab title="Windows" lang="sh"]---
mvnw.cmd clean package
```

### 2. Deployment Options

Use the interactive slider below to learn about different deployment strategies.

```tutorial-slider
---
steps:
  - media:
      type: code
      lang: sh
      code: |
        # The JAR will be in the 'target' directory
        java -jar target/demo-0.0.1-SNAPSHOT.jar
    content: |
      ### Option 1: Executable JAR
      The simplest way to run your application is by using `java -jar`. This is great for simple deployments on any machine with Java installed.
  - media:
      type: code
      lang: "dockerfile"
      code: |
        FROM openjdk:17-jdk-slim
        ARG JAR_FILE=target/*.jar
        COPY ${JAR_FILE} app.jar
        ENTRYPOINT ["java","-jar","/app.jar"]
    content: |
      ### Option 2: Docker Container
      Containerizing your application with Docker is the modern standard. It encapsulates your app and its environment, ensuring consistency everywhere. Build the image with `docker build -t my-app .` and run it with `docker run -p 8080:8080 my-app`.
  - media:
      type: image
      src: "https://raw.githubusercontent.com/Mody-D/fusion-doc-assets/main/scrollytelling/cloud.png"
      alt: "Cloud provider logos"
    content: |
      ### Option 3: Cloud Platforms
      Deploy your containerized application to cloud services like AWS, Google Cloud, or Azure for scalability, reliability, and managed services.
---
```

### Major Cloud Providers

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
title: "You've Completed the Tutorial!"
buttons:
  - text: "Explore More Features"
    url: "/tutorial"
    variant: "primary"
    icon: "RocketIcon"
  - text: "Star on GitHub"
    url: "https://github.com/cog-creators/fusion-doc"
    variant: "secondary"
---
You now have the tools to build and deploy your own Spring Boot applications. Keep exploring!
```