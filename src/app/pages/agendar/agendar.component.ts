import { Component, Input } from '@angular/core';
import { servico } from 'src/app/models/servico.model';

@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.component.html',
  styleUrls: ['./agendar.component.css']
})
export class AgendarComponent {

  @Input() servico!:servico;

  servicosSelecionados: servico[] = [];

  selecionar(servico: servico, ismarcado: any) {

    if (ismarcado.target.checked) {
      // Se checkbox marcado (checked === true)
      this.servicosSelecionados.push(servico);
    }else{
      this.servicosSelecionados = this.servicosSelecionados.filter(valor => valor!==servico)
    }

  }
}
