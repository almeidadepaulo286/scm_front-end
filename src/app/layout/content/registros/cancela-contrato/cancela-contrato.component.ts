import { Component, TemplateRef, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Registro } from '../registro';
import { RegistroService } from "../registro.service";
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
	selector: 'app-cancela-contrato',
	templateUrl: './cancela-contrato.component.html',
	styleUrls: ['./cancela-contrato.component.css']
})
export class CancelaContratoComponent implements OnInit {
	title = 'Cancelamento Contrato';
	faAddressCard = faSearch;
	filtro: boolean;
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

	// Modal
	modalRef: BsModalRef;
	config = {
		ignoreBackdropClick: true,
		class: 'modal-sm modal-dialog-centered'
	};
	message: string;
	codigo_contrato_operacao_credito_selected: any;
	formRazao: any;
	emptyForm: boolean = false;

	headElements = [
		'Originador',
		'Ativo',
		'Carteira',
		'Data do Contrato',
		'Contrato',
		'Val. Total Créd.',
		''
	];

	constructor(
		private registroService: RegistroService,
		private fb: FormBuilder,
		private toastr: ToastrService,
		private modalService: BsModalService
	) { }

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

	formRazaoCancelamento = this.fb.group({
		razao_cancelamento: [""]
	});



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
		});
	}

	selectedRegistro: Registro;
	onSelect(registro: Registro): void {
		this.selectedRegistro = registro;
	}

	setPage(i, event: any) {
		event.preventDefault();
		this.page = i - 1;
		this.filtrar();
	}

	pageChanged(event: any): void {
		this.page = event.page - 1;
		this.filtrar();
	}

	getCarteiras() {
		this.registroService.getCarteiras().subscribe((res) => {
			this.carteiras = res;
		},
			(err) => {
				// console.log(err);
			})
	}

	// Modal
	openModal(template: TemplateRef<any>, codigo_contrato_operacao_credito) {
		this.modalRef = this.modalService.show(template, this.config);
		this.codigo_contrato_operacao_credito_selected = codigo_contrato_operacao_credito;
	}
	
	confirm(): void {
		this.formRazao = this.formRazaoCancelamento.get('razao_cancelamento').value;
		if(this.formRazao == '' || this.formRazao == null ){
			this.emptyForm = true;
			this.formRazao = '';
			return
		}
		this.registroService.cancelarRegistro(this.codigo_contrato_operacao_credito_selected, this.formRazao).subscribe(
			res => {
				this.message = 'Confirmed!';
				this.modalRef.hide();
				this.toastr.success('Contrato cancelado');
				this.formRazaoCancelamento.reset();
				this.page = 0
				this.filtrar()
			}, err => {
				this.modalRef.hide();
				this.toastr.warning(err.error.errors[0].detalhe);
				this.formRazaoCancelamento.reset();
			}
		)
	}
	 
	decline(): void {
		this.message = 'Declined!';
		this.modalRef.hide();
		this.emptyForm = false;
		this.formRazaoCancelamento.reset();
	}
}
