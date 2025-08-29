import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { Endereco } from '../models/endereco.model';

@Injectable({
  providedIn: 'root'
})
export class ShowObjectService {

  constructor() { }

  static MostrarCliente(cliente: Cliente): string[] {

    if (!cliente) return ["Cliente Indisponivel"];

    return [
      `Nome: ${cliente.nome}`,
      `CPF: ${cliente.cpf}`,
    ];



  }

  static MostrarEndereco(endereco: Endereco): string[] {

    if (!endereco) return ["Cliente indisponivel"]

    return [
      `Cep: ${endereco.cep}`,
      `Estado: ${endereco.estado}`,
      `Cidade: ${endereco.cidade}`,
      `Bairro: ${endereco.bairro}`,
      `rua: ${endereco.rua}`,
      `Número: ${endereco.numero}`,
      `Complemento: ${endereco.complemento || "Nenhum"}`,
      ``,
      `Cliente:`,
      ...this.MostrarCliente(endereco.cliente)
    ]
    // ... poem cada atributo de cliente em um linha diferente
  }
}
