import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PesquisaService, Pesquisa } from '../../services/pesquisa';
import { ProdutoService, Produto } from '../../services/produto';

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit, OnDestroy {
  pesquisas: Pesquisa[] = [];
  produtos: Produto[] = [];
  carregando = true;
  erro: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private pesquisaService: PesquisaService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.carregando = true;
    this.erro = null;

    // Carregar pesquisas
    this.pesquisaService.getPesquisas()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (pesquisas) => {
          this.pesquisas = pesquisas;
          console.log('✅ Pesquisas carregadas:', pesquisas);
          
          // Carregar produtos após pesquisas
          this.produtoService.getProdutos()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (produtos) => {
                this.produtos = produtos;
                console.log('✅ Produtos carregados:', produtos);
                
                // Associar produtos às pesquisas
                this.pesquisas = this.pesquisas.map(pesquisa => ({
                  ...pesquisa,
                  produtos: this.produtos.filter(p => p.pesquisa === pesquisa.id)
                }));
                
                this.carregando = false;
              },
              error: (erro) => {
                console.error('❌ Erro ao carregar produtos:', erro);
                this.erro = 'Erro ao carregar produtos';
                this.carregando = false;
              }
            });
        },
        error: (erro) => {
          console.error('❌ Erro ao carregar pesquisas:', erro);
          this.erro = 'Erro ao carregar pesquisas';
          this.carregando = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}