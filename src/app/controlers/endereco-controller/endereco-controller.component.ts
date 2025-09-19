import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { Endereco, EnderecoDto } from 'src/app/models/endereco.model';
import { EnderecoService } from 'src/app/services/endereco.service';
import { GetErrosService } from 'src/app/services/get-erros.service';
import { ObjectFactoryService } from 'src/app/services/object-factory.service';
import { ShowObjectService } from 'src/app/services/show-object.service';

@Component({
  selector: 'app-endereco-controller',
  templateUrl: './endereco-controller.component.html',
  styleUrls: ['./endereco-controller.component.css']
})
export class EnderecoControllerComponent implements OnInit {

  formGetCpf!: FormGroup;
  formAdd!: FormGroup;
  formPut!: FormGroup;
  formDelete!: FormGroup;

  constructor(private fb: FormBuilder, private _enderecoService: EnderecoService, private _erros: GetErrosService) { }

  ngOnInit(): void {
    this.GerarFormGetByCpf();
    this.GerarFormAdd();
    this.GerarFormPut();
    this.GerarFormDelete();
  }
  //sempre usa {} pra manusear objetos

  GerarFormGetByCpf() {
    this.formGetCpf = this.fb.group({
      cpf: ["", [Validators.required, Validators.maxLength(11), Validators.minLength(11)]]
    })
  }

  GerarFormAdd() {
    this.formAdd = this.fb.group({


      // , Validators.minLength(8), Validators.maxLength(8) do cep
      cep: ["", [Validators.required, Validators.minLength(8)]],
      estado: ["", [Validators.required, Validators.maxLength(100)]],
      cidade: ["", [Validators.required, Validators.maxLength(100)]],
      bairro: ["", [Validators.required, Validators.maxLength(100)]],
      rua: ["", [Validators.required, Validators.maxLength(100)]],
      numero: ["", [Validators.required, Validators.maxLength(5)]],
      complemento: ["", [Validators.maxLength(150)]],
      clienteCpf: ["", [Validators.required, Validators.maxLength(11), Validators.minLength(11)]]

    })
  }

  GerarFormPut() {
    this.formPut = this.fb.group({

      enderecoSlug: ["", [Validators.required, Validators.maxLength(20)]],
      cep: ["", [Validators.required, Validators.minLength(8)]],
      estado: ["", [Validators.required, Validators.maxLength(100)]],
      cidade: ["", [Validators.required, Validators.maxLength(100)]],
      bairro: ["", [Validators.required, Validators.maxLength(100)]],
      rua: ["", [Validators.required, Validators.maxLength(100)]],
      numero: ["", [Validators.required, Validators.maxLength(5)]],
      complemento: ["", [Validators.maxLength(150)]],
      clienteCpf: ["", [Validators.required, Validators.maxLength(11), Validators.minLength(11)]]

    })
  }

  GerarFormDelete() {
    this.formDelete = this.fb.group({
      enderecoSlug: ["", [Validators.required, Validators.maxLength(20)]]
    })
  }

  //universais

  GetErros(control: AbstractControl): string[] {
    return GetErrosService.GetErro(control);
  }

  ShowObject(endereco: Endereco): string[] {
    return ShowObjectService.MostrarEndereco(endereco);
  }

  //get um cliente pode ter varios enderecos
  getReturnList: Endereco[] = []
  GetEnderecoByCpfAsync() {

    if (this.formGetCpf.invalid) {
      this.formGetCpf.markAllAsTouched();
      return
    }

    const cpf = this.formGetCpf.get('cpf')?.value;

    return this._enderecoService.GetEnderecoByCpf(cpf).subscribe({
      next: dados => {
        this.getReturnList = dados;
        console.log("dados recebidos", dados);
      },
      error: (er: any) => {

        console.error("falha na requisicao de endereco", er);

        //setErrors cria uma validacao temporaria
        // que recebe um erro no parametro para tornar o campo invalido
        //backend :er erro com nome de backend

        const controle = this.formGetCpf.get('cpf');
        if (controle) {
          //setErrors apaga todas as outras validacoes pra captar so o erro do back
          //se quiser salvar as validacoes anteriores crie uma var pra guardar
          const errosAtuais = controle.errors || {}
          controle.setErrors({ ...errosAtuais, backend: er })
        }
        this.getReturnList = [];//caso der erro ele limpa o resultado anterior

      }
    })
  }

  //add
  //nao precisa injetar nem declarar no construtor pq o metodo statico
  addReturn: Endereco = ObjectFactoryService.CriarEnderecoVazio();
  AddEnderecoAsync() {

    if (this.formAdd.invalid) {
      this.formAdd.markAllAsTouched();
      return;
    }

    const dto: EnderecoDto = this.formAdd.value

    return this._enderecoService.AddEnderecoAsync(dto).subscribe({
      next: dados => {
        this.addReturn = dados,
          console.log("Endereço adicionado" + dados)
      },
      error: (er: any) => {
        console.error("falha na requisicao de endereco", er)
        const controle = this.formAdd.get('clienteCpf')

        if (controle) {
          const errosAtuais = controle.errors || {};
          controle.setErrors({ ...errosAtuais, backend: er })
        }
        this.addReturn = ObjectFactoryService.CriarEnderecoVazio();
      }
    })
  }

  // atualizar
  updateReturn: Endereco = ObjectFactoryService.CriarEnderecoVazio()

  UpdateEnderecoAsync() {

    if (this.formPut.invalid) {
      this.formPut.markAllAsTouched();
      return;
    }

    const enderecoSlug = this.formPut.get("enderecoSlug")?.value;//aqui pega so id
    const { enderecoSlug: _, ...dto } = this.formPut.value;//aqui pega tudo -id
    // id o que extrair, _ convencao pra valores descartados(descarte valor do id), ...diz pra passar o resto pra dto
    // variável do tipo any (recebe o valor do id do form)

    console.log(dto)
    return this._enderecoService.UpdateEnderecoAsync(enderecoSlug, dto).subscribe({
      next: dados => {
        this.updateReturn = dados,
          console.log("Endereco Atualizado" + dados)
      },
      error: (er: any) => {
        console.error("falha na requisicao de endereco", er)
        const controle = this.formPut.get('enderecoSlug')

        if (controle) {
          const errosAtuais = controle.errors || {}
          controle.setErrors({ ...errosAtuais, backend: er })
        }
        this.updateReturn = ObjectFactoryService.CriarEnderecoVazio()
      }
    })
  }


  deleteReturn: boolean = false
  DeleteEnderecoAsync() {
    if (this.formDelete.invalid) {
      this.formDelete.markAllAsTouched();
      return;
    }
    //nao faca isso o form sempre retorna um objeto e nao string
    //const id = this.formDelete.value;
    //faca assim pra pegar so a string e nao o objeto
    const enderecoSlug = this.formDelete.get("enderecoSlug")?.value;

    return this._enderecoService.DeleteEnderecoAsync(enderecoSlug).subscribe({
      next: dados => {
        this.deleteReturn = dados,
          console.log(dados + "endereco deletado com sucesso");
      },
      error: (er: any) => {
        console.error("erros ao deletar", er)
        const controle = this.formDelete.get('enderecoSlug')

        if (controle) {
          const errosAtuais = controle.errors || {};
          controle.setErrors({ ...errosAtuais, backend: er })
        }
        this.deleteReturn = false
      }
    })
  }

}

