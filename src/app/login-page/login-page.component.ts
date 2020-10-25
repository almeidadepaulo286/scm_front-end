import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {

    name:string;
    password:string;
    currentLanguage = 'pt';

    // trigger-variable for Ladda
    isLoggingIn = false;

    constructor(public router: Router,
                public authenticationService: AuthenticationService,
                private toastr: ToastrService) {}

    ngOnInit() {
        // inicializacao qualquer...
        this.toastr.clear();
        this.isLoggingIn = false;
        this.currentLanguage = 'pt';
    }

    onLogIn() {
        this.toastr.clear();
        this.isLoggingIn = true;

        // obrigatorio fornecer usuario e senha:
        if (this.name && this.password) {
            setTimeout(() => {
                this.isLoggingIn = false;
                this.authenticationService.login(this.name, this.password, this);
            }, 1000);

        } else {
            this.isLoggingIn = false;
            this.toastr.warning('Digite seu usuário e senha para prosseguir...');
        }
    }
}