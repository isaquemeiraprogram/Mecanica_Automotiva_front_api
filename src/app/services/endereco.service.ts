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
  private HandlerErro(error: HttpErrorResponse) {

    //quando acontece um erro de conexao error.error guarda instance of 
    // verifica o tipo do erro e error event representa o tipo que no caso erro de conexao
    //error event e do navegador error.status 0 qualquer outro erro de conexao
    //ErrorEvent → erro de rede detectado pelo navegador

    // ProgressEvent → outros tipos de falha de rede que não caem em ErrorEvent // outros navegadores emitem esse

    // status === 0 → qualquer erro onde não houve resposta HTTP
    if (
      error.error instanceof ErrorEvent || //mais comum pra erro de navegador
      error.error instanceof ProgressEvent || // em alguns navegadores e versoes do angular a resposta vem diferente
      error.error.status === 0 //pega outros erros de conexao  (erro onde não houve resposta HTTP)
    ) {
      return throwError(() => (
        //criei um obejto dentro do throw agora ele retorna um objeto e possibilita separar mensagem por tipo
        {
          tipoDeErro: 'conexao',
          mensagem: "Não foi possível conectar ao servidor. Verifique sua conexão ou se a API está disponível."
        }
      ))
    }

    const mensagemBackErro = error.error?.message || error.message || "Erro desconecido";
    return throwError(() => ({ tipoDeErro: 'backend', mensagemBackErro })) //retorna string
  }
}
//error.error = primeiro o erro bruto e segugundo o valor dele