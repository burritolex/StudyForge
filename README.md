# StudyForge — AI-Powered Academic Learning Platform

StudyForge is an enterprise-grade academic learning companion for college students. It allows students to upload course materials (primarily PDFs), ask questions grounded strictly in their documents using **Retrieval-Augmented Generation (RAG)** with page-accurate citations, automatically generate topic-based quizzes, and track knowledge mastery and weak points over time.

---

## 🏛️ System Architecture

StudyForge is architected as a **Three-Tier Polyglot Microservice System**:

```
                       ┌─────────────────────────────────────────┐
                       │     React 18 + TypeScript Frontend      │
                       │     (Vite, Tailwind CSS, Lucide)        │
                       └────────────────────┬────────────────────┘
                                            │ HTTPS / REST (JWT)
                                            ▼
                       ┌─────────────────────────────────────────┐
                       │       Spring Boot 3 Core Backend        │
                       │ (Java 21, Maven, Spring Security, JPA)  │
                       └──────────────┬──────────────────┬───────┘
                                      │                  │
                Internal REST (Secret)│                  │ JDBC / HikariCP
                                      ▼                  ▼
┌────────────────────────────────────────┐            ┌────────────────────────────────────────┐
│     Python FastAPI AI Microservice     │            │       PostgreSQL 16 + pgvector         │
│  (PDF parsing, chunking, RAG, quizzes) │            │ (Relational Data & vector(768) Embeds) │
└──────────────────┬─────────────────────┘            └───────────────────▲────────────────────┘
                   │                                                      │
                   │ HTTPS API Calls (GEMINI_API_KEY)                     │ asyncpg / vector query
                   ▼                                                      │
┌────────────────────────────────────────┐                                │
│            Google Gemini API           │────────────────────────────────┘
│   LLM: Gemini 3.8 Flash                │
│   Embeddings: Gemini Embedding 2 (768d)│
└────────────────────────────────────────┘
```

---

## 🚀 Technology Stack

| Layer | Technologies | Responsibilities |
|---|---|---|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Axios, Lucide | Responsive UI, interactive PDF viewer, RAG chat window, quiz runner, analytics charts. |
| **Backend** | Java 21, Spring Boot 3.3.4, Maven, Spring Security, Spring Data JPA, Flyway | Gatekeeper, authentication (JWT & BCrypt), entity lifecycle, file upload validation, quiz scoring, mastery analytics. |
| **Database** | PostgreSQL 16 with `pgvector` extension | Relational storage for users, documents, and quizzes; vector index for 768-dim semantic chunks (`HNSW`). |
| **AI Service** | Python 3.11+, FastAPI, Pydantic, pdfplumber, pypdf, asyncpg | PDF text extraction, recursive token chunking, cosine similarity retrieval, grounded prompt construction. |
| **AI Models** | Google Gemini API (Gemini 3.8 Flash & Gemini Embedding 2 `gemini-embedding-2`) | Gemini 3.8 Flash for reasoning & quiz generation; Gemini Embedding 2 (explicit 768-dim output) for vector search. |
| **DevOps** | Docker, Docker Compose, GitHub Actions | Multi-stage container builds, local developer orchestration, CI testing. |

---

## 📂 Repository Structure

```
StudyForge/
├── backend/                  # Spring Boot 3 Java Maven application
│   ├── src/main/java/        # Application source code
│   ├── src/main/resources/   # Config & Flyway database migrations
│   ├── src/test/java/        # JUnit & MockMvc tests
│   ├── mvnw / mvnw.cmd       # Self-contained Maven wrappers
│   └── pom.xml               # Maven dependencies and build plugins
├── ai-service/               # Python FastAPI microservice
│   ├── app/                  # FastAPI routers, endpoints, config & schemas
│   ├── tests/                # PyTest automated tests
│   └── requirements.txt      # Python dependencies
├── frontend/                 # React 18 + TypeScript web client
│   ├── src/                  # React components, services, and types
│   ├── package.json          # Node dependencies & build scripts
│   └── vite.config.ts        # Vite configuration & backend proxy
├── docker/                   # Container orchestration
│   ├── docker-compose.yml    # Local multi-service environment
│   ├── Dockerfile.backend    # Multi-stage Maven -> JRE 21
│   ├── Dockerfile.ai-service # Multi-stage Python 3.11
│   └── Dockerfile.frontend   # Multi-stage Vite -> Nginx
├── docs/                     # Architectural documents & OpenAPI specs
├── .env.example              # Documented configuration template
├── .gitignore                # Comprehensive secret and build artifact filter
└── README.md
```

---

## 🔒 Security & Secret Management

- **Zero Secret Ingestion**: All sensitive credentials (`GEMINI_API_KEY`, `JWT_SECRET`, `INTERNAL_SERVICE_KEY`, `POSTGRES_PASSWORD`) are passed exclusively through environment variables.
- **Git Hygiene**: `.env` and all credential files are blocked via `.gitignore`.
- **Inter-Service Isolation**: The Python FastAPI service is accessible internally by the Spring Boot backend using a private shared secret header (`X-Internal-Service-Key`).
- **Embedding Efficiency**: Gemini Embedding 2 defaults to 3072 dimensions; StudyForge explicitly configures the model's supported **768-dimensional output** to cut vector storage and search latency significantly while maintaining academic retrieval precision.

---

## ⚡ Quickstart: Local Development

### Option A: Complete Stack via Docker Compose (Recommended)

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/StudyForge.git
   cd StudyForge
   ```

2. Create your `.env` file from the template:
   ```bash
   cp .env.example .env
   # Add your Google Gemini API key to GEMINI_API_KEY
   ```

3. Spin up all services:
   ```bash
   docker compose -f docker/docker-compose.yml up --build
   ```

4. Access the applications:
   - **Frontend UI**: [http://localhost:5173](http://localhost:5173)
   - **Spring Boot API**: [http://localhost:8080](http://localhost:8080)
   - **Spring Boot OpenAPI / Swagger**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
   - **FastAPI OpenAPI / Docs**: [http://localhost:8000/internal/v1/docs](http://localhost:8000/internal/v1/docs)

---

### Option B: Running Services Individually (Native Development)

#### 1. Start PostgreSQL with pgvector
```bash
docker run --name studyforge-postgres -e POSTGRES_DB=studyforge -e POSTGRES_USER=studyforge_user -e POSTGRES_PASSWORD=studyforge_password -p 5432:5432 -d pgvector/pgvector:pg16
```

#### 2. Start Spring Boot Backend
```cmd
cd backend
mvnw.cmd clean test
mvnw.cmd spring-boot:run
```

#### 3. Start Python FastAPI AI Service
```bash
cd ai-service
python -m venv .venv
# On Windows: .venv\Scripts\activate
# On Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

#### 4. Start React Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🗺️ Engineering Roadmap

- [x] **Phase 1**: Monorepo Foundation, Architecture Design & Baseline Health Probes
- [ ] **Phase 2**: Authentication & JWT Flow (BCrypt, Refresh Token Rotation)
- [ ] **Phase 3**: Document Management & Local/Cloud Storage Pipeline
- [ ] **Phase 4**: Grounded RAG Pipeline with Gemini 3.8 Flash & Gemini Embedding 2
- [ ] **Phase 5**: AI Quiz Generation Engine & Interactive Grading
- [ ] **Phase 6**: Performance Analytics & Weak Topic Detection
- [ ] **Phase 7**: Comprehensive Automated Testing & Rate Limiting
- [ ] **Phase 8**: Cloud Deployment & Continuous Integration
- [ ] **Phase 9**: Portfolio Polish & Recruiter Demonstrations
