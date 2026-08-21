from fastapi.testclient import TestClient
from app.main import app

def test_unauthorized_access_without_token():
    # TestClient sem override de autenticação
    client = TestClient(app)
    response = client.get("/tasks/")
    assert response.status_code == 403 or response.status_code == 401