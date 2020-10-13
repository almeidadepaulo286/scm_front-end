import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Usuario, Perfil } from '../_models';
import { Router } from "@angular/router";
import { LocalService } from '../_services/local.service';
import { UsuarioService } from './usuario.service';
import { ResponseEntity } from 'app/_models/ResponseEntity';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<Usuario>;
    public currentUser: Observable<Usuario>;
    documentoNumerico:number;
    
    baseAuthUrl: string = environment.baseUrlUser+'auth';
	
    constructor(private router: Router, private http: HttpClient, private usuarioService: UsuarioService, private localService: LocalService, private toastr: ToastrService) {
        this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Usuario {
        return this.currentUserSubject.value;
    }

    auth(documento, password): Observable<ResponseEntity> {
        this.documentoNumerico = documento.replace(/[^0-9 ]/g, "");
        return this.http.post<ResponseEntity>(this.baseAuthUrl, {"cpf":`${this.documentoNumerico}`, "senha":password});
    }

    login(documento: string, password: string, loginPage) {
        this.auth(documento, password).subscribe( r => {
            if(r.errors.length==0){
                localStorage.setItem('token', r.data.token);

                this.usuarioService.getUsuarioByDocumento(this.documentoNumerico).subscribe( u => { 
                    if(r.errors.length==0){
                        let usu = new Usuario();

                        usu.cpf = u.data.cpf;
                        usu.cnpj = u.data.cnpj;
                        usu.email = u.data.email;
                        usu.nome = u.data.nome;
                        usu.sobrenome = u.data.nome;
                        usu.perfis = u.data.perfis;
                        localStorage.setItem('currentUser', JSON.stringify(usu, ['nome','sobrenome','cpf', 'cnpj','email','perfis', 'perfilId', 'empresas','empresaId','menus','menuId','posicao']));
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

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['login']);
    }

    //FIXME
    loginMock(documento: string, password: string, loginPage) {
        localStorage.setItem('token', "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI3MTQyNTE2NjIzNyIsImNvbXBhbnlJZCI6IjMyOTk3NDkwMDAwMTM5Iiwicm9sZSI6IlJPTEVfQURNSU4iLCJjcmVhdGVkIjoxNjAyNTM0MDUzNDY2LCJleHAiOjE2MDI2MjA0NTN9.W0D3x5cfc3-QKotEcwpznFcxonHnU_uDnyHajl77E4HvJ7NFFB-hjM5oO71KZM6vuhMOjsgXSAUlWpFZ0dQGfg");
                
        let usu = new Usuario();
        usu.cpf = "71425166237";
        usu.cnpj = "32997490000139";
        usu.email = "paulo.almeida@elo.inf.br";
        usu.nome = "Paulo";
        usu.sobrenome = "Almeida";
        usu.perfis = [{perfilId:5, nome:"Operação", isEditable:true, isVisible:true}];

        localStorage.setItem('currentUser', JSON.stringify(usu, ['nome','sobrenome','cpf', 'cnpj','email','perfis', 'perfilId', 'empresas','empresaId','menus','menuId','posicao']));
        this.currentUserSubject.next(usu);

        // GET LOCALSTORAGE PERFIL
        const user = localStorage.getItem('currentUser');
        const permission = JSON.parse(user).perfis;

        this.router.navigate(['inicio']);
    }
}