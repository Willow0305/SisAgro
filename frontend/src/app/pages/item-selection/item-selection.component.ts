import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface Produto {
  id: number;
  nome: string;
  pesquisa: number;
  data_criacao: string;
}

interface Pesquisa {
  id: number;
  nome: string;
  data_criacao: string;
  produtos?: Produto[];
}

@Component({
  selector: 'app-item-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-selection.component.html',
  styleUrls: ['./item-selection.component.scss']
})
export class ItemSelectionComponent implements OnInit {
  pesquisasList: Pesquisa[] = [];
  carregandoPesquisas = true;
  erroCarregamento: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarPesquisas();
  }

  carregarPesquisas(): void {
    this.carregandoPesquisas = true;
    this.erroCarregamento = null;

    this.http.get<Pesquisa[]>(`${environment.apiUrl}/api/pesquisas/`).subscribe({
      next: (dados) => {
        console.log('Pesquisas recebidas:', dados);

        // 🔥 GARANTE QUE SEMPRE EXISTA ARRAY DE PRODUTOS
        this.pesquisasList = (dados || []).map(p => ({
          ...p,
          produtos: p.produtos || []
        }));

        this.carregandoPesquisas = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar pesquisas:', err);
        this.pesquisasList = [];
        this.erroCarregamento = 'Não foi possível carregar as pesquisas cadastradas.';
        this.carregandoPesquisas = false;
      }
    });
  }

  voltar(): void {
    this.router.navigate(['/main']);
  }

  avancar(): void {
    this.router.navigate(['/questionnaire']);
  }

  trackByPesquisa(_: number, pesquisa: Pesquisa): number {
    return pesquisa.id;
  }

  trackByProduto(_: number, produto: Produto): number {
    return produto.id;
  }
}