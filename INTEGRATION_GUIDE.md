## Passos para Ativar a Integração
### Backend (Django)

1. **Criar as migrations:**
```bash
cd backend/SisAgro
python manage.py makemigrations
python manage.py migrate
```
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
