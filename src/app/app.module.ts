import { SharedModule } from './shared/shared.module';
import { FaturamentoService } from './_services/faturamento.service';

// App
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Pipes
import { CpfCnpj } from 'app/pipes/cpfcnpj.component';
import { TipoPessoa } from 'app/pipes/tipopessoa.component';
import { FormatCurrencyPipe } from 'app/pipes/formatCurrency.pipe';
import { StatusParcelaPipe } from 'app/pipes/statusParcela.component';
import { StatusCessaoPipe } from 'app/pipes/statusCessao.pipe';
import { IndexacaoPipe } from 'app/pipes/indexacao.pipe';

// Form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Layout
import { LayoutComponent } from './layout/layout.component';
import { LayoutRoutingModule } from './layout/layout.routing.module';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

// Service
import { LocalService } from './_services/local.service';
import { TokenInterceptor } from "./_helpers/interceptor";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FlexLayoutModule } from '@angular/flex-layout';

// Bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// Material
import {MaterialModule} from './material.module';
import {MatIconRegistry} from '@angular/material/icon';

// FontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Home
import { InicioComponent } from './layout/content/inicio/inicio.component';

// Login
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthenticationService } from 'services';

// Botoes
import { BotaoNovoComponent } from './_components/botao-novo/botao-novo.component';
import { BotaoVoltarComponent } from './_components/botao-voltar/botao-voltar.component';
import { BotaoNotificacoesComponent } from './_components/botao-notificacoes/botao-notificacoes.component';
import { BotaoEditarComponent } from './_components/botao-editar/botao-editar.component';

// Usuários
import { UsuariosComponent } from './layout/content/usuarios/usuarios.component';
import { CriarUsuarioComponent } from './layout/content/usuarios/criar-usuario/criar-usuario.component';
import { EditarUsuarioComponent } from './layout/content/usuarios/editar-usuario/editar-usuario.component';
import { DetalhesDoUsuarioComponent } from './layout/content/usuarios/detalhes-do-usuario/detalhes-do-usuario.component';
import { UsuarioService } from './_services/usuario.service';

// Usuário
import { AlterarSenhaComponent } from './layout/content/alterar-senha/alterar-senha.component';

// Conciliacao
import { ConciliacaoComponent } from './layout/content/conciliacao/conciliacao.component';

// Atualizacao
import { AtualizacaoComponent } from './layout/content/atualizacao/atualizacao.component';

// Registros
import { RegistrosComponent } from './layout/content/registros/registros.component';
import { DetalhesDoRegistroComponent } from './layout/content/registros/detalhes/detalhes-do-registro.component';
import { DetalhesDaSolicitacaoComponent } from './layout/content/registros/detalhes-da-solicitacao/detalhes-da-solicitacao.component';
import { IncluirSolicitacaoRegistroComponent } from './layout/content/registros/incluir-solicitacao-registro/incluir-solicitacao-registro.component';
import { RetificacaoRegistroComponent } from './layout/content/registros/retificacao/retificacao.component';
import { DisponibilizarRegistroComponent } from './layout/content/registros/disponibilizar-registro/disponibilizar-registro.component';

// Arquivos
import { ConsultarComponent } from './layout/content/arquivos/consultar/consultar.component';
import { ImportarComponent } from './layout/content/arquivos/importar/importar.component';
import { ArquivosComponent } from './layout/content/arquivos/arquivos.component';

// Mascara de formulário
import { NgxMaskModule } from 'ngx-mask';

// Dropzone File Upload
import { NgxDropzoneModule } from 'ngx-dropzone';

// Tables
import { DataTablesModule } from 'angular-datatables';
import { Ng2SmartTableModule } from 'ng2-smart-table';

// Loader
import { LoaderService } from 'app/_components/loader/loader.service';
import { LoaderComponent } from 'app/_components/loader/loader.component';
import { LoaderInterceptor } from 'app/_components/loader/loader.interceptor';

// DatePicker
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DetalhesDoArquivoComponent } from './layout/content/arquivos/detalhes/detalhes-do-arquivo.component';

// Cessao
import { ListaCessaoComponent } from './layout/content/registros/lista-cessao/lista-cessao.component';
import { CancelaCessaoComponent } from './layout/content/registros/cancela-cessao/cancela-cessao.component';
import { CancelaContratoComponent } from './layout/content/registros/cancela-contrato/cancela-contrato.component';
import { DetalhesCessaoComponent } from './layout/content/registros/detalhes-da-cessao/detalhes-da-cessao.component';

// Alerts
import { ToastrModule } from 'ngx-toastr';

// Modals
import { ModalModule } from 'ngx-bootstrap/modal';

// Pagination
import { PaginationModule } from 'ngx-bootstrap/pagination';

// Currency, Moeda, R$
import { NgxCurrencyModule } from 'ngx-currency';
import {BillingComponent} from './layout/content/faturamento/billing.component';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr)

// Table Edit
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';

// TEMPORARIOS
import { ListaTitulosBancariosComponent } from './layout/content/cedulas/consultar-titulos-bancarios/lista/lista.component'

@NgModule({
  declarations: [
    // Loader
    LoaderComponent,

    // Pipes
    CpfCnpj,
    TipoPessoa,
    FormatCurrencyPipe,
    StatusParcelaPipe,
    StatusCessaoPipe,
    IndexacaoPipe,

    // App
    AppComponent,
    BillingComponent,
    // Usuarios
    UsuariosComponent,
    CriarUsuarioComponent,
    DetalhesDoUsuarioComponent,
    EditarUsuarioComponent,

    // Usuário
    AlterarSenhaComponent,

    // Login
    LoginPageComponent,

    // Home
    InicioComponent,

    // Layout
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,

    // Conciliacao
    ConciliacaoComponent,

    // Atualizacao
    AtualizacaoComponent,

    // Registros
    RegistrosComponent,
    DetalhesDoRegistroComponent,
    DetalhesDaSolicitacaoComponent,
    IncluirSolicitacaoRegistroComponent,
    ConsultarComponent,
    RetificacaoRegistroComponent,

    // Cessao
    DisponibilizarRegistroComponent,
    ListaCessaoComponent,
    DetalhesCessaoComponent,
    CancelaCessaoComponent,
    CancelaContratoComponent,

    // Arquivos
    ArquivosComponent,
    ImportarComponent,
    DetalhesDoArquivoComponent,

    // Botões
    BotaoNovoComponent,
    BotaoVoltarComponent,
    BotaoNotificacoesComponent,
    BotaoEditarComponent,

    // TEMPORARIOS
    ListaTitulosBancariosComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LayoutRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    MaterialModule,
    NgxDropzoneModule,
    DataTablesModule,
    FontAwesomeModule,
    Ng2SmartTableModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 8000,
    }),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    NgxCurrencyModule,
    TableModule,
    DropdownModule
  ],
  bootstrap: [AppComponent],
  providers: [
    LoaderService,
    HttpClientModule,
    LocalService,
    UsuarioService,
    AuthenticationService,
    FaturamentoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi : true
    },{
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi : true
    },
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}
