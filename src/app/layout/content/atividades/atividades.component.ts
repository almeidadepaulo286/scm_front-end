import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { faPencilAlt, faUnlockAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// Icone
import { faFilter } from '@fortawesome/free-solid-svg-icons';

// Servico
import { AtividadeService } from 'app/_services/atividade.service';
import { Atividade } from 'app/_models/atividade';

@Component({
	selector: 'atividades',
	templateUrl: './atividades.component.html',
	styleUrls: ['./atividades.component.css']
})
export class AtividadesComponent implements OnInit {

	constructor(private atividadeService: AtividadeService, public router: Router, private fb: FormBuilder) {}

	title = 'Atividades de Controle';
	data: Atividade[];

	// Icone
	faFilter = faFilter;
	faPencilAlt = faPencilAlt;
	faUnlockAlt = faUnlockAlt;
	faTrashAlt = faTrashAlt;

	// Tabela Cabeçalho
	headElements = [
		'Código',
		'Prefixo',
		'Descrição',
		'Disciplina'
	];

	// Form Filtro
	atividadeFiltro = this.fb.group({
		codigo: [''],
		prefixo: [''],
		disciplina: ['']
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
	
	// Recupera lista de atividades de controle
	filtrar(){
		this.page = 0
		this.getActivities()
	}
	
	// Reseta formulário do filtro
	limpaForm() {
		this.atividadeFiltro.reset();
		this.atividadeFiltro.value.ativo = "";
	}

	ngOnInit() {
		this.getActivities()
	}

	getActivities(){
		this.filtroValues = this.atividadeFiltro.value
		this.atividadeService.getAtividadesFiltered(
			this.filtroValues.codigo,
			this.filtroValues.prefixo,
			this.filtroValues.disciplina,
			this.page,
			this.pageSize
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
		this.getActivities();
		// if (this.filtro) {
		// } else {
		// 	this.getRegistros();
		// }
	}

	pageChanged(event: any): void {
		this.page = event.page - 1;
		this.getActivities();
		// if (this.filtro) {
		// } else {
		// 	this.getRegistros();
		// }
	}

	resetarSenha(atividadeId : number) {

	}

	editarAtividade(atividadeId : number) {
		this.router.navigateByUrl("/atividades/editar-atividade/" + atividadeId);
	}

	excluirAtividade(atividadeId : number) {

	}
}
