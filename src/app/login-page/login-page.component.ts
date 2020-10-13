import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import * as $ from "jquery";

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit, AfterContentInit {

    name:string;
    password:string;

    public displayAlert:boolean = false;
    public mensagemAlert:string;

    constructor(public router: Router, public authenticationService: AuthenticationService){}

    ngOnInit() {}

    ngAfterContentInit() {
        // VMasker(document.querySelector("#agent_user_cpf")).maskPattern("999.999.999-99");
    }

    onLoggedin() {
        //FIXME this.authenticationService.login(this.documento,this.senha, this);
        //DELME this.authenticationService.login("71425166237","123456789", this);
        this.authenticationService.loginMock(this.name, this.password, this);
    }

    onLogout(){
        this.authenticationService.logout();
    }

    showAlert(mensagem:string){
        this.displayAlert = true;
        this.mensagemAlert = mensagem;
        $("#alerta").addClass('show');
        $("#alerta").css('opacity',"1");
        setTimeout(function() { $("#alerta").fadeTo( 5000 , 0, function(){this.displayAlert=false}.bind(this)); }.bind(this), 200);
    }

    fecharAlert(){
        $("#alerta").css('opacity','0');
        this.displayAlert=false;
    }
}
