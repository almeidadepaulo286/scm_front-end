import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import * as $ from "jquery";
declare var VMasker: any;
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit, AfterContentInit {

    documento:string;
    senha:string;

    public displayAlert:boolean = false;
    public mensagemAlert:string;

    constructor(public router: Router, public authenticationService: AuthenticationService){}

    ngOnInit() {}

    ngAfterContentInit() {
        VMasker(document.querySelector("#agent_user_cpf")).maskPattern("999.999.999-99");
    }

    onLoggedin() {
        this.documento = this.documentoComMascara(this.documento);
        //FIXME this.authenticationService.login(this.documento,this.senha, this);
        //DELME this.authenticationService.login("71425166237","123456789", this);
        this.authenticationService.loginMock(this.documento,this.senha, this);
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

    private documentoComMascara(documento: string) {
        if(documento && documento.length==14){
            let ponto = documento.indexOf('.');
            if(ponto<0){
                return '';
            }
        }
        if(documento && documento.length==11){
            documento = documento.substring(0,3)+"."+documento.substring(3,6)+"."+documento.substring(6,9)+"-"+documento.substring(9,11);
        }
        return documento;
    }

}
