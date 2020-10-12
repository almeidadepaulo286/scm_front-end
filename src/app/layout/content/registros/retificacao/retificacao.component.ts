import { Component, TemplateRef, OnInit } from "@angular/core";
import { FormArray, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Solicitacao } from "../solicitacao";
import { RegistroService } from "../registro.service";
import { faPlus, faMinus, faArrowRight, faEye } from "@fortawesome/free-solid-svg-icons";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { defineLocale } from "ngx-bootstrap/chronos";
import { ptBrLocale } from "ngx-bootstrap/locale";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: "app-retificacao-registro",
    templateUrl: "./retificacao.component.html",
    styleUrls: ["./retificacao.component.css"]
})
export class RetificacaoRegistroComponent implements OnInit {

	solicitacaoRegistro;
    title = "Correção";
    formSolictRegistro: FormGroup;
    formFiltro: FormGroup;
    faPlus = faPlus;
    faMinus = faMinus;
	faArrowRight = faArrowRight;
	faEye = faEye

    // Mascara cpf cnpj:
    pureResult: any;
    maskedId: any;
    garantiaIndex: any;
    parcelaIndex: any;
    credorIndex: any;
    devedorIndex: any;

    arrayCredores: any = [];
    arrayDevedores: any = [];
    arrayGarantias: any = [];
    arrayParcelas: any = [];

    validaDadosAgente: boolean = false;
    validaDadosContrato: boolean = false;
    validaCredor: boolean = false;
    validaDevedor: boolean = false;
    validaGarantias: boolean = false;
	validaParcelas: boolean = false;

	showHide = true

	// Modal
	modalRef: BsModalRef;
	config = {
		ignoreBackdropClick: true,
		class: 'modal-sm modal-dialog-centered'
	};
	configUpload = {
		ignoreBackdropClick: false,
		class: 'modal-md modal-dialog-centered'
	};
	motivoError = false;

	// Upload
	submitted = false
	formImport: FormGroup
    fileToUpload: File = null
    fileName = '';

    constructor(
        private formBuilder: FormBuilder,
        private registroService: RegistroService,
        private localeService: BsLocaleService,
        private toastr: ToastrService,
		private router: Router, 
		private route: ActivatedRoute,
		private modalService: BsModalService
    ) {
        // define o idioma do calendario:
        defineLocale("portugues", ptBrLocale);
        this.localeService.use("portugues");
    }

    ngOnInit() {
		this.createForm()
		this.createFormUploadFile()
		this.getSolicitacaoRegistroPorId()
	}

	// Registro
	getSolicitacaoRegistroPorId(): void {
		this.registroService.getRegistro(+this.route.snapshot.paramMap.get('id')).subscribe(
		  r => {
			this.solicitacaoRegistro = r.data
			this.setForm(this.solicitacaoRegistro);
			// console.log(r.data)
		  }
		);
	}

	createFormUploadFile(){
		this.formImport = this.formBuilder.group({
            importFile: ['', Validators.required]
        })
	}

	createForm() {
		this.formSolictRegistro = this.formBuilder.group({
			motivo_alteracao: ['', Validators.required],

            agentes: this.formBuilder.group({
                originador_cnpj: [{value: '', disabled: true}, Validators.required],
                detentor_carteira: ['', Validators.required],
                detentor_cnpj: [{value: '', disabled: true}, Validators.required],
                garantidor_tipo_pessoa: ['', Validators.required],
                garantidor_numero_documento: ['', Validators.required],
                garantidor_cep: ['', Validators.required],
                beneficiario_tipo_pessoa: ['', Validators.required],
                beneficiario_numero_documento: ['', Validators.required],
                beneficiario_banco_credito: ['', Validators.required],
                beneficiario_agencia_credito: ['', Validators.required],
                beneficiario_conta_corrente_credito: ['', Validators.required],

                credores: this.formBuilder.array([]),
                devedores: this.formBuilder.array([])
            }),

            contrato_valores: this.formBuilder.group({
                codigo_modalidade_operacao_credito: ['', Validators.required],
                codigo_sub: ['', Validators.required],
                codigo_contrato_operacao_credito: [{value: '', disabled: true}, Validators.required],
                data_transacao: ['', Validators.required],
                data_contrato_sistema_IF: ['', Validators.required],
                valor_total_credito: ['', Validators.required],
                valor_liquido_credito: ['', Validators.required],
                indexacao: ['', Validators.required],
                taxa_juros_operacao: ['', Validators.required],
                quantidade_parcela_contratada: ['', Validators.required],
				tipo_ativo: [{value: '', disabled: true}, Validators.required],
				
				data_liquidacao: ['', Validators.required],
        		identificacao_operacao: ['', Validators.required],
            }),

            garantias: this.formBuilder.array([]),
            parcelas: this.formBuilder.array([])
		});
	}
	
