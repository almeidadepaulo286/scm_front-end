import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ConciliacaoService } from 'app/_services/conciliacao.service';
import { ToastrService } from 'ngx-toastr';
import { faFileDownload, faHandshake } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: "app-conciliacao",
	templateUrl: "./conciliacao.component.html",
	styleUrls: ["./conciliacao.component.css"]
})
export class ConciliacaoComponent implements OnInit {

	// Font Awesome Icon
	faLongArrowAltLeft = faFileDownload;
	faHandshake = faHandshake;

	// CNPJ do usuário logado
    cnpjUser;

	// Modal
	modalRef: BsModalRef;
	idModal: number;
	
	// Page
    title: string = 'Conciliação';
    ultimaConciliacao: string = '10/10/2020';
	
    // Tabela Cabeçalho
	headElements = [
		'Data da Conciliação',
		'Status',
		'Qtd. Tentativas',
		''
    ];
	
	// Tabela Dados
	data;
	res = [];
	postData;
	registroVazio;
	
	// Data da Ultima conciliação
	dataUltimaConciliacao;
	dataDiferenca;

	// Paginação
	currentPage = 1;
	page: number = 0;
	pages: Array<number>;
	totalPages: number;
	totalRegistros;
	
		constructor(private modalService: BsModalService, private conciliacaoService: ConciliacaoService, private toastr: ToastrService,) {}

    ngOnInit(){
		// GET LOCALSTORAGE PERFIL
		const user = localStorage.getItem('currentUser');
		const cnpjUser = JSON.parse(user).cnpj;
        // this.userPerfil = perfis[0].perfilId;
		this.cnpjUser = cnpjUser;

		// GET CONCILIACÕES LIST
		this.getConciliacoes();
		this.getDataUltimaConciliacao();
	}

	getConciliacoes(){
		this.conciliacaoService.findAll(this.cnpjUser, this.page).subscribe((res) => {
			this.data = res.content;
			// console.log(res)
			this.data.length == 0 ? this.registroVazio = true : this.registroVazio = false
			this.pages = new Array(res.totalPages);
			this.totalPages = res.totalPages;
			this.totalRegistros = res.totalElements;
			// console.log(res)
		}), (err) => {

		};
	}

	getDataUltimaConciliacao(){
		this.conciliacaoService.getDataUltimaConciliacao(this.cnpjUser).subscribe((res) => {
			this.dataUltimaConciliacao = res.dataUltimaConciliacao;
			
			if(this.dataUltimaConciliacao == null) {
				return
			}
			const past = new Date(this.dataUltimaConciliacao);
			const now = new Date();
			const diff = Math.abs(now.getTime() - past.getTime()); // Subtrai uma data pela outra
			const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
			this.dataDiferenca = days - 1;
		}, (err) => {
		});
	}
	
	postConciliar(){
		const dataFormatada = new Date(this.res[0].dataReferencia);
		// const dia = dataFormatada.getDate();
		// const mes = ((dataFormatada.getMonth() + 1) < 10 ? '0' : '') + (dataFormatada.getMonth() + 1);
		// const ano = dataFormatada.getFullYear();
		// const dataFinal = `${ano}-${mes}-${dia}`;

		// Valor fixado
		let tipoAtivoCCB = 1;

		this.postData = {
			dataReferencia: this.res[0].dataReferencia,
			tipoAtivo: tipoAtivoCCB,
			cnpjDetentor: this.res[0].cnpjDetentor,
			quantidadeDevedores: (<HTMLInputElement>document.querySelector('#qtdDevedores')).value,
			quantidadeParcelasRegistradasAtivas: (<HTMLInputElement>document.querySelector('#qtdParcelas')).value,
			saldoParcelasRegistradasAtivas: (<HTMLInputElement>document.querySelector('#saldoParcelas')).value,
		};
		
		// Close Modal
		this.modalRef.hide();

		this.conciliacaoService.conciliar(this.postData).subscribe((res) => {
			// console.log(res)
			this.toastr.success('Conciliação enviado com sucesso!')
		}, (err) => {
			// console.log(err)
			this.toastr.error(`${err.error.message}`)
		});
	}
	
	openModal(template: TemplateRef<any>, id: number) {
		this.modalRef = this.modalService.show(
			template,
			Object.assign({}, {class: 'modal-lg modal-dialog-centered'})
		);
		this.idModal = id;

		this.res = [{
			dataReferencia: `${this.data[id].dataReferencia}`,
			tipoAtivo: this.data[id].tipoAtivo = 1 ? 'CCB' : '', // Faz parte do valor fixado
			cnpjDetentor: this.data[id].cnpjDetentor,
			quantidadeDevedores: this.data[id].quantidadeDevedores,
			quantidadeParcelasRegistradasAtivas: this.data[id].quantidadeParcelasRegistradasAtivas,
			saldoParcelasRegistradasAtivas: this.data[id].saldoParcelasRegistradasAtivas,
		}];
	}

	setPage(i, event: any) {
		this.page = i - 1;
		this.getConciliacoes();
	}

	pageChanged(event: any): void {
		this.page = event.page - 1;
		this.getConciliacoes();
	}
}