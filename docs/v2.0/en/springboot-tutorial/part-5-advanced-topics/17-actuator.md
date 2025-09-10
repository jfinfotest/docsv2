---
title: "Session 17: Monitoring with Actuator"
position: 3
author: "The Spring Boot Team"
date: "2025-1-01"
---

# Session 17: Monitoring with Spring Boot Actuator

Spring Boot Actuator exposes endpoints to monitor and manage your application in production.

## Configuration

1.  Add `spring-boot-starter-actuator` to your `pom.xml`.
2.  For security, most endpoints are not exposed over HTTP by default. Enable them in `application.properties`:

```properties
# Expose specific Actuator endpoints
management.endpoints.web.exposure.include=health,info,metrics
```

## Endpoint Explorer

Actuator provides several endpoints. The most common are:
- `health`: Shows application health status.
- `info`: Displays general application information.
- `metrics`: Shows a variety of metrics (memory usage, CPU, etc.).

Use the API explorer below to test these endpoints directly. Make sure your application is running.

```api-explorer
---
baseUrl: "http://localhost:8080/actuator"
endpoints:
  - path: "/health"
    method: "GET"
    title: "Check Health"
    description: "Checks the health status of the application and its components."
  - path: "/info"
    method: "GET"
    title: "Get App Info"
    description: "Displays custom application information (if configured)."
  - path: "/metrics"
    method: "GET"
    title: "View Metrics"
    description: "Lists all available metrics that can be queried."
  - path: "/metrics/jvm.memory.used"
    method: "GET"
    title: "Get Specific Metric"
    description: "Retrieves the value of a specific metric, such as used JVM memory."
---
```

## Visualizing Metrics

Data from Actuator endpoints can be fed into monitoring systems to create dashboards. The chart below is an example of how you might visualize a metric like CPU usage over time.

```charts
---
type: 'line'
title: 'Process CPU Usage (%)'
data:
  labels: ['-50s', '-40s', '-30s', '-20s', '-10s', 'Now']
  datasets:
    - label: 'CPU Usage'
      data: [12, 19, 8, 15, 10, 22]
      fill: true
      tension: 0.4
---
```
