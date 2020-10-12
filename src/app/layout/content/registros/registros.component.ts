import { Component, OnInit } from "@angular/core";
import { Registro } from "./registro";
import { RegistroService } from "./registro.service";
import { FormBuilder } from "@angular/forms";

// Icone
import { faFilter } from "@fortawesome/free-solid-svg-icons";
// Icones
import { faSearch } from "@fortawesome/free-solid-svg-icons";

@Component({
	selector: "registros",
	templateUrl: "./registros.component.html",
	styleUrls: ["./registros.component.css"]
})
export class RegistrosComponent implements OnInit {
	faAddressCard = faSearch;
	filtro: boolean;
	title = "Contratos Registrados";
	registros: Registro[];
	carteiras;
	
	// Paginação
	currentPage = 1;
	page: number = 0;
	pages: Array<number>;
	totalPages: number;
	maxSise: number = 5;
	registroVazio = false;
	totalRegistros;

	headElements = [
		"Originador",
		"Ativo",
		//"Credor",
		"Carteira",
		// "Num Doc Devedor",
		"Data Inclusão",
		//'E-mail Devedor',
		//'Nº Doc Avalista',
		"Contrato",
		"Val Total Créd.",
		"Data Contrato",
		"Val Líq Créd.",
		"Indicador",
		"Status",
		// "Detalhes"
	];

	constructor(
		private registroService: RegistroService,
		private fb: FormBuilder
	){}

	// Icone
	faFilter = faFilter;

	// Filtro
	filterShow = true;
	toggleFilter() {
		this.filterShow = !this.filterShow;
	}

	registrosFiltro = this.fb.group({
		cnpjOriginador: [""],
		cnpjCredor: [""],
		dataIni: [""],
		dataFim: [""],
		carteira: [""],
		contrato: [""]
	});

	//
	ngOnInit() {
		this.filtrar();
		this.getCarteiras();
	}

	filtrarClick() {
		// console.log(this.registrosFiltro.value);
		if (
			this.registrosFiltro.get("dataIni").value >
			this.registrosFiltro.get("dataFim").value
		) {
			alert("Data inicial não pode ser maior que data final.");
			return;
		}

		this.page = 0;
		this.filtrar();
	}

	limparClick() {
		this.registrosFiltro = this.fb.group({
			cnpjOriginador: [""],
			cnpjCredor: [""],
			dataIni: [""],
			dataFim: [""],
			carteira: [""],
			contrato: [""]
		});
		this.page = 0;
		this.filtro = false;
		this.filtrar();
	}

	filtrar() {
		this.filtro = true;
		this.registroService
			.findAllFiltered(
				`${this.page}`,
				this.registrosFiltro.get("cnpjOriginador").value,
				// this.registrosFiltro.get("cnpjCredor").value,
				this.registrosFiltro.get("dataIni").value,
				this.registrosFiltro.get("dataFim").value,
				this.registrosFiltro.get("carteira").value,
				this.registrosFiltro.get("contrato").value
			)
			.subscribe(res => {
				this.registros = res.content;
				this.registros.length == 0 ? this.registroVazio = true : this.registroVazio = false
				this.pages = new Array(res.totalPages);
				this.totalPages = res.totalPages;
				this.totalRegistros = res.totalElements;
				// console.log(this.registros)
			}, (err) => {
				// console.log(err)
			});
	}

	getRegistros(): void {
		this.registroService.findAll(this.page).subscribe(r => {
			this.registros = r.content;
			this.pages = new Array(r.totalPages);
			this.totalPages = r.totalPages;
			this.registros.length == 0 ? this.registroVazio = true : this.registroVazio = false
			// console.log(r);
		});
	}

	selectedRegistro: Registro;
	onSelect(registro: Registro): void {
		this.selectedRegistro = registro;
		// console.log(this.selectedRegistro);
	}

	setPage(i, event: any) {
		event.preventDefault();
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
		// 	window.scrollTo(0, 0);
		// } else {
		// 	window.scrollTo(0, 0);
		// 	this.getRegistros();
		// }
	}

	getCarteiras(){
		this.registroService.getCarteiras().subscribe((res) => {
			this.carteiras = res;
		},
		(err) => {
			console.log(err);
		})
	}
}
