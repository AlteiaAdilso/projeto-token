// app.module.ts
import { RouterModule } from '@angular/router';
import { routes } from './app.routes'; // Certifique-se de importar suas rotas
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventosComponent } from './eventos/eventos.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LoginComponent,
    CadastroUsuarioComponent,
    EventosComponent
  ],
  providers: [ApiService]
})
export class AppModule { }
