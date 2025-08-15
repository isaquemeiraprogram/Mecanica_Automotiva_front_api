export interface Cliente{ // o que agente manipula  -- quando faz get recebemos model front -- models dado que vem do get
    id:string,
    nome:string,
    cpf:string,
}

export interface ClienteDto{//o que precisa pro banco --o q é dado pra fazer post
    nome:string,
    cpf:string
}