	setForm(data) {
		if(data.indexacao === 'pre') data.indexacao = 1
		if(data.indexacao === 'di') data.indexacao = 2
		if(data.indexacao === 'selic') data.indexacao = 3
		if(data.indexacao === 'ipca') data.indexacao = 4
		if(data.indexacao === 'igpm') data.indexacao = 5

		this.formSolictRegistro = this.formBuilder.group({
			motivo_alteracao: ['', Validators.required],
			
            agentes: this.formBuilder.group({
                originador_cnpj: [data.agentes.originador_cnpj, Validators.required],
                detentor_carteira: [data.agentes.detentor_carteira, Validators.required],
                detentor_cnpj: [data.agentes.detentor_cnpj, Validators.required],
                garantidor_tipo_pessoa: [data.agentes.garantidor_tipo_pessoa, Validators.required],
                garantidor_numero_documento: [data.agentes.garantidor_numero_documento, Validators.required],
                garantidor_cep: [data.agentes.garantidor_cep, Validators.required],
                beneficiario_tipo_pessoa: [data.agentes.beneficiario_tipo_pessoa, Validators.required],
                beneficiario_numero_documento: [data.agentes.beneficiario_numero_documento, Validators.required],
                beneficiario_banco_credito: [data.agentes.beneficiario_banco_credito, Validators.required],
                beneficiario_agencia_credito: [data.agentes.beneficiario_agencia_credito, Validators.required],
                beneficiario_conta_corrente_credito: [data.agentes.beneficiario_conta_corrente_credito, Validators.required],

                credores: this.formBuilder.array([
                    // this.formBuilder.group({
                    // 	credor_tipo_pessoa: ["", Validators.required],
                    // 	credor_numero_documento: ["", Validators.required],
                    // 	id: [""],
                    // })
				]),

                devedores: this.formBuilder.array([
                    // this.formBuilder.group({
                    // 	devedor_tipo_pessoa: ["", Validators.required],
                    // 	devedor_numero_documento: ["", Validators.required],
                    // 	devedor_cep: ["", Validators.required],
                    // 	devedor_numero_celular: ["", Validators.required],
                    // 	devedor_email: ["", Validators.required],
					// 	id: [""],
                    // })
				])
            }),

            contrato_valores: this.formBuilder.group({
                codigo_modalidade_operacao_credito: [data.contrato_valores.codigo_modalidade_operacao_credito, Validators.required],
                codigo_sub: [data.contrato_valores.codigo_sub, Validators.required],
                codigo_contrato_operacao_credito: [data.contrato_valores.codigo_contrato_operacao_credito, Validators.required],
                data_transacao: [new Date(data.contrato_valores.data_transacao), Validators.required],
                data_contrato_sistema_IF: [new Date(data.contrato_valores.data_contrato_sistema_IF), Validators.required],
                valor_total_credito: [data.contrato_valores.valor_total_credito, Validators.required],
                valor_liquido_credito: [data.contrato_valores.valor_liquido_credito, Validators.required],
                indexacao: [data.contrato_valores.indexacao, Validators.required],
                taxa_juros_operacao: [data.contrato_valores.taxa_juros_operacao, Validators.required],
                quantidade_parcela_contratada: [data.contrato_valores.quantidade_parcela_contratada, Validators.required],
				tipo_ativo: [1, Validators.required],
				
				data_liquidacao: [data.data_liquidacao, Validators.required],
        		identificacao_operacao: [data.identificacao_operacao, Validators.required],
            }),

            garantias: this.formBuilder.array([
                // this.formBuilder.group({
                // 	tipo_garantia: ["", Validators.required],
                // 	garantia_valor_bem_originacao: ["", Validators.required],
                // 	documento_bem_garantia: ["", Validators.required],
                // 	documento_detentor: ["", Validators.required],
                // 	garantia_placa: ["", Validators.required],
                // 	garantia_chassi: ["", Validators.required],
                // 	sng_num_gravame: ["", Validators.required],
                // 	sng_data_inclusao: ["", Validators.required],
                // 	referencia: ["", Validators.required],
                // 	codigo_veiculo: ["", Validators.required],
				// 	apolice_seguro: ["", Validators.required]
				
				// "id_garantia": 0,
				// "id_garantia_ativo": 0,

                // })
			]),

            parcelas: this.formBuilder.array([
                // this.formBuilder.group({
                // 	codigo_controle_parcela_contrato_if: ["", Validators.required],
                // 	data_vencimento_parcela: [
                // 		"",
                // 		Validators.required
                // 	],
                // 	valor_parcela: ["", Validators.required],
                // 	valor_principal_parcela: ["", Validators.required],
                // 	numero_parcela: ["", Validators.required],
                // 	status: ["", Validators.required]
                // })
			])
		});
		
		this.arrayCredores = data.agentes.credores
		this.arrayDevedores = data.devedores
		this.arrayGarantias = data.garantias
		this.arrayParcelas = data.parcelas

		const dataCredores = data.agentes.credores;
		dataCredores.map(item => {
			this.credores.push(
				this.formBuilder.group({
					credor_tipo_pessoa: [item.credor_tipo_pessoa, Validators.required],
					credor_numero_documento: [item.credor_numero_documento, Validators.required],
					id: [item.id],
				})
			)
		});
			
		const dataDevedores = data.agentes.devedores;
		dataDevedores.map(item => {
			this.devedores.push(
				this.formBuilder.group({
					devedor_cep: [item.devedor_cep, Validators.required],
					devedor_email: [item.devedor_email, Validators.required],
					devedor_numero_celular: [item.devedor_numero_celular, Validators.required],
					devedor_numero_documento: [`${item.devedor_numero_documento}`, Validators.required],
					devedor_tipo_pessoa: [item.devedor_tipo_pessoa, Validators.required],
					id: [item.id],
				})
			)
		});

		const dataGarantias = data.garantias;
		dataGarantias.map(item => {
			this.garantias.push(
				this.formBuilder.group({
					tipo_garantia: ['veiculo', Validators.required],
					garantia_valor_bem_originacao: [item.garantia_valor_bem_originacao, Validators.required],
					documento_bem_garantia: [item.documento_bem_garantia, Validators.required],
					documento_detentor: [item.documento_detentor, Validators.required],
					garantia_placa: [item.garantia_placa, Validators.required],
					garantia_chassi: [item.garantia_chassi, Validators.required],
					sng_num_gravame: [item.sng_num_gravame, Validators.required],
					sng_data_inclusao: [new Date(item.sng_data_inclusao), Validators.required],
					referencia: [item.referencia, Validators.required],
					codigo_veiculo: [item.codigo_veiculo, Validators.required],
					apolice_seguro: [item.apolice_seguro, Validators.required],
					id_garantia: [item.id_garantia, Validators.required],
					id_garantia_ativo: [item.id_garantia_ativo, Validators.required],
				})
			)
		});

		const dataParcelas = data.parcelas;
		dataParcelas.map(item => {

			let disableInput = false
			if(item.status != 1 && item.status != 3){
				disableInput = true 
			}

			this.parcelas.push(
				this.formBuilder.group({
					codigo_controle_parcela_contrato_if: [{value: item.codigo_controle_parcela_contrato_if, disabled: true}, Validators.required],
					data_vencimento_parcela: [{value: item.data_vencimento_parcela, disabled: disableInput}, Validators.required],
					valor_parcela: [{value: item.valor_parcela, disabled: disableInput}, Validators.required],
					valor_principal_parcela: [{value: item.valor_principal_parcela, disabled: disableInput}, Validators.required],
					numero_parcela: [{value: item.numero_parcela, disabled: true}, Validators.required],
					status: [{value: item.status, disabled: disableInput}, Validators.required],
					status_parcela_id_f: [item.status],
					id_registro_parcela: [item.id_registro_parcela]
				})
			)
		});
	}

