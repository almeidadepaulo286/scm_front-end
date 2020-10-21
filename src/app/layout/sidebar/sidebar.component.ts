import { Component, OnInit } from '@angular/core';
import { faUser, faEdit, faBook, faWrench, faFileAlt, faMoneyBill, faMoneyBillAlt, faCogs, faUserFriends, faFileUpload, faColumns, faTasks, faCheckSquare, faChartBar, faBan, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

    // Icones
    faUser = faUser;
    faEdit = faEdit;
    faBook = faBook;
    faWrench = faWrench;
    faFileAlt = faFileAlt;
    faMoneyBill = faMoneyBill;
    faMoneyBillAlt = faMoneyBillAlt;
    faCogs = faCogs;
    faUserFriends = faUserFriends;
    faFileUpload = faFileUpload;
    faColumns = faColumns;
    faTasks = faTasks;
    faCheckSquare = faCheckSquare;
    faChartBar = faChartBar;
    faBan = faBan;
    faUsers = faUsers;
    
    constructor() {}

    ngOnInit() {
        // GET LOCALSTORAGE PERFIL
        const user = localStorage.getItem('currentUser');
        const permission = JSON.parse(user).perfis;
    }
}
