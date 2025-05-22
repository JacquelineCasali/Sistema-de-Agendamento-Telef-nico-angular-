import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getContatos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getContatosPorId(contatoId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${contatoId}`);
  }
 

  getContatoById(contatoId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${contatoId}`);
  }
  criaContato(contato: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, contato);
  }

  atualizarContato(contatoId:number, contato: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${contatoId}`, contato);
  }

// favorito(contatoId: number, contato: any): Observable<any> {
//   return this.http.patch(`${this.apiUrl}/${contatoId}/favorito`, contato);
// }
  deletar(contatoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${contatoId}`, { responseType: 'text' });
  }
 
}