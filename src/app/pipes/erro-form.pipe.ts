import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Pipe({
  name: 'erroForm'
})
export class ErroFormPipe implements PipeTransform {

  transform(formTest: FormGroup, campo: string): string | null{
    //cria uma variavel que pega o form e acessa o campo daquele form
    const control = formTest.get(campo)

    //verifica se o form e o campo existe e se ja foi tocadd
    if (!control || !control.errors || !control.touched) return null;

    if (control.errors['required']) return 'Campo obrigatório.';
    if (control.errors['maxlength']) return 'Número de caracteres excedido.';
    if (control.errors['minlength']) return 'Número de caracteres insuficiente.';
    if (control.errors['pattern']) return 'Formato inválido.';

    // se nao deu nenhum erro retorna nada
    return null; 
  }

}
