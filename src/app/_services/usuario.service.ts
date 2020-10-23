import { Injectable } from '@angular/core';
import {Usuario} from "../_models/usuario";
import {Perfil} from "../_models/perfil";
import {Observable, of} from "rxjs/index";
import {ApiResponse} from "../_models/api.response";
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseEntity } from 'app/_models/ResponseEntity';
import { environment } from '../../environments/environment';
//FIXME Mock da API
import * as dados from 'app/data/usuario.json';
import * as dadosPerfis from 'app/data/perfil.json';

@Injectable()
export class UsuarioService {

  baseUrl: string = environment.baseUrl + '/usuarios/'
     
    constructor(private http: HttpClient) {}

    getUsuarios() : Observable<ApiResponse> {
      return this.http.get<ApiResponse>(this.baseUrl);
    }
    
    getUsuarioById(usuarioId: number): Observable<Usuario> {
      //FIXME return this.http.get<ApiResponse>(this.baseUrl + "/getById/" + String(usuarioId));
      //console.log("vai chamar a api: " + this.baseUrl + usuarioId);
      return this.http.get<Usuario>(this.baseUrl + usuarioId);
    }

    getUsuarioByLogin(login : string): Observable<ResponseEntity> {
      return this.http.get<ResponseEntity>(this.baseUrl + "?login=" + login);
    }
    createUsuario(user: Usuario): Observable<ApiResponse> {
      return this.http.post<ApiResponse>(this.baseUrl, user);
    }
    updateUsuario(usuarioId:number, user: Usuario): Observable<ApiResponse> {
      return this.http.put<ApiResponse>(this.baseUrl + "/" + String(usuarioId), user); 
    }
    deletarUsuario(usuarioId: number): Observable<ApiResponse> {
      return this.http.delete<ApiResponse>(this.baseUrl + "/" + String(usuarioId));
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
      //   `${this.baseUrl}listar-por-filtro/`, { params: params }
      // )
      return of((dados as any).default);
    }

    listarPerfis():Observable<Perfil[]>{
      //FIXME 
      return this.http.get<Perfil[]>( environment.baseUrl + '/perfis/');
    }

    criarUsuario(formUsuario): Observable<Usuario>{
      return this.http.post<Usuario>(
        this.baseUrl, 
        formUsuario
      )
    }

    updateUser(formUsuario): Observable<Usuario>{
      return this.http.put<Usuario>(
        this.baseUrl + formUsuario.id, 
        formUsuario
      )
    }

    getUserById(userId): Observable<any>{
      //FIXME Mock da API
      // return this.http.get<any>(
      //   this.baseUrl + userId
      // )

      return of((dados as any).default.content[userId-1]);
    }
}