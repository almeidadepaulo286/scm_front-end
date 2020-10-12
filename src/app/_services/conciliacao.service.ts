import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { LocalService } from './local.service';
import { ResponseEntity } from 'app/_models/ResponseEntity';
import { ApiResponse } from "../_models/api.response";
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' }) 
export class ConciliacaoService {
	
	// URLs EndPoints
    baseUrl: string = environment.baseUrlConciliacao+'/listar/conciliar';
    baseUrlConciliar: string = environment.baseUrlConciliacao+'/conciliar';
    baseUrUltimaConciliacao: string = environment.baseUrlConciliacao+'/ultima/conciliar';

	// Construtor
    constructor(
		private http: HttpClient,
	){}
	
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
    }

	// Encontra todos os resultados
    findAll(cnpjUser, page): Observable<ResponseEntity> {   
		return this.http.get<ResponseEntity>(
            this.baseUrl+'/'+cnpjUser+'?page='+page
        );
    }

    // Conciliar
    conciliar(conciliacao): Observable<any> {
        return this.http.post<any>(
            this.baseUrlConciliar,
            conciliacao,
            this.httpOptions
        );
    }

    // Verificar data da última Conciliação
    getDataUltimaConciliacao(cnpjUser): Observable<any> {
        return this.http.get<any>(this.baseUrUltimaConciliacao+'/'+cnpjUser);
    }
}
