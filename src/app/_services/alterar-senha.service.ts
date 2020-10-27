import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ResponseEntity } from 'app/_models/ResponseEntity';
import { ApiResponse } from '../_models/api.response';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AlterarSenhaService {

	// URLs EndPoints
    baseUrlTrocarSenha: string = environment.baseUrl + 'scm/usuarios';

	// Construtor
    constructor(private router: Router, private http: HttpClient) {}

	// Cancelar Cessão
	atualizarSenha(novaSenha, cpf): Observable<ApiResponse>{
		return this.http.put<ApiResponse>(
            this.baseUrlTrocarSenha,
            {
                novaSenha,
                cpf
            }
		)
    }
}