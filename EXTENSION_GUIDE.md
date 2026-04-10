## 1️⃣ Adicionar Nova Entidade (Ex: Propriedade)

### Passo 1: Criar Model no Backend

Arquivo: `backend/SisAgro/core/models.py`

```python
class Propriedade(models.Model):
    nome = models.CharField(max_length=100, unique=True)
    municipio = models.CharField(max_length=100)
    area = models.FloatField()
    data_criacao = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Propriedades"
        ordering = ['data_criacao']
    
    def __str__(self):
        return self.nome
```

### Passo 2: Criar Serializer

Arquivo: `backend/SisAgro/core/serializers.py`

```python
class PropriedadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Propriedade
        fields = ['id', 'nome', 'municipio', 'area', 'data_criacao']
    
    def validate_nome(self, value):
        if not value.strip():
            raise serializers.ValidationError("Nome não pode estar vazio")
        return value
    
    def validate(self, data):
        # Verificar duplicata (case-insensitive)
        if Propriedade.objects.filter(
            nome__iexact=data['nome']
        ).exclude(id=self.instance.id if self.instance else None).exists():
            raise serializers.ValidationError(
                {"nome": ["Propriedade com este nome já existe"]}
            )
        return data
```

### Passo 3: Criar ViewSet

Arquivo: `backend/SisAgro/core/views.py`

```python
class PropriedadeViewSet(viewsets.ModelViewSet):
    queryset = Propriedade.objects.all()
    serializer_class = PropriedadeSerializer
```

### Passo 4: Registrar na Admin

Arquivo: `backend/SisAgro/core/admin.py`

```python
@admin.register(Propriedade)
class PropriedadeAdmin(admin.ModelAdmin):
    list_display = ('nome', 'municipio', 'area', 'data_criacao')
    search_fields = ('nome', 'municipio')
    list_filter = ('data_criacao', 'municipio')
    ordering = ('-data_criacao',)
```

### Passo 5: Registrar Rota

Arquivo: `backend/SisAgro/SisAgro/urls.py`

```python
from rest_framework.routers import DefaultRouter
from core import views

router = DefaultRouter()
router.register(r'pesquisas', views.PesquisaViewSet)
router.register(r'produtos', views.ProdutoViewSet)
router.register(r'propriedades', views.PropriedadeViewSet)  # 👈 NOVA

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
```

### Passo 6: Criar e Aplicar Migração

```bash
cd backend/SisAgro
python manage.py makemigrations
python manage.py migrate
```

---

## 2️⃣ Criar Service Frontend

