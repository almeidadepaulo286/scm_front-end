import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { RegistroService } from "../../../registros/registro.service";


@Component({
	selector: 'app-lista-titulos-bancarios',
	templateUrl: './lista.component.html',
	styleUrls: ['./lista.component.css']
})
export class ListaTitulosBancariosComponent implements OnInit {
	title = 'Registros';
	faAddressCard = faSearch;
	faFilter = faFilter;
	filtro: boolean;
	filterShow = true;
	userPerfil;
	registroVazio;
	
	// Paginação
	currentPage = 1;
	page: number = 0;
	pages: Array<number>;
	totalPages: number;
	totalRegistros;
	
	headElements = [
		'Origem',
		'Ativo',
		'Solicitante',
		'Carteira',
		'Referência Externa',
		'Originador',
		'Detentor',
		'Contrato',
		'Data do Contrato',
		'Valor Total Crédito',
		'Valor Líquido Crédito',
		'Data do Registro',
		'Situação do Registro',
		'Status',
		'Público',
		'Constatação'
    ];

	registros = []
	// registros = [
	// 	{ contrato: '99925552943147945128', dataContrato: '2020-08-12T15:39:44.2341761', origem: 'Portal', ativo: 'CCB', solicitante: 'PortalUser', carteira: 'CARTEIRA_CCB', referenciaExterna: 'TESTE CCB', emissor: '60746948000112', detentor: '27073524898', valorEmissaoVigente: '11717.6', valorEmissao: '10798.84', dataRegistro: '2020-08-26T15:39:44.2341761', situacaoRegistro: 'Ativo', status: 'Concluido', publico: '-', constatacao: ''},
	// 	{ contrato: '99925552943147945128', dataContrato: '2020-08-12T15:39:44.2341761', origem: 'Portal', ativo: 'CCB', solicitante: 'PortalUser', carteira: 'CARTEIRA_CCB', referenciaExterna: 'TESTE CCB', emissor: '60746948000112', detentor: '27073524898', valorEmissaoVigente: '20000.00', valorEmissao: '19000.00', dataRegistro: '2020-08-26T15:39:44.2341761', situacaoRegistro: 'Ativo', status: 'Concluido', publico: '-', constatacao: ''},
	// 	{ contrato: '99925552943147945128', dataContrato: '2020-08-12T15:39:44.2341761', origem: 'Portal', ativo: 'CCB', solicitante: 'PortalUser', carteira: 'CARTEIRA_CCB', referenciaExterna: 'TESTE CCB', emissor: '60746948000112', detentor: '27073524898', valorEmissaoVigente: '15000.00', valorEmissao: '14000.00', dataRegistro: '2020-08-26T15:39:44.2341761', situacaoRegistro: 'Ativo', status: 'Concluido', publico: '-', constatacao: ''},
	// 	{ contrato: '99925552943147945128', dataContrato: '2020-08-12T15:39:44.2341761', origem: 'Portal', ativo: 'CPR', solicitante: 'PortalUser', carteira: 'CARTEIRA_CPR', referenciaExterna: 'TESTE CPR', emissor: '60746948000112', detentor: '27073524898', valorEmissaoVigente: '100000.00', valorEmissao: '90000.00', dataRegistro: '2020-08-26T15:39:44.2341761', situacaoRegistro: 'Ativo', status: 'Concluido', publico: '-', constatacao: ''},
	// 	{ contrato: '99925552943147945128', dataContrato: '2020-08-12T15:39:44.2341761', origem: 'Portal', ativo: 'CPR', solicitante: 'PortalUser', carteira: 'CARTEIRA_CPR', referenciaExterna: 'TESTE CPR', emissor: '60746948000112', detentor: '27073524898', valorEmissaoVigente: '50000.00', valorEmissao: '45000.00', dataRegistro: '2020-08-26T15:39:44.2341761', situacaoRegistro: 'Ativo', status: 'Concluido', publico: '-', constatacao: ''},
	// ]

	constructor(
		private fb: FormBuilder,
		private toastr: ToastrService,
		private registroService: RegistroService,
	){}

	registrosFiltro = this.fb.group({
		origem: [""],
		solicitante: [""],
		detentorCarteira: [""],
		referenciaExterna: [""],
		originador: [""],
		detentor: [""],
		dataInicio: [""],
		dataFim: [""],
		pedidoRegistro: [""],
		situacao: [""]
	});
	
	filtrarClick() {
		// console.log(this.registrosFiltro.value);
		if (
			this.registrosFiltro.get("valorDe").value >
			this.registrosFiltro.get("valorAte").value
		) {
			this.toastr.warning('Valor inicial não pode ser maior que valor final');
			return;
		}

		this.page = 0;
		this.filtrar();
	}

	limparClick() {
		this.registrosFiltro.reset()
		this.page = 0;
		this.filtro = false;
		this.filtrar();
	}

	// Inicia tela
	ngOnInit() {
		this.filtrar();
	}

	setPage(i, event: any) {
		// event.preventDefault();
		this.page = i - 1;
		this.filtrar();
		// if (this.filtro) {
			// } else {
				// 	this.getRegistros();
				// }
			}
			
			pageChanged(event: any): void {
				this.page = event.page - 1;
				this.filtrar();
				// if (this.filtro) {
					// } else {
						// 	this.getRegistros();
						// }
					}
					
	filtrar() {
		this.filtro = true;
		this.registroService
			.findAllFiltered(
				`${this.page}`,
				'',
				'',
				'',
				'',
				''
			)
			.subscribe(res => {
				this.registros = res.content;
				this.registros.length == 0 ? this.registroVazio = true : this.registroVazio = false
				this.pages = new Array(res.totalPages);
				this.totalPages = res.totalPages;
				this.totalRegistros = res.totalElements;
			}, (err) => {
				// console.log(err)
			});
	}
}
