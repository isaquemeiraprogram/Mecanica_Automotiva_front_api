import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Endereco, EnderecoDto } from 'src/app/models/endereco.model';
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

  constructor(private fb: FormBuilder, private _enderecoService: EnderecoService) { }

  ngOnInit(): void {
    this.GerarFormAdd();
    this.GerarFormPut();
    this.GerarFormDelete();
  }
  //sempre usa {} pra manusear objetos


  GerarFormAdd(): void {
    this.formAdd = this.fb.group({


      // , Validators.minLength(8), Validators.maxLength(8) do cep
      cep: ["", [Validators.required,Validators.minLength(8)]],
      estado: ["", [Validators.required]],
      cidade: ["", [Validators.required]],
      bairro: ["", [Validators.required]],
      rua: ["", [Validators.required]],
      numero: ["", [Validators.required]],
      complemento: [""],
      clienteCpf: ["", [Validators.required]]

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
      complemento: [""],
      clienteCpf: ["", [Validators.required]]

    })
  }

  GerarFormDelete() {
    this.formDelete = this.fb.group({
      id: ["", [Validators.required, Validators.maxLength(36), Validators.minLength(36)]]
    })
  }

  //add
  addReturn: Endereco = { id: "", cep: "", estado: "", cidade: "", bairro: "", rua: "", numero: "", complemento: "", clienteCpf: "" }
  AddEnderecoAsync() {
    console.log("add endereco chamado")
    if (this.formAdd.invalid) {
      this.formAdd.markAllAsTouched();
      return;
    }
    console.log("add endereco passou na validacao")
    const dto: EnderecoDto = this.formAdd.value

    console.log("o q esta sendo enviado", dto)
    return this._enderecoService.AddEnderecoAsync(dto).subscribe({
      next: dados => {
        this.addReturn = dados,
          console.log("Endereço adicionado" + dados)
      },
      error: er => console.error("falha na requisicao de endereco", er)
    })
  }

  // atualizar
  updateReturn: Endereco = { id: "", cep: "", estado: "", cidade: "", bairro: "", rua: "", numero: "", complemento: "", clienteCpf: "" }
  UpdateEnderecoAsync() {
    console.log(" update iniciado")
    if (this.formPut.invalid) {
      this.formPut.markAllAsTouched();
      return;
    }
    console.log(" validacao iniciado")

    const { id, cep, estado, cidade, bairro, rua, numero, complemento, clienteCpf } = this.formPut.value
    const dto = { cep, estado, cidade, bairro, rua, numero, complemento, clienteCpf }

    return this._enderecoService.UpdateEnderecoAsync(id, dto).subscribe({
      next: dados => {
        this.updateReturn = dados,
          console.log("Endereco Atualizado" + dados)
      },
      error: er => console.error("falha na requisicao de endereco", er)
    })
  }


  enderecoReturn!: boolean
  DeleteEnderecoAsync() {
    if (this.formDelete.invalid) {
      this.formDelete.markAllAsTouched();
      return;
    }
    //nao faca isso o form sempre retorna um objeto e nao string
    //const id = this.formDelete.value;
    //faca assim pra pegar so a string e nao o objeto
    const id = this.formDelete.get("id")?.value;

    return this._enderecoService.DeleteEnderecoAsync(id).subscribe({
      next: dados => {
        this.enderecoReturn = dados,
          console.log(dados + "endereco deletado com sucesso")
      },
      error: er => console.error("erros ao deletar", er)
    })
  }
}

