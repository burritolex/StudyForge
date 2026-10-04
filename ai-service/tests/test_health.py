from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "UP"
    assert "StudyForge" in data["service"]


def test_health_endpoint():
    response = client.get("/internal/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "UP"
    assert data["embedding_dimension"] == 768
    assert "configured_llm_model" in data
