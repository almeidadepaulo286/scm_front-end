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

// Atualização
import { AtualizacaoComponent } from './content/atualizacao/atualizacao.component';

// Conciliacao
import { ConciliacaoComponent } from './content/conciliacao/conciliacao.component';

// Registros
import { RegistrosComponent } from './content/registros/registros.component';
import { DetalhesDoRegistroComponent } from './content/registros/detalhes/detalhes-do-registro.component';
import { DetalhesDaSolicitacaoComponent } from './content/registros/detalhes-da-solicitacao/detalhes-da-solicitacao.component';
import { RetificacaoRegistroComponent } from './content/registros/retificacao/retificacao.component' 

// Arquivos
import { ConsultarComponent } from './content/arquivos/consultar/consultar.component';
import { ImportarComponent } from './content/arquivos/importar/importar.component';

import { IncluirSolicitacaoRegistroComponent } from './content/registros/incluir-solicitacao-registro/incluir-solicitacao-registro.component';
import { DisponibilizarRegistroComponent } from './content/registros/disponibilizar-registro/disponibilizar-registro.component';

// Cessao
import { ListaCessaoComponent } from './content/registros/lista-cessao/lista-cessao.component';
import { CancelaCessaoComponent } from './content/registros/cancela-cessao/cancela-cessao.component';
import { CancelaContratoComponent } from './content/registros/cancela-contrato/cancela-contrato.component';
import { DetalhesCessaoComponent } from './content/registros/detalhes-da-cessao/detalhes-da-cessao.component';
import { BillingComponent } from './content/faturamento/billing.component';

// Usuarios
import { UsuariosComponent } from './content/usuarios/usuarios.component';
import { CriarUsuarioComponent } from './content/usuarios/criar-usuario/criar-usuario.component';
import { EditarUsuarioComponent } from './content/usuarios/editar-usuario/editar-usuario.component';

// TEMPORARIOS
import { ListaTitulosBancariosComponent } from './content/cedulas/consultar-titulos-bancarios/lista/lista.component'

/*
   Identificação dos Perfis de Usuário
   -----------------------------------
   1 -
   2 -
   3 -
   4 -
   5 - Operação
   6 -
   7 -
   8 - Cedente
   9 - Cessionaria
*/

const routes: Routes = [
    {
        path : '',
        component: LayoutComponent,
        children : [
            {path : 'painel-de-operacoes',  component: InicioComponent, canActivate: [AuthGuard], data: { perfis: [5, 8, 9] }},
            {path : 'billing',  component: BillingComponent, canActivate: [AuthGuard], data: { perfis: [5] }},

            // Usuários
            {path : 'usuarios',  component: UsuariosComponent, canActivate: [AuthGuard], data: { perfis: [5, 8, 9] }},
            {path : 'usuarios/criar-usuario',  component: CriarUsuarioComponent, canActivate: [AuthGuard], data: { perfis: [5, 8, 9] }},
            {path : 'usuarios/editar-usuario/:id',  component: EditarUsuarioComponent, canActivate: [AuthGuard], data: { perfis: [5, 8, 9] }},
            // {path : 'usuarios/detalhes/:id',  component: DetalhesDoUsuarioComponent, canActivate: [AuthGuard], data: { perfis: [5, 8, 9] }},

            // Usuário
            {path : 'alterar-senha',  component: AlterarSenhaComponent, canActivate: [AuthGuard], data: { perfis: [5, 8, 9] }},

            // Conciliacao
            {path : 'conciliacao',  component: ConciliacaoComponent, canActivate: [AuthGuard], data: { perfis: [5, 8, 9] }},

            // Atualização
            {path : 'atualizacao',  component: AtualizacaoComponent, canActivate: [AuthGuard], data: { perfis: [5, 8, 9] }},

            // Registros
            {path : 'registros',  component: RegistrosComponent, canActivate: [AuthGuard], data: { perfis: [5, 8, 9] }},
            {path : 'incluir-solicitacao-registro',  component: IncluirSolicitacaoRegistroComponent, canActivate: [AuthGuard], data: { perfis: [5, 8, 9] }},
            {path : 'registros/detalhes/:id/:protocolo',  component: DetalhesDoRegistroComponent, canActivate: [AuthGuard], data: { perfis: [5, 8, 9] }},
            {path : 'solicitacoes-registro/detalhes/:id',  component: DetalhesDaSolicitacaoComponent, canActivate: [AuthGuard], data: { perfis: [5, 8, 9] }},

            // Retificação
            {path : 'registros/retificacao/:id/:protocolo',  component: RetificacaoRegistroComponent, canActivate: [AuthGuard], data: { perfis: [5, 8, 9] }},

            // Cessao
            {path : 'disponibilizar-registros',  component: DisponibilizarRegistroComponent, canActivate: [AuthGuard], data: { perfis: [5, 8, 9] }},
            {path : 'consultar-cessao',  component: ListaCessaoComponent, canActivate: [AuthGuard], data: { perfis: [5, 8, 9] }},
            {path : 'cancelar-cessao',  component: CancelaCessaoComponent, canActivate: [AuthGuard], data: { perfis: [5, 8, 9] }},
            {path : 'cancelar-contrato',  component: CancelaContratoComponent, canActivate: [AuthGuard], data: { perfis: [5, 8, 9] }},
            {path : 'detalhes-cessao/:codtc/:codcoc/:id',  component: DetalhesCessaoComponent, canActivate: [AuthGuard], data: { perfis: [5, 8, 9] }},

            // Arquivos
            {path : 'arquivos/importar',  component: ImportarComponent, canActivate: [AuthGuard], data: { perfis: [5, 8, 9] }},
            {path : 'arquivos/consultar',  component: ConsultarComponent, canActivate: [AuthGuard], data: { perfis: [5, 8, 9] }},

            // TEMPORARIOS
            {path : 'consultar-cedulas',  component: ListaTitulosBancariosComponent, canActivate: [AuthGuard], data: { perfis: [5, 8, 9] }},

            {
                path: '**',
                component: InicioComponent,
                canActivate: [AuthGuard],
                data: { perfis: [5, 8, 9] },
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
