import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente, ClienteDto } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-testes',
  templateUrl: './testes.component.html',
  styleUrls: ['./testes.component.css']
})
export class TestesComponent {

  //obter todos clientes
  clientList: Cliente[] = [];

  //achar cliente
  clienteIdget!: string;
  clienteSelecionado: Cliente = { id: "", nome: "", cpf: "", endereco: [] }

  //deletar cliente
  clienteIdDelete!: string;
  clienteDeletado!: string

  //formulario
  form: FormGroup;
  atualizar: boolean = false;

  constructor(private fb: FormBuilder, private clienteService: ClienteService) {

    this.form = this.fb.group({
      id: [""],
      nome: ["", [Validators.required]],
      cpf: ["", [Validators.required, Validators.minLength(14)]] // 14 = 11 dígitos + máscara
    })
  }

  setUpdateMode() {
    this.atualizar = true;
    this.form.setValue({
      id: '123',
      nome: 'João Silva',
      cpf: '123.456.789-00', // já com máscara
    })
  }

  //metodo que ativa mensagem de erro caso ouver campos invalidos
  validarFormulario(): boolean {

    //se nao estiver preenchido e dentro dos required da invalido e nao passa
    if (this.form.invalid) {
      // se for invalido faz o mark all retonar todas as mensagengens de erro nos campos
      this.form.markAllAsTouched();
      return false; //so pra sair
    }

    // verifica se e pra atualizar ou adicionar
    if (this.atualizar) {
      console.log('Atualizando:', this.form.value);//mostra no console os valore do form
    }
    else {
      const { nome, cpf } = this.form.value;//pega so os dados de nome e cpf
      console.log('Adicionando:', { nome, cpf });//mostra no console os valore do form
    }

    this.form.reset();
    this.atualizar = false;

    return true;
  }






  getAllClientesAsync() {
    this.clienteService.getAllClientesAsync().subscribe({
      next: dados => {
        this.clientList = dados
        console.log(dados)
      },
      error: er => console.error(er)
    })
  }

  getClienteByIdAsync() {
    this.clienteService.getByIdClienteAsync(this.clienteIdget).subscribe({
      next: dados => {
        this.clienteSelecionado = dados
        console.log(dados)
      },
      error: err => {
        console.error("erro ao obter os dados", err);

      }
    })
  }

  //add cliente 
  clienteAdicionado: Cliente = { id: "", nome: "", cpf: "", endereco: [] }

  addClienteAsync() {

    if (!this.validarFormulario()) {
      return; //se form retornar alse ele interrompe 
    }

    const ClientedtoAdd: ClienteDto = this.form.value;

    this.clienteService.addClienteAsync(ClientedtoAdd).subscribe({
      next: dados => {
        this.clienteAdicionado = dados
        console.log(dados)
        this.form.reset();
        this.atualizar = false;
      },
      error: er => console.error(er)
    })
  }



  //update talves nao precise
  ClienteidUpdate !: string
  clienteAtualizado: Cliente = { id: "", nome: "", cpf: "", endereco: [] }

  updateClienteAsync() {

    if (!this.validarFormulario()) {
      return;
    }

    const ClientedtoUpdate: ClienteDto = this.form.value;

    this.clienteService.updateClienteAsync(this.ClienteidUpdate, ClientedtoUpdate).subscribe({
      next: dados => {
        this.clienteAtualizado = dados;
        console.log(dados)
      }
    })
  }

  deleteClienteAsync() {
    this.clienteService.deleteClienteAsync(this.clienteIdDelete).subscribe({
      next: dados => {
        this.clienteDeletado = "Cliente Deletado Com Sucesso";
        console.log(dados)
      },
      error: err => {
        console.error("erro ao obter os dados", err)
        alert("Cliente Não Encontrado");
      }
    })
  }
}
