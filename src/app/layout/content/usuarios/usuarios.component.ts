import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { faPencilAlt, faUnlockAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { UsuarioService } from 'app/_services/usuario.service';
import { PerfilService } from 'app/_services/perfil.service';
import { Usuario } from 'app/_models/usuario';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-usuarios',
	templateUrl: './usuarios.component.html',
	styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

	// Icones
	faFilter = faFilter;
	faPencilAlt = faPencilAlt;
	faUnlockAlt = faUnlockAlt;
	faTrashAlt = faTrashAlt;

	title = 'Usuários';

	// Form Filtro
	usuarioFiltro = this.fb.group({
		nome: [''],
		login: [''],
		email: [''],
		idPerfil: [''],
		situacao: ['']
	});
	filtroValues;

	// Select Perfis
	listaPerfis;

	// Parametros de Paginacao
	page = 0;
	pageSize = 20;
	sort: string;
	sortDirection: string;

	// Controle da Paginacao
	currentPage = 0;
	pages: Array<number>;
	totalPages: number;
	totalRegistros: number;

	usuarios : Usuario[];

	// Resultado não encontrado
	resultadoVazio: boolean;

	constructor(private usuarioService: UsuarioService,
				private perfilService: PerfilService,
				public router: Router,
				private fb: FormBuilder,
				private toastr: ToastrService) {}

	ngOnInit() {
		this.listarPerfis()
		this.getUsuarios()
	}

	// Lista Perfis
	listarPerfis(){
		this.perfilService.listarPerfis().subscribe(
			ret => {
				if (Array.isArray(ret) && ret.length > 0) {
					this.listaPerfis = ret
				}
			},
			err => {
				this.toastr.error('Erro inesperado ao listar Perfis, tente novamente mais tarde.')
			}
		)
	}

	// Reseta formulário do filtro
	limparFiltros() {
		this.usuarioFiltro.reset();
		this.usuarioFiltro.value.situacao = null;
	}

	aplicarFiltros() {
		this.page = 0
		this.getUsuarios()
	}
 
	// Recupera lista de usuários
	getUsuarios() {
		this.filtroValues = this.usuarioFiltro.value
		this.usuarioService.findUsuariosFiltered(this.filtroValues.nome,
					 							 this.filtroValues.login,
					 							 this.filtroValues.email,
												 this.filtroValues.idPerfil,
												 this.filtroValues.situacao,
												 String(this.page),
												 String(this.pageSize),
												 this.sort,
												 this.sortDirection
			).subscribe(
				ret => {
					this.usuarios = ret.retorno
					this.resultadoVazio = ! (Array.isArray(ret.retorno) && ret.retorno.length > 0)
					this.pages = new Array(ret.totalPages);
					this.totalPages = ret.totalPages;
					this.totalRegistros = ret.totalElements;
				},
				err => {
					console.table(err);
				}
			)
	}

	setPage(i: number, event: any) {
		// event.preventDefault();
		this.page = i - 1;
		this.getUsuarios();
	}

	pageChanged(event: any): void {
		this.page = event.page - 1;
		this.getUsuarios();
	}
}
