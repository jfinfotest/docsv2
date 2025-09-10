---
title: "Session 2: Development Environment Setup"
position: 2
author: "The Spring Boot Team"
date: "2024-09-04"
---

# Session 2: Setting up the Development Environment

To get started with Spring Boot, you need some essential tools. Let's walk through the setup process for a typical development environment.

```steps
### Step 1: Install a JDK
Ensure you have a **Java Development Kit (JDK)** version 17 or higher installed on your system. We recommend using an open-source build like [Adoptium Temurin](https://adoptium.net/). You can verify your installation by running `java -version` in your terminal.

### Step 2: Install a Build Tool
You will need a build tool like Maven or Gradle to manage your project's dependencies and build process. We will use **Maven** in this tutorial for its simplicity and widespread use. You can download it from its [official website](https://maven.apache.org/download.cgi) and make sure the `mvn` command is available in your system's PATH.

### Step 3: Choose an IDE
An **Integrated Development Environment (IDE)** will significantly streamline your development process. We recommend using one of the following:
- **IntelliJ IDEA**: The Community Edition is free and has excellent support for Spring Boot.
- **Visual Studio Code**: With the Extension Pack for Java and the Spring Boot Extension Pack.
- **Eclipse IDE for Java EE Developers**: A classic choice for Java development.
```

After installing Maven, verify your installation by running this command in your terminal:

```tabs
---[tab title="Unix/macOS" lang="sh"]---
mvn -version
---[tab title="Windows" lang="sh"]---
mvn -version
```
This should display the installed Maven version, confirming it's ready to use.

```accordion
---
allowMultiple: false
---
### Using Gradle instead of Maven
Gradle is another powerful build tool that uses a Groovy or Kotlin DSL for configuration, which some developers prefer. Spring Initializr allows you to choose Gradle for your project. The core concepts of the tutorial remain the same, but dependency management in your `build.gradle` file will look different.

### What about other JDKs?
While we recommend Adoptium, other JDK builds like Amazon Corretto, Oracle OpenJDK, or Microsoft Build of OpenJDK are also excellent choices and fully compatible with Spring Boot.
```
