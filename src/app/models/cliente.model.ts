export interface Cliente{ // o que agente manipula  -- dto do front -- models dado que vem do get
    id:string,
    nome:string,
    cpf:string
}

export interface ClienteDto{//o que precisa pro banco --dto dado pra fazer post
    nome:string,
    cpf:string
}