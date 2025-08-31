import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente, ClienteDto } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { GetErrosService } from 'src/app/services/get-erros.service';
import { ObjectFactoryService } from 'src/app/services/object-factory.service';
import { ShowObjectService } from 'src/app/services/show-object.service';

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

  constructor(private fb: FormBuilder, private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.GerarFormGetByCpf();
    this.GerarFormAdd();
    this.GerarFormUpdate();
    this.GerarFormDelete();
  }

  //inicializacoes
  GerarFormGetByCpf() {
    this.formGetCpf = this.fb.group({
      cpf: ["", [Validators.required, Validators.minLength(11)]]
    })
  }

  GerarFormAdd() {
    this.formAdd = this.fb.group({
      nome: ["", [Validators.required, Validators.maxLength(100)]],
      cpf: ["", [Validators.required, Validators.minLength(11), Validators.maxLength(11)]]
    });
  }

  GerarFormUpdate() {
    this.formUpdate = this.fb.group({
      cpfAntigo: ["", [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      nome: ["", [Validators.required, Validators.maxLength(100)]],
      cpf: ["", [Validators.required, Validators.minLength(11), Validators.maxLength(11)]]
    });
  }

  GerarFormDelete() {
    this.formDelete = this.fb.group({
      cpf: ["", [Validators.required, Validators.minLength(11), Validators.maxLength(11)]]
    })
  }

  //universais
  GetErros(control: AbstractControl): string[] {
    return GetErrosService.GetErro(control)
  }

  ShowObject(cliente: Cliente): string[] {
    return ShowObjectService.MostrarCliente(cliente);
  }

  //obter todos clientes
  getAllReturn: Cliente[] = [];

  getAllClientesAsync() {
    this.clienteService.getAllClientesAsync().subscribe({
      next: dados => {
        this.getAllReturn = dados
        console.log(dados)
      },
      error: er => console.error(er)
    })
  }

  //achar cliente
  getReturn = ObjectFactoryService.CriarClienteVazio()

  getClienteByCpfAsync() {
    if (this.formGetCpf.invalid) {
      this.formGetCpf.markAllAsTouched();
      return;
    }

    const cpf = this.formGetCpf.get('cpf')?.value;//assim pega so valor do campo e nao form inteiro que vem no tipo objeto

    console.log("Cpf enviado", cpf)

    this.clienteService.getByCpfClienteAsync(cpf).subscribe({
      next: dados => {
        this.getReturn = dados
        console.log(dados)
      },
      error: err => {
        console.error("erro ao obter os dados", err);
      }
    })
  }

  //add cliente 
  addReturn: Cliente = ObjectFactoryService.CriarClienteVazio();
  addClienteAsync() {

    if (this.formAdd.invalid) {
      this.formAdd.markAllAsTouched();//mostra os erros 
      return; //se form retornar alse ele interrompe 
    }

    const dto: ClienteDto = this.formAdd.value;

    this.clienteService.addClienteAsync(dto).subscribe({
      next: dados => {
        this.addReturn = dados
        console.log("Cliente Adicionado" + dados)
        this.formAdd.reset();//limpa o formulario
      },
      error: er => console.error("Erro ao adicionar cliente", er)
    })
  }


  //AtualizarCliente
  updateReturn: Cliente = ObjectFactoryService.CriarClienteVazio();

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
        this.updateReturn = dados;
        console.log("cliente atualizado" + dados)
        this.formUpdate.reset();
      },
      error: er => console.error("Erro ao atualizar cliente", er)
    })
  }

  //deletar cliente
  deleteReturn!: string

  deleteClienteAsync() {

    if (this.formDelete.invalid) {
      this.formDelete.markAllAsTouched();
      return;
    }

    // const cpfControl = this.formDelete.get('cpf');
    const cpf = this.formDelete.get('cpf')?.value;

    this.clienteService.deleteClienteAsync(cpf).subscribe({
      next: dados => {
        this.deleteReturn = "Cliente Deletado Com Sucesso";
        console.log(dados)
        this.formDelete.reset();
      },
      error: (er) => console.error("erro ao obter os dados", er)

    })
  }
}

