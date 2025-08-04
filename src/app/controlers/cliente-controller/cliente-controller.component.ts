import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente, ClienteDto } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-controller',
  templateUrl: './cliente-controller.component.html',
  styleUrls: ['./cliente-controller.component.css']
})
export class ClienteControllerComponent implements OnInit {

  //formulario
  formAdd!: FormGroup;
  formUpdate!: FormGroup;

  constructor(private fb: FormBuilder, private clienteService: ClienteService) { }

  ngOnInit(): void {

    this.formAdd = this.fb.group({
      nome: ["", [Validators.required, Validators.maxLength(80)]],
      cpf: ["", [Validators.required, Validators.minLength(11), Validators.maxLength(11)]]
    });

    this.formUpdate = this.fb.group({
      cpfAntigo: ["", [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      nome: ["", [Validators.required, Validators.maxLength(80)]],
      cpf: ["", [Validators.required, Validators.minLength(11), Validators.maxLength(11)]]
    });

  }


  //add cliente 
  clienteAdicionado: Cliente = { id: "", nome: "", cpf: "", endereco: [] }

  addClienteAsync() {

    if (this.formAdd.invalid) {
      this.formAdd.markAllAsTouched();//mostra os erros 
      return; //se form retornar alse ele interrompe 
    }

    const dto: ClienteDto = this.formAdd.value;

    this.clienteService.addClienteAsync(dto).subscribe({
      next: dados => {
        this.clienteAdicionado = dados
        console.log("Cliente Adicionado" + dados)
        this.formAdd.reset();//limpa o formulario
      },
      error: er => console.error(er + "Erro ao adicionar cliente")
    })
  }


  //AtualizarCliente
  clienteAtualizado: Cliente = { id: "", nome: "", cpf: "", endereco: [] }

  updateClienteAsync() {

    if (this.formUpdate.invalid) {
      this.formUpdate.markAllAsTouched();
      return;
    }
    console.log("validado")
    const { nome, cpf, cpfAntigo } = this.formUpdate.value;
    const dto: ClienteDto = { nome, cpf }

    this.clienteService.updateClienteAsync(cpfAntigo, dto).subscribe({
      next: dados => {
        this.clienteAtualizado = dados;
        console.log("cliente atualizado" + dados)
        this.formAdd.reset();
      }
    })
  }

  //obter todos clientes
  clientList: Cliente[] = [];
  getAllClientesAsync() {
    this.clienteService.getAllClientesAsync().subscribe({
      next: dados => {
        this.clientList = dados
        console.log(dados)
      },
      error: er => console.error(er)
    })
  }

  //achar cliente
  clienteCpfget!: string;
  clienteSelecionado: Cliente = { id: "", nome: "", cpf: "", endereco: [] }

  getClienteByCpfAsync() {
    this.clienteService.getByCpfClienteAsync(this.clienteCpfget).subscribe({
      next: dados => {
        this.clienteSelecionado = dados
        console.log(dados)
      },
      error: err => {
        console.error("erro ao obter os dados", err);

      }
    })
  }


  //deletar cliente
  clienteCpfDelete!: string;
  clienteDeletado!: string

  deleteClienteAsync() {
    this.clienteService.deleteClienteAsync(this.clienteCpfDelete).subscribe({
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

