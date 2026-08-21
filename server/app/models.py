import enum
from datetime import datetime, timezone
from sqlalchemy import Column, BigInteger, String, Text, Date, DateTime, Enum
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base

class PriorityEnum(str, enum.Enum):
    baixa = "Baixa"
    media = "Média"
    alta = "Alta"

class StatusEnum(str, enum.Enum):
    pendente = "Pendente"
    em_andamento = "Em andamento"
    concluida = "Concluída"

class UserChowing(Base):
    __tablename__ = "users_chowing"

    id = Column(BigInteger, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=True)
    email = Column(String, nullable=False, unique=True, index=True)
    password = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

class Task(Base):
    __tablename__ = "tasks"

    id = Column(BigInteger, primary_key=True, index=True, autoincrement=True)
    user_id = Column(UUID(as_uuid=False), nullable=False, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    due_date = Column(Date, nullable=True)
    priority = Column(
        Enum(PriorityEnum, values_callable=lambda x: [e.value for e in x], name="priority_enum", create_type=False),
        default=PriorityEnum.media,
        nullable=False
    )
    status = Column(
        Enum(StatusEnum, values_callable=lambda x: [e.value for e in x], name="status_enum", create_type=False),
        default=StatusEnum.pendente,
        nullable=False
    )
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))