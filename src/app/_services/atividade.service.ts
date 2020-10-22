import { Injectable } from '@angular/core';
import {Atividade} from "../_models/atividade";
import {Observable, of} from "rxjs/index";
import {ApiResponse} from "../_models/api.response";
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseEntity } from 'app/_models/ResponseEntity';
import { environment } from '../../environments/environment';
//FIXME Mock da API
import * as dados from 'app/data/atividade.json';
import * as dadosDisciplinas from 'app/data/disciplina.json';

@Injectable()
export class AtividadeService {

    baseUrl: string = environment.baseUrl + 'scm/atividade/'
    
    constructor(private http: HttpClient){ }

    getAtividades() : Observable<ApiResponse> {
      return this.http.get<ApiResponse>(this.baseUrl);
    }
    getAtividadeById(atividadeId: number): Observable<ApiResponse> {
      return this.http.get<ApiResponse>(this.baseUrl + "/getById/" + String(atividadeId));
    }
    //TODO:
    getAtividadeByDocumento(documento:number): Observable<ResponseEntity> {
      return this.http.get<ResponseEntity>(this.baseUrl + "/" + documento);
    }
    createAtividade(atividade: Atividade): Observable<ApiResponse> {
      return this.http.post<ApiResponse>(this.baseUrl, atividade);
    }
    updateAtividade(atividadeId:number, atividade: Atividade): Observable<ApiResponse> {
      return this.http.put<ApiResponse>(this.baseUrl + "/" + String(atividadeId), atividade); 
    }
    deletarAtividade(atividadeId: number): Observable<ApiResponse> {
      return this.http.delete<ApiResponse>(this.baseUrl + "/" + String(atividadeId));
    }

    getAtividadesFiltered(codigo, prefixo, idDisciplina, page, pageSize) : Observable<any>{
      let params = new HttpParams();

      if(codigo){ params = params.append('codigo', codigo) }
      if(prefixo){ params = params.append('prefixo', prefixo) }
      if(idDisciplina){ params = params.append('idDisciplina', idDisciplina) }

      params = params.append('page', page)
      params = params.append('pageSize', pageSize)

      //FIXME Mock da API
      // return this.http.get<any>(
      //   `${this.baseUrl}listar-por-filtro/`, { params: params }
      // )
      return of((dados as any).default);
    }

    listarDisciplinas():Observable<any>{
      //FIXME Mock da API
      // return this.http.get<any>(
      //   `${this.baseUrl}listar-disciplinas`
      // )
      return of((dadosDisciplinas as any).default);
    }

    criarAtividade(formAtividade): Observable<any>{
      return this.http.post<any>(
        this.baseUrl,
        formAtividade
      )
    }

    getActivityById(activityId): Observable<any>{
      //FIXME Mock da API
      // return this.http.get<any>(
      //   this.baseUrl + activityId
      // )

      return of((dados as any).default.content[activityId-1]);
    }

    updateActivity(activity): Observable<any>{
      return this.http.put<any>(
        this.baseUrl, activity
      )
    }
}