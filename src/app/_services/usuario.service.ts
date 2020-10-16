import './local.service';
import { Injectable } from '@angular/core';
import {Usuario} from "../_models/usuario";
import {Observable, of} from "rxjs/index";
import {ApiResponse} from "../_models/api.response";
import { HttpClient, HttpParams } from '@angular/common/http';
import { LocalService } from '../_services/local.service';
import { ResponseEntity } from 'app/_models/ResponseEntity';
import { environment } from '../../environments/environment';
//FIXME Mock da API
import * as dados from 'app/data/usuario.json';
import * as dadosPerfis from 'app/data/perfil.json';

@Injectable()
export class UsuarioService {

    baseUsuarioUrl: string = environment.baseUrlUser+'usuarios';
    baseUrl: string = environment.baseUrl+'cerc/usuario/'
    baseNewUser: string = environment.baseNewUser+'cerc/usuario/'
    
    constructor(private http: HttpClient, private localService: LocalService){ }

    getUsuarios() : Observable<ApiResponse> {
      return this.http.get<ApiResponse>(this.baseUsuarioUrl);
    }
    getUsuarioById(usuarioId: number): Observable<ApiResponse> {
      return this.http.get<ApiResponse>(this.baseUsuarioUrl + "/getById/" + String(usuarioId));
    }
    //TODO:
    getUsuarioByDocumento(documento:number): Observable<ResponseEntity> {
      return this.http.get<ResponseEntity>(this.baseUsuarioUrl + "/" + documento);
    }
    createUsuario(user: Usuario): Observable<ApiResponse> {
      return this.http.post<ApiResponse>(this.baseUsuarioUrl, user);
    }
    updateUsuario(usuarioId:number, user: Usuario): Observable<ApiResponse> {
      return this.http.put<ApiResponse>(this.baseUsuarioUrl + "/" + String(usuarioId), user); 
    }
    deletarUsuario(usuarioId: number): Observable<ApiResponse> {
      return this.http.delete<ApiResponse>(this.baseUsuarioUrl + "/" + String(usuarioId));
    }

    getUsuariosFiltered(login, email, idPerfil, nome, page, pageSize, ativo) : Observable<any>{
      let params = new HttpParams();

      if(login){ params = params.append('login', login) }
      if(email){ params = params.append('email', email) }
      if(idPerfil){ params = params.append('idPerfil', idPerfil) }
      if(nome){ params = params.append('nome', nome) }
      if(ativo != "" && ativo != null){ params = params.append('ativo', ativo) }

      params = params.append('page', page)
      params = params.append('pageSize', pageSize)

      //FIXME Mock da API
      // return this.http.get<any>(
      //   `${this.baseNewUser}listar-por-filtro/`, { params: params }
      // )
      return of((dados as any).default);
    }

    listarPerfis():Observable<any>{
      //FIXME Mock da API
      // return this.http.get<any>(
      //   `${this.baseNewUser}listar-perfis`
      // )
      return of((dadosPerfis as any).default);
    }

    criarUsuario(formUsuario): Observable<any>{
      return this.http.post<any>(
        this.baseNewUser,
        formUsuario
      )
    }

    getUserById(userId): Observable<any>{
      //FIXME Mock da API
      // return this.http.get<any>(
      //   this.baseNewUser + userId
      // )

      return of((dados as any).default.content[userId-1]);
    }

    updateUser(user): Observable<any>{
      return this.http.put<any>(
        this.baseNewUser, user
      )
    }
}