import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Registro } from '../registro';
import { RegistroService } from '../registro.service';
import { CessaoService } from 'app/_services/cessao.service';
import { ToastrService } from 'ngx-toastr';


@Component({
	selector: 'app-lista-cessao',
	templateUrl: './lista-cessao.component.html',
	styleUrls: ['./lista-cessao.component.css']
})
export class ListaCessaoComponent implements OnInit {
	title = 'Cessões';
	faAddressCard = faSearch;
	faFilter = faFilter;
	filterShow = true;
	userPerfil;
	// Dados de cessoes:
	registros: [];
	registroVazio;
	filtro: boolean;
	registrosCessionario: [];
	registroCessionarioVazio;
	filtroCessionario: boolean;
	
	// Paginação
	currentPage = 1;
	page: number = 0;
	pages: Array<number>;
	totalPages: number;
	totalRegistros;
	linesPerPage: number = 10;

	// Paginação Cessionario
	currentPageCessionario = 1;
	pageCessionario: number = 0;
	pagesCessionario: Array<number>;
	totalPagesCessionario: number;
	totalRegistrosCessionario;
	linesPerPageCessionario: number = 10;
	
	// Cabecalho
	headElements = [
		'Cedente (CNPJ)',
		'Cessionário (CNPJ)',
		'Data da Cessão',
		'Limite da Disponibilidade',
		'Termo de Cessão',
		'Status',
	];
	
	// Cabecalho Cessionario
	headElementsCessionario = [
		'Cedente (CNPJ)',
		'Cessionário (CNPJ)',
		'Data da Cessão',
		'Limite da Disponibilidade',
		'Termo de Cessão',
		'Status',
	];

	constructor(
		private cessaoService: CessaoService,
		private fb: FormBuilder,
        private toastr: ToastrService
	){}

	registrosFiltro = this.fb.group({
		cnpjCessionaria: [""],
		codigoTermoCessao: [""],
		dataFim: [""],
		dataIni: [""],
		status: [""]
	});

	registrosCessionarioFiltro = this.fb.group({
		cnpjDetentor: [""],
		codigoTermoCessao: [""],
		dataFim: [""],
		dataIni: [""],
		status: [""]
	});
	
	filtrarClick() {
		// console.log(this.registrosFiltro.value);
		if (
			this.registrosFiltro.get("dataIni").value >
			this.registrosFiltro.get("dataFim").value
		) {
			this.toastr.warning('Data inicial não pode ser maior que data final');
			return;
		}

		this.page = 0;
		this.filtrar();
	}
	
	filtrarCessionarioClick() {
		// console.log(this.registrosCessionarioFiltro.value);
		if (
			this.registrosCessionarioFiltro.get("dataIni").value >
			this.registrosCessionarioFiltro.get("dataFim").value
		) {
			this.toastr.warning('Data inicial não pode ser maior que data final');
			return;
		}

		this.pageCessionario = 0;
		this.filtrarCessionario();
	}

	limparClick() {
		this.registrosFiltro = this.fb.group({
			cnpjCessionaria: [""],
			codigoTermoCessao: [""],
			dataFim: [""],
			dataIni: [""],
			status: [""]
		});
		this.page = 0;
		this.filtro = false;
		this.filtrar();
	}

	limparCessionarioClick() {
		this.registrosCessionarioFiltro = this.fb.group({
			cnpjDetentor: [""],
			codigoTermoCessao: [""],
			dataFim: [""],
			dataIni: [""],
			status: [""]
		});
		this.pageCessionario = 0;
		this.filtroCessionario = false;
		this.filtrarCessionario();
	}

	// Inicia tela
	ngOnInit() {
		this.filtrar();
		this.filtrarCessionario();
	}

	// Recupera lista de cessoes
	// getRegistros(): void {
	// 	this.cessaoService.findAll().subscribe((res) => {
	// 		this.registros = res.content;
	// 		this.pages = new Array(res.totalPages);
	// 		this.totalPages = res.totalPages;
	// 		this.registros.length == 0 ? this.registroVazio = true : this.registroVazio = false;
	// 		this.totalRegistros = res.totalElements;
	// 		// console.log(this.totalPages)
	// 		// console.log(this.totalRegistros)
	// 	}, (err) => {
	// 		// console.log(err)
	// 	});
	// }

	selectedRegistro: Registro;
	onSelect(registro: Registro): void {
		this.selectedRegistro = registro;
		// console.log(this.selectedRegistro);
	}

	selectedRegistroCessionario: Registro;
	onSelectCessionario(registroCessionario: Registro): void {
		this.selectedRegistroCessionario = registroCessionario;
		// console.log(this.selectedRegistroCessionario);
	}

	filtrar() {
		this.filtro = true;
		this.cessaoService.findAllFiltered(
				`${this.page}`,
				`${this.linesPerPage}`,
				// this.registrosFiltro.get("cnpjOriginador").value,
				this.registrosFiltro.get("cnpjCessionaria").value,
				this.registrosFiltro.get("codigoTermoCessao").value,
				this.registrosFiltro.get("dataIni").value,
				this.registrosFiltro.get("dataFim").value,
				this.registrosFiltro.get("status").value,
			)
			.subscribe((res) => {
				this.registros = res.content;
				this.registros.length == 0 ? this.registroVazio = true : this.registroVazio = false;
				this.pages = new Array(res.totalPages);
				this.totalPages = res.totalPages;
				this.totalRegistros = res.totalElements;
				// console.log(res.content);
			}, (err) => {
				// console.log(err)
			});	
	}

	filtrarCessionario() {
		this.filtroCessionario = true;
		this.cessaoService.findAllCessionarioFiltered(
				`${this.pageCessionario}`,
				`${this.linesPerPageCessionario}`,
				// this.registrosFiltro.get("cnpjOriginador").value,
				this.registrosCessionarioFiltro.get("cnpjDetentor").value,
				this.registrosCessionarioFiltro.get("codigoTermoCessao").value,
				this.registrosCessionarioFiltro.get("dataIni").value,
				this.registrosCessionarioFiltro.get("dataFim").value,
				this.registrosCessionarioFiltro.get("status").value,
			)
			.subscribe((res) => {
				this.registrosCessionario = res.content;
				this.registrosCessionario.length == 0 ? this.registroCessionarioVazio = true : this.registroCessionarioVazio = false;
				this.pagesCessionario = new Array(res.totalPages);
				this.totalPagesCessionario = res.totalPages;
				this.totalRegistrosCessionario = res.totalElements;
				// console.log(res.content);
			}, (err) => {
				// console.log(err)
			});	
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

	setPageCessionario(event: any) {
		// event.preventDefault();
		this.pageCessionario = event.page - 1;
		this.filtrarCessionario();
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

	pageChangedCessionario(event: any): void {
		this.pageCessionario = event.page - 1;
		this.filtrarCessionario();
		// if (this.filtro) {
		// } else {
		// 	this.getRegistros();
		// }
	}
}