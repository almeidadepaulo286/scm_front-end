import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import { ResponseEntity } from 'app/_models/ResponseEntity';
import { environment } from '../../environments/environment';
import { Usuario } from '../_models/usuario';
import { DataService } from 'app/_services/data.service';

@Injectable()
export class UsuarioService {

    baseUrl: string = environment.baseUrl + '/api/usuarios/'

    constructor(private http: HttpClient,
                private dataService: DataService) {}

    addUsuario(stUsuario : any): Observable<Usuario>{
      const maxId = this.dataService.getTableUsuario().reduce((a, b) => a.id > b.id ? a : b).id;

      const newItem = new Usuario()
      newItem.id = (maxId) ? (maxId + 1) : 1
      newItem.nome = stUsuario.nome
      newItem.login = stUsuario.login
      newItem.email = stUsuario.email
      newItem.senha = stUsuario.senha
      newItem.situacao = stUsuario.situacao
      newItem.idioma = stUsuario.idioma
      newItem.listaPerfil = stUsuario.listaPerfil
      newItem.dataInclusao = new Date()

      this.dataService.addUsuario(newItem)

      return of(newItem)
    }

    getUsuarioById(id: number): Observable<Usuario> {
      const usuario : Usuario = this.dataService.getUsuario(id);

      return of(usuario);
    }

    setUsuarioById(id: number, stUsuario: any): Observable<Usuario> {
      const usuario : Usuario = this.dataService.getUsuario(id);
      if (usuario) {
          usuario.nome = stUsuario.nome
          usuario.login = stUsuario.login
          usuario.email = stUsuario.email
          usuario.situacao = stUsuario.situacao
          usuario.idioma = stUsuario.idioma
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

    findUsuariosByFilter(nome: string,
                         login: string,
                         email: string,
                         situacao: number,
                         idPerfil: number,
                         page: string,
                         pageSize: string,
                         sort: string,
                         sortDirection: string) : Observable<ResponseEntity>{

        const listUsuarios : Usuario[] = this.dataService.getTableUsuario()
                                                         .filter(Item => (!nome || Item.nome.toUpperCase().includes(nome.toUpperCase()))
                                                                      && (!login || Item.login.toUpperCase().includes(login.toUpperCase()))
                                                                      && (!email || Item.email.toUpperCase().includes(email.toUpperCase()))
                                                                      && (!situacao || Item.situacao == situacao)
                                                                      && (!idPerfil || Item.listaPerfil.find(item => item.id == idPerfil)));
        const respUsuarios : ResponseEntity = new ResponseEntity()
        respUsuarios.status = 0
        respUsuarios.mensagem = null
        respUsuarios.retorno = listUsuarios
        respUsuarios.totalPages = 1
        respUsuarios.totalElements = 2

        return of(respUsuarios);
    }

}