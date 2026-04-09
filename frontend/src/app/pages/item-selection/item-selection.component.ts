import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, forkJoin } from 'rxjs';
import { PesquisaService, Pesquisa } from '../../services/pesquisa';
import { ProdutoService, Produto } from '../../services/produto';
import { finalize, takeUntil } from 'rxjs/operators';

interface PesquisaComProdutos extends Pesquisa {
  produtos: Produto[];
}

@Component({
  selector: 'app-item-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-selection.component.html',
  styleUrls: ['./item-selection.component.scss']
})
export class ItemSelectionComponent implements OnInit, OnDestroy {
  pesquisasList: PesquisaComProdutos[] = [];
  carregandoPesquisas: boolean = true;
  erroCarregamento: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private pesquisaService: PesquisaService,
    private produtoService: ProdutoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarPesquisas();
  }

  carregarPesquisas(): void {
    this.carregandoPesquisas = true;
    this.erroCarregamento = null;

    forkJoin({
      pesquisas: this.pesquisaService.getPesquisas(),
      produtos: this.produtoService.getProdutos()
    })
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.carregandoPesquisas = false;
        })
      )
      .subscribe({
        next: ({ pesquisas, produtos }) => {
          this.pesquisasList = this.montarPesquisasComProdutos(pesquisas, produtos);
        },
        error: (error) => {
          console.error('Erro ao carregar pesquisas e produtos:', error);
          this.pesquisasList = [];
          this.erroCarregamento = 'Nao foi possivel carregar pesquisas e produtos cadastrados.';
        }
      });
  }

  voltar(): void {
    this.router.navigate(['/main']);
  }

  avancar(): void {
    this.router.navigate(['/questionnaire']);
  }

  trackByPesquisa(_: number, pesquisa: PesquisaComProdutos): number {
    return pesquisa.id;
  }

  trackByProduto(_: number, produto: Produto): number {
    return produto.id;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private montarPesquisasComProdutos(pesquisas: Pesquisa[], produtos: Produto[]): PesquisaComProdutos[] {
    return pesquisas.map((pesquisa) => ({
      ...pesquisa,
      produtos: produtos.filter((produto) => produto.pesquisa === pesquisa.id)
    }));
  }
}