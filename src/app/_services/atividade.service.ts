import './local.service';
import { Injectable } from '@angular/core';
import {Atividade} from "../_models/atividade";
import {Observable, of} from "rxjs/index";
import {ApiResponse} from "../_models/api.response";
import { HttpClient, HttpParams } from '@angular/common/http';
import { LocalService } from '../_services/local.service';
import { ResponseEntity } from 'app/_models/ResponseEntity';
import { environment } from '../../environments/environment';
//FIXME Mock da API
import * as dados from 'app/data/atividade.json';
import * as dadosDisciplinas from 'app/data/disciplina.json';

@Injectable()
export class AtividadeService {

    baseAtividadeUrl: string = environment.baseUrlUser+'atividades';
    baseUrl: string = environment.baseUrl+'scm/atividade/'
    baseNewAtividade: string = environment.baseNewUser+'scm/atividade/'
    
    constructor(private http: HttpClient, private localService: LocalService){ }

    getAtividades() : Observable<ApiResponse> {
      return this.http.get<ApiResponse>(this.baseAtividadeUrl);
    }
    getAtividadeById(atividadeId: number): Observable<ApiResponse> {
      return this.http.get<ApiResponse>(this.baseAtividadeUrl + "/getById/" + String(atividadeId));
    }
    //TODO:
    getAtividadeByDocumento(documento:number): Observable<ResponseEntity> {
      return this.http.get<ResponseEntity>(this.baseAtividadeUrl + "/" + documento);
    }
    createAtividade(atividade: Atividade): Observable<ApiResponse> {
      return this.http.post<ApiResponse>(this.baseAtividadeUrl, atividade);
    }
    updateAtividade(atividadeId:number, atividade: Atividade): Observable<ApiResponse> {
      return this.http.put<ApiResponse>(this.baseAtividadeUrl + "/" + String(atividadeId), atividade); 
    }
    deletarAtividade(atividadeId: number): Observable<ApiResponse> {
      return this.http.delete<ApiResponse>(this.baseAtividadeUrl + "/" + String(atividadeId));
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
      //   `${this.baseNewAtividade}listar-por-filtro/`, { params: params }
      // )
      return of((dados as any).default);
    }

    listarDisciplinas():Observable<any>{
      //FIXME Mock da API
      // return this.http.get<any>(
      //   `${this.baseNewAtividade}listar-disciplinas`
      // )
      return of((dadosDisciplinas as any).default);
    }

    criarAtividade(formAtividade): Observable<any>{
      return this.http.post<any>(
        this.baseNewAtividade,
        formAtividade
      )
    }

    getActivityById(activityId): Observable<any>{
      //FIXME Mock da API
      // return this.http.get<any>(
      //   this.baseNewAtividade + activityId
      // )

      return of((dados as any).default.content[activityId-1]);
    }

    updateActivity(activity): Observable<any>{
      return this.http.put<any>(
        this.baseNewAtividade, activity
      )
    }
}