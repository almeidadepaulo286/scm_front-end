import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

// Icone
import { faFilter } from '@fortawesome/free-solid-svg-icons';

// Servico
import { UsuarioService } from 'app/_services/usuario.service';
import { Usuario } from 'app/_models/usuario';

@Component({
	selector: 'usuarios',
	templateUrl: './usuarios.component.html',
	styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

	constructor(private usuarioService: UsuarioService, public router: Router, private fb: FormBuilder) {}

	title = 'Usuários';
	data: Usuario[];

	// Icone
	faFilter = faFilter;

	// Filtro
	filterShow = true;
	toggleFilter() {
		this.filterShow = !this.filterShow;
	}

	// Tabela Cabeçalho
	headElements = [
		'Nome',
		'CPF',
		'E-mail',
		'Perfil',
		'Status',
	];

	// Form Filtro
	usuarioFiltro = this.fb.group({
		nome: [''],
		documento: [''],
		perfil: [''],
		ativo: ['']
	});

	// Parametros e Paginacao
	filtroValues;
	page: number = 0;
	pageSize: number = 20;
	currentPage = 0;
	pages: Array<number>;
	totalPages: number;
	totalRegistros;

	// Resultado não encontrado
	resultadoVazio: Boolean;

	onSubmit(){
		this.filtrar();	
	}
	
	// Recupera lista de usuários
	filtrar(){
		this.page = 0
		this.getUsers()
	}
	
	// Reseta formulário do filtro
	limpaForm() {
		this.usuarioFiltro.reset();
		this.usuarioFiltro.value.ativo = "";
	}

	ngOnInit() {
		this.getUsers()
	}

	getUsers(){
		this.filtroValues = this.usuarioFiltro.value
		this.usuarioService.getUsuariosFiltered(
			this.filtroValues.documento,
			'',
			this.filtroValues.perfil,
			this.filtroValues.nome,
			this.page,
			this.pageSize,
			this.usuarioFiltro.value.ativo
		).subscribe(
			res => {
				this.data = res.content
				// console.log(res)
				this.data.length == 0 ? this.resultadoVazio = true : this.resultadoVazio = false
				this.pages = new Array(res.totalPages);
				this.totalPages = res.totalPages;
				this.totalRegistros = res.totalElements;
			},
			err => {
				
			}
		)
	}

	setPage(i, event: any) {
		// event.preventDefault();
		this.page = i - 1;
		this.getUsers();
		// if (this.filtro) {
		// } else {
		// 	this.getRegistros();
		// }
	}

	pageChanged(event: any): void {
		this.page = event.page - 1;
		this.getUsers();
		// if (this.filtro) {
		// } else {
		// 	this.getRegistros();
		// }
	}
}
