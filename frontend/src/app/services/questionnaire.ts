import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  private apiUrl = `${environment.apiUrl}/questionarios/`;

  constructor(private http: HttpClient) {}

  getQuestionnaires() {
    return this.http.get(this.apiUrl);
  }

  createQuestionnaire(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}
