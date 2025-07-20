import { Component, Input } from '@angular/core';
import { Peca } from 'src/app/models/Produto.model';

@Component({
  selector: 'app-card-pecas-reposicao',
  templateUrl: './card-pecas-reposicao.component.html',
  styleUrls: ['./card-pecas-reposicao.component.css']
})
export class CardPecasReposicaoComponent {
  @Input() pecas_reposica!:Peca;
}
