import { Injectable } from '@angular/core';
import {Usuario} from '../_models/usuario';
import {Observable, of} from 'rxjs/index';
import {ApiResponse} from '../_models/api.response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseEntity } from 'app/_models/ResponseEntity';
import { environment } from '../../environments/environment';
import { Perfil } from '../_models/perfil';
import { PerfilService } from 'app/_services/perfil.service';
import { DataService } from 'app/_services/data.service';

@Injectable()
export class UsuarioService {

    baseUrl: string = environment.baseUrl + '/api/usuarios/'

    constructor(private http: HttpClient,
                private perfilService: PerfilService,
                private dataService: DataService) {}

    getUsuarioById(id: number): Observable<Usuario> {
      const usuario : Usuario = this.dataService.getUsuario(id);

      return of(usuario);
    }

    cadastrarUsuario(stUsuario : any): Observable<Usuario>{
      const maxId = this.dataService.getTableUsuario().reduce((a, b) => a.id > b.id ? a : b).id;

      const newUser = new Usuario()
      newUser.id = (maxId) ? (maxId + 1) : 1
      newUser.nome = stUsuario.nome
      newUser.login = stUsuario.login
      newUser.email = stUsuario.email
      newUser.senha = stUsuario.senha
      newUser.situacao = stUsuario.situacao
      newUser.listaPerfil = stUsuario.listaPerfil
      newUser.dataInclusao = new Date()

      this.dataService.addUsuario(newUser)

      return of(newUser)
    }

    updateUsuarioById(id: number, stUsuario: any): Observable<Usuario> {
      const usuario : Usuario = this.dataService.getUsuario(id);
      if (usuario) {
          usuario.nome = stUsuario.nome
          usuario.login = stUsuario.login
          usuario.email = stUsuario.email
          usuario.situacao = stUsuario.situacao
          usuario.listaPerfil = stUsuario.listaPerfil
          usuario.dataAlteracao = new Date()

          this.dataService.setUsuario(usuario);
        }

      return of(usuario);
    }

    resetPassUsuarioById(id: number): Observable<Usuario> {
      const usuario : Usuario = this.dataService.getUsuario(id);
      if (usuario) {
        usuario.senha = '1234'

        this.dataService.setUsuario(usuario);
      }

      return of(usuario);
    }

    disableUsuarioById(id: number): Observable<Usuario> {
      const usuario : Usuario = this.dataService.getUsuario(id);
      if (usuario) {
        usuario.situacao = 0

        this.dataService.setUsuario(usuario);
      }

      return of(usuario);
    }

    enableUsuarioById(id: number): Observable<Usuario> {
      const usuario : Usuario = this.dataService.getUsuario(id);
      if (usuario) {
        usuario.situacao = 1

        this.dataService.setUsuario(usuario);
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

        const listUsuarios : Usuario[] = this.dataService.getTableUsuario()
                                                         .filter(user => (!nome || user.nome.toUpperCase().includes(nome.toUpperCase()))
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

}