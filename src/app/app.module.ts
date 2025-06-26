import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { CardPecasReposicaoComponent } from './components/card-pecas-reposicao/card-pecas-reposicao.component';
import { PecasreposicaoComponent } from './pages/pecasreposicao/pecasreposicao.component';
import { PecasDeModificacaoComponent } from './pages/pecas-de-modificacao/pecas-de-modificacao.component';
import { AgendarComponent } from './pages/agendar/agendar.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardPecasReposicaoComponent,
    PecasreposicaoComponent,
    PecasDeModificacaoComponent,
    AgendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
