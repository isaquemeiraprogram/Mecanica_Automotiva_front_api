export interface Endereco {
    id: string,
    cep: string,
    estado: string,
    cidade: string,
    bairro:string,
    rua: string,
    numero: string,
    complemento:string, // andar bloco aparatemento
    clienteCpf: string
    //o que tem jsonIgore nao precisa
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