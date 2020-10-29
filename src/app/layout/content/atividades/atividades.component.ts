import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { faFilter, faPencilAlt, faUnlockAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AtividadeService } from 'app/_services/atividade.service';
import { DisciplinaService } from 'app/_services/disciplina.service';
import { Atividade } from 'app/_models/atividade';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-atividades',
	templateUrl: './atividades.component.html',
	styleUrls: ['./atividades.component.css']
})
export class AtividadesComponent implements OnInit {

	title = 'Atividades de Controle';

	// Icones
	faFilter = faFilter;
	faPencilAlt = faPencilAlt;
	faUnlockAlt = faUnlockAlt;
	faTrashAlt = faTrashAlt;

	// Form Filtro
	atividadeFiltro = this.fb.group({
		codigo: [''],
		prefixo: [''],
		idDisciplina: ['']
	});

	// Select Disciplinas
	listaDisciplinas;

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
	atividades : Atividade[];

	// Resultado não encontrado
	resultadoVazio: boolean;

	constructor(private router: Router,
				private atividadeService: AtividadeService,
				private disciplinaService: DisciplinaService,
				private fb: FormBuilder,
				private toastr: ToastrService) {}

	ngOnInit() {
		this.listarDisciplinas()
		this.getAtividades()
	}

	// Lista Disciplinas
	listarDisciplinas(){
		this.disciplinaService.getDisciplinas().subscribe(
			ret => {
				if (Array.isArray(ret) && ret.length > 0) {
					this.listaDisciplinas = ret
				}
			},
			err => {
				this.toastr.error('Erro inesperado ao listar Disciplinas, tente novamente mais tarde.')
			}
		)
	}

	// Reseta formulário do filtro
	limparFiltros() {
		this.atividadeFiltro.reset();
	}

	// Recupera lista de atividades
	aplicarFiltros() {
		this.page = 0
		this.getAtividades()
	}

	setPage(i: number, event: any) {
		this.page = i - 1;
		this.getAtividades();
	}

	pageChanged(event: any): void {
		this.page = event.page - 1;
		this.getAtividades();
	}

	getAtividades() {
		this.atividadeService.findAtividadesByFilter(this.atividadeFiltro.value.codigo,
					 				 			 	 this.atividadeFiltro.value.prefixo,
												 	 this.atividadeFiltro.value.idDisciplina,
												 	 String(this.page),
													 String(this.pageSize),
													 this.sort,
													 this.sortDirection
			).subscribe(
				ret => {
					this.atividades = ret.retorno
					this.resultadoVazio = ! (Array.isArray(ret.retorno) && ret.retorno.length > 0)
					this.pages = new Array(ret.totalPages);
					this.totalPages = ret.totalPages;
					this.totalRegistros = ret.totalElements;
				},
				err => {
					this.toastr.warning('Não foi possível localizar as Atividades de Controle, tente novamente mais tarde')
				}
			)
	}

}