    get agentes() {
        return this.formSolictRegistro.get("agentes") as FormGroup;
	}
	
	get contrato_valores() {
        return this.formSolictRegistro.get("contrato_valores") as FormGroup;
    }

    get garantias() {
        return this.formSolictRegistro.get("garantias") as FormArray;
    }

    get parcelas() {
        return this.formSolictRegistro.get("parcelas") as FormArray;
    }

    get credores() {
        return this.formSolictRegistro.get("agentes").get("credores") as FormArray;
    }

    get devedores() {
        return this.formSolictRegistro.get("agentes").get("devedores") as FormArray;
	}

	get f() {
        return this.formImport.controls
    }

	addGarantia() {
		const garantia = this.formSolictRegistro.get("garantias") as FormArray;
		garantia.push(this.formBuilder.group({
			tipo_garantia: ['', Validators.required],
			garantia_valor_bem_originacao: ['', Validators.required],
			documento_bem_garantia: ['', Validators.required],
			documento_detentor: ['', Validators.required],
			garantia_placa: ['', Validators.required],
			garantia_chassi: ['', Validators.required],
			sng_num_gravame: ['', Validators.required],
			sng_data_inclusao: ['', Validators.required],
			referencia: ['', Validators.required],
			codigo_veiculo: ['', Validators.required],
			apolice_seguro: ['', Validators.required],
			id_garantia: [''],
			id_garantia_ativo: [''],
		}))
	}

