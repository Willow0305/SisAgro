import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentService {
  private apiUrl = `${environment.apiUrl}/estabelecimentos/`;

  constructor(private http: HttpClient) {}

  getEstablishments() {
    return this.http.get(this.apiUrl);
  }

  createEstablishment(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}
