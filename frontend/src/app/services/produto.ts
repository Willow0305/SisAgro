import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  private apiUrl = 'http://localhost:8000/api/produtos/';


  constructor(private http: HttpClient) {}



  getProdutos(): Observable<Produto[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((resp) => {
        console.log('🔍 Produto Response:', resp);
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
    return this.http.get<any>(`${this.apiUrl}?pesquisa=${pesquisaId}`).pipe(
      map((resp) => {
        if (Array.isArray(resp)) return resp as Produto[];
        return (resp.results ?? resp.value ?? resp) as Produto[];
      })
    );
  }
}
