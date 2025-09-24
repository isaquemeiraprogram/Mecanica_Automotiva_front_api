import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { Endereco } from '../models/endereco.model';

@Injectable({
  providedIn: 'root'
})
export class ShowObjectService {

  constructor() { }

  static MostrarCliente(cliente: Cliente): string[] {

    //verifca se existe
    if (!cliente) return ["Cliente Indisponivel"];
    //verifica se tem um valor
    if (!cliente.id) return [];

    const cpfFormatado = cliente.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')

    return [
      `Nome: ${cliente.nome}`,
      `CPF: ${cpfFormatado}`,
      `QTdEnderecos: ${cliente.qtdEnderecosCadastrados}`
    ];
  }

  static MostrarEndereco(endereco: Endereco): string[] {

    if (!endereco) return ["Cliente indisponivel"];
    if (!endereco.id) return [];

    return [
      `Id do endereco: ${endereco.enderecoSlug}`,
      `Cep: ${endereco.cep}`,
      `Estado: ${endereco.estado}`,
      `Cidade: ${endereco.cidade}`,
      `Bairro: ${endereco.bairro}`,
      `rua: ${endereco.rua}`,
      `Número: ${endereco.numero}`,
      `Complemento: ${endereco.complemento || "Nenhum"}`,
      ``,
      `Cliente:`,
      ...ShowObjectService.MostrarCliente(endereco.cliente)
    ]
    // ... poem cada atributo de cliente em um linha diferente
  }
}
