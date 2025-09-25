import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandlerErroService {

  constructor() { }


  static MessageErrorCamp(campo: AbstractControl): string[] {

    //se tiver tudo certo
    if (!campo || !campo.errors || !campo.touched) return [];

    const ListaDeErros = [];

    if (campo.errors['required']) ListaDeErros.push('Campo Obrigatório');
    if (campo.errors['minlength']) ListaDeErros.push('caracteres insuficientes');
    if (campo.errors['maxlength']) ListaDeErros.push('limite de caracteres excedido');
    if (campo.errors['pattern']) ListaDeErros.push('Formato inválido');

    //...campo.errors['backend'] pega a lista de erros q vem do back(do handler qu vai pro ts que vem pra ca) e adiciona dentro da  ListaDeErros
    if (campo.errors['backend']) ListaDeErros.push(...campo.errors['backend'])

    return ListaDeErros;
  }

  //mensagem de erro da requisicao
  static MessageErrorRequest(erro: HttpErrorResponse) {
    //status 0 quando da erro de requisicao → qualquer erro onde não houve resposta HTTP
    if (erro.status === 0) {
      return throwError(() => ({
        type: 'conexao',
        messageConnectionError: 'erro ao conectar, verifique sua internet ou se a API esta rodando'
      }))
    }

    //error.error = primeiro o erro bruto e segugundo o valor dele
    //1 tenta usar mensagem do back,2 ou do front ou Erro Desconhecido;
    const messageBackError = erro.error?.message || erro?.message || 'Erro Desconjecido';
    return throwError(() => ({
      type: 'backend',
      messageBackError
    }))
  }
}

//criei um obejto dentro do throwerror agora ele retorna um objeto e possibilita separar mensagem por tipo
// {} isso representa um objeto
//arrow function = () => 
// se nao botar () ao redor de {} numa arrow function ele entende como bloco de codigo ao inves de objeto

//conmponente recebe os dados e joga pro service 
// que executa e retorna a resposta pro ts do component 
// se der erro esse erro cai no handler erro que por fim 
//envia mesagem pro user