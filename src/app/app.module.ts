import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { CardPecasReposicaoComponent } from './components/card-pecas-reposicao/card-pecas-reposicao.component';
import { PecasreposicaoComponent } from './pages/pecasreposicao/pecasreposicao.component';
import { PecasDeModificacaoComponent } from './pages/pecas-de-modificacao/pecas-de-modificacao.component';
import { AgendarComponent } from './pages/agendar/agendar.component';
import { HttpClientModule } from '@angular/common/http';
import { TestesComponent } from './pages/testes/testes.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ClienteControllerComponent } from './controlers/cliente-controller/cliente-controller.component';
import { EnderecoControllerComponent } from './controlers/endereco-controller/endereco-controller.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardPecasReposicaoComponent,
    PecasreposicaoComponent,
    PecasDeModificacaoComponent,
    AgendarComponent,
    TestesComponent,
    ClienteControllerComponent,
    EnderecoControllerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