	addParcela() {
		const parcela = this.formSolictRegistro.get("parcelas") as FormArray;
		parcela.push(this.formBuilder.group({
			codigo_controle_parcela_contrato_if: [''],
			data_vencimento_parcela: ["", Validators.required],
			valor_parcela: ["", Validators.required],
			valor_principal_parcela: ["", Validators.required],
			numero_parcela: ["", Validators.required],
			status_parcela: ["", Validators.required],
			status: ["", Validators.required],
			status_parcela_id_f: [null],
			id_registro_parcela: ['']
		}))
	}

	addCredor() {
		const credor = this.formSolictRegistro.get("agentes").get("credores") as FormArray;
		credor.push(this.formBuilder.group({
			credor_tipo_pessoa: ["", Validators.required],
			credor_numero_documento: ["", Validators.required],
			id: [''],
		}))	
	}

	addDevedor() {
		const devedor = this.formSolictRegistro.get("agentes").get("devedores") as FormArray;
		devedor.push(this.formBuilder.group({
			devedor_tipo_pessoa: ["", Validators.required],
			devedor_numero_documento: ["", Validators.required],
			devedor_cep: ["", Validators.required],
			devedor_numero_celular: ["", Validators.required],
			devedor_email: ["", Validators.required],
			id: [''],
		}))
	}

	removeDevedor(index) {
		this.devedores.removeAt(index)
	}
	
	removeCredor(index) {
		this.credores.removeAt(index)
	}

	removeGarantia(index) {
		this.garantias.removeAt(index)
	}

	removeParcela(index) {
		this.parcelas.removeAt(index)
	}

	validaArrays(){
		// if(this.credores.length < 1){this.validaCredor = true;}
		if(this.devedores.length < 1){this.validaDevedor = true;}
		if(this.garantias.length < 1){this.validaGarantias = true;}
		if(this.parcelas.length < 1){this.validaParcelas = true;}
	}

	validaMotivo(){
		if(this.formSolictRegistro.value.motivo_alteracao.trim() == ''){
			this.motivoError = true; 
			return true
		}else{
			return false
		}
	}

	onSubmit() {
		this.validaArrays()
		// if(this.validaCredor) {this.toastr.warning('Adicione pelo menos um Credor'); return};
		if(this.validaDevedor) {this.toastr.warning('Adicione pelo menos um Devedor'); return};
		if(this.validaGarantias) {this.toastr.warning('Adicione pelo menos uma Garantia'); return};
		if(this.validaParcelas) {this.toastr.warning('Adicione pelo menos um Parcela'); return};
		this.cadastraNovoRegistro(this.formSolictRegistro.getRawValue()); // getRawValue() get all the values of form including disabled controls 
	}

	cadastraNovoRegistro(solicitacao): void {
		this.registroService.corrigirRegistro(solicitacao, this.route.snapshot.paramMap.get('id')).subscribe(
			ok => {
				this.toastr.success('Correção efetuada com sucesso!');
				this.router.navigate(['/registros']);
			},
			erro => {
				this.toastr.error('Não foi possível realizar a correção!');
			}
		);
	}