Novo arquivo: `frontend/src/app/services/propriedade.ts`

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Propriedade {
  id?: number;
  nome: string;
  municipio: string;
  area: number;
  data_criacao?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PropriedadeService {
  private apiUrl = 'http://localhost:8000/api/propriedades/';
  private propriedadesSubject = new BehaviorSubject<Propriedade[]>([]);

  constructor(private http: HttpClient) {
    this.carregarPropriedad();
  }

  getPropriedades(): Observable<Propriedade[]> {
    return this.propriedadesSubject.asObservable();
  }

  carregarPropriedad(): void {
    this.http.get<Propriedade[]>(this.apiUrl).subscribe(
      (propriedades) => {
        this.propriedadesSubject.next(propriedades);
      },
      (error) => console.error('Erro ao carregar propriedades:', error)
    );
  }

  adicionarPropriedade(propriedade: Propriedade): Observable<Propriedade> {
    return this.http.post<Propriedade>(this.apiUrl, propriedade).pipe(
      tap((novaPropriedade) => {
        const atuais = this.propriedadesSubject.value;
        this.propriedadesSubject.next([...atuais, novaPropriedade]);
      })
    );
  }

  excluirPropriedade(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`).pipe(
      tap(() => {
        const atuais = this.propriedadesSubject.value;
        this.propriedadesSubject.next(
          atuais.filter((p) => p.id !== id)
        );
      })
    );
  }
}
```

---

## 3️⃣ Criar Modal Component

Novo arquivo: `frontend/src/app/pages/main/modals/modal-propriedade.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropriedadeService, Propriedade } from '../../../services/propriedade';

@Component({
  selector: 'app-modal-propriedade',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-propriedade.component.html',
  styleUrls: ['./modal-propriedade.component.scss']
})
export class ModalPropriedadeComponent implements OnInit {
  nome = '';
  municipio = '';
  area: number | null = null;
  propriedades: Propriedade[] = [];
  mensagem = '';
  tipoMensagem: 'sucesso' | 'erro' = 'sucesso';

  constructor(private propriedadeService: PropriedadeService) {}

  ngOnInit(): void {
    this.propriedadeService.getPropriedades().subscribe(
      (propriedades) => {
        this.propriedades = propriedades;
      },
      (error) => {
        this.mostrarMensagem('Erro ao carregar propriedades', 'erro');
      }
    );
  }

  adicionarPropriedade(): void {
    if (!this.nome.trim() || !this.municipio.trim() || !this.area) {
      this.mostrarMensagem('Preencha todos os campos', 'erro');
      return;
    }

    this.propriedadeService
      .adicionarPropriedade({
        nome: this.nome,
        municipio: this.municipio,
        area: this.area
      })
      .subscribe(
        () => {
          this.mostrarMensagem('Propriedade adicionada com sucesso!', 'sucesso');
          this.limpar();
        },
        (error) => {
          const msg = this.extrairMensagemErro(error);
          this.mostrarMensagem(msg, 'erro');
        }
      );
  }

  excluirPropriedade(id: number | undefined): void {
    if (!id) return;
    if (!confirm('Tem certeza?')) return;

    this.propriedadeService.excluirPropriedade(id).subscribe(
      () => {
        this.mostrarMensagem('Propriedade excluída com sucesso!', 'sucesso');
      },
      (error) => {
        const msg = this.extrairMensagemErro(error);
        this.mostrarMensagem(msg, 'erro');
      }
    );
  }

  private extrairMensagemErro(error: any): string {
    if (error.error?.nome) return error.error.nome[0];
    if (error.error?.municipio)
      return error.error.municipio[0];
    if (error.error?.area) return error.error.area[0];
    if (error.error?.error) return error.error.error;
    if (error.error?.detail) return error.error.detail;
    if (typeof error.error === 'string') return error.error;
    return 'Erro ao processar. Tente novamente.';
  }

  private mostrarMensagem(
    mensagem: string,
    tipo: 'sucesso' | 'erro'
  ): void {
    this.mensagem = mensagem;
    this.tipoMensagem = tipo;
    setTimeout(() => (this.mensagem = ''), 3000);
  }

  private limpar(): void {
    this.nome = '';
    this.municipio = '';
    this.area = null;
  }
}
```

Arquivo: `frontend/src/app/pages/main/modals/modal-propriedade.component.html`

```html
<div class="modal-content">
  <h3>Gerenciar Propriedades</h3>

  <div class="form-group">
    <input
      type="text"
      placeholder="Nome da propriedade"
      [(ngModel)]="nome"
    />
    <input type="text" placeholder="Município" [(ngModel)]="municipio" />
    <input type="number" placeholder="Área (hectares)" [(ngModel)]="area" />
    <button (click)="adicionarPropriedade()">Adicionar</button>
  </div>

  <div *ngIf="mensagem" [ngClass]="tipoMensagem" class="mensagem">
    {{ mensagem }}
  </div>

  <div class="lista">
    <div *ngFor="let prop of propriedades" class="item">
      <div>
        <strong>{{ prop.nome }}</strong>
        <p>{{ prop.municipio }} - {{ prop.area }} ha</p>
      </div>
      <button (click)="excluirPropriedade(prop.id)" class="btn-delete">
        🗑️
      </button>
    </div>
  </div>
</div>
```

---

## 4️⃣ Integrar Modal no Main Component

Arquivo: `frontend/src/app/pages/main/main.component.ts`

```typescript
import { ModalPropriedadeComponent } from './modals/modal-propriedade.component';

export class MainComponent {
  mostrarModalPropriedade = false;

  abrirModalPropriedade(): void {
    this.mostrarModalPropriedade = true;
  }

  fecharModalPropriedade(): void {
    this.mostrarModalPropriedade = false;
  }
}
```

Arquivo: `frontend/src/app/pages/main/main.component.html`

```html
<button (click)="abrirModalPropriedade()">Nova Propriedade</button>

<app-modal-propriedade *ngIf="mostrarModalPropriedade" 
  (fechar)="fecharModalPropriedade()">
</app-modal-propriedade>
```

---

## 5️⃣ Padrão Architecture Estabelecido

### Backend Flow:
```
Model → Serializer → ViewSet → Router → API Endpoint
```

### Frontend Flow:
```
Service → Component Modal → Template
    ↓
BehaviorSubject ← HttpClient Observable
```

### Sincronização:
```
POST/DELETE → tap() operator → BehaviorSubject.next() → Componente atualiza
```

---

## 6️⃣ Checklist para Nova Funcionalidade

### Backend:
- [ ] Model criado com campos corretos
- [ ] Serializer com validações
- [ ] ViewSet criado
- [ ] Admin registrada
- [ ] Router registrada
- [ ] Migração criada
- [ ] Migração aplicada
- [ ] API testada com curl

### Frontend:
- [ ] Service criado
- [ ] Interfaces TypeScript
- [ ] Modal component criado
- [ ] Template HTML
- [ ] Integrado no main component
- [ ] Botão adicionado
- [ ] Testado no navegador

---

## 7️⃣ Testing Rápido

```bash
# Backend
curl -X POST http://localhost:8000/api/propriedades/ \
  -H "Content-Type: application/json" \
  -d '{"nome": "Sítio A", "municipio": "Brasília", "area": 50}'

# Frontend
## Abrir console: F12
## Ir para: localhost:4200/main
## Clicar: Nova Propriedade
## Verificar: Adição exibida em tempo real
```

---

## 8️⃣ Relacionamentos Entre Entidades

Se precisa relacionar nova entidade com existente:

### Exemplo: Propriedade ↔ Pesquisa

```python
# models.py
class Propriedade(models.Model):
    nome = models.CharField(max_length=100)
    pesquisa = models.ForeignKey(
        Pesquisa, 
        on_delete=models.CASCADE,
        related_name='propriedades'
    )
```

```python
# serializers.py
class PropriedadeSerializer(serializers.ModelSerializer):
    pesquisa_nome = serializers.CharField(source='pesquisa.nome', read_only=True)
    
    class Meta:
        model = Propriedade
        fields = ['id', 'nome', 'pesquisa', 'pesquisa_nome']
```

```typescript
// Frontend
propriedades: Propriedade[] = [];
pesquisas: Pesquisa[] = [];
pesquisaSelecionada: number | null = null;

adicionarPropriedade(): void {
  this.propriedadeService.adicionarPropriedade({
    nome: this.nome,
    pesquisa: this.pesquisaSelecionada
  }).subscribe(...);
}
```

---

## 🎯 Resumo

Toda nova entidade segue:
1. Backend: Model → Serializer → ViewSet → Router
2. Frontend: Service → Modal → Main Component
3. Padrão: BehaviorSubject + HttpClient + tap()
4. Validação: Serializer (backend) + IFs (frontend)
5. Sincronização: Observable pattern

Isso mantém consistência e facilita manutenção! 🚀
