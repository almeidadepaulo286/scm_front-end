import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { faOutdent, faIndent, faBars, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    faOutdent = faOutdent;
    faIndent = faIndent;
    faBars = faBars;
    faUser = faUser;

    sidebarIsMinimized = false;

    constructor(public router: Router) {}

    ngOnInit() {
        this.sidebarIsMinimized = jQuery('.page-sidebar .x-navigation').hasClass('x-navigation-minimized');
    }

    toggleIcon() {
        jQuery('#sidebar-wrapper').toggleClass('page-sidebar-minimized');

        if (jQuery('.page-sidebar .x-navigation').hasClass('x-navigation-minimized')) {
            this.x_navigation_minimize('open');
         } else {
            this.x_navigation_minimize('close');
         }

        console.log('toggleIcon no header.component.ts');
    }

    x_navigation_minimize(n : string) {
        if (n == 'open') {
            this.sidebarIsMinimized = false;
            jQuery('.page-container').removeClass('page-navigation-minimized');
            jQuery('.page-sidebar').removeClass('page-sidebar-minimized');
            jQuery('.page-sidebar .x-navigation').removeClass('x-navigation-minimized');
            jQuery('.x-navigation-minimize').find('.fa').removeClass('fa-indent').addClass('fa-dedent');
            // jQuery('.page-sidebar.scroll').mCustomScrollbar('update');
            // setCookie('sidebar_minimized', 'false', 365);

        } else if (n == 'close') {
            this.sidebarIsMinimized = true;
            jQuery('.page-container').addClass('page-navigation-minimized');
            jQuery('.page-sidebar').addClass('page-sidebar-minimized');
            jQuery('.page-sidebar .x-navigation').addClass('x-navigation-minimized');
            jQuery('.x-navigation-minimize').find('.fa').removeClass('fa-dedent').addClass('fa-indent');
            // jQuery('.page-sidebar.scroll').mCustomScrollbar('disable', !0);
            // setCookie('sidebar_minimized', 'true', 365);
        }

        jQuery('.x-navigation li.active').removeClass('active')
    }
}