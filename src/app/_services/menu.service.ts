import './local.service';
import { Injectable } from '@angular/core';
import {Menu} from "../_models/menu";
import {Observable} from "rxjs/index";
import {ApiResponse} from "../_models/api.response";
import { HttpClient } from '@angular/common/http';
import { LocalService } from '../_services/local.service';
import { environment } from '../../environments/environment';

@Injectable()
export class MenuService {

    baseMenuUrl: string = environment.baseUrl+'menus';

    constructor(private http: HttpClient, private localService: LocalService){ }

    getMenus() : Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.baseMenuUrl);
    }
    getMenuById(menuId: number): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.baseMenuUrl + "/" + String(menuId));
    }
    createMenu(menu: Menu): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.baseMenuUrl, menu);
    }
    atualizarMenu(menu: Menu): Observable<ApiResponse> {
        return this.http.put<ApiResponse>(this.baseMenuUrl + "/" + String(menu.menuId), menu);
    }
    deleteMenu(menuId: number): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(this.baseMenuUrl + "/" + String(menuId));
    }
    listMenusByUsuarioDocumento(documento: number): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.baseMenuUrl + "/listByUsuarioDocumento" + "/" + String(documento));
    }
}