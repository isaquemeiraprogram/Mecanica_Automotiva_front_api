import { DatePipe } from "@angular/common";
import { Peca } from "./Peca.model";

export interface servico{
    nome:string,
    descricao:string,
    valor:number,
    duracao:string,
    peca:Peca
}