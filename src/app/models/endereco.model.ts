import { Cliente } from "./cliente.model"

export interface Endereco {
    id: string,
    enderecoSlug:string,
    cep: string,
    estado: string,
    cidade: string,
    bairro:string,
    rua: string,
    numero: string,
    complemento:string,
    cliente: Cliente
}

export interface EnderecoDto {
    cep: string,
    estado: string,
    cidade: string,
    bairro:string,
    rua: string,
    numero: string,
    complemento:string,
    clienteCpf: string
    //o que tem jsonIgore nao precisa
}