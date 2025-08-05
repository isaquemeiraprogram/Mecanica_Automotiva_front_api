import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Endereco, EnderecoDto } from 'src/app/models/endereco.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { EnderecoService } from 'src/app/services/endereco.service';

@Component({
  selector: 'app-endereco-controller',
  templateUrl: './endereco-controller.component.html',
  styleUrls: ['./endereco-controller.component.css']
})
export class EnderecoControllerComponent implements OnInit {

  formAdd!: FormGroup;
  formPut!: FormGroup;
  formDelete!: FormGroup;

  constructor(private fb: FormBuilder, private _service: EnderecoService) { }

  ngOnInit(): void {
    this.GerarFormAdd();
    this.GerarFormPut();
    this.GerarFormDelete();
  }


  GerarFormAdd(): void {
    this.formAdd = this.fb.group({

      cep: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      estado: ["", [Validators.required]],
      cidade: ["", [Validators.required]],
      bairro: ["", [Validators.required]],
      rua: ["", [Validators.required]],
      numero: ["", [Validators.required]],
      clienteId: ["", [Validators.required]]

    })
  }

  GerarFormPut() {
    this.formPut = this.fb.group({

      id: ["", [Validators.required]],//cep antigo
      cep: ["", [Validators.required]],
      estado: ["", [Validators.required]],
      cidade: ["", [Validators.required]],
      bairro: ["", [Validators.required]],
      rua: ["", [Validators.required]],
      numero: ["", [Validators.required]],
      clienteId: ["", [Validators.required]]

    })
  }

  GerarFormDelete() {
    this.formDelete = this.fb.group({
      id: ["", [Validators.required, Validators.maxLength(36), Validators.minLength(36)]]
    })
  }

  //add
  addReturn: Endereco = { id: "", cep: "", estado: "", cidade: "", bairro: "", rua: "", numero: "", clienteId: "" }
  AddEnderecoAsync() {
    if (this.formAdd.invalid) {
      this.formAdd.markAllAsTouched();
      return;
    }

    const dto: EnderecoDto = { cep: "", estado: "", cidade: "", bairro: "", rua: "", numero: "", clienteId: "" }

    return this._service.AddEnderecoAsync(dto).subscribe({
      next: dados => {
        this.addReturn = dados,
          console.log("Endereço adicionado" + dados)
      },
      error: er => console.error("falha na requisicao de endereco" + er)
    })
  }

  //atualizar
  updateReturn: Endereco = { id: "", cep: "", estado: "", cidade: "", bairro: "", rua: "", numero: "", clienteId: "" }
  UpdateEnderecoAsync() {
    if (this.formPut.invalid) {
      this.formPut.markAllAsTouched;
      return;
    }

    const { id, cep, estado, cidade, bairro, rua, numero, clienteId } = this.formPut.value
    const dto = { cep, estado, cidade, bairro, rua, numero, clienteId }

    return this._service.UpdateEnderecoAsync(id, dto).subscribe({
      next: dados => {
        this.updateReturn = dados,
          console.log("Endereco Atualizado" + dados)
      },
      error: er => console.error("falha na requisicao de endereco" + er)
    })
  }


  enderecoReturn!: boolean
  DeleteEnderecoAsync() {
    if (this.formPut.invalid) {
      this.formPut.markAllAsTouched;
      return;
    }
    //nao faca isso o form sempre retorna um objeto e nao string
    //const id = this.formDelete.value;
    //faca assim pra pegar so a string e nao o objeto
    const id = this.formDelete.get("id")?.value;

    return this._service.DeleteEnderecoAsync(id).subscribe({
      next: dados => {
        this.enderecoReturn = dados,
          console.log(dados + "endereco deletado com sucesso")
      },
      error: er => console.error("erros ao deletar" + er)
    })
  }
}

