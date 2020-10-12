import { Component, TemplateRef, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Registro } from '../registro';
import { CessaoService } from 'app/_services/cessao.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
	selector: 'app-cancela-cessao',
	templateUrl: './cancela-cessao.component.html',
	styleUrls: ['./cancela-cessao.component.css']
})
export class CancelaCessaoComponent implements OnInit {
	title = 'Cancelamento Cessão';
	faAddressCard = faSearch;
	registros: Registro[];
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
	linesPerPage: number = 20;

	// Modal
	modalRef: BsModalRef;
	config = {
		ignoreBackdropClick: true,
		class: 'modal-sm modal-dialog-centered'
	};
	message: string;
	codigo_termo_cessao_selected: any;
	formRazao: any;
	emptyForm: boolean = false;

	headElements = [
		'Cedente (CNPJ)',
		'Cessionário (CNPJ)',
		'Data da Cessão',
		'Limite da Disponibilidade',
		'Termo de Cessão',
		// 'Código do Contrato',
		'Status',
		''
	];

	constructor(
		private cessaoService: CessaoService,
		private fb: FormBuilder,
		private toastr: ToastrService,
		private modalService: BsModalService
	) { }

	registrosFiltro = this.fb.group({
		// cnpjOriginador: [""],
		cnpjCessionaria: [""],
		codigoTermoCessao: [""],
		dataFim: [""],
		dataIni: [""],
		status: [""]
	});

	formRazaoCancelamento = this.fb.group({
		razao_cancelamento: [""]
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

	limparClick() {
		this.registrosFiltro = this.fb.group({
			// cnpjOriginador: [""],
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

	// Inicia tela
	ngOnInit() {
		this.filtrar();
	}

	selectedRegistro: Registro;
	onSelect(registro: Registro): void {
		this.selectedRegistro = registro;
		// console.log(this.selectedRegistro);
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
				this.registros.length == 0 ? this.registroVazio = true : this.registroVazio = false
				this.pages = new Array(res.totalPages);
				this.totalPages = res.totalPages;
				this.totalRegistros = res.totalElements;
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

	pageChanged(event: any): void {
		this.page = event.page - 1;
		this.filtrar();
		// if (this.filtro) {
		// } else {
		// 	this.getRegistros();
		// }
	}

	// Modal
	openModal(template: TemplateRef<any>, codigo_termo_cessao) {
		this.modalRef = this.modalService.show(template, this.config);
		this.codigo_termo_cessao_selected = codigo_termo_cessao;
	}

	confirm(): void {
		this.formRazao = this.formRazaoCancelamento.get('razao_cancelamento').value;
		if(this.formRazao == '' || this.formRazao == null){
			this.emptyForm = true;
			this.formRazao = '';
			return
		}
		this.cessaoService.cancelarCessao2(this.codigo_termo_cessao_selected, this.formRazao).subscribe(
			res => {
				this.message = 'Confirmed!';
				this.modalRef.hide();
				this.toastr.success('Cessão cancelada');
				this.formRazaoCancelamento.reset();
				this.page = 0
				this.filtrar();
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
