import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  getByCpfClienteAsync(cpf: string): Observable<Cliente> {
    return this.http.get<Cliente>(this.link + "/cpf/" + cpf)
  }

  addClienteAsync(dto: ClienteDto): Observable<Cliente> {
    return this.http.post<Cliente>(this.link, dto)
  }

  updateClienteAsync(cpf: string, dto: ClienteDto): Observable<Cliente> {
    return this.http.put<Cliente>(this.link + "/cpf/" + cpf, dto)
  }

  deleteClienteAsync(cpf: string): Observable<string> {
    return this.http.delete<string>(this.link + "/cpf/" + cpf)
  }
}
  // npx ng g service services/cliente gera um service