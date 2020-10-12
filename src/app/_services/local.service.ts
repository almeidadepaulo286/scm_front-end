//<imports>
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PerfilMenu } from '../_models/perfilmenu';
import { Observable, of } from "rxjs/index";
import { ApiResponse } from "../_models/api.response";
import { environment } from '../../environments/environment';

//</imports>

@Injectable()
export class LocalService {

	public http: HttpClient;

	constructor() {}
	
	// DEV
	// public baseUrl: string = "https://api-ccb-service-dot-cerc-ccb-dev.appspot.com/";
	// public baseUrlUser: string = "https://api-user-service-dot-cerc-ccb-dev.appspot.com/";
	// private baseMenuUrl: string = this.baseUrl + 'menus';
	// private baseAuthUrl: string = this.baseUrl + 'auth/generate-token';

	// PROD
	// public baseUrl: string = "https://api-ccb-service-v1-dot-cerc-ccb-prd-01.appspot.com/"
	// public baseUrlUser: string = "https://api-user-service-v1-dot-cerc-ccb-prd-01.appspot.com/"
	private baseMenuUrl: string = environment.baseUrl + 'menus';
	private baseAuthUrl: string = environment.baseUrl + 'auth/generate-token';

	private results = [];

	salvarPerfilMenu(perfilmenu: PerfilMenu): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(this.baseMenuUrl, perfilmenu);
	}

	auth(documento, password): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(this.baseAuthUrl, { "documento": documento, "password": password });
	}
}

