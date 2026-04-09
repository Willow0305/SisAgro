import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface ApiListResponse<T> {
  value?: T[];
  results?: T[];
}

export interface ProdutoResumo {
  id: number;
  nome: string;
  pesquisa: number;
  data_criacao: string;
}

export interface Pesquisa {
  id: number;
  nome: string;
  data_criacao: string;
  produtos?: ProdutoResumo[];
}

@Injectable({
  providedIn: 'root'
})
export class PesquisaService {
  private apiUrl = `${environment.apiUrl}/api/pesquisas/`;


  constructor(private http: HttpClient) {}

  getPesquisas(): Observable<Pesquisa[]> {
    return this.http.get<Pesquisa[] | ApiListResponse<Pesquisa>>(this.apiUrl).pipe(
      map((response) => this.extrairLista(response)),
      map((pesquisas) => pesquisas.map((pesquisa) => ({
        ...pesquisa,
        produtos: Array.isArray(pesquisa.produtos) ? pesquisa.produtos : []
      }))),
      catchError((error) => {
        console.error('Erro ao buscar pesquisas:', error);
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

  private extrairLista(response: Pesquisa[] | ApiListResponse<Pesquisa>): Pesquisa[] {
    if (Array.isArray(response)) {
      return response;
    }

    if (Array.isArray(response.results)) {
      return response.results;
    }

    if (Array.isArray(response.value)) {
      return response.value;
    }

    return [];
  }
}
