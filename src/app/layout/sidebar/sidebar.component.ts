import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Menu, Usuario } from '../../_models';
import { AuthenticationService } from '../../_services/authentication.service';

import { faFolderOpen, faUser, faUserFriends, faFileUpload, faColumns, faList, faTasks, faCheckSquare, faChartBar, faBan, faUsers } from '@fortawesome/free-solid-svg-icons';
import {faMoneyBill} from '@fortawesome/free-solid-svg-icons/faMoneyBill';


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

    // Icones
    faFolderOpen = faFolderOpen;
    faUser = faUser;
    faUserFriends = faUserFriends;
    faFileUpload = faFileUpload;
    faColumns = faColumns;
    faList = faList;
    faMoney = faMoneyBill;
    faTasks = faTasks;
    faCheckSquare = faCheckSquare;
    faChartBar = faChartBar;
    faBan = faBan;
    faUsers = faUsers;

    isActive: boolean;
    collapsed: boolean;
    showMenu: string;
    pushRightClass: string;
    usuario: Usuario;
    menus: Menu[] = [];
    menusDoUsuario: Menu[] = [];
    mostrarFatura: boolean = false;

    // Permissao para usuario visualizar o menu de Billing
    userPermissionOperacao = false;
    userPermissionCedenteCessionario = true;

    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(public router: Router, public authenticationService: AuthenticationService ) {
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.isActive = false;
        this.collapsed = true;
        this.showMenu = '';
        this.pushRightClass = 'push-right';

        // GET LOCALSTORAGE PERFIL
        const user = localStorage.getItem('currentUser');
        const permission = JSON.parse(user).perfis;
        
        // Permissao para usuario visualizar o menu de Billing
        permission.map((perfil) => {
            // Operação
            if(perfil.perfilId == 5){
                this.userPermissionOperacao = true
            }
            if(perfil.perfilId == 8 || perfil.perfilId == 9){
                this.userPermissionCedenteCessionario = false
            }
        })
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(index: number) {
        if (String(index) == this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = String(index);
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }
}
