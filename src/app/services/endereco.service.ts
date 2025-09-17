import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endereco, EnderecoDto } from '../models/endereco.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  private link = "https://localhost:7190/api/Endereco";
  constructor(private http: HttpClient) { }

  GetEnderecoByCpf(cpf: string): Observable<Endereco[]> {     
    //O pipe pega o resultado do this.http.get(...) - obeservable - e transforma (ou trata) esse resultado antes de chegar no subscribe.
    return this.http.get<Endereco[]>(this.link + "/cpf/" + cpf).pipe(
      catchError(this.HandlerErro)
    );
  }

  AddEnderecoAsync(dto: EnderecoDto): Observable<Endereco> {
    return this.http.post<Endereco>(this.link, dto).pipe(
      catchError(this.HandlerErro)
    )
  }

  UpdateEnderecoAsync(slug: string, dto: EnderecoDto): Observable<Endereco> {
    return this.http.put<Endereco>(this.link + "/slug/" + slug, dto).pipe(
      catchError(this.HandlerErro)
    );
  }

  DeleteEnderecoAsync(slug: string): Observable<boolean> {
    return this.http.delete<boolean>(this.link + "/slug/" + slug).pipe(
      catchError(this.HandlerErro)
    );
  }

  //pega mensagem de erro do back http e lanca error no controler.ts 
  private HandlerErro(error:HttpErrorResponse){
    const mensagemBackErro = error.error?.message || error.message || "Erro desconecido";
    return throwError(() => mensagemBackErro) //retorna string
  }
}
