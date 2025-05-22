import {  Routes } from '@angular/router';
import { ListaComponent } from './contato/lista/lista.component';

import { CadastrarComponent } from './contato/cadastrar/cadastrar.component';



export const routes: Routes = [

    { path: '', redirectTo: 'contatos', pathMatch: 'full' },
    { path: 'contatos', component: ListaComponent },

    { path: 'contatos/editar/:id', component: CadastrarComponent } ,
    { path: 'contatos/cadastrar', component: CadastrarComponent },



];


