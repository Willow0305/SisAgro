# 🏗️ Arquitetura da Solução

## Diagrama de Fluxo - Criar Pesquisa

```
┌─────────────────────────────────────────────────────────────────┐
│                        CAMADA FRONTEND (Angular)                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  main.component.html                                     │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │ <button (click)="abrirModalPesquisa()">             │ │  │
│  │  │   Nova Pesquisa                                     │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  └──────────────────│──────────────────────────────────────┘  │
│                    │                                            │
│  ┌────────────────▼──────────────────────────────────────────┐ │
│  │ modal-pesquisa.component                                  │ │
│  │ ┌──────────────────────────────────────────────────────┐ │ │
│  │ │ adicionarPesquisa(): void                            │ │ │
│  │ │  - this.pesquisaService.adicionarPesquisa(nome)    │ │ │
│  │ │  - .subscribe(                                      │ │ │
│  │ │      (pesquisa) => mostrarMensagem('sucesso')     │ │ │
│  │ │    )                                               │ │ │
│  │ └──────────────────────────────────────────────────────┘ │ │
│  └──────────────────│──────────────────────────────────────┘ │
│                    │                                            │
│  ┌────────────────▼──────────────────────────────────────────┐ │
│  │ pesquisa.service.ts                                       │ │
│  │ ┌──────────────────────────────────────────────────────┐ │ │
│  │ │ adicionarPesquisa(nome: string)                      │ │ │
│  │ │  - return this.http.post<Pesquisa>(                │ │ │
│  │ │      'http://localhost:8000/api/pesquisas/',      │ │ │
│  │ │      { nome }                                      │ │ │
│  │ │    )                                               │ │ │
│  │ └──────────────────────────────────────────────────────┘ │ │
│  └──────────────────│──────────────────────────────────────┘ │
│                    │  HTTP POST                                │
│  ┌────────────────▼──────────────────────────────────────────┐ │
│  │ HttpClient                                                │ │
│  └──────────────────│──────────────────────────────────────┘ │
└─────────────────────┼──────────────────────────────────────────┘
                     │
                     │  HTTP POST /api/pesquisas/
                     │  Content-Type: application/json
                     │  Body: {"nome": "Nova Pesquisa"}
                     │
┌────────────────────▼──────────────────────────────────────────┐
│                    CAMADA BACKEND (Django)                     │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ urls.py - Router                                         │ │
│  │ POST /api/pesquisas/ → PesquisaViewSet.create()         │ │
│  └──────────────────│──────────────────────────────────────┘ │
│                    │                                           │
│  ┌────────────────▼──────────────────────────────────────────┐ │
│  │ views.py - PesquisaViewSet                              │ │
│  │ ┌──────────────────────────────────────────────────────┐ │ │
│  │ │ def create(self, request):                           │ │ │
│  │ │   - nome = request.data.get('nome')                │ │ │
│  │ │   - Validação: nome vazio?                         │ │ │
│  │ │   - Validação: duplicado?                          │ │ │
│  │ │   - serializer.save()                              │ │ │
│  │ │   - return Response(serializer.data, 201)          │ │ │
│  │ └──────────────────────────────────────────────────────┘ │ │
│  └──────────────────│──────────────────────────────────────┘ │
│                    │                                           │
│  ┌────────────────▼──────────────────────────────────────────┐ │
│  │ models.py - Pesquisa                                    │ │
│  │ ┌──────────────────────────────────────────────────────┐ │ │
│  │ │ class Pesquisa(models.Model):                       │ │ │
│  │ │   nome = CharField(max_length=255, unique=True)    │ │ │
│  │ │   data_criacao = DateTimeField(auto_now_add=True)  │ │ │
│  │ └──────────────────────────────────────────────────────┘ │ │
│  └──────────────────│──────────────────────────────────────┘ │
│                    │                                           │
│  ┌────────────────▼──────────────────────────────────────────┐ │
│  │ Database (SQLite)                                        │ │
│  │ ┌──────────────────────────────────────────────────────┐ │ │
│  │ │ INSERT INTO core_pesquisa (nome, data_criacao)     │ │ │
│  │ │ VALUES ('Nova Pesquisa', NOW())                    │ │ │
│  │ └──────────────────────────────────────────────────────┘ │ │
│  └──────────────────│──────────────────────────────────────┘ │
│                    │ ✅ Saved (id = 4)                        │
└────────────────────┼──────────────────────────────────────────┘
                     │
                     │  HTTP 201 Created
                     │  {
                     │    "id": 4,
                     │    "nome": "Nova Pesquisa",
                     │    "data_criacao": "2024-01-15T10:30:00Z"
                     │  }
                     │
┌────────────────────▼──────────────────────────────────────────┐
│                    CAMADA FRONTEND (Angular)                   │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ pesquisa.service.ts                                     │ │
│  │ ┌──────────────────────────────────────────────────────┐ │ │
│  │ │ .tap((pesquisa) => {                                │ │ │
│  │ │   const atuais = this.pesquisasSubject.value       │ │ │
│  │ │   this.pesquisasSubject.next([...atuais, pesquisa]) │ │ │
│  │ │ })                                                  │ │ │
│  │ └──────────────────────────────────────────────────────┘ │ │
│  └──────────────────│──────────────────────────────────────┘ │
│                    │                                            │
│  ┌────────────────▼──────────────────────────────────────────┐ │
│  │ modal-pesquisa.component.ts                             │ │
│  │ ┌──────────────────────────────────────────────────────┐ │ │
│  │ │ .subscribe(                                         │ │ │
│  │ │   () => mostrarMensagem('sucesso', 'sucesso')     │ │ │
│  │ │ )                                                  │ │ │
│  │ └──────────────────────────────────────────────────────┘ │ │
│  └──────────────────│──────────────────────────────────────┘ │
│                    │                                            │
│  ┌────────────────▼──────────────────────────────────────────┐ │
│  │ modal-pesquisa.component.html                           │ │
│  │ ┌──────────────────────────────────────────────────────┐ │ │
│  │ │ <div *ngIf="mensagem" [class]="tipoMensagem">     │ │ │
│  │ │   ✅ Pesquisa adicionada com sucesso!              │ │ │
│  │ │ </div>                                             │ │ │
│  │ │                                                     │ │ │
│  │ │ <div *ngFor="let pesquisa of pesquisasList">      │ │ │
│  │ │   {{ pesquisa.nome }}                              │ │ │
│  │ │ </div>                                             │ │ │
│  │ └──────────────────────────────────────────────────────┘ │ │
│  └──────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

## Estrutura de Pastas - Backend

```
backend/SisAgro/
│
├── core/                              # App responsável por Pesquisas e Produtos
│   ├── migrations/
│   │   └── 0001_initial.py            # ✅ Criar models no DB
│   │
│   ├── management/
│   │   ├── commands/
│   │   │   └── criar_pesquisas_padrao.py  # ✅ Inserir dados iniciais
│   │   └── __init__.py
│   │ 
│   ├── models.py                      # ✅ Pesquisa, Produto models
│   ├── serializers.py                 # ✅ JSON serializers
│   ├── views.py                       # ✅ ViewSets com CRUD
│   ├── apps.py
│   ├── tests.py
│   ├── admin.py
│   └── __init__.py
│
├── SisAgro/                           # Project config
│   ├── urls.py                        # ✅ Router com /api/
│   ├── settings.py                    # ✅ Configurações (CORS, INSTALLED_APPS)
│   ├── wsgi.py
│   ├── asgi.py
│   ├── views.py
│   ├── serializers.py
│   └── models.py
│
├── db.sqlite3                         # ✅ Banco de dados
└── manage.py
```

## Estrutura de Pastas - Frontend

```
frontend/src/app/
│
├── services/
│   ├── pesquisa.ts                    # ✅ HTTP calls para /api/pesquisas/
│   └── produto.ts                     # ✅ HTTP calls para /api/produtos/
│
├── pages/
│   ├── item-selection/
│   │   ├── item-selection.component.ts
│   │   ├── item-selection.component.html
│   │   └── item-selection.component.scss
│   │
│   └── main/
│       ├── main.component.ts          # ✅ Estado dos modais
│       ├── main.component.html        # ✅ Botões para abrir modais
│       ├── main.component.scss
│       │
│       └── modals/
│           ├── modal-pesquisa.component.ts        # ✅ CRUD Pesquisa
│           ├── modal-pesquisa.component.html      # ✅ UI Pesquisa
│           ├── modal-pesquisa.component.scss
│           ├── modal-pesquisa.spec.ts
│           │
│           ├── modal-produto.component.ts         # ✅ CRUD Produto
│           ├── modal-produto.component.html       # ✅ UI Produto
│           ├── modal-produto.component.scss
│           └── modal-produto.spec.ts
│
└── app.config.ts                      # ✅ HttpClient provider
```

## Endpoints Disponíveis

| Método | URL | Função | Body |
|--------|-----|--------|------|
| GET | `/api/pesquisas/` | Listar all | - |
| POST | `/api/pesquisas/` | Criar | `{"nome": "..."} ` |
| GET | `/api/pesquisas/{id}/` | Detalhe | - |
| DELETE | `/api/pesquisas/{id}/` | Excluir | - |
| GET | `/api/produtos/` | Listar all | - |
| POST | `/api/produtos/` | Criar | `{"nome": "...", "pesquisa": 1}` |
| GET | `/api/produtos/{id}/` | Detalhe | - |
| DELETE | `/api/produtos/{id}/` | Excluir | - |

## Estados da Aplicação

```typescript
// Modal Pesquisa
modalPesquisaAberta: boolean = false;      // Modal aberto/fechado
carregando: boolean = false;               // Sincronizando com servidor
pesquisasList: Pesquisa[] = [];            // lista de pesquisas
novaPesquisa: string = '';                 // input do novo nome
mensagem: string = '';                     // feedback para usuário

