import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente, ClienteDto } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { GetErrosService } from 'src/app/services/get-erros.service';

@Component({
  selector: 'app-cliente-controller',
  templateUrl: './cliente-controller.component.html',
  styleUrls: ['./cliente-controller.component.css']
})
export class ClienteControllerComponent implements OnInit {

  //formulario
  formGetCpf!: FormGroup;
  formAdd!: FormGroup;
  formUpdate!: FormGroup;
  formDelete!: FormGroup;

  constructor(private fb: FormBuilder, private clienteService: ClienteService, private _erros: GetErrosService) { }

  ngOnInit(): void {
    this.GerarFormGetByCpf();
    this.GerarFormAdd();
    this.GerarFormUpdate();
    this.GerarFormDelete();
  }

  GerarFormGetByCpf() {
    this.formGetCpf = this.fb.group({
      cpf: ["", [Validators.required]]
    })
  }

  GerarFormAdd() {
    this.formAdd = this.fb.group({
      nome: ["", [Validators.required, Validators.maxLength(80)]],
      cpf: ["", [Validators.required, Validators.minLength(11), Validators.maxLength(11)]]
    });
  }

  GerarFormUpdate() {
    this.formUpdate = this.fb.group({
      cpfAntigo: ["", [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      nome: ["", [Validators.required, Validators.maxLength(80)]],
      cpf: ["", [Validators.required, Validators.minLength(11), Validators.maxLength(11)]]
    });
  }

  GerarFormDelete() {
    this.formDelete = this.fb.group({
      cpf: ["", [Validators.required]]
    })
  }



  //add cliente 
  clienteAdicionado: Cliente = { id: "", nome: "", cpf: "" }

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
      error: er => console.error("Erro ao adicionar cliente", er)
    })
  }


  //AtualizarCliente
  clienteAtualizado: Cliente = { id: "", nome: "", cpf: "" }

  updateClienteAsync() {

    if (this.formUpdate.invalid) {
      this.formUpdate.markAllAsTouched();
      return;
    }
    console.log("passou na validado")

    const { nome, cpf, cpfAntigo } = this.formUpdate.value;
    const dto: ClienteDto = { nome, cpf }

    this.clienteService.updateClienteAsync(cpfAntigo, dto).subscribe({
      next: dados => {
        this.clienteAtualizado = dados;
        console.log("cliente atualizado" + dados)
        this.formAdd.reset();
      },
      error: er => console.error("Erro ao atualizar cliente", er)
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
  clienteSelecionado: Cliente = { id: "", nome: "", cpf: "" }

  getClienteByCpfAsync() {
    const cpf = this.formGetCpf.value;

    console.log(cpf)
    this.clienteService.getByCpfClienteAsync(cpf).subscribe({
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
  clienteDeletado!: string

  deleteClienteAsync() {

    const cpf = this.formDelete.value;

    this.clienteService.deleteClienteAsync(cpf).subscribe({
      next: dados => {
        this.clienteDeletado = "Cliente Deletado Com Sucesso";
        console.log(dados)
      },
      error: err => {
        console.error("erro ao obter os dados", err)
      }
    })
  }

  filtrarErro(control: AbstractControl): string[] {
    const listErros = this._erros.GetErro(control)
    return listErros;
  }
}

