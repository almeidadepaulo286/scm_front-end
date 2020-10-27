import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from 'app/_services';
import { Usuario, Perfil } from 'app/_models';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private authenticationService: AuthenticationService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const currentUsuario : Usuario = this.authenticationService.CurrentUsuario

        if (currentUsuario){
            // check if route is restricted by role
            // console.log('perfis');
            // console.log(currentUsuario.perfis);
            // FIXME
            // if (route.data.perfis.length > 0 && this.arraysExisteAlgumItemComum(route.data.perfis, currentUsuario.perfis)==false){
            //     // role not authorised so redirect to home page
            //     this.router.navigate(['login']);
            //     return false;
            // }
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
        for (const routePerfil of routePerfis) {
            for (const userPerfil of userPerfis) {
                if (routePerfil === userPerfil.id) {
                    existeUmItemEmComum = true;
                    break encontrouUm;
                }
            }
        }
        return existeUmItemEmComum;
    }
}
