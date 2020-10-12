import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Usuario } from '../../_models';
import { faBell, faPlus, faBars } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;

    usuario: string;
    faBell = faBell;
    faPlus = faPlus;
    faBars = faBars;

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

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
    }
}
