# StudyForge — AI Microservice

Specialized microservice powering StudyForge's document intelligence, built with **Python 3.11+**, **FastAPI**, **Google Gemini API**, and **pgvector**.

## Responsibilities
- PDF text and layout extraction (`pdfplumber`, `pypdf`).
- Text chunking (recursive token chunking with overlap).
- Semantic embeddings via **Google Gemini Embedding 2** (`gemini-embedding-2`). Note: while Gemini Embedding 2 defaults to 3072 dimensions, StudyForge explicitly configures the model's supported 768-dimensional output to optimize storage, indexing speed, and vector search compute in PostgreSQL `pgvector` (`vector(768)`).
- Cosine similarity retrieval against `pgvector` in PostgreSQL.
- Grounded RAG query answering and structured JSON quiz generation with **Google Gemini 3.8 Flash**.

## Local Setup & Execution

### 1. Create Virtual Environment
```bash
python -m venv .venv
```

Activate the environment:
- Windows (PowerShell): `.\.venv\Scripts\Activate.ps1`
- Linux/macOS: `source .venv/bin/activate`

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run FastAPI Application
```bash
uvicorn app.main:app --reload --port 8000
```
Interactive OpenAPI documentation will be accessible at:
- `http://localhost:8000/internal/v1/docs`

### 4. Run Tests
```bash
pytest
```
