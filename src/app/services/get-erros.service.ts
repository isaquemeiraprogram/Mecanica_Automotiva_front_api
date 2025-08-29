import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GetErrosService {

  //abstract control permite pegar campode qualquer formulario
  //control e padrao pra pegar campo
  constructor(){}

   static GetErro(control:AbstractControl): string[] {

    const erros:string[] = [];

    if (!control || !control.errors || !control.touched) return [];
    
    //.push e tipo add na lista -- ele nao vai exibir os erros se nao tiver no tipe os limitesmax lenght e minlenght
    if (control.errors['required']) erros.push('Campo obrigatório');
    if (control.errors['minlength']) erros.push(`caracteres insuficientes`);
    if (control.errors['maxlength']) erros.push(`limite de caracteres excedido`);
    if (control.errors['pattern']) erros.push('Formato inválido');


    // if(control.errors['backend']) erros.push(control.errors['backend']);
    return erros;
  }
}
