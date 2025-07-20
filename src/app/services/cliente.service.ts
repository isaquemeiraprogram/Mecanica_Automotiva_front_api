import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private link ="https://localhost:7190/api/Cliente";
  constructor(private http:HttpClient) { }

  getAllClientesAsync():Observable<Cliente[]>
  {
    return this.http.get<Cliente[]>(this.link)
  }

  getByIdCliente(id:string):Observable<Cliente>
  {
    return this.http.get<Cliente>(this.link+"/"+id)
  }
}
// npx ng g service services/cliente gera um service