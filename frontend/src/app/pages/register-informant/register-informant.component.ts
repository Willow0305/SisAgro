import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register-informant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register-informant.component.html',
  styleUrls: ['./register-informant.component.scss']
})
export class RegisterInformantComponent {
  // Add your logic here

  constructor(private router: Router) {}

  voltarForMain() {
    this.router.navigate(["/main"])
  }
}