import { Component, OnInit } from '@angular/core';
import { Arquivo } from './arquivo';
import { ARQUIVOS } from './mock';
import { ArquivoService } from './arquivo.service';
import { NgxMaskModule } from 'ngx-mask';

@Component({
	selector: 'arquivos',
	templateUrl: './arquivos.component.html',
	styleUrls: ['./arquivos.component.css']
})
export class ArquivosComponent implements OnInit {

	title = 'Arquivos';
	arquivos = ARQUIVOS;

	headElements = [
		'ID',
		'Sequencial',
		'Tipo Solicitação',
		'Data Emissão Mov.',
		'Nº Apólice',
		'Nº Endosso',
		'Nº Endosso Associado',
		'Limite Max. Garantia',
		'Prêmio Emitido BRL',
		'Custo Aquisição',
		'Total Tom. Grupo Econômico',
		'Total Cosseguro',
		'Total Resseguro',
		'Total Broker',
	];

	constructor(private arquivoService: ArquivoService) { }

	ngOnInit() {
		this.getArquivos();
	}

	getArquivos(): void {
		this.arquivoService.getArquivos()
			.subscribe(arquivos => this.arquivos = arquivos);
	}

	selectedArquivo: Arquivo;
	onSelect(arquivo: Arquivo): void {
		this.selectedArquivo = arquivo;
		// console.log(this.selectedArquivo);
	}

}
