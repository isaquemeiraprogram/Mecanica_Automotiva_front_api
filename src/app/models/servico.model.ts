import { Peca } from "./Produto.model";

export interface servico{
    nome:string,
    descricao:string,
    valor:number,
    duracao:string,
    peca:Peca
}