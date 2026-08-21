def test_create_task(client):
    payload = {
        "title": "Estudar Sistemas Distribuídos",
        "description": "Configurar FastAPI e Supabase",
        "due_date": "2026-09-01",
        "priority": "Alta",
        "status": "Pendente"
    }
    response = client.post("/tasks/", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == payload["title"]
    assert data["user_id"] == "test-user-id-123"
    assert "id" in data


def test_list_tasks(client):
    # Cria uma tarefa inicial
    client.post("/tasks/", json={"title": "Tarefa 1", "priority": "Média", "status": "Pendente"})

    response = client.get("/tasks/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1


def test_update_task(client):
    created = client.post("/tasks/", json={"title": "Antigo", "priority": "Baixa", "status": "Pendente"}).json()
    task_id = created["id"]

    response = client.patch(f"/tasks/{task_id}", json={"title": "Novo Título", "status": "Concluída"})
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Novo Título"
    assert data["status"] == "Concluída"


def test_delete_task(client):
    created = client.post("/tasks/", json={"title": "Para deletar", "priority": "Baixa", "status": "Pendente"}).json()
    task_id = created["id"]

    response = client.delete(f"/tasks/{task_id}")
    assert response.status_code == 200
    assert response.json()["message"] == "Tarefa eliminada com sucesso."

    # Verifica se já não existe
    get_res = client.get(f"/tasks/{task_id}")
    assert get_res.status_code == 404