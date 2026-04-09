import { Component, OnInit } from '@angular/core';
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
  produtos: Produto[];
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
    private router: Router
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
        this.pesquisasList = Array.isArray(dados) ? dados : [];
        this.carregandoPesquisas = false;
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