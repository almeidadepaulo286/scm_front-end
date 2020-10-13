import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Usuario } from '../../_models';
import { faOutdent, faIndent, faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;

    usuario: string;
    faOutdent = faOutdent;
    faIndent = faIndent;
    faBars = faBars;
    faUser = faUser;
    sidebarIsOpen = false;

    constructor(public router: Router) {
    }

    ngOnInit() {
        let user:string = localStorage.getItem('currentUser');
        this.usuario = JSON.parse(user).nome;
        this.pushRightClass = 'push-right';

        $(document).ready(function(){
            $("#menu-toggle").click(function(e) {
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
            });
        });
    }

    toggleIcon() {
        this.sidebarIsOpen = ! this.sidebarIsOpen;
    }


    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
    }
}
