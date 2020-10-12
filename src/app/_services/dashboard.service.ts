import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' }) 
export class DashboardService {
	
	// URLs EndPoints
    baseDashboardUrl: string = environment.baseUrl+'cerc/dashboard/contagem';
	// Construtor
    constructor(
		private http: HttpClient,
	){}
	
	// Encontra todos os resultados
    getValues(): Observable<any> {        
		return this.http.get<any>(this.baseDashboardUrl);
	}
	
	getFilteredValues(cnpjDetentor){
		return this.http.get<any>(`${this.baseDashboardUrl}?cnpjDetentor=${cnpjDetentor}`)
	}

}
