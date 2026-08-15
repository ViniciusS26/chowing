## Este projeto consiste na construção de um site de gerenciamento de tarefas para a matéria de Sistemas Distribuidos do curso de Gradução em Sistemas de Informação.

## Especificações do projeto

Implementar um sistema distribuído de gerenciamento de tarefas, com cliente e servidor separados, utilizando uma aplicação web simples.
O sistema permitirá que usuários autenticados criem e gerenciem suas próprias tarefas, enquanto o frontend se comunica com uma API REST desenvolvida separadamente no backend.

# Frontend - Sistema de Tarefas

## Tecnologias
- React
- Vite
- Docker

## Como executar localmente

### Com npm
```bash
npm install
npm run dev
```

## Estrutura principal
- `src/` - código fonte do frontend
- `public/` - arquivos públicos
- `index.html` - página inicial
- `vite.config.js` - configuração do Vite
- `Dockerfile` - configuração para container

## Observações
O frontend foi configurado para rodar em modo de desenvolvimento dentro do container e expor a porta 5173.


# Backend - Sistema de Tarefas

## Tecnologias
- FastAPI
- SQLAlchemy
- PostgreSQL
- Supabase
- Pytest



## Como executar

### 1. Criar ambiente virtual
```bash
python -m venv .venv
source .venv/bin/activate   # Linux/macOS
.venv\Scripts\activate      # Windows
```

### 2. Instalar dependências
```bash
pip install -r requirements.txt
```

## Integração com Supabase/Postgres
O projeto já está preparado para usar:
- PostgreSQL local
- Banco remoto do Supabase