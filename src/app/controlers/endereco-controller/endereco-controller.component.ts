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
  formput!: FormGroup;

  constructor(private fb: FormBuilder, private _service: EnderecoService) { }

  ngOnInit(): void {
    this.GerarFormAdd();
    this.GerarFormPut();
  }


  GerarFormAdd(): void {
    this.formAdd = this.fb.group({

      cep: ["", Validators.required],
      estado: ["", Validators.required],
      cidade: ["", Validators.required],
      rua: ["", Validators.required],
      numero: ["", Validators.required],
      clienteId: ["", Validators.required]

    })
  }

  GerarFormPut() {
    this.formput = this.fb.group({

      id: ["", Validators.required],//cep antigo
      cep: ["", Validators.required],
      estado: ["", Validators.required],
      cidade: ["", Validators.required],
      rua: ["", Validators.required],
      numero: ["", Validators.required],
      clienteId: ["", Validators.required]

    })
  }

  //add
  addReturn: Endereco = { id: "", cep: "", estado: "", cidade: "", rua: "", numero: "", clienteId: "" }
  AddEnderecoAsync() {
    if (this.formAdd.invalid) {
      this.formAdd.markAllAsTouched();
      return;
    }

    const dto: EnderecoDto = { cep: "", estado: "", cidade: "", rua: "", numero: "", clienteId: "" }

    return this._service.AddEnderecoAsync(dto).subscribe({
      next: dados => {
        this.addReturn = dados,
          console.log("Endereço adicionado" + dados)
      },
      error: er => console.error("falha na requisicao de endereco" + er)
    })
  }

  //atualizar
  updateReturn: Endereco = { id: "", cep: "", estado: "", cidade: "", rua: "", numero: "", clienteId: "" }
  UpdateEnderecoAsync() {
    if (this.formput.invalid) {
      this.formput.markAllAsTouched;
      return;
    }

    const {id,cep, estado, cidade, rua, numero, clienteId} = this.formput.value
    const dto
    return this._service.UpdateEnderecoAsync(id, dto).subscribe({

    }),
      error: er => console.error("falha na requisicao de endereco" + er)
  }
}

