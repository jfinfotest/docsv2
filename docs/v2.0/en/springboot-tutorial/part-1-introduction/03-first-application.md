---
title: "Session 3: Your First Application"
position: 3
author: "The Spring Boot Team"
date: "2024-09-07"
---

# Session 3: Creating Your First Spring Boot Application

The easiest way to start a new Spring Boot project is by using the **Spring Initializr**, a web-based tool that generates a basic project structure for you.

1.  Navigate to [start.spring.io](https://start.spring.io).
2.  Configure your project's metadata:
    - **Project**: Maven
    - **Language**: Java
    - **Spring Boot**: The latest stable version (e.g., 3.x.x).
    - **Group**: Your company or personal package name (e.g., `com.example`).
    - **Artifact**: Your project's name (e.g., `demo`).
    - **Packaging**: Jar
    - **Java**: 17 or newer.
3.  In the "Dependencies" section, add `Spring Web`. This starter includes everything needed for building web applications, including a RESTful controller and an embedded Tomcat server.
4.  Click **GENERATE**.

This will download a ZIP file. Unzip it and open the project in your favorite IDE.

### Project Structure

The generated project has a standard layout. The `file-tree` component below shows the key files and directories.

```file-tree
---
highlight:
  - "src/main/java/com/example/demo/DemoApplication.java"
  - "pom.xml"
annotations:
  "pom.xml": "Project dependencies and build config"
  "DemoApplication.java": "The main entry point of the app"
---
demo/
├── .mvn/
├── src/
│   ├── main/
│   │   ├── java/com/example/demo/
│   │   │   └── DemoApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── .gitignore
├── mvnw
├── mvnw.cmd
└── pom.xml
```

### Key Files Explained

Below are the contents of the most important files for starting out. To see the application in action, create a new file `HelloController.java` inside the `src/main/java/com/example/demo/` directory.

```tabs
---[tab title="pom.xml" lang="xml"]---
<!-- ... (metadata) ... -->
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
<!-- ... (build plugin) ... -->
---[tab title="DemoApplication.java" lang="java"]---
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// This single annotation enables auto-configuration and component scanning.
@SpringBootApplication
public class DemoApplication {

    // This is the main entry point that starts the application.
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
---[tab title="HelloController.java" lang="java"]---
package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    // Maps HTTP GET requests for "/" to this method.
    @GetMapping("/")
    public String hello() {
        return "Hello, World!";
    }
}
```

### Running the Application

You can run the application in two main ways: from your IDE or using the Maven wrapper.

1.  **From your IDE**: Find the `DemoApplication.java` file and run its `main` method.
2.  **From the terminal**: Navigate to the project's root directory and run the appropriate command for your operating system.

```tabs
---[tab title="Unix/macOS" lang="sh"]---
./mvnw spring-boot:run
---[tab title="Windows" lang="sh"]---
mvnw.cmd spring-boot:run
```

Once the application starts, open your web browser and navigate to `http://localhost:8080`. You should see the "Hello, World!" message.