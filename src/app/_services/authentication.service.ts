import { Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Usuario, Perfil } from '../_models';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';
import { ResponseEntity } from 'app/_models/ResponseEntity';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
// FIXME Mock da API
import * as dataUsuario from 'app/data/usuario.json';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    usuarios : Usuario[] = (dataUsuario as any).default.retorno;

    private currentUserSubject: BehaviorSubject<Usuario>;
    public currentUser: Observable<Usuario>;

    baseUrl: string = environment.baseUrl + '/api/Usuarios/'

    constructor(private router: Router,
                private http: HttpClient,
                private usuarioService: UsuarioService,
                private toastr: ToastrService) {
        this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Usuario {
        return this.currentUserSubject.value;
    }

    auth(name : string, password : string): Observable<Usuario> {
        const usuario : Usuario = this.usuarios.find(user => user.login === name && user.senha === password);

        return of(usuario);
    }

    login(name: string, password: string, loginPage) {
        this.auth(name, password).subscribe(
            (ret) => {
                if (ret) {  // verifica se retornou um usuario valido:
                    const usuario : Usuario = ret
                    localStorage.setItem('currentUser', JSON.stringify(usuario));
                    this.currentUserSubject.next(usuario);

                    this.router.navigate(['inicio']);

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
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['login']);
  }

}