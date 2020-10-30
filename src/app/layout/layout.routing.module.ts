import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Home
import {InicioComponent } from '../layout/content/inicio/inicio.component';

// Base
import { LayoutComponent } from './layout.component';

// Autenticacao
import { AuthGuard } from '../_guards';

// Usuário
import { AlterarSenhaComponent } from './content/alterar-senha/alterar-senha.component';

// Usuarios
import { UsuariosComponent } from './content/usuarios/usuarios.component';
import { CriarUsuarioComponent } from './content/usuarios/criar-usuario/criar-usuario.component';
import { DetalhesUsuarioComponent } from './content/usuarios/detalhes-usuario/detalhes-usuario.component';
import { EditarUsuarioComponent } from './content/usuarios/editar-usuario/editar-usuario.component';

// Contratos
import { ContratosComponent } from './content/contratos/contratos.component';
import { CriarContratoComponent } from './content/contratos/criar-contrato/criar-contrato.component';
import { DetalhesContratoComponent } from './content/contratos/detalhes-contrato/detalhes-contrato.component';
import { EditarContratoComponent } from './content/contratos/editar-contrato/editar-contrato.component';

// Atividades de Controle
import { AtividadesComponent } from './content/atividades/atividades.component';
import { CriarAtividadeComponent } from './content/atividades/criar-atividade/criar-atividade.component';
import { DetalhesAtividadeComponent } from './content/atividades/detalhes-atividade/detalhes-atividade.component';
import { EditarAtividadeComponent } from './content/atividades/editar-atividade/editar-atividade.component';

// Fatores de Produtividade
import { FatoresProdutividadeComponent } from './content/fatores-produtividade/fatores-produtividade.component';
import { CriarFatorProdutividadeComponent } from './content/fatores-produtividade/criar-fator-produtividade/criar-fator-produtividade.component';
import { DetalhesFatorProdutividadeComponent } from './content/fatores-produtividade/detalhes-fator-produtividade/detalhes-fator-produtividade.component';
import { EditarFatorProdutividadeComponent } from './content/fatores-produtividade/editar-fator-produtividade/editar-fator-produtividade.component';

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
            // Usuário
            {path : 'alterar-senha',  component: AlterarSenhaComponent, canActivate: [AuthGuard], data: { perfis: [1, 2, 3] }},

            // Usuários
            {path : 'usuarios',  component: UsuariosComponent, canActivate: [AuthGuard], data: { perfis: [1, 2, 3] }},
            {path : 'usuarios/criar',  component: CriarUsuarioComponent, canActivate: [AuthGuard], data: { perfis: [1, 2, 3] }},
            {path : 'usuarios/detalhes/:id',  component: DetalhesUsuarioComponent, canActivate: [AuthGuard], data: { perfis: [1, 2, 3] }},
            {path : 'usuarios/editar/:id',  component: EditarUsuarioComponent, canActivate: [AuthGuard], data: { perfis: [1, 2, 3] }},

            // Contratos
            {path : 'contratos',  component: ContratosComponent, canActivate: [AuthGuard], data: { perfis: [1, 2, 3] }},
            {path : 'contratos/criar',  component: CriarContratoComponent, canActivate: [AuthGuard], data: { perfis: [1, 2, 3] }},
            {path : 'contratos/detalhes/:id',  component: DetalhesContratoComponent, canActivate: [AuthGuard], data: { perfis: [1, 2, 3] }},
            {path : 'contratos/editar/:id',  component: EditarContratoComponent, canActivate: [AuthGuard], data: { perfis: [1, 2, 3] }},

            // Atividades de Controle
            {path : 'atividades',  component: AtividadesComponent, canActivate: [AuthGuard], data: { perfis: [1, 2, 3] }},
            {path : 'atividades/criar',  component: CriarAtividadeComponent, canActivate: [AuthGuard], data: { perfis: [1, 2, 3] }},
            {path : 'atividades/detalhes/:id',  component: DetalhesAtividadeComponent, canActivate: [AuthGuard], data: { perfis: [1, 2, 3] }},
            {path : 'atividades/editar/:id',  component: EditarAtividadeComponent, canActivate: [AuthGuard], data: { perfis: [1, 2, 3] }},

            // Fatores de Produtividade
            {path : 'fatores-produtividade',  component: FatoresProdutividadeComponent, canActivate: [AuthGuard], data: { perfis: [1, 2, 3] }},
            {path : 'fatores-produtividade/criar',  component: CriarFatorProdutividadeComponent, canActivate: [AuthGuard], data: { perfis: [1, 2, 3] }},
            {path : 'fatores-produtividade/detalhes/:id',  component: DetalhesFatorProdutividadeComponent, canActivate: [AuthGuard], data: { perfis: [1, 2, 3] }},
            {path : 'fatores-produtividade/editar/:id',  component: EditarFatorProdutividadeComponent, canActivate: [AuthGuard], data: { perfis: [1, 2, 3] }},

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
