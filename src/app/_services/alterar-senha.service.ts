import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { LocalService } from './local.service';
import { ResponseEntity } from 'app/_models/ResponseEntity';
import { ApiResponse } from "../_models/api.response";
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' }) 
export class AlterarSenhaService {
	
	// URLs EndPoints
    baseUrlTrocarSenha: string = environment.baseUrlUser+'usuarios';

	// Construtor
    constructor(
		private router: Router,
		private http: HttpClient,
		private localService: LocalService
	){}

	// Cancelar Cessão
	atualizarSenha(nova_senha, cpf): Observable<ApiResponse>{
		return this.http.put<ApiResponse>(
            this.baseUrlTrocarSenha, 
            {
                nova_senha,
                cpf
            }
		)
    }
}