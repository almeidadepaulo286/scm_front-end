import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'app/_services/data.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {

    name: string;
    password: string;
    remember: boolean;
    language: string;

    // trigger-variable for Ladda
    isLoggingIn = false;

    constructor(public router: Router,
                private authenticationService: AuthenticationService,
                private dataService: DataService,
                private toastr: ToastrService) {}

    ngOnInit() {
        // inicializacao qualquer...
        this.toastr.clear();
        this.isLoggingIn = false;
        this.remember = true;
        this.language = 'pt';
    }

    onLogIn() {
        this.toastr.clear();
        this.isLoggingIn = true;

        // obrigatorio fornecer usuario e senha:
        if (this.name && this.password) {
            setTimeout(() => {
                this.isLoggingIn = false;
                this.authenticationService.login(this.name, this.password, this.remember);
            }, 1000);

        } else {
            this.isLoggingIn = false;
            this.toastr.warning('Digite seu usuário e senha para prosseguir...');
        }
    }

    changeLanguage(idLanguage: string) {
        this.language = idLanguage
    }

    resetData() {
        const resp = confirm('Deseja restabelecer a base de dados local?')
        if (resp) {
            this.dataService.clear()
            this.toastr.warning('ATENÇÃO: A base de dados local foi restabelecida. Todos os dados incluídos/alterados anteriormente foram desconsiderados.');
        }
    }
}