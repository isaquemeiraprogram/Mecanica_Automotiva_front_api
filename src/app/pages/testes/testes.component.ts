import { Component, Input } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-testes',
  templateUrl: './testes.component.html',
  styleUrls: ['./testes.component.css']
})
export class TestesComponent {
  clienteId!:string;
  cliente!:Cliente;
  clientList: Cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  getAllClientesAsync()
  {
    this.clienteService.getAllClientesAsync().subscribe({
      next: dados => {
        this.clientList = dados
        console.log(dados)
      },
      error: er => console.error(er)
    })
  }

  getClienteById(){
    this.clienteService.getByIdCliente(this.clienteId).subscribe({
      next: dados =>{
        this.cliente = dados
        console.log(dados)
      }
    })
  }


}
