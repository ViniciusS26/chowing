from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import Base, engine
from app.routers import tasks, auth
# Cria as tabelas automaticamente se não existirem
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API de Gerenciamento de Tarefas",
    version="1.0.0",
    debug=settings.DEBUG
)

# Configuração de CORS
origins = [origin.strip() for origin in settings.CORS_ORIGINS.split(",")]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(tasks.router)
app.include_router(auth.router)
@app.get("/health", tags=["Healthcheck"])
def healthcheck():
    return {"status": "ok", "app": settings.APP_NAME}