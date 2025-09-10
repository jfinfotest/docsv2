---
title: "Session 15: Security with Spring Security"
position: 1
author: "The Spring Boot Team"
date: "2024-10-13"
---

# Session 15: Securing Applications with Spring Security

Spring Security is a powerful and highly customizable framework for authentication and access control. Let's explore how it works through a step-by-step visual guide.

```scrollytelling
---
steps:
  - media:
      type: image
      src: "https://raw.githubusercontent.com/Mody-D/fusion-doc-assets/main/scrollytelling/security-1.png"
      alt: "A browser showing a default login page."
    content: |
      ### Step 1: Add the Dependency
      Simply add `spring-boot-starter-security` to your `pom.xml`. By default, Spring Security protects **all** endpoints with HTTP Basic authentication and a generated password, displaying this default login page.
  - media:
      type: code
      lang: "java"
      code: |
        @Configuration
        @EnableWebSecurity
        public class WebSecurityConfig {
            @Bean
            public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                    .authorizeHttpRequests(req -> req
                        .requestMatchers("/", "/css/**").permitAll()
                        .anyRequest().authenticated()
                    )
                    .formLogin(form -> form
                        .loginPage("/login")
                        .permitAll()
                    );
                return http.build();
            }
        }
    content: |
      ### Step 2: Custom Configuration
      To customize this, create a `SecurityFilterChain` bean. This code snippet configures a custom login page at `/login` and allows public access to the home page (`/`) and CSS files, while securing all other requests.
  - media:
      type: image
      src: "https://raw.githubusercontent.com/Mody-D/fusion-doc-assets/main/scrollytelling/security-2.png"
      alt: "A diagram showing public and private routes."
    content: |
      ### Step 3: Result
      With our custom configuration, unauthenticated users can access the homepage, but if they try to access a protected route like `/dashboard`, Spring Security will automatically redirect them to our custom `/login` page.
---
```