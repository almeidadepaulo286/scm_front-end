import { SharedModule } from './shared/shared.module';

// Angular
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxWebstorageModule } from 'ngx-webstorage';

// Pipes
import { FormatCurrencyPipe } from 'app/pipes/formatCurrency.pipe';

// Form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Layout
import { LayoutComponent } from './layout/layout.component';
import { LayoutRoutingModule } from './layout/layout.routing.module';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

// Services
import { TokenInterceptor } from './_helpers/interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

// Bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// Material
import {MaterialModule} from './material.module';
import {MatIconRegistry} from '@angular/material/icon';

// PrimeNG
import { MultiSelectModule } from 'primeng/multiselect';

// FontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Home
import { InicioComponent } from './layout/content/inicio/inicio.component';

// Data Service
import { DataService } from './_services/data.service';

// Login
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthenticationService } from 'services';

// Botoes
import { BotaoNovoComponent } from './_components/botao-novo/botao-novo.component';
import { BotaoVoltarComponent } from './_components/botao-voltar/botao-voltar.component';
import { BotaoNotificacoesComponent } from './_components/botao-notificacoes/botao-notificacoes.component';
import { BotaoEditarComponent } from './_components/botao-editar/botao-editar.component';

// Atividades de Controle
import { AtividadesComponent } from './layout/content/atividades/atividades.component';
import { CriarAtividadeComponent } from './layout/content/atividades/criar-atividade/criar-atividade.component';
import { DetalhesAtividadeComponent } from './layout/content/atividades/detalhes-atividade/detalhes-atividade.component';
import { EditarAtividadeComponent } from './layout/content/atividades/editar-atividade/editar-atividade.component';
import { AtividadeService } from './_services/atividade.service';

// Fatores de Produtividade
import { FatoresProdutividadeComponent } from './layout/content/fatores-produtividade/fatores-produtividade.component';
import { CriarFatorProdutividadeComponent } from './layout/content/fatores-produtividade/criar-fator-produtividade/criar-fator-produtividade.component';
import { DetalhesFatorProdutividadeComponent } from './layout/content/fatores-produtividade/detalhes-fator-produtividade/detalhes-fator-produtividade.component';
import { EditarFatorProdutividadeComponent } from './layout/content/fatores-produtividade/editar-fator-produtividade/editar-fator-produtividade.component';
import { FatorProdutividadeService } from './_services/fator-produtividade.service';

// Usuarios
import { UsuariosComponent } from './layout/content/usuarios/usuarios.component';
import { CriarUsuarioComponent } from './layout/content/usuarios/criar-usuario/criar-usuario.component';
import { DetalhesUsuarioComponent } from './layout/content/usuarios/detalhes-usuario/detalhes-usuario.component';
import { EditarUsuarioComponent } from './layout/content/usuarios/editar-usuario/editar-usuario.component';
import { UsuarioService } from './_services/usuario.service';

// Perfils
import { PerfilService } from './_services/perfil.service';

// Disciplinas
import { DisciplinaService } from './_services/disciplina.service';

// Caracteristicas
import { CaracteristicaService } from './_services/caracteristica.service';

// Unidades de Medida
import { UnidadeMedidaService } from './_services/unidade-medida.service';

// Usuario
import { AlterarSenhaComponent } from './layout/content/alterar-senha/alterar-senha.component';

// Mascara de formulario
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

// Angular Ladda
import { LaddaModule } from 'angular2-ladda';

// Alerts
import { ToastrModule } from 'ngx-toastr';

// Modals
import { ModalModule } from 'ngx-bootstrap/modal';

// Pagination
import { PaginationModule } from 'ngx-bootstrap/pagination';

// Currency, Moeda, R$
import { NgxCurrencyModule } from 'ngx-currency';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr)

// Table Edit
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  declarations: [
    // Loader
    LoaderComponent,

    // Pipes
    FormatCurrencyPipe,

    // App
    AppComponent,

    // Atividades de Controle
    AtividadesComponent,
    CriarAtividadeComponent,
    DetalhesAtividadeComponent,
    EditarAtividadeComponent,

    // Fatores de Produtividade
    FatoresProdutividadeComponent,
    CriarFatorProdutividadeComponent,
    DetalhesFatorProdutividadeComponent,
    EditarFatorProdutividadeComponent,

    // Usuarios
    UsuariosComponent,
    CriarUsuarioComponent,
    DetalhesUsuarioComponent,
    EditarUsuarioComponent,

    // Usuario
    AlterarSenhaComponent,

    // Login
    LoginPageComponent,

    // Home
    InicioComponent,

    // Layout
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,

    // Botoes
    BotaoNovoComponent,
    BotaoVoltarComponent,
    BotaoNotificacoesComponent,
    BotaoEditarComponent
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
    MultiSelectModule,
    NgxDropzoneModule,
    DataTablesModule,
    FontAwesomeModule,
    Ng2SmartTableModule,
    SharedModule,
    NgxWebstorageModule.forRoot(),
    NgxMaskModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 8000,
    }),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    NgxCurrencyModule,
    TableModule,
    DropdownModule,
    // Angular Ladda
    LaddaModule.forRoot({
      style: 'zoom-in',
      spinnerSize: 40,
      spinnerColor: 'white',
      spinnerLines: 12
  })
  ],
  bootstrap: [AppComponent],
  providers: [
    LoaderService,
    HttpClientModule,
    AtividadeService,
    UsuarioService,
    DataService,
    PerfilService,
    DisciplinaService,
    FatorProdutividadeService,
    CaracteristicaService,
    UnidadeMedidaService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi : true
    },{
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi : true
    },
    { provide: LOCALE_ID, useValue: 'pt' },
    { 
      provide: APP_INITIALIZER,
      useFactory : onInitApp,
      deps: [DataService],
      multi : true}
  ]
})

export class AppModule {
  constructor(matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}

export function onInitApp(dataService: DataService) {
  return ()=> dataService.init();
}