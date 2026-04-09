# Guia de Teste - Integração Backend-Frontend

## ✅ Tudo foi Configurado!

As seguintes etapas foram completadas:

### Backend
- ✅ Models Pesquisa e Produto criados
- ✅ Serializers configurados
- ✅ ViewSets e endpoints criados
- ✅ URLs configuradas em `/api/`
- ✅ CORS habilitado
- ✅ Migrations criadas e aplicadas
- ✅ Pesquisas padrão (LSPA/PAM, PPM, PEVS) inseridas no banco

### Frontend
- ✅ Services atualizados para chamar API
- ✅ Componentes modais integrados
- ✅ HttpClient configurado
- ✅ Observables e RxJS implementados

## 🚀 Como Testar

### 1. Iniciar o Servidor Django (Backend)

```bash
cd backend/SisAgro
c:\Users\User\Desktop\SisAgro\.venv\Scripts\python.exe manage.py runserver
```

Ou simplesmente (se o venv estiver ativado):
```bash
python manage.py runserver
```

**Saída esperada:**
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

### 2. Iniciar o Servidor Angular (Frontend)

Em outro terminal:
```bash
cd frontend
npm start
# ou
ng serve
```

**Saída esperada:**
```
✔ Compiled successfully.
→ Local: http://localhost:4200/
```

### 3. Testar no Navegador

#### ✅ Teste 1: Ver Pesquisas Existentes
1. Acesse: `http://localhost:4200/main`
2. Clique em "Menu Principal" (aba Visão Geral)
3. Clique no botão "Nova Pesquisa"
4. Você deve ver as 3 pesquisas padrão (LSPA/PAM, PPM, PEVS)

#### ✅ Teste 2: Criar Nova Pesquisa
1. No modal "Nova Pesquisa", digite um nome como: "Minha Pesquisa"
2. Clique em "Salvar"
3. Você deve ver a mensagem de sucesso em verde
4. A pesquisa aparecerá na lista abaixo
5. **Verificar**: Feche o modal e reabra. A pesquisa deve continuar lá (persistência)

#### ✅ Teste 3: Criar Produto
1. Clique no botão "Novo Produto"
2. Digite um nome como: "Tomate"
3. Selecione a pesquisa "LSPA/PAM" no dropdown
4. Clique em "Salvar"
5. Você deve ver a mensagem de sucesso
6. O produto aparecerá na lista com a pesquisa associada

#### ✅ Teste 4: Excluir Pesquisa
1. No modal "Nova Pesquisa", clique no ícone de lixo de uma pesquisa
2. Confirme a exclusão no modal de confirmação
3. A pesquisa deve desaparecer da lista
4. **Verificar**: Reabra o modal. A pesquisa não deve estar lá

#### ✅ Teste 5: Excluir Produto
1. No modal "Novo Produto", clique no ícone de lixo de um produto
2. Confirme a exclusão
3. O produto deve desaparecer da lista

## 📊 Verificar API Diretamente

Você também pode testar a API diretamente com ferramentas como Postman ou curl:

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

### Criar Pesquisa
```bash
curl -X POST http://localhost:8000/api/pesquisas/ \
  -H "Content-Type: application/json" \
  -d '{"nome": "Nova Pesquisa"}'
```

### Excluir Pesquisa
```bash
curl -X DELETE http://localhost:8000/api/pesquisas/1/
```

### Listar Produtos
```bash
curl http://localhost:8000/api/produtos/
```

### Criar Produto
```bash
curl -X POST http://localhost:8000/api/produtos/ \
  -H "Content-Type: application/json" \
  -d '{"nome": "Tomate", "pesquisa": 1}'
```

## 🔍 Verificação de Erros

Se algo não funcionar:

### Erro: "Cannot GET /api/pesquisas"
- Frontend não consegue conectar ao backend
- **Solução**: Certifique-se que o Django está rodando em `http://localhost:8000`

### Erro: CORS Error
- Problema de CORS
- **Solução**: Verificar se `CORS_ORIGIN_ALLOW_ALL = True` está em settings.py

### Erro: "Connection Refused"
- O backend não está rodando
- **Solução**: Iniciar o servidor Django conforme instruções acima

### Erro: Fields de Produto com ID diferente
- Pode ocorrer se nomear o campo como `pesquisa_id` em vez de `pesquisa`
- **Solução**: Use `pesquisa` como nome do campo

## 📝 Dados Persistidos

Todos os dados são salvos em:
- **Backend**: `backend/SisAgro/db.sqlite3`
- Os dados permanecem mesmo após reiniciar o servidor

## 🎬 Próximos Passos

- Adicionar autenticação (Token ou JWT)
- Incluir permissões por usuário
- Adicionar validações avançadas
- Criar testes unitários
- Deployar para produção
