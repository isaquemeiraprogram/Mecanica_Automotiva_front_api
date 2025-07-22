import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
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

  //add cliente 
  ClientedtoAdd: ClienteDto = { nome: "", cpf: "" }
  clienteAdicionado: Cliente = { id: "", nome: "", cpf: "", endereco: [] }

  //update
  ClienteidUpdate !: string
  ClientedtoUpdate: ClienteDto = { nome: "", cpf: "" }
  clienteAtualizado: Cliente = { id: "", nome: "", cpf: "", endereco: [] }

  //deletar cliente
  clienteIdDelete!: string;
  clienteDeletado!: string

  constructor(private clienteService: ClienteService) { }

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

  addClienteAsync() {
    this.clienteService.addClienteAsync(this.ClientedtoAdd).subscribe({
      next: dados => {
        this.clienteAdicionado = dados
        console.log(dados)
      },
      error: er => console.error(er)
    })
  }

  updateClienteAsync() {
    this.clienteService.updateClienteAsync(this.ClienteidUpdate, this.ClientedtoUpdate).subscribe({
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
