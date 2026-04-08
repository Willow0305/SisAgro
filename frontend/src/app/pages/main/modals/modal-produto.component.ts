import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PesquisaService, Pesquisa } from '../../../services/pesquisa';
import { ProdutoService, Produto } from '../../../services/produto';

@Component({
  selector: 'app-modal-produto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-produto.component.html',
  styleUrls: ['./modal-produto.component.scss']
})
export class ModalProdutoComponent implements OnInit {
  @Output() fecharModal = new EventEmitter<void>();

  novoProduto: { nome: string; pesquisa: number } = {
    nome: '',
    pesquisa: 0
  };

  pesquisasList: Pesquisa[] = [];
  produtosList: Produto[] = [];
  mensagem: string = '';
  tipoMensagem: string = '';
  produtoParaExcluir: number | null = null;
  carregando: boolean = false;

  constructor(
    private pesquisaService: PesquisaService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.carregarPesquisas();
    this.carregarProdutos();
  }

  carregarPesquisas(): void {
    this.pesquisaService.getPesquisas().subscribe(
      pesquisas => {
        this.pesquisasList = pesquisas;
      },
      error => {
        console.error('Erro ao carregar pesquisas:', error);
      }
    );
  }

  carregarProdutos(): void {
    this.produtoService.getProdutos().subscribe(
      produtos => {
        this.produtosList = produtos;
      },
      error => {
        console.error('Erro ao carregar produtos:', error);
      }
    );
  }

  adicionarProduto(): void {
    if (!this.novoProduto.nome.trim()) {
      this.mostrarMensagem('Por favor, preencha o nome do produto', 'erro');
      return;
    }

    if (!this.novoProduto.pesquisa) {
      this.mostrarMensagem('Por favor, selecione uma pesquisa', 'erro');
      return;
    }

    this.carregando = true;
    this.produtoService.adicionarProduto(this.novoProduto.nome, this.novoProduto.pesquisa).subscribe(
      (produto) => {
        this.mostrarMensagem('Produto adicionado com sucesso!', 'sucesso');
        this.novoProduto = { nome: '', pesquisa: 0 };
        this.carregarProdutos();
        this.carregarPesquisas();
        this.carregando = false;
      },
      (error) => {
        console.error('Erro ao adicionar produto:', error);
        const mensagemErro = this.extrairMensagemErro(error);
        this.mostrarMensagem(mensagemErro, 'erro');
        this.carregando = false;
      }
    );
  }

  confirmarExclusao(id: number): void {
    this.produtoParaExcluir = id;
  }

  cancelarExclusao(): void {
    this.produtoParaExcluir = null;
  }

  excluirProduto(): void {
    if (this.produtoParaExcluir !== null) {
      this.carregando = true;
      this.produtoService.excluirProduto(this.produtoParaExcluir).subscribe(
        () => {
          this.mostrarMensagem('Produto excluído com sucesso!', 'sucesso');
          this.produtoParaExcluir = null;
          this.carregarProdutos();
          this.carregarPesquisas();
          this.carregando = false;
        },
        (error) => {
          console.error('Erro ao excluir produto:', error);
          const mensagemErro = this.extrairMensagemErro(error);
          this.mostrarMensagem(mensagemErro, 'erro');
          this.carregando = false;
        }
      );
    }
  }

  obterNomePesquisa(pesquisaId: number): string {
    const pesquisa = this.pesquisasList.find(p => p.id === pesquisaId);
    return pesquisa ? pesquisa.nome : 'Pesquisa não encontrada';
  }

  fechar(): void {
    this.fecharModal.emit();
  }

  private extrairMensagemErro(error: any): string {
    if (error.error?.nome) {
      return error.error.nome[0] || 'Erro ao processar produto';
    }
    if (error.error?.pesquisa) {
      return 'Pesquisa inválida';
    }
    if (error.error?.error) {
      return error.error.error;
    }
    if (error.error?.detail) {
      return error.error.detail;
    }
    if (typeof error.error === 'string') {
      return error.error;
    }
    return 'Erro ao processar produto. Tente novamente.';
  }

  private mostrarMensagem(texto: string, tipo: string): void {
    this.mensagem = texto;
    this.tipoMensagem = tipo;
    setTimeout(() => {
      this.mensagem = '';
    }, 3000);
  }
}
