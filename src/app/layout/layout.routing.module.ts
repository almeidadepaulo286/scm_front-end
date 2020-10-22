import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Home
import {InicioComponent } from '../layout/content/inicio/inicio.component';

// Base
import { LayoutComponent } from './layout.component';

// Autenticacao
import { AuthGuard } from '../_guards';

// Usuarios
import { UsuariosComponent } from './content/usuarios/usuarios.component';
import { CriarUsuarioComponent } from './content/usuarios/criar-usuario/criar-usuario.component';
import { DetalhesUsuarioComponent } from './content/usuarios/detalhes-usuario/detalhes-usuario.component';
import { EditarUsuarioComponent } from './content/usuarios/editar-usuario/editar-usuario.component';

// Atividades de Controle
import { AtividadesComponent } from './content/atividades/atividades.component';
import { CriarAtividadeComponent } from './content/atividades/criar-atividade/criar-atividade.component';
import { EditarAtividadeComponent } from './content/atividades/editar-atividade/editar-atividade.component';

// Usuário
import { AlterarSenhaComponent } from './content/alterar-senha/alterar-senha.component';

/*
   Identificação dos Perfis de Usuário
   -----------------------------------
   1 -
   2 -
   3 -
   4 -
   5 - 
   6 -
   7 -
   8 - 
   9 - 
*/

const routes: Routes = [
    {
        path : '',
        component: LayoutComponent,
        children : [
            // Usuários
            {path : 'usuarios',  component: UsuariosComponent, canActivate: [AuthGuard], data: { perfis: [1, 2, 3] }},
            {path : 'usuarios/criar',  component: CriarUsuarioComponent, canActivate: [AuthGuard], data: { perfis: [1, 2, 3] }},
            {path : 'usuarios/detalhes/:id',  component: DetalhesUsuarioComponent, canActivate: [AuthGuard], data: { perfis: [1, 2, 3] }},
            {path : 'usuarios/editar/:id',  component: EditarUsuarioComponent, canActivate: [AuthGuard], data: { perfis: [1, 2, 3] }},

            // Usuário
            {path : 'alterar-senha',  component: AlterarSenhaComponent, canActivate: [AuthGuard], data: { perfis: [1, 2, 3] }},

            // Atividades de Controle
            {path : 'atividades',  component: AtividadesComponent, canActivate: [AuthGuard], data: { perfis: [1, 2, 3] }},
            {path : 'atividades/criar',  component: CriarAtividadeComponent, canActivate: [AuthGuard], data: { perfis: [1, 2, 3] }},
            {path : 'atividades/detalhes/:id',  component: EditarAtividadeComponent, canActivate: [AuthGuard], data: { perfis: [1, 2, 3] }},
            {path : 'atividades/editar/:id',  component: EditarAtividadeComponent, canActivate: [AuthGuard], data: { perfis: [1, 2, 3] }},

            {
                path: '**',
                component: InicioComponent,
                canActivate: [AuthGuard],
                data: { perfis: [1, 2, 3] },
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
