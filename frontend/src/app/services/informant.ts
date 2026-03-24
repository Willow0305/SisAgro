import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InformantService {
  private apiUrl = `${environment.apiUrl}/informantes/`;

  constructor(private http: HttpClient) {}

  getInformants() {
    return this.http.get(this.apiUrl);
  }

  createInformant(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}
