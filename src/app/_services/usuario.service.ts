import { Injectable } from '@angular/core';
import {Usuario} from '../_models/usuario';
import {Observable, of} from 'rxjs/index';
import {ApiResponse} from '../_models/api.response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseEntity } from 'app/_models/ResponseEntity';
import { environment } from '../../environments/environment';
import { Perfil } from '../_models/perfil';
import { PerfilService } from 'app/_services/perfil.service';
// FIXME Mock da API
import * as dataUsuario from 'app/data/usuario.json';

@Injectable()
export class UsuarioService {

    usuarios : Usuario[] = (dataUsuario as any).default.retorno;

    baseUrl: string = environment.baseUrl + '/api/Usuarios/'

    constructor(private http: HttpClient,
                private perfilService: PerfilService) {}

    getUsuarioById(id: number): Observable<Usuario> {
      const usuario : Usuario = this.usuarios.find(user => user.id == id);

      return of(usuario);
    }

    cadastrarUsuario(stUsuario : any): Observable<Usuario>{
      const maxId = this.usuarios.reduce((a, b) => a.id > b.id ? a : b).id;

      const newUser = new Usuario()
      newUser.id = (maxId) ? (maxId + 1) : 1
      newUser.nome = stUsuario.nome
      newUser.login = stUsuario.login
      newUser.email = stUsuario.email
      newUser.senha = stUsuario.senha
      newUser.situacao = stUsuario.situacao
      newUser.listaPerfil = stUsuario.listaPerfil
      newUser.dataInclusao = new Date()

      /* associa perfis:
      if (Array.isArray(stUsuario.listaPerfil) && stUsuario.listaPerfil.length > 0) {
        const idPerfil: number = stUsuario.listaPerfil[0]
        this.perfilService.getPerfilById(idPerfil).subscribe(
          (ret) => {
              const perfil: Perfil = ret
              if (ret) {
                newUser.listaPerfil = [ perfil ]
              }
          })
      }*/

      this.usuarios.push(newUser)

      return of(newUser)
    }

    updateUsuarioById(id: number, stUsuario: any): Observable<Usuario> {
      const usuario : Usuario = this.usuarios.find(user => user.id == id);
      if (usuario) {
          usuario.nome = stUsuario.nome
          usuario.login = stUsuario.login
          usuario.email = stUsuario.email
          usuario.situacao = stUsuario.situacao
          usuario.listaPerfil = stUsuario.listaPerfil
          usuario.dataAlteracao = new Date()

          /* associa perfis:
          if (Array.isArray(stUsuario.listaPerfil) && stUsuario.listaPerfil.length > 0) {
            const idPerfil: number = stUsuario.listaPerfil[0]
            this.perfilService.getPerfilById(idPerfil).subscribe(
              (ret) => {
                  const perfil: Perfil = ret
                  if (ret) {
                      usuario.listaPerfil = [ perfil ]
                  }
              })
          }*/
      }

      return of(usuario);
    }

    resetPassUsuarioById(id: number): Observable<Usuario> {
      const usuario : Usuario = this.usuarios.find(user => user.id == id);
      if (usuario) {
        usuario.senha = '1234'
      }

      return of(usuario);
    }

    cancelUsuarioById(id: number): Observable<Usuario> {
      const usuario : Usuario = this.usuarios.find(user => user.id == id);
      if (usuario) {
        usuario.situacao = 0
      }

      return of(usuario);
    }

    findUsuariosFiltered(nome: string,
                         login: string,
                         email: string,
                         idPerfil: number,
                         situacao: number,
                         page: string,
                         pageSize: string,
                         sort: string,
                         sortDirection: string) : Observable<ResponseEntity>{

        const listUsuarios : Usuario[] = this.usuarios.filter(user => (!nome || user.nome.toUpperCase().includes(nome.toUpperCase()))
                                                                   && (!login || user.login.toUpperCase().includes(login.toUpperCase()))
                                                                   && (!email || user.email.toUpperCase().includes(email.toUpperCase()))
                                                                   && (!situacao || user.situacao == situacao)
                                                                   && (!idPerfil || user.listaPerfil.find(role => role.id == idPerfil)));
        const respUsuarios : ResponseEntity = new ResponseEntity()
        respUsuarios.status = 0
        respUsuarios.mensagem = null
        respUsuarios.retorno = listUsuarios
        respUsuarios.totalPages = 1
        respUsuarios.totalElements = 2

        return of(respUsuarios);
    }

    getUsuarios() : Observable<ApiResponse> {
      return this.http.get<ApiResponse>(this.baseUrl);
    }

    getUsuarioByLogin(login : string): Observable<ResponseEntity> {
      return this.http.get<ResponseEntity>(this.baseUrl + '?login=' + login);
    }
    createUsuario(user: Usuario): Observable<ApiResponse> {
      return this.http.post<ApiResponse>(this.baseUrl, user);
    }
    deletarUsuario(usuarioId: number): Observable<ApiResponse> {
      return this.http.delete<ApiResponse>(this.baseUrl + '/' + String(usuarioId));
    }

    getUsuariosFiltered(nome: string,
                        login: string,
                        email: string,
                        idPerfil: string,
                        situacao: string,
                        page: string,
                        pageSize: string,
                        sort: string,
                        sortDirection: string) : Observable<ResponseEntity>{
      let params = new HttpParams();

      if (nome) { params = params.append('nome', nome) }
      if (login) { params = params.append('login', login) }
      if (email) { params = params.append('email', email) }
      if (idPerfil) { params = params.append('idPerfil', idPerfil) }
      if (situacao) { params = params.append('situacao', situacao) }

      // params = params.append('page', page)
      // params = params.append('pageSize', pageSize)
      if (sort) { params = params.append('sort', sort) }
      if (sortDirection) { params = params.append('sortDirection', sortDirection) }

      return this.http.get<ResponseEntity>(this.baseUrl, { params });

      // DELME Mock da API
      // return this.http.get<any>(
      //   `${this.baseUrl}listar-por-filtro/`, { params: params }
      // )
      // return of((dados as any).default);
    }

    criarUsuario(formUsuario): Observable<Usuario>{
      return this.http.post<Usuario>(
        this.baseUrl,
        formUsuario
      )
    }

    updateUser(formUsuario): Observable<Usuario>{
      return this.http.patch<Usuario>(
        this.baseUrl + formUsuario.id, 
        formUsuario
      )
    }
}