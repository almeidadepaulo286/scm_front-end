import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ResponseEntity } from 'app/_models/ResponseEntity';
import { environment } from '../../environments/environment';
import { ApiResponse } from 'app/_models';

@Injectable({ providedIn: 'root' }) 
export class AtualizacaoService {
	
	// URLs EndPoints
    baseUrlAtualizar: string = environment.baseUrlAtualizacao+'/parcela/atualizar';
    baseUrlParcelas: string = environment.baseUrl+'cerc/registros/ativo';

	// Construtor
    constructor(
		private http: HttpClient,
	){}
	
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
    }

    // Concilia
    atualizar(atualizacao): Observable<any> {
        return this.http.put<any>(
            this.baseUrlAtualizar,
            atualizacao,
            this.httpOptions
        );
    }

    // Encontra todos as parcelas filtradas
    findAllParcelas(codigoContrato, cnpjOriginador, dataInicial, dataFinal): Observable<ResponseEntity> {   
        return this.http.get<ResponseEntity>(this.baseUrlParcelas+'/'+cnpjOriginador+'/'+codigoContrato+'?dataIni='+dataInicial+'&dataFim='+dataFinal);
  }
}
