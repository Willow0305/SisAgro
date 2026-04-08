import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

export interface Pesquisa {
  id: number;
  nome: string;
  data_criacao: string;
  produtos?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class PesquisaService {
  private apiUrl = 'http://localhost:8000/api/pesquisas/';


  constructor(private http: HttpClient) {}



  getPesquisas(): Observable<Pesquisa[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((resp) => {
        console.log('🔍 Pesquisa Response:', resp);
        let data = resp;
        if (resp?.value) {
          data = resp.value;
          console.log('📦 Extraído de resp.value');
        } else if (resp?.results) {
          data = resp.results;
          console.log('📦 Extraído de resp.results');
        } else if (!Array.isArray(resp)) {
          data = [];
          console.warn('⚠️ Resposta não é array nem tem value/results');
        }
        console.log('✅ Dados finais:', data);
        return Array.isArray(data) ? data : [];
      }),
      catchError((error) => {
        console.error('❌ Erro no serviço getPesquisas:', error);
        return of([]);
      })
    );
  }

  adicionarPesquisa(nome: string): Observable<Pesquisa> {
    return this.http.post<Pesquisa>(this.apiUrl, { nome });
  }

  excluirPesquisa(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

  obterPesquisaPorId(id: number): Observable<Pesquisa> {
    return this.http.get<Pesquisa>(`${this.apiUrl}${id}/`);
  }
}
