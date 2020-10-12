import { Component, TemplateRef, OnInit } from "@angular/core";
import { FormArray, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RegistroService } from "../registro.service";
import { faPlus, faMinus, faArrowRight, faEye } from "@fortawesome/free-solid-svg-icons";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { defineLocale } from "ngx-bootstrap/chronos";
import { ptBrLocale } from "ngx-bootstrap/locale";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
	selector: "app-incluir-solicitacao-registro",
	templateUrl: "./incluir-solicitacao-registro.component.html",
	styleUrls: ["./incluir-solicitacao-registro.component.css"]
})
export class IncluirSolicitacaoRegistroComponent implements OnInit {

	solicitacaoRegistro;
    title = "Solicitação de Inclusão de Ativo";
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
    ) {
        // define o idioma do calendario:
        defineLocale("portugues", ptBrLocale);
        this.localeService.use("portugues");
    }

    ngOnInit() {
		this.createForm()
		this.createFormUploadFile()
	}

	createFormUploadFile(){
		this.formImport = this.formBuilder.group({
            importFile: ['', Validators.required]
        })
	}

	createForm() {
		this.formSolictRegistro = this.formBuilder.group({
			motivo_alteracao: [''],

            agentes: this.formBuilder.group({
                originador_cnpj: ['', Validators.required],
                detentor_carteira: ['', Validators.required],
                detentor_cnpj: ['', Validators.required],
                garantidor_tipo_pessoa: [''],
                garantidor_numero_documento: [''],
                garantidor_cep: [''],
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
                codigo_contrato_operacao_credito: ['', Validators.required],
                data_transacao: ['', Validators.required],
                data_contrato_sistema_IF: ['', Validators.required],
                valor_total_credito: ['', Validators.required],
                valor_liquido_credito: ['', Validators.required],
                indexacao: ['', Validators.required],
                taxa_juros_operacao: ['', Validators.required],
                quantidade_parcela_contratada: ['', Validators.required],
				tipo_ativo: ['', Validators.required],
				
				data_liquidacao: [''],
        		identificacao_operacao: [''],
            }),

            garantias: this.formBuilder.array([]),
            parcelas: this.formBuilder.array([])
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
			referencia: [''],
			codigo_veiculo: [''],
			apolice_seguro: [''],
			id_garantia: [''],
			id_garantia_ativo: [''],
		}))
	}

	addParcela() {
		const parcela = this.formSolictRegistro.get("parcelas") as FormArray;
		parcela.push(this.formBuilder.group({
			codigo_controle_parcela_contrato_if: ['', Validators.required],
			data_vencimento_parcela: ["", Validators.required],
			valor_parcela: ["", Validators.required],
			valor_principal_parcela: ["", Validators.required],
			numero_parcela: ["", Validators.required],
			// status_parcela: ["", Validators.required],
			status: ["", Validators.required],
			status_parcela_id_f: [null],
			id_registro_parcela: ['']
		}))
	}

	addCredor() {
		const credor = this.formSolictRegistro.get("agentes").get("credores") as FormArray;
		credor.push(this.formBuilder.group({
			// credor_tipo_pessoa: ["", Validators.required],
			// credor_numero_documento: ["", Validators.required],
			// id: [''],
			credor_tipo_pessoa: [""],
			credor_numero_documento: [""],
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
		if(this.devedores.length < 1){
			this.validaDevedor = true;
		}else { this.validaDevedor = false; }
		if(this.garantias.length < 1){
			this.validaGarantias = true;
		}else { this.validaGarantias = false }
		if(this.parcelas.length < 1){
			this.validaParcelas = true;
		}else { this.validaParcelas = false }
	}

	onSubmit() {
		if(!this.formSolictRegistro.valid){
			this.toastr.warning('Campos com * são obrigatórios, preencha todos os campos');
			return
		}else{
			this.validaArrays()
			// if(this.validaCredor) {this.toastr.warning('Adicione pelo menos um Credor'); return};
			if(this.validaDevedor) {this.toastr.warning('Adicione pelo menos um Devedor'); return};
			if(this.validaGarantias) {this.toastr.warning('Adicione pelo menos uma Garantia'); return};
			if(this.validaParcelas) {this.toastr.warning('Adicione pelo menos um Parcela'); return};
			this.cadastraNovoRegistro(this.formSolictRegistro.getRawValue()); // getRawValue() get all the values of form including disabled controls 
		}
	}

	cadastraNovoRegistro(solicitacao): void {
		this.registroService.solicitarRegistro(solicitacao).subscribe(
			ok => {
				this.toastr.success('Registro realizado com sucesso!');
				this.router.navigate(['/registros']);
			},
			err => {
				const error = err.error.errors
				error.map((item) => {
					this.toastr.error(item.detalhe);
		
				})
				// this.toastr.error('Não foi possível incluir o registro!');
			}
		);
	}
}

