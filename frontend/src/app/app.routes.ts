import { RouterModule, Routes } from '@angular/router';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { EventosComponent } from './eventos/eventos.component';

export const routes: Routes = [
    {path: '', component:LoginComponent},
    {path: 'login', component:LoginComponent},
    {path: 'cadastro', component:CadastroUsuarioComponent},
    {path: 'listarEventos/:id', component:EventosComponent}
];
