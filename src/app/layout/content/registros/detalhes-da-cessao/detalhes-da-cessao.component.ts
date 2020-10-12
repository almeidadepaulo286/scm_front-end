import { Component, OnInit, TemplateRef } from '@angular/core';
import { faFilter, faSearch, faFileDownload, faCheck, faBan, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Registro } from '../registro';
import { CessaoService } from 'app/_services/cessao.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ResponseEntity } from 'app/_models/ResponseEntity';


@Component({
	selector: 'app-detalhes-cessao',
	templateUrl: './detalhes-da-cessao.component.html',
	styleUrls: ['./detalhes-da-cessao.component.css']
})
export class DetalhesCessaoComponent implements OnInit {
    // CNPJ do usuário logado
    cnpjUser: number;
    
    // Modal
    modalRef: BsModalRef;

    // Título da página
    title = 'Detalhes da Cessão';

    // Icones
    faAddressCard = faSearch;
    faFilter = faFilter;
    faFileDownload = faFileDownload;
    faCheck = faCheck;
    faBan = faBan;
    faTimes = faTimes;
    
    // Paginas e Paginação
	page: number = 0;
    pages: Array<number>;
    
    // Filtro
    filtro: boolean;
	filterShow = true;
    
    // Model
	registros: Registro[];

    // Parametros URL
    codigoTermoCessao: string;
    codigoContratoOperacaoCredito: string;
    idCessao: string;

    // API Get response
    detalhesCessao: any;
    detalhesParcela: any;
    downloadLink: any;
    valida: boolean = false;

    // User Perfil
    userPerfil;

    // CNAB
    listaCnab;
    fileName;
    urlDownloadCnab: string = '';

    headParcelas = [
		'Cód. Contrato',
		'Nº da Parcela',
		'Valor da Parcela',
        'Data de Vencimento',
        'Status'
    ];

    // Construtor
	constructor(
		private cessaoService: CessaoService,
        private route: ActivatedRoute,
        private modalService: BsModalService,
        private toastr: ToastrService
	){}
    
    // Retorna parametros da URL
    getParams(){
        this.codigoTermoCessao = this.route.snapshot.paramMap.get('codtc');
        this.codigoContratoOperacaoCredito = this.route.snapshot.paramMap.get('codcoc');
        this.idCessao = this.route.snapshot.paramMap.get('id');
    }

	// Inicia página
	ngOnInit() {
        this.getDetalhes();
        this.getListaCnab();

        // GET LOCALSTORAGE PERFIL
		const user = localStorage.getItem('currentUser');
		const cnpjUser = JSON.parse(user).cnpj;
        // this.userPerfil = perfis[0].perfilId;
        this.cnpjUser = cnpjUser;
    }
    
    // Liberar Cessão
    confirmLiberar(){
        this.getParams();
        this.cessaoService.liberarCessao(this.codigoContratoOperacaoCredito, this.codigoTermoCessao, this.detalhesCessao.originador_cnpj)
            .subscribe((res) => {
                this.toastr.info(`Cessão ${this.codigoTermoCessao} liberada`);
                document.location.reload(true);
            },
            (err) => {
                this.toastr.warning('Não foi possível realizar a operação, tente novamente mais tarde');
                console.log(err)
            })
    }

    // Cancelar Cessão
    confirmCancelar(){
        this.getParams();
        this.cessaoService.cancelarCessao(this.codigoTermoCessao)
            .subscribe((res) => {
                this.toastr.info(`Cessão ${this.codigoTermoCessao} cancelada`);
                document.location.reload(true);                
            },
            (err) => {
                this.toastr.warning('Não foi possível realizar a operação, tente novamente mais tarde');
                // console.log(err)
            })
    }

    // Suspender Cessão 
    confirmSuspender(){
        this.getParams();
        this.cessaoService.suspenderCessao(this.codigoTermoCessao)
            .subscribe((res) => {
                this.toastr.info(`Cessão ${this.codigoTermoCessao} suspensa`);
                document.location.reload(true);
            },
            (err) => {
                this.toastr.warning('Não foi possível realizar a operação, tente novamente mais tarde');
                // console.log(err)
            })
    }

    // Liberar Download arquivo Json
    download(){
        this.getParams();
        this.cessaoService.getJsonFile(this.codigoTermoCessao).subscribe(res => {
            const url = window.URL.createObjectURL(res);
            this.downloadLink = window.URL.createObjectURL(res);
            window.open(url);
            
            // let anchor = (<HTMLElement>document.querySelector('.teste'));
            // anchor.setAttribute('download', url);
            
            // anchor.href = data.downloadUrl;
            // anchor.target = '_blank';
            // anchor.download = data.fileName;
            // anchor.click();
            
            // const url = window.URL.createObjectURL(res);
        })
    }

    // Recupera Detalhes da Cessão
    getDetalhes(){
        this.getParams();
        this.cessaoService.getDetalhesCessao(this.codigoTermoCessao, this.codigoContratoOperacaoCredito, this.idCessao).subscribe(res => {
            this.detalhesCessao = res.data;
            this.detalhesParcela = res.data.parcelas;
        })
    }

    // Lista CNAB
    getListaCnab(){
        this.cessaoService.getListaCnab()
            .subscribe((res) => {
                this.listaCnab = res;
            }, (err) => {
                // console.log(err);
            }
        )
    }

    // Download CNAB
    getDownloadCnab(fileName){
        this.cessaoService.getDownloadCnab(fileName)
            .subscribe((res) => {
                // console.log(fileName);
                // console.log(res);
                this.urlDownloadCnab = String(res);
                window.open(this.urlDownloadCnab, '_blank');
            }, (err) => {
                console.log(err);
            }
        )
    }

    aceitarTodasParcelas(){
        this.getParams();
        this.cessaoService.aceitarTodasParcelas(this.codigoContratoOperacaoCredito, this.codigoTermoCessao, this.detalhesCessao.originador_cnpj)
            .subscribe((res) => {
                this.toastr.info('Todas as parcelas foram aceitas');
                document.location.reload(true);
            },
            (err) => {
                this.toastr.warning('Não foi possível realizar a operação, tente novamente mais tarde');
                // console.log(err)
            })
    }

    // Modal
    suspenderModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }
    liberarModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }
    cancelarModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }
}