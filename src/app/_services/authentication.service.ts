import { Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Usuario, Perfil } from '../_models';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';
import { ResponseEntity } from 'app/_models/ResponseEntity';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'app/_services/data.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    baseUrl: string = environment.baseUrl + '/api/usuarios/'

    constructor(private router: Router,
                private http: HttpClient,
                private usuarioService: UsuarioService,
                private dataService: DataService,
                private toastr: ToastrService) {}

    public get CurrentUsuario(): Usuario {
        return this.dataService.getCurrentUsuario()
    }

    public get TokenUsuario(): string {
        return this.dataService.getTokenUsuario()
    }

    auth(name : string, password : string): Observable<Usuario> {
        const usuario : Usuario = this.dataService.getTableUsuario().find(user => user.login == name && user.senha == password);

        return of(usuario);
    }

    login(name: string, password: string, remember: boolean) {
        this.auth(name, password).subscribe(
            (usuario: Usuario) => {
                if (usuario) {  // verifica se retornou um usuario valido:
                    this.dataService.setCurrentUsuario(usuario)
                    this.dataService.setTokenUsuario('1234567890')
                    // apenas salva como cookie se o usuario assim permitir:
                    if (remember) {}

                    this.router.navigate(['inicio'])

                } else {
                    // nao encontrou o usuario
                    this.toastr.warning('Documento e/ou senha inválidos')
                }
            },
            (err) => {
                this.toastr.error('Erro inesperado ao tentar efetuar login, tente novamente mais tarde.')
            }
        );
    }

   logout() {
    this.dataService.clearUsuario()

    this.router.navigate(['login'])
  }

}