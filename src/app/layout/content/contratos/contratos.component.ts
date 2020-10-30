import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { faFilter, faPencilAlt, faUnlockAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Contrato } from 'app/_models/contrato';
import { ContratoService } from 'app/_services/contrato.service';

@Component({
	selector: 'app-contratos',
	templateUrl: './contratos.component.html',
	styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

	title = 'Contratos';

	// Icones
	faFilter = faFilter;
	faPencilAlt = faPencilAlt;
	faUnlockAlt = faUnlockAlt;
	faTrashAlt = faTrashAlt;

	// Form Filtro
	contratoFiltro = this.fb.group({
		codigo: [''],
		descricao: [''],
		codigoProjeto: [''],
		valor: ['']
	});

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
	contratos : Contrato[];

	// Resultado não encontrado
	resultadoVazio: boolean;

	constructor(private router: Router,
				private fb: FormBuilder,
				private toastr: ToastrService,
                private contratoService: ContratoService) {}

	ngOnInit() {
		this.limparFiltros() // limpa o 0.0000 do indice
		this.getContratos()
	}

	// Reseta formulário do filtro
	limparFiltros() {
		this.contratoFiltro.reset();
	}

	// Recupera lista de contratos
	aplicarFiltros() {
		this.page = 0
		this.getContratos()
	}

	setPage(i: number, event: any) {
		this.page = i - 1;
		this.getContratos();
	}

	pageChanged(event: any): void {
		this.page = event.page - 1;
		this.getContratos();
	}

	getContratos() {
		this.contratoService.findContratosByFilter(this.contratoFiltro.value.codigo,
					 							   this.contratoFiltro.value.descricao,
					 							   this.contratoFiltro.value.codigoProjeto,
												   this.contratoFiltro.value.valor,
												   String(this.page),
												   String(this.pageSize),
												   this.sort,
												   this.sortDirection
			).subscribe(
				ret => {
					this.contratos = ret.retorno
					this.resultadoVazio = ! (Array.isArray(ret.retorno) && ret.retorno.length > 0)
					this.pages = new Array(ret.totalPages);
					this.totalPages = ret.totalPages;
					this.totalRegistros = ret.totalElements;
				},
				err => {
					this.toastr.warning('Não foi possível localizar os Contratos, tente novamente mais tarde')
				}
			)
	}

}
