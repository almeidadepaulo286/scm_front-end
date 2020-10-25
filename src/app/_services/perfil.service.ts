import { Injectable } from '@angular/core';
import { Perfil } from '../_models/perfil';
import { Observable, of } from 'rxjs/index';
import { ApiResponse } from '../_models/api.response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseEntity } from 'app/_models/ResponseEntity';
import { environment } from '../../environments/environment';
// FIXME Mock da API
import * as dataPerfil from 'app/data/perfil.json';

@Injectable()
export class PerfilService {

    perfis : Perfil[] = (dataPerfil as any).default.retorno;

    baseUrl: string = environment.baseUrl + '/api/Perfis/'

    constructor(private http: HttpClient) {}

    getPerfilById(id: number): Observable<Perfil> {
      const perfil : Perfil = this.perfis.find(perf => perf.id == id);

      return of(perfil);
    }

    listarPerfis():Observable<Perfil[]>{
      const perfis = (dataPerfil as any).default.retorno;

      return of(perfis);
    }

}