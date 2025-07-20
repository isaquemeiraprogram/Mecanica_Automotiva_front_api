import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PecasreposicaoComponent } from './pages/pecasreposicao/pecasreposicao.component';
import { PecasDeModificacaoComponent } from './pages/pecas-de-modificacao/pecas-de-modificacao.component';
import { AgendarComponent } from './pages/agendar/agendar.component';
import { TestesComponent } from './pages/testes/testes.component';

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
  },
  {
    path: "agendar",
    component: AgendarComponent
  },
  {
    path:"teste",
    component: TestesComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
