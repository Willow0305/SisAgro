import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface ApiListResponse<T> {
  value?: T[];
  results?: T[];
}

export interface Produto {
  id: number;
  nome: string;
  pesquisa: number;
  data_criacao: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = `${environment.apiUrl}/api/produtos/`;


  constructor(private http: HttpClient) {}

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[] | ApiListResponse<Produto>>(this.apiUrl).pipe(
      map((response) => this.extrairLista(response)),
      catchError((error) => {
        console.error('Erro ao buscar produtos:', error);
        return of([]);
      })
    );
  }

  adicionarProduto(nome: string, pesquisaId: number): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, { nome, pesquisa: pesquisaId });
  }

  excluirProduto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

  obterProdutosPorPesquisa(pesquisaId: number): Observable<Produto[]> {
    return this.getProdutos().pipe(
      map((produtos) => produtos.filter((produto) => produto.pesquisa === pesquisaId))
    );
  }

  private extrairLista(response: Produto[] | ApiListResponse<Produto>): Produto[] {
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
