import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit {

  usuario = 'Usuário';
  menuAberto = false;
  aba: string = 'visao';

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  mudarAba(nome: string) {
    this.aba = nome;

    setTimeout(() => {
      this.criarGraficos();
    }, 100);
  }

  ngAfterViewInit(): void {
    this.criarGraficos();
  }

  criarGraficos() {

    const canvas1 = document.getElementById('chartProducao') as HTMLCanvasElement | null;
    if (canvas1) {
      const ctx = canvas1.getContext('2d');
      if (ctx) {
        new Chart(ctx, { type: 'bar', data: { labels: ['Jan','Fev'], datasets: [{ label:'Produção', data:[10,20] }] } });
      }
    }

    const canvas2 = document.getElementById('chartPrecos') as HTMLCanvasElement | null;
    if (canvas2) {
      const ctx2 = canvas2.getContext('2d');
      if (ctx2) {
        new Chart(ctx2, { type: 'line', data: { labels:['Jan','Fev'], datasets:[{ data:[128,132] }] } });
      }
    }
  }
}