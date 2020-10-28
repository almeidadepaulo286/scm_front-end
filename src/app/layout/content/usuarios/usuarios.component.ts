import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

	title = 'Usuários';

	// Icones
	faFilter = faFilter;
	faPencilAlt = faPencilAlt;
	faUnlockAlt = faUnlockAlt;
	faTrashAlt = faTrashAlt;

	// Form Filtro
	usuarioFiltro = this.fb.group({
		nome: [''],
		login: [''],
		email: [''],
		situacao: [''],
		idPerfil: ['']
	});

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

	// Resultado encontrado
	usuarios : Usuario[];

	// Resultado não encontrado
	resultadoVazio: boolean;

	constructor(private router: Router,
				private usuarioService: UsuarioService,
				private perfilService: PerfilService,
				private fb: FormBuilder,
				private toastr: ToastrService) {}

	ngOnInit() {
		this.listarPerfis()
		this.getUsuarios()
	}

	// Lista Perfis
	listarPerfis(){
		this.perfilService.getPerfis().subscribe(
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
	}

	// Recupera lista de usuários
	aplicarFiltros() {
		this.page = 0
		this.getUsuarios()
	}

	setPage(i: number, event: any) {
		this.page = i - 1;
		this.getUsuarios();
	}

	pageChanged(event: any): void {
		this.page = event.page - 1;
		this.getUsuarios();
	}

	getUsuarios() {
		this.usuarioService.findUsuariosByFilter(this.usuarioFiltro.value.nome,
					 							 this.usuarioFiltro.value.login,
					 							 this.usuarioFiltro.value.email,
												 this.usuarioFiltro.value.situacao,
												 this.usuarioFiltro.value.idPerfil,
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

}
