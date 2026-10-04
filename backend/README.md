# StudyForge — Backend Service

Enterprise core backend for StudyForge built with **Spring Boot 3 (Java 21)**, **Maven**, **Spring Security**, and **Spring Data JPA**.

## Capabilities in Phase 1
- Modular project architecture adhering to package-by-feature conventions.
- Externalized configuration mapped to environment variables.
- Initial Flyway migration (`V1__init_extensions.sql`) for PostgreSQL `vector` and `uuid-ossp` extensions.
- REST Health check probe at `/api/v1/health`.
- OpenAPI / Swagger documentation ready at `/swagger-ui.html`.

## Prerequisites
- Java Development Kit (JDK 21 or 24)
- (Optional) Docker for PostgreSQL with pgvector

## Running Locally

### 1. Build using Maven Wrapper
On Windows:
```cmd
mvnw.cmd clean package
```

On Linux/macOS:
```bash
./mvnw clean package
```

### 2. Run Application
```cmd
mvnw.cmd spring-boot:run
```
The backend starts on `http://localhost:8080`.

Verify health endpoint:
```bash
curl http://localhost:8080/api/v1/health
```
