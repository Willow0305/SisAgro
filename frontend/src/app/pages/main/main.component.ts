import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { RouterModule, Router } from '@angular/router';
import { ModalPesquisaComponent } from './modals/modal-pesquisa.component';
import { ModalProdutoComponent } from './modals/modal-produto.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterModule, ModalPesquisaComponent, ModalProdutoComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit, OnDestroy {

  usuario = 'Usuário';
  menuAberto = false;
  aba: string = 'visao';
  modalPesquisaAberta = false;
  modalProdutoAberta = false;

  get temModalAberta(): boolean {
    return this.modalPesquisaAberta || this.modalProdutoAberta;
  }

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  mudarAba(nome: string) {
    this.aba = nome;

    setTimeout(() => {
      this.criarGraficos();
    }, 100);
  }

  abrirModalPesquisa() {
    this.modalProdutoAberta = false;
    this.modalPesquisaAberta = true;
    this.atualizarEstadoPagina();
  }

  abrirModalProduto() {
    this.modalPesquisaAberta = false;
    this.modalProdutoAberta = true;
    this.atualizarEstadoPagina();
  }

  fecharModalPesquisa() {
    this.modalPesquisaAberta = false;
    this.atualizarEstadoPagina();
  }

  fecharModalProduto() {
    this.modalProdutoAberta = false;
    this.atualizarEstadoPagina();
  }

  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/login']);
  }

  novoInformante() {
    this.router.navigate(['/register-informant']);
  }

  novoEstabelecimento() {

  }
  
  novaPesquisa() {
    this.abrirModalPesquisa();
  }
    
  novoProduto() {
    this.abrirModalProduto();
  }
    
  relatorio() {

  }

  ngAfterViewInit(): void {
    this.criarGraficos();
  }

  ngOnDestroy(): void {
    document.body.classList.remove('modal-open');
  }

  criarGraficos() {

    const canvas1 = document.getElementById('grafico1') as HTMLCanvasElement | null;
    if (canvas1) {
      const ctx = canvas1.getContext('2d');
      if (ctx) {
        new Chart(ctx, { type: 'bar', data: { labels: ['Jan','Fev'], datasets: [{ label:'Produção', data:[10,20] }] } });
      }
    }

    const canvas2 = document.getElementById('grafico2') as HTMLCanvasElement | null;
    if (canvas2) {
      const ctx2 = canvas2.getContext('2d');
      if (ctx2) {
        new Chart(ctx2, { type: 'line', data: { labels:['Jan','Fev'], datasets:[{ data:[128,132] }] } });
      }
    }
  }

  private atualizarEstadoPagina(): void {
    document.body.classList.toggle('modal-open', this.temModalAberta);
  }
}