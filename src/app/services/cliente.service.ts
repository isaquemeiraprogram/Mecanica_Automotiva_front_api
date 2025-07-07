import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private link ="";
  constructor(private http:HttpClient) { }
}
// npx ng g service services/cliente gera um service