	// Modal de Confirmação
	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template, this.config);
	}

	openModalUpload(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template, this.configUpload);
	}

	confirm(): void {
		if(this.validaMotivo() == true){ return }
		this.modalRef.hide();
		this.onSubmit();
	}
	 
	decline(): void {
		this.modalRef.hide();
	}

	changeStatusToCanceled(dataCanceledAPI, dataNewAPI){
		let dataOld = this.solicitacaoRegistro.parcelas
		let dataCanceled = dataCanceledAPI
		let dataNew = dataNewAPI
		let dataFinal;

		// console.log(dataOld)

		dataCanceled.map(item => {
			dataOld = dataOld.filter(function(obj){
				return obj.codigo_controle_parcela_contrato_if != item.codigo_controle_parcela_contrato_if
			})
		})

		dataFinal = [...dataOld, ...dataCanceled, ...dataNew]

		// console.log('OLD: ', dataOld)
		// console.log('TRASH: ', dataCanceled)
		// console.log('NEW: ', dataNew)
		// console.log('FINAL: ', dataFinal)

		for(let i = this.parcelas.length; i > 0; i--){
			this.parcelas.removeAt(0)
		}

		dataCanceled.map(item => {
			this.parcelas.push(
				this.formBuilder.group({
					codigo_controle_parcela_contrato_if: [{value: item.codigo_controle_parcela_contrato_if, disabled: true}, Validators.required],
					data_vencimento_parcela: [{value: item.data_vencimento_parcela, disabled: true}, Validators.required],
					valor_parcela: [{value: item.valor_parcela, disabled: true}, Validators.required],
					valor_principal_parcela: [{value: item.valor_principal_parcela, disabled: true}, Validators.required],
					numero_parcela: [{value: item.numero_parcela, disabled: true}, Validators.required],
					status: [{value: item.status, disabled: true}, Validators.required],
					status_parcela_id_f: [item.status],
					id_registro_parcela: [item.id_registro_parcela]
				})
			)
		})

		dataOld.map(item => {
			this.parcelas.push(
				this.formBuilder.group({
					codigo_controle_parcela_contrato_if: [{value: item.codigo_controle_parcela_contrato_if, disabled: true}, Validators.required],
					data_vencimento_parcela: [{value: item.data_vencimento_parcela, disabled: true}, Validators.required],
					valor_parcela: [{value: item.valor_parcela, disabled: true}, Validators.required],
					valor_principal_parcela: [{value: item.valor_principal_parcela, disabled: true}, Validators.required],
					numero_parcela: [{value: item.numero_parcela, disabled: true}, Validators.required],
					status: [{value: item.status, disabled: true}, Validators.required],
					status_parcela_id_f: [item.status],
					id_registro_parcela: [item.id_registro_parcela]
				})
			)
		})

		dataNew.map(item => {
			this.parcelas.push(
				this.formBuilder.group({
					codigo_controle_parcela_contrato_if: [item.codigo_controle_parcela_contrato_if, Validators.required],
					data_vencimento_parcela: [item.data_vencimento_parcela, Validators.required],
					valor_parcela: [item.valor_parcela, Validators.required],
					valor_principal_parcela: [item.valor_principal_parcela, Validators.required],
					numero_parcela: [item.numero_parcela, Validators.required],
					status: [item.status, Validators.required],
					status_parcela_id_f: [item.status],
					id_registro_parcela: [item.id_registro_parcela]
				})
			)
		})
	}

	// Upload Arquivo CSV
	import(): void {
        this.submitted = true
		if(this.formImport.controls.importFile.value == '') { return }
		const data = { file: this.fileToUpload }
        this.registroService.updateParcelaCSV(data, this.route.snapshot.paramMap.get('id')).subscribe(
            (res: any) => {
				// console.log(res)
				this.changeStatusToCanceled(res.parcelasCancelar, res.parcelasNovas)
				this.modalRef.hide();
				this.toastr.info('Parcelas carregadas com sucesso!');
            },
            err => {
				this.modalRef.hide();
				this.toastr.error('Não foi possível carregar o arquivo de parcelas!');
                // console.log(err)
            }
        )
	}
	onFileChange(files: FileList) {
        this.fileName = files[0].name
		this.fileToUpload = files.item(0)
	}

	showHideParcelas(){
		this.showHide == false ? this.showHide = true : this.showHide = false
	}
}
