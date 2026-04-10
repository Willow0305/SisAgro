### Listar Pesquisas
```bash
curl http://localhost:8000/api/pesquisas/
```

**Resposta esperada:**
```json
[
  {
    "id": 1,
    "nome": "LSPA/PAM",
    "data_criacao": "2024-01-15T10:30:00Z",
    "produtos": []
  }
]
```
 Certifique-se que o Django está rodando em `http://localhost:8000`

Todos os dados são salvos em:
- **Backend**: `backend/SisAgro/db.sqlite3`
- Os dados permanecem mesmo após reiniciar o servidor

## Próximos Passos

- Adicionar autenticação (Token ou JWT)
- Incluir permissões por usuário
- Adicionar validações avançadas
- Criar testes unitários
- Deployar para produção
