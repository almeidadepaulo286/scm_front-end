import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_services';
import { Perfil } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate{
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser){
            // check if route is restricted by role
            // console.log('perfis');
            // console.log(currentUser.perfis);
            if (route.data.perfis.length > 0 && this.arraysExisteAlgumItemComum(route.data.perfis, currentUser.perfis)==false){
                // role not authorised so redirect to home page
                this.router.navigate(['login']);
                return false;
            }
            // authorised so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

    arraysExisteAlgumItemComum(routePerfis:number[], userPerfis:Perfil[]) {
        let existeUmItemEmComum = false;
        encontrouUm:
        for (let route = 0; route < routePerfis.length; route++) {
            for (let user = 0; user < userPerfis.length; user++) {
                if (routePerfis[route] == userPerfis[user].perfilId) {
                    existeUmItemEmComum = true;
                    break encontrouUm;
                }
            }
        }
        return existeUmItemEmComum;
    }
}
