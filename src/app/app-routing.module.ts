import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PecasreposicaoComponent } from './pages/pecasreposicao/pecasreposicao.component';
import { PecasDeModificacaoComponent } from './pages/pecas-de-modificacao/pecas-de-modificacao.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path:"pecasreposicao",
    component: PecasreposicaoComponent
  },
  {
    path: "modificacoes",
    component: PecasDeModificacaoComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
