import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente, ClienteDto } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private link = "https://localhost:7190/api/Cliente";
  constructor(private http: HttpClient) { }

  getAllClientesAsync(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.link)
  }

  getByIdCliente(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(this.link + "/" + id)
  }

  addCliente(dto: ClienteDto): Observable<Cliente> {
    return this.http.post<Cliente>(this.link, dto)
  }

  deleteCliente(id: string): Observable<string> {
    return this.http.delete<string>(this.link + "/" + id)
  }
}
// npx ng g service services/cliente gera um service