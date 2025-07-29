import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente, ClienteDto } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-testes',
  templateUrl: './testes.component.html',
  styleUrls: ['./testes.component.css']
})
export class TestesComponent implements OnInit {

  //obter todos clientes
  clientList: Cliente[] = [];

  //achar cliente
  clienteIdget!: string;
  clienteSelecionado: Cliente = { id: "", nome: "", cpf: "", endereco: [] }

  //deletar cliente
  clienteIdDelete!: string;
  clienteDeletado!: string

  //formulario
  formAdd!: FormGroup;
  formUpdate!: FormGroup;
  atualizar: boolean = false;

  constructor(private fb: FormBuilder, private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.formAdd = this.fb.group({
      nome: ["", [Validators.required, Validators.maxLength(80)]],
      cpf: ["", [Validators.required, Validators.minLength(14), Validators.maxLength(14)]]
    });

    this.formUpdate = this.fb.group({
      id: ["", [Validators.required,Validators.minLength(36), Validators.maxLength(36)]],
      nome: ["", [Validators.required, Validators.maxLength(80)]],
      cpf: ["", [Validators.required, Validators.minLength(14), Validators.maxLength(14)]]
    });
     console.log("ngOnInit funcionando");
  }


  //add cliente 
  clienteAdicionado: Cliente = { id: "", nome: "", cpf: "", endereco: [] }

  addClienteAsync():void {
    console.log("Chamou add");
    if (this.formAdd.invalid) {
      this.formAdd.markAllAsTouched();//mostra os erros 
      return; //se form retornar alse ele interrompe 
    }

    const dto: ClienteDto = this.formAdd.value;
    console.log("DTO enviado:", dto);

    this.clienteService.addClienteAsync(dto).subscribe({
      next: dados => {
        this.clienteAdicionado = dados
        console.log("cliente adicionado"+dados)
        this.formAdd.reset();//limpa o formulario
      },
      error: er => console.error(er+"Erro ao adicionar cliente")
    })
  }

  ClienteidUpdate !: string
  clienteAtualizado: Cliente = { id: "", nome: "", cpf: "", endereco: [] }

  updateClienteAsync() {

    if (this.formUpdate.invalid) {
      this.formUpdate.markAllAsTouched();
      return;
    }

    const dto: ClienteDto = this.formUpdate.value;

    this.clienteService.updateClienteAsync(this.ClienteidUpdate, dto).subscribe({
      next: dados => {
        this.clienteAtualizado = dados;
        console.log("cliente atualizado" + dados)
         this.formAdd.reset();
      }
    })
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
