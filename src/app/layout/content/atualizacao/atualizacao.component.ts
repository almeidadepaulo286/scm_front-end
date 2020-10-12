import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AtualizacaoService } from 'app/_services/atualizacao.service';
import { ToastrService } from 'ngx-toastr';
import { faFileDownload, faHandshake, faSyncAlt, faCheck, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder } from '@angular/forms';

@Component({
	selector: "app-atualizacao",
	templateUrl: "./atualizacao.component.html",
	styleUrls: ["./atualizacao.component.css"]
})
export class AtualizacaoComponent implements OnInit {
	// Font Awesome Icon
	faLongArrowAltLeft = faFileDownload;
	faHandshake = faHandshake;
	faSyncAlt = faSyncAlt;
	faCheck = faCheck;
	faPen = faPen;
	faTimes = faTimes;  

	// CNPJ do usuário logado
	cnpjUser;

	// Modal
	modalRef: BsModalRef;
	idModal: number;

	// Page
	title: string = 'Atualização Contrato/Parcela';

	// Tabela Cabeçalho
	headElements = [
		'Nº Parcela',
		'Vencimento',
		'Motivo Movimentação',
		'Valor Liquidado',
		'Valor Parcela Atualizado'
	];

	statusParcela = [
		{label: '', value: ''},
		{label: 'Pagamento Total', value: '1'},
		{label: 'Pagamento Parcial', value: '2'},
		{label: 'Prejuízo', value: '3'}
	];

	// Filtro
	registrosFiltro = this.fb.group({
		contrato: [''],
		cnpjOriginador: [''],
		dataInicial: [''],
		dataFinal: [''],
	});

	// Tabela Dados
	data;
	res = [];
	postData;
	// data;

	// Checkboxes
	boxes;
	boxCheckAll;

	// Filtro Parcelas
	dataFilter;
	dataParcelas;
	dataParcelasNaoEncontrado = false;

	// Cloned Parcelas
	clonedParcelas: { [s: string]: any; } = {};


	constructor(private modalService: BsModalService, private atualizacaoService: AtualizacaoService, private fb: FormBuilder, private toastr: ToastrService) { }

	ngOnInit() {
		// GET LOCALSTORAGE PERFIL
		const user = localStorage.getItem('currentUser');
		const cnpjUser = JSON.parse(user).cnpj;
		// this.userPerfil = perfis[0].perfilId;
		this.cnpjUser = cnpjUser;
	}

	// Selecionar todas as parcelas
	checkAll() {
		this.boxes = document.getElementsByTagName("input");
		this.boxCheckAll = document.getElementById("checkAllInput");

		let x = 0;
		for (x ; x < this.boxes.length; x++) {
			this.boxCheckAll.checked == true ? this.boxes[x].checked = true : this.boxes[x].checked = false
		}
	}

	// Filtro de resultados
	filtrarResultados(){
		let dataInicial = (<HTMLInputElement>document.querySelector('#dataInicial')).value
		let dataFinal = (<HTMLInputElement>document.querySelector('#dataFinal')).value
		let codigoContrato = (<HTMLInputElement>document.querySelector('#codigoContrato')).value
		let cnpjOriginador = (<HTMLInputElement>document.querySelector('#cnpjOriginador')).value

		if(codigoContrato == '' || cnpjOriginador == '' || codigoContrato == null || cnpjOriginador == null){
			this.toastr.warning('Preencha todos os campos')
			return
		}
		
		if(dataInicial > dataFinal){
			this.toastr.warning('Data inicial não pode ser maior que a data final')
			return
		}

		let cpfSplited = cnpjOriginador.split('.').join('');
			cpfSplited = cpfSplited.split('/').join('');
			cpfSplited = cpfSplited.split('-').join('');
			cnpjOriginador = cpfSplited;

		this.atualizacaoService.findAllParcelas(codigoContrato, cnpjOriginador, dataInicial, dataFinal)
			.subscribe(
				(res) => {
					this.dataParcelasNaoEncontrado = false;
					this.dataFilter = res.data
					let { parcelas } = this.dataFilter

					this.dataParcelas = parcelas.map((item, index) => {
						item.id = index
						return item
					});
					// console.log(res)
				}, (err) => {
					this.dataFilter = null;
					this.dataParcelas = null;

					this.dataParcelasNaoEncontrado = true;
				}
			)
		}


		onRowEditInit(dataParcela: any) {
			this.clonedParcelas[dataParcela.id] = {...dataParcela};
		}

		onRowEditSave(dataParcela: any) {
			if (dataParcela.status_parcela == 2 && (dataParcela.valor_parcela == null || dataParcela.valor_parcela <= 0)) {
				delete this.clonedParcelas[dataParcela.id];
				this.toastr.error("Preencha todos os campos, 'valor parcela atualizado' não preenchido.")
				return
			}
			// else if(dataParcela.status_parcela != 2 && (dataParcela.valor_principal_parcela == null || dataParcela.valor_principal_parcela < 0)){
			// 	delete this.clonedParcelas[dataParcela.id];
			// 	this.toastr.error("Preencha todos os campos, 'valor parcela' não preenchido.")
			// 	return
			// }
			else {
				delete this.clonedParcelas[dataParcela.id];
				let codigoContrato = (<HTMLInputElement>document.querySelector('#codigoContrato')).value
				let parcelasFinal = {
					data_vencimento_parcela: this.dataParcelas[dataParcela.id].data_vencimento_parcela,
					id_registro_contrato: codigoContrato,
					id_registro_parcela: `${this.dataParcelas[dataParcela.id].id_registro_parcela}`,
					motivo_movimentacao: `${this.dataParcelas[dataParcela.id].status_parcela}`,
					valor_liquidado: this.dataParcelas[dataParcela.id].valor_principal_parcela,
					valor_parcela_atualizado: this.dataParcelas[dataParcela.id].valor_parcela
				}
				this.atualizacaoService.atualizar(parcelasFinal).subscribe(
					(res) =>{
						// console.log(res)
						this.toastr.success('Parcela Atualizada')
					},(err) => {
						// console.log(err)
						this.toastr.error('Não foi possível atualizar a parcela')
					}
				)
			}
		}
	
		onRowEditCancel(dataParcela: any, index: number) {
			this.dataParcelas[index] = this.clonedParcelas[dataParcela.id];
			delete this.clonedParcelas[dataParcela.id];
		}
}