import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from "jquery";

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit, AfterContentInit {

    name:string;
    password:string;
    currentLanguage:string = 'pt';

    public displayAlert:boolean = false;
    public mensagemAlert:string;

    constructor(public router: Router, public authenticationService: AuthenticationService, private toastr: ToastrService){}

    ngOnInit() {
        // inicializacao qualquer...
    }

    ngAfterContentInit() {
        // VMasker(document.querySelector("#agent_user_cpf")).maskPattern("999.999.999-99");
    }

    onLoggedin() {
        // obrigatorio fornecer usuario e senha:
        if (this.name && this.password) {
            //FIXME this.authenticationService.login(this.documento,this.senha, this);
            //DELME this.authenticationService.login("71425166237","123456789", this);
            this.authenticationService.loginMock(this.name, this.password, this);

        } else {
            this.toastr.warning('Digite seu usuário e senha para prosseguir...');
        }
    }

    onLogout(){
        this.authenticationService.logout();
    }
}