// Modal Produto
modalProdutoAberta: boolean = false;       // Modal aberto/fechado
carregando: boolean = false;               // Sincronizando com servidor
produtosList: Produto[] = [];              // lista de produtos
pesquisasList: Pesquisa[] = [];            // lista para dropdown
novoProduto = {                            // objeto novo produto
  nome: '',
  pesquisaId: 0
}
```

## Fluxo de Sincronização

```
┌─────────────────────────────────────────────────────────┐
│  1. Aplicação Inicia                                     │
│     ▼                                                    │
│  2. Services fazem GET para /api/pesquisas/            │
│     ▼                                                    │
│  3. Backend retorna lista do DB                         │
│     ▼                                                    │
│  4. Frontend carrega lista em BehaviorSubject           │
│     ▼                                                    │
│  5. Componentes se inscrevem (subscribe) na lista       │
│     ▼                                                    │
│  6. Usuário clica em "Adicionar"                        │
│     ▼                                                    │
│  7. Frontend envia POST para /api/pesquisas/           │
│     ▼                                                    │
│  8. Backend valida e salva no DB                        │
│     ▼                                                    │
│  9. Backend retorna novo item com ID                    │
│     ▼                                                    │
│  10. Service atualiza BehaviorSubject (tap operator)   │
│     ▼                                                    │
│  11. Componentes recebem notificação (observable)      │
│     ▼                                                    │
│  12. UI atualiza com novo item                          │
│     ▼                                                    │
│  ✅ Sincronização Completa                              │
└─────────────────────────────────────────────────────────┘
```

---

**Arquitetura Limpa e Escalável! 🎯**
