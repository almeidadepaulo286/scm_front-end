import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Usuario, Perfil } from '../_models';
import { Router } from "@angular/router";
import { UsuarioService } from './usuario.service';
import { ResponseEntity } from 'app/_models/ResponseEntity';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<Usuario>;
    public currentUser: Observable<Usuario>;

    baseUrl: string = environment.baseUrl + '/usuarios/'
    
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
    
    auth(documento, password): Observable<ResponseEntity> {
        return this.http.post<ResponseEntity>(this.baseUrl, {"cpf":documento, "senha":password});
    }

    
    login(documento: string, password: string, loginPage) {
        this.auth(documento, password).subscribe( r => {
            if(r.errors.length==0){
                localStorage.setItem('token', r.data.token);

                this.usuarioService.getUsuarioByLogin(documento).subscribe( u => { 
                    if(r.errors.length==0){
                        let usu = new Usuario();

                        usu.login = u.data.login;
                        usu.email = u.data.email;
                        usu.nome = u.data.nome;
                        usu.perfis = u.data.perfis;
                        localStorage.setItem('currentUser', JSON.stringify(usu, ['nome','login','email','perfis', 'perfilId', 'menus','menuId','posicao']));
                        this.currentUserSubject.next(usu);

                        // GET LOCALSTORAGE PERFIL
                        const user = localStorage.getItem('currentUser');
                        const permission = JSON.parse(user).perfis;

                        this.router.navigate(['inicio']);
                        // permission.map((perfil) => {
                        //     if(perfil.perfilId == 5){
                        //         this.router.navigate(['inicio']);
                        //     }else{
                        //         this.router.navigate(['registros']);
                        //     }
                        // })
                    } else {
                        this.toastr.warning('Não foi possível realizar o login')
                        this.router.navigate(['login']);
                    }
                });
            } else {
                this.toastr.warning('Não foi possível realizar o login')
                this.router.navigate(['login']);
            }
        }, e => {
            // const erro = e.error.errors
            // erro.map((err) => {
            //     console.log(err)
            //     this.toastr.warning(err)
            // })
            this.toastr.warning('Documento e/ou senha inválidos')
            this.router.navigate(['login']);
        });
    }

    //DELME
    authMock(name : string, password : string): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(this.baseUrl + "?login=" + name + "&senha="+password);
    }

    loginMock(name: string, password: string, loginPage) {
        this.authMock(name, password).subscribe( r => {
            if (r.length > 0) {
                localStorage.setItem('token', String(r[0].id));

                let usu = new Usuario();
                usu.id = r[0].id;
                usu.nome = r[0].nome;
                usu.login = r[0].login;
                usu.email = r[0].email;
                usu.perfis = [{id:1, nome:"Administração", ativo:1, isEditable:true, isVisible:true}];
        
                localStorage.setItem('currentUser', JSON.stringify(usu, ['nome','login','email','perfis', 'perfilId', 'menus','menuId','posicao']));
                this.currentUserSubject.next(usu);
        
                // GET LOCALSTORAGE PERFIL
                const user = localStorage.getItem('currentUser');
                const permission = JSON.parse(user).perfis;

                this.router.navigate(['inicio']);
        } else {
            this.toastr.warning('Documento e/ou senha inválidos')
        }
    });
   }

   logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['login']);
  }

}