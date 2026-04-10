#### 1. **Models** (`core/models.py`)
```python
- Pesquisa: id, nome (unique), data_criacao
- Produto: id, nome, pesquisa (FK), data_criacao

#### 4. **URLs** (`SisAgro/urls.py`)
```
POST   /api/pesquisas/         - Criar pesquisa
GET    /api/pesquisas/         - Listar pesquisas
GET    /api/pesquisas/{id}/    - Obter pesquisa
DELETE /api/pesquisas/{id}/    - Excluir pesquisa

POST   /api/produtos/          - Criar produto
GET    /api/produtos/          - Listar produtos
GET    /api/produtos/{id}/     - Obter produto
DELETE /api/produtos/{id}/     - Excluir produto
```

#### 1. **Services Atualizados**
```typescript
// pesquisa.ts
- getPesquisas(): Observable<Pesquisa[]>
- adicionarPesquisa(nome): Observable<Pesquisa>
- excluirPesquisa(id): Observable<any>
- obterPesquisaPorId(id): Observable<Pesquisa>

// produto.ts
- getProdutos(): Observable<Produto[]>
- adicionarProduto(nome, pesquisaId): Observable<Produto>
- excluirProduto(id): Observable<any>
- obterProdutosPorPesquisa(pesquisaId): Observable<Produto[]>
```

#### 3. **Configuração HTTP**
- `app.config.ts`: HttpClient adicionado
- Providers configurados para requisições HTTP


## 🔄 Fluxo de Dados
### Criar Pesquisa
```
Frontend (Modal) → ng POST → Backend → Django Valida 
    ↓ OK ↓
Backend Salva no DB → ng Response → Frontend Atualiza Lista
```

## 🎓 Próximas Melhorias Sugeridas

1. **Autenticação**: Adicionar JWT/Token
2. **Permissões**: Controle por usuário
3. **Validações Avançadas**: Frontend e Backend sincronizadas
4. **Testes E2E**: Cypress ou Playwright
5. **Documentação API**: Swagger/OpenAPI
6. **Paginação**: Para listas grandes
7. **Cache**: Redis para performance
8. **Deploy**: Docker + CI/CD
