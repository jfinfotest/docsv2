---
title: "Sesión 15: Seguridad con Spring Security"
position: 1
author: "El Equipo de Spring Boot"
date: "2024-10-13"
---

# Sesión 15: Asegurando Aplicaciones con Spring Security

Spring Security es un framework potente y altamente personalizable para la autenticación y el control de acceso. Exploremos cómo funciona a través de una guía visual paso a paso.

```scrollytelling
---
steps:
  - media:
      type: image
      src: "https://raw.githubusercontent.com/Mody-D/fusion-doc-assets/main/scrollytelling/security-1.png"
      alt: "Un navegador mostrando una página de login por defecto."
    content: |
      ### Paso 1: Añadir la Dependencia
      Simplemente añade `spring-boot-starter-security` a tu `pom.xml`. Por defecto, Spring Security protege **todos** los endpoints con autenticación básica HTTP y una contraseña generada, mostrando esta página de login por defecto.
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
      ### Paso 2: Configuración Personalizada
      Para personalizar esto, crea un bean `SecurityFilterChain`. Este fragmento de código configura una página de login personalizada en `/login` y permite el acceso público a la página de inicio (`/`) y a los archivos CSS, mientras asegura todas las demás peticiones.
  - media:
      type: image
      src: "https://raw.githubusercontent.com/Mody-D/fusion-doc-assets/main/scrollytelling/security-2.png"
      alt: "Un diagrama mostrando rutas públicas y privadas."
    content: |
      ### Paso 3: Resultado
      Con nuestra configuración personalizada, los usuarios no autenticados pueden acceder a la página de inicio, pero si intentan acceder a una ruta protegida como `/dashboard`, Spring Security los redirigirá automáticamente a nuestra página `/login` personalizada.
---
```