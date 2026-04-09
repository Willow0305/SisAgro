# Integração Frontend-Backend - Pesquisas e Produtos

## Passos para Ativar a Integração

### Backend (Django)

1. **Criar as migrations:**
```bash
cd backend/SisAgro
python manage.py makemigrations
```

2. **Aplicar as migrations:**
```bash
python manage.py migrate
```

3. **Criar um superusuário (opcional, para admin):**
```bash
python manage.py createsuperuser
```

4. **Rodar o servidor:**
```bash
python manage.py runserver
```

O servidor estará em: `http://localhost:8000`

### Frontend (Angular)

1. **Instalar dependências (se necessário):**
```bash
cd frontend
npm install
```

2. **Rodar o servidor Angular:**
```bash
ng serve
# ou
npm start
```

O servidor estará em: `http://localhost:4200`

## API Endpoints Disponíveis

### Pesquisas
- `GET /api/pesquisas/` - Listar todas as pesquisas
- `POST /api/pesquisas/` - Criar nova pesquisa
  ```json
  {"nome": "Nova Pesquisa"}
  ```
- `GET /api/pesquisas/{id}/` - Obter uma pesquisa específica
- `DELETE /api/pesquisas/{id}/` - Excluir uma pesquisa

### Produtos
- `GET /api/produtos/` - Listar todos os produtos
- `POST /api/produtos/` - Criar novo produto
  ```json
  {"nome": "Novo Produto", "pesquisa": 1}
  ```
- `GET /api/produtos/{id}/` - Obter um produto específico
- `DELETE /api/produtos/{id}/` - Excluir um produto
- `GET /api/produtos/por_pesquisa/?pesquisa_id=1` - Listar produtos de uma pesquisa

## Funcionalidades Implementadas

✅ Cadastro de Pesquisas com persistência no banco de dados
✅ Cadastro de Produtos vinculados a Pesquisas
✅ Exclusão de Pesquisas e Produtos
✅ Validação de dados (nome único, obrigatoriedade de campos)
✅ Feedback visual (sucesso/erro)
✅ Sincronização em tempo real entre frontend e backend

## CORS Configurado

O CORS está habilitado para aceitar requisições de `http://localhost:4200`

## Banco de Dados

O projeto usa SQLite por padrão. O arquivo do banco está em:
`backend/SisAgro/db.sqlite3`
