import httpx
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db
from app.models import UserChowing
from app.schemas import UserCreate, MessageResponse

router = APIRouter(prefix="/auth", tags=["Autenticação"])


@router.post("/signup", status_code=status.HTTP_201_CREATED, summary="Cadastrar novo usuário")
async def signup(credentials: UserCreate, db: Session = Depends(get_db)):
    url = f"{settings.SUPABASE_URL}/auth/v1/signup"
    headers = {
        "apikey": settings.SUPABASE_SECRET_KEY,
        "Content-Type": "application/json"
    }
    payload = {
        "email": credentials.email,
        "password": credentials.password,
        "data": {"name": credentials.name}
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=payload, headers=headers)

        if response.status_code not in (200, 201):
            error_data = response.json()
            raise HTTPException(
                status_code=response.status_code,
                detail=error_data.get("msg") or error_data.get("message") or "Erro ao cadastrar usuário."
            )

        # Salva o registro na tabela users_chowing
        new_user = UserChowing(
            name=credentials.name,
            email=credentials.email,
            password="[AUTH_MANAGED_BY_SUPABASE]"  # Senha real gerenciada de forma segura pelo Supabase Auth
        )
        db.add(new_user)
        db.commit()

        return {
            "message": "Usuário cadastrado com sucesso!",
            "data": response.json()
        }


@router.post("/login", summary="Fazer login e obter Access Token")
async def login(credentials: UserCreate):
    url = f"{settings.SUPABASE_URL}/auth/v1/token?grant_type=password"
    headers = {
        "apikey": settings.SUPABASE_SECRET_KEY,
        "Content-Type": "application/json"
    }
    payload = {
        "email": credentials.email,
        "password": credentials.password
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=payload, headers=headers)

        if response.status_code != 200:
            error_data = response.json()
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=error_data.get("error_description") or error_data.get("msg") or "Email ou senha incorretos."
            )

        data = response.json()
        return {
            "access_token": data.get("access_token"),
            "token_type": "bearer",
            "user_id": data.get("user", {}).get("id"),
            "email": data.get("user", {}).get("email")
        }