import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endereco, EnderecoDto } from '../models/endereco.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  private link = "https://localhost:7190/api/Endereco";
  constructor(private http: HttpClient) { }

  AddEnderecoAsync(dto: EnderecoDto): Observable<Endereco> {
    return this.http.post<Endereco>(this.link, dto)
  }

  UpdateEnderecoAsync(id: string, dto: EnderecoDto): Observable<Endereco> {
    return this.http.put<Endereco>(this.link + "/" + id, dto)
  }

  DeleteEnderecoAsync(id: string): Observable<boolean> {
    return this.http.delete<boolean>(this.link + "/" + id)
  }
}
