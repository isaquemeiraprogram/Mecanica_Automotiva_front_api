import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { Endereco } from '../models/endereco.model';

@Injectable({
  providedIn: 'root'
})
export class ObjectFactoryService {

  constructor() { }

  //se for statico nao precisa injetar nem instanciar pois eles nao pegam nada de ninguem arrumar clienet depois que fiz errado injetando
  //retorna todos atributos de cliente iniciado
  static CriarClienteVazio(): Cliente {
    return {
      id: "",
      nome: "",
      cpf: "",
      qtdEnderecosCadastrados:0
    };
  }

  static CriarEnderecoVazio(): Endereco {

    return {
      id: "",
      cep: "",
      estado: "",
      cidade: "",
      bairro: "",
      rua: "",
      numero: "",
      complemento: "",
      cliente: ObjectFactoryService.CriarClienteVazio()
    }

  }
}
