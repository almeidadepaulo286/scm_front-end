import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { faFilter, faPencilAlt, faUnlockAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FatorProdutividadeService } from 'app/_services/fator-produtividade.service';
import { AtividadeService } from 'app/_services/atividade.service';
import { CaracteristicaService } from 'app/_services/caracteristica.service';
import { ToastrService } from 'ngx-toastr';
import { FatorProdutividade } from 'app/_models/fator-produtividade';

@Component({
	selector: 'app-fatores-produtividade',
	templateUrl: './fatores-produtividade.component.html',
	styleUrls: ['./fatores-produtividade.component.css']
})
export class FatoresProdutividadeComponent implements OnInit {

	title = 'Fatores de Produtividade';

	// Icones
	faFilter = faFilter;
	faPencilAlt = faPencilAlt;
	faUnlockAlt = faUnlockAlt;
	faTrashAlt = faTrashAlt;

	// Form Filtro de Consulta
	filterConsulta = this.fb.group({
		codigo: [''],
		indice: [''],
		idAtividadeControle: [''],
		idCaracteristica: ['']
	});

	// listas de selecao:
	listaAtividadesControle;
	listaCaracteristicas;

	// Parametros de Paginacao
	page = 0;
	pageSize = 20;
	sort: string;
	sortDirection: string;

	// Controle da Paginacao
	currentPage = 0;
	pages: Array<number>;
	totalPages: number;
	totalElements: number;

	// Resultado encontrado
	registros : FatorProdutividade[];

	// Resultado não encontrado
	resultadoVazio: boolean;

	constructor(private router: Router,
				private fb: FormBuilder,
				private toastr: ToastrService,
				private fatorProdutividadeService: FatorProdutividadeService,
				private atividadeService: AtividadeService,
				private caracteristicaService: CaracteristicaService) {}

	ngOnInit() {
		this.listarAtividadesControle()
		this.listarCaracteristicas()
		this.limparFiltros() // limpa o 0.0000 do indice
		this.getFatoresProdutividade()
	}

	// Lista de Atividades de Controle
	listarAtividadesControle(){
		this.atividadeService.getAtividades().subscribe(
			ret => {
				if (Array.isArray(ret) && ret.length > 0) {
					this.listaAtividadesControle = ret
				}
			},
			err => {
				this.toastr.error('Erro inesperado ao listar Atividades de Controle, tente novamente mais tarde.')
			}
		)
	}

	// Lista de Atividades de Controle
	listarCaracteristicas(){
		this.caracteristicaService.getCaracteristicas().subscribe(
			ret => {
				if (Array.isArray(ret) && ret.length > 0) {
					this.listaCaracteristicas = ret
				}
			},
			err => {
				this.toastr.error('Erro inesperado ao listar Características, tente novamente mais tarde.')
			}
		)
	}

	// Reseta formulário do filtro
	limparFiltros() {
		this.filterConsulta.reset();
	}

	// Recupera lista de atividades
	aplicarFiltros() {
		this.page = 0
		this.getFatoresProdutividade()
	}

	setPage(i: number, event: any) {
		this.page = i - 1;
		this.getFatoresProdutividade();
	}

	pageChanged(event: any): void {
		this.page = event.page - 1;
		this.getFatoresProdutividade();
	}

	getFatoresProdutividade() {
		this.fatorProdutividadeService
		    .findFatoresProdutividadeByFilter(this.filterConsulta.value.codigo,
					 				 		  this.filterConsulta.value.indice,
											  this.filterConsulta.value.idAtividadeControle,
											  this.filterConsulta.value.idCaracteristica,
											  String(this.page),
											  String(this.pageSize),
											  this.sort,
											  this.sortDirection
			).subscribe(
				ret => {
					this.registros = ret.retorno
					this.resultadoVazio = ! (Array.isArray(ret.retorno) && ret.retorno.length > 0)
					this.pages = new Array(ret.totalPages);
					this.totalPages = ret.totalPages;
					this.totalElements = ret.totalElements;
				},
				err => {
					this.toastr.warning('Não foi possível localizar os Fatores de Produtividade, tente novamente mais tarde')
				}
			)
	}

}
