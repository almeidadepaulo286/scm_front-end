import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { LocalService } from "app/_services/local.service";
import { ResponseEntity } from "app/_models/ResponseEntity";
import { Solicitacao } from "./solicitacao";
import { Cessao } from './cessao';
import { environment } from 'environments/environment';
import { ApiResponse } from 'app/_models';

@Injectable({ providedIn: "root" })
export class RegistroService {
	baseRegistrosCancelar: string = environment.baseUrl + "cerc/registros/cancelar";
	baseRegistrosUrl: string = environment.baseUrl + "cerc/registros/page";
	baseRegistrosUrlFiltered: string = environment.baseUrl + "cerc/registros/pagefiltered";
	baseRegistrosUrlPorId: string = environment.baseUrl + "cerc/registros/";
	baseSolcRegUrl: string = environment.baseUrl + "cerc/solicitacoes/protocolo/";
	baseSolcRegUrlPorId: string = environment.baseUrl + "cerc/solicitacoes/";
	baseRegUrlSolicitar: string = environment.baseUrl + "cerc/registros/solicitar-registro";
	baseRegUrlDisponibilizar: string = environment.baseUrl + "cerc/cessao/ceder-todos";
	baseCarteiras: string = environment.baseUrl + 'cerc/registros/lista-carteiras';
	baseRegUrlCorrigir: string = environment.baseUrl + 'cerc/registros/update-registro';
	baseRegUrlUpdateParcelaCSV: string = environment.baseUrl + 'cerc/parcela/from-csv';

	constructor(
		private http: HttpClient,
		private localService: LocalService
	){}


	getRegistro(id: number): Observable<ResponseEntity> {
		return this.http.get<ResponseEntity>(this.baseRegistrosUrlPorId + id);
	}

	findAll(page: number): Observable<ResponseEntity> {
		return this.http.get<ResponseEntity>(
			this.baseRegistrosUrl + "?page=" + page
		);
	}

	findAllFiltered(
		page: string,
		cnpjOriginador: string,
		// cnpjCredor: string,
		dataIni: string,
		dataFim: string,
		carteira: string,
		contrato: string
	): Observable<ResponseEntity> {

		let params = new HttpParams();
		params = params.append('page', page);
		params = params.append('cnpjOriginador', cnpjOriginador);
		// params = params.append('cnpjCredor', cnpjCredor);
		params = params.append('dataIni', dataIni);
		params = params.append('dataFim', dataFim);
		params = params.append('carteira', carteira);
		params = params.append('contrato', contrato);

		return this.http.get<ResponseEntity>(
			this.baseRegistrosUrlFiltered, { params: params }
		);
	}

	getSolicitacoesRegistro(protocolo: String): Observable<ResponseEntity> {
		return this.http.get<ResponseEntity>(this.baseSolcRegUrl + protocolo);
	}

	getSolicitacoesRegistroPorId(id: String): Observable<ResponseEntity> {
		return this.http.get<ResponseEntity>(this.baseSolcRegUrlPorId + id);
	}

	solicitarRegistro(novaSolicit: Solicitacao): Observable<ResponseEntity> {
		return this.http.post<ResponseEntity>(
			this.baseRegUrlSolicitar,
			novaSolicit
		);
	}

	corrigirRegistro(novaSolicit: Solicitacao, id): Observable<ResponseEntity> {
		return this.http.post<any>(
			`${this.baseRegUrlCorrigir}/${id}`,
			novaSolicit
		);
	}

	// Disponibilizar
	disponibilizar(objeto): Observable<ResponseEntity> {
		return this.http.post<ResponseEntity>(
			this.baseRegUrlDisponibilizar,
			objeto
		);
	}

	// Retornar Carteiras
	getCarteiras(): Observable<ResponseEntity>{
		return this.http.get<ResponseEntity>(this.baseCarteiras);
	}

	// Cancelar Registro
	cancelarRegistro(codigoContratoOperacaoCredito, razao_cancelamento): Observable<ApiResponse>{
		return this.http.put<ApiResponse>(
			`${this.baseRegistrosCancelar}/${codigoContratoOperacaoCredito}`, { razao_cancelamento }
		)
	}

	// Upload Arquivo CSV
	updateParcelaCSV(data: any, idRegistro) {
        let formData: FormData = new FormData()
        formData.append('file', data.file)
        // let headers = new HttpHeaders({
		// 	'Content-Type': 'multipart/form-data',
		// })
		
        return this.http.put(
            `${this.baseRegUrlUpdateParcelaCSV}/${idRegistro}`, formData
        )
    }
}
