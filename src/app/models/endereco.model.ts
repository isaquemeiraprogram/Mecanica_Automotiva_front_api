export interface Endereco{
    id:string,
    cep:string,
    estado:string,
    cidade:string,
    rua:string,
    numero:string
    //o que tem jsonIgore nao precisa
}

export interface EnderecoDto{
    cep:string,
    estado:string,
    cidade:string,
    rua:string,
    numero:string
    clienteId:string
    //o que tem jsonIgore nao precisa
}