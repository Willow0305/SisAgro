import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PesquisaService, Pesquisa } from '../../../services/pesquisa';

@Component({
  selector: 'app-modal-pesquisa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-pesquisa.component.html',
  styleUrls: ['./modal-pesquisa.component.scss']
})
export class ModalPesquisaComponent implements OnInit {
  @Output() fecharModal = new EventEmitter<void>();

  novaPesquisa: string = '';
  pesquisasList: Pesquisa[] = [];
  mensagem: string = '';
  tipoMensagem: string = '';
  pesquisaParaExcluir: number | null = null;
  carregando: boolean = false;

  constructor(private pesquisaService: PesquisaService) {}

  ngOnInit(): void {
    this.carregarPesquisas();
  }

  carregarPesquisas(): void {
    this.pesquisaService.getPesquisas().subscribe(
      pesquisas => {
        this.pesquisasList = pesquisas;
      },
      error => {
        console.error('Erro ao carregar pesquisas:', error);
        this.mostrarMensagem('Erro ao carregar pesquisas', 'erro');
      }
    );
  }

  adicionarPesquisa(): void {
    if (!this.novaPesquisa.trim()) {
      this.mostrarMensagem('Por favor, preencha o nome da pesquisa', 'erro');
      return;
    }

    this.carregando = true;
    this.pesquisaService.adicionarPesquisa(this.novaPesquisa).subscribe(
      (pesquisa) => {
        this.mostrarMensagem('Pesquisa adicionada com sucesso!', 'sucesso');
        this.novaPesquisa = '';
        this.carregarPesquisas();
        this.carregando = false;
      },
      (error) => {
        console.error('Erro ao adicionar pesquisa:', error);
        const mensagemErro = this.extrairMensagemErro(error);
        this.mostrarMensagem(mensagemErro, 'erro');
        this.carregando = false;
      }
    );
  }

  confirmarExclusao(id: number): void {
    this.pesquisaParaExcluir = id;
  }

  cancelarExclusao(): void {
    this.pesquisaParaExcluir = null;
  }

  excluirPesquisa(): void {
    if (this.pesquisaParaExcluir !== null) {
      this.carregando = true;
      this.pesquisaService.excluirPesquisa(this.pesquisaParaExcluir).subscribe(
        () => {
          this.mostrarMensagem('Pesquisa excluída com sucesso!', 'sucesso');
          this.pesquisaParaExcluir = null;
          this.carregarPesquisas();
          this.carregando = false;
        },
        (error) => {
          console.error('Erro ao excluir pesquisa:', error);
          const mensagemErro = this.extrairMensagemErro(error);
          this.mostrarMensagem(mensagemErro, 'erro');
          this.carregando = false;
        }
      );
    }
  }

  fechar(): void {
    this.fecharModal.emit();
  }

  private extrairMensagemErro(error: any): string {
    if (error.error?.nome) {
      return error.error.nome[0] || 'Erro ao processar pesquisa';
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
    return 'Erro ao processar pesquisa. Tente novamente.';
  }

  private mostrarMensagem(texto: string, tipo: string): void {
    this.mensagem = texto;
    this.tipoMensagem = tipo;
    setTimeout(() => {
      this.mensagem = '';
    }, 3000);
  }
}
