import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ArquivosService} from 'app/_services/arquivos.service';

// Icone
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { ApiResponse } from 'app/_models';

@Component({
	selector: 'consultar',
	templateUrl: './consultar.component.html',
	styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

	constructor(public router: Router, private fb: FormBuilder, private arquivoService: ArquivosService) { }

	title = 'Arquivos';

	// Icone
	faFilter = faFilter;

	// Form
	direction = 'ASC';
	linesPerPage = '20';
	orderBy: String = 'id';
	page: Number = 0;
	result;
	resultContent;

	// Loggedin user
	cnpjUser;

	registroVazio;

	// Filtro
	filterShow = true;
	toggleFilter() {
		this.filterShow = !this.filterShow;
	}

	// Tabela Cabeçalho
	headElements = [
		'Nome do Arquivo',
		'Data de Solicitação',
		'Data Início do Registro',
		'Data Fim do Registro',
		'Status'
	];

	registrosFiltro = this.fb.group({
		nomeArquivo: [''],
		situacaoLote: [''],
		dataInicio: [''],
		dataFim: [''],
	});

	onSubmit() {
		this.getArquivos();
	}

	filtrar() {
		// console.log(this.registrosFiltro.value);
	}

	ngOnInit() {

		// GET LOCALSTORAGE PERFIL
		const user = localStorage.getItem('currentUser');
		const cnpjUser = JSON.parse(user).cnpj;
		this.cnpjUser = cnpjUser;

		// GET LIST OF FILES
		this.getArquivos();
	}

	// GET FILTER VALUES
	getFilterValues(){
		// GET FILTER INPUT VALUES 
		this.direction = (<HTMLInputElement>document.querySelector('#directionInput')).value;
		this.linesPerPage = (<HTMLInputElement>document.querySelector('#linesPerPageInput')).value;
	}

	getArquivos(){
		this.getFilterValues();
		this.arquivoService.getArquivos(this.direction, this.linesPerPage, this.orderBy, this.page)
		.subscribe(
			(res) => {
				this.result = res;
				this.resultContent = this.result.content;
				this.resultContent.length == 0 ? this.registroVazio = true : this.registroVazio = false
				// console.log(this.resultContent);
			},
			(err) => {
				// console.log(err);
			}
		)
	}
}
