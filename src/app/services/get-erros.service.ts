import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GetErrosService {

  //abstract control permite pegar campode qualquer formulario
  //control e padrao pra pegar campo
  constructor(){}

  GetErro(control:AbstractControl): string[] {

    const erros:string[] = [];

    if (!control || !control.errors) return [];
    
    //.push e tipo add na lista
    if (control.errors['required']) erros.push('Campo obrigatório');
    if (control.errors['minlength']) erros.push(`caracteres insuficientes`);
    if (control.errors['maxlength']) erros.push(`limite de caracteres excedido`);
    if (control.errors['pattern']) erros.push('Formato inválido');

    return erros;
  }
}
