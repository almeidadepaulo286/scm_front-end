import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { LocalService } from './local.service';
import { ResponseEntity } from 'app/_models/ResponseEntity';
import { ApiResponse } from "../_models/api.response";
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' }) 
export class CessaoService {
	
	// URLs EndPoints
    baseRegistrosUrl: string = environment.baseUrl+'cerc/cessao/page';
    baseDetalhesCessaoUrl: string = environment.baseUrl+'cerc/cessao/detalhe';
    baseRegistrosUrlFiltered: string = environment.baseUrl + 'cerc/cessao/pagefiltered';
    baseRegistrosUrlCessionarioFiltered: string = environment.baseUrl + 'cerc/cessao/pagecessionariofiltered';
    baseCessaoFile: string = environment.baseUrl + 'cerc/cessao/json';
    baseCessaoLiberar: string = environment.baseUrl+'cerc/cessao/liberar';
	baseCessaoAceitarTodos: string = environment.baseUrl+'cerc/cessao/aceitar-todos';
	baseAceitarTodasParcelas: string = environment.baseUrl+'cerc/cessao/aceite-todos';
	baseCessaoCancelar: string = environment.baseUrl+'cerc/cessao/cancelar';
	baseCessaoSuspender: string = environment.baseUrl+'cerc/cessao/suspender';
	baseListaCnab: string = environment.baseUrl+'cerc/registros/lista-nomes-cnab';
	baseDownloadCnab: string = environment.baseUrl+'cerc/registros/download-cnab';

	// Construtor
    constructor(
		private router: Router,
		private http: HttpClient,
		private localService: LocalService
	){}
	
	// Encontra todos os resultados
    findAll(): Observable<ResponseEntity> {        
		return this.http.get<ResponseEntity>(this.baseRegistrosUrl);
    }
	
	// Filtra os resultados com base na pesquisa de cessoes do usuario como detentor
    findAllFiltered(
		page: string,
		linesPerPage: string,
		cnpjCessionaria: string,
		codigoTermoCessao: string,
		dataIni: string,
		dataFim: string,
		status: string,
		): Observable<ResponseEntity> {
			
			let params = new HttpParams();
			// params = params.append('cnpjOriginador', cnpjOriginador);
			params = params.append('cnpj_cessionaria', cnpjCessionaria);
			params = params.append('codigo_termo_cessao', codigoTermoCessao);
			params = params.append('data_fim', dataFim);
			params = params.append('data_ini', dataIni);
			params = params.append('page', page);
			params = params.append('linesPerPage', linesPerPage);
			params = params.append('status', status);
			
			return this.http.get<any>(
				this.baseRegistrosUrlFiltered, { params: params }
				);
			}

	// Filtra os resultados com base na pesquisa de cessoes do usuario como cessionario
    findAllCessionarioFiltered(
		page: string,
		linesPerPage: string,
		cnpjDetentor: string,
		codigoTermoCessao: string,
		dataIni: string,
		dataFim: string,
		status: string,
		): Observable<ResponseEntity> {
			
			let params = new HttpParams();
			params = params.append('cnpj_detentor', cnpjDetentor);
			params = params.append('codigo_termo_cessao', codigoTermoCessao);
			params = params.append('data_fim', dataFim);
			params = params.append('data_ini', dataIni);
			params = params.append('page', page);
			params = params.append('linesPerPage', linesPerPage);
			params = params.append('status', status);
			
			return this.http.get<any>(
				this.baseRegistrosUrlCessionarioFiltered, { params: params }
				);
			}

	// Retorna os dados da Cessão 
	getDetalhesCessao(codigoTermoCessao, codigoContratoOperacaoCredito, idCessao): Observable<ResponseEntity> {
		return this.http.get<ResponseEntity>(this.baseDetalhesCessaoUrl+'/'+codigoTermoCessao+'/'+codigoContratoOperacaoCredito+'/'+idCessao);
	}

	aceitarTodasParcelas(codigo_contrato_operacao_credito, codigo_termo_cessao, originador_cnpj){
		return this.http.put<ApiResponse>(
			this.baseAceitarTodasParcelas,
			{
				codigo_contrato_operacao_credito,
				codigo_termo_cessao,
				originador_cnpj
			}
		)
	}

	// Libera Cessão
	liberarCessao(codigo_contrato_operacao_credito, codigo_termo_cessao, originador_cnpj){
		return this.http.put<ApiResponse>(
			this.baseCessaoLiberar, 
			{
				codigo_contrato_operacao_credito,
				codigo_termo_cessao,
				originador_cnpj
			}
		)
	}

	// Suspender Cessão
	suspenderCessao(codigo_termo_cessao){
		return this.http.put<ApiResponse>(
			this.baseCessaoSuspender,
			{
				codigo_termo_cessao
			}
		)
	}

	// Cancelar Cessão
	cancelarCessao(codigo_termo_cessao){
		return this.http.put<ApiResponse>(
			this.baseCessaoCancelar, {codigo_termo_cessao}
		)
	}
	cancelarCessao2(codigo_termo_cessao, razao_cancelamento){
		return this.http.put<ApiResponse>(
			`${this.baseCessaoCancelar}/${codigo_termo_cessao}`, { razao_cancelamento }
		)
	}


	// Retorna arquivo JSON para download
	getJsonFile(codigoTermoCessao): Observable<Blob>{
		let urlFile = this.baseCessaoFile+'/'+codigoTermoCessao+'/';
		const blob = new Blob([(<any>Response)._body], { type: 'application/json' });
		return this.http.get( urlFile, { responseType: 'blob' } )
	}

	// Lista de CNABs
	getListaCnab(): Observable<ResponseEntity>{
		return this.http.get<ResponseEntity>(this.baseListaCnab);
	}

	// Download do arquivo CNAB
	getDownloadCnab(fileName): Observable<ResponseEntity>{
		console.log(this.baseDownloadCnab+'/'+fileName);
		return this.http.get<ResponseEntity>(this.baseDownloadCnab+'/'+fileName);
	}
}
