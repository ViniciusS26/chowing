from datetime import date, datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, EmailStr
from app.models import PriorityEnum, StatusEnum

# --- SCHEMAS DE USUÁRIO ---
class UserCreate(BaseModel):
    name: Optional[str] = None
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    name: Optional[str] = None
    email: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

# --- SCHEMAS DE TAREFA ---
class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: Optional[date] = None
    priority: PriorityEnum = PriorityEnum.media
    status: StatusEnum = StatusEnum.pendente

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[date] = None
    priority: Optional[PriorityEnum] = None
    status: Optional[StatusEnum] = None

class TaskResponse(TaskBase):
    id: int
    user_id: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

class MessageResponse(BaseModel):
    message: str