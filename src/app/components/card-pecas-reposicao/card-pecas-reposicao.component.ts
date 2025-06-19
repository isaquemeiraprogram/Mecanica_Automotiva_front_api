import { Component, Input } from '@angular/core';
import { PecasReposicao } from 'src/app/models/PecasReposicao.model';

@Component({
  selector: 'app-card-pecas-reposicao',
  templateUrl: './card-pecas-reposicao.component.html',
  styleUrls: ['./card-pecas-reposicao.component.css']
})
export class CardPecasReposicaoComponent {
  @Input() pecas_reposica!:PecasReposicao;
}
