import './local.service';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/index";
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { ApiResponse } from "../_models/api.response";
import { LocalService } from '../_services/local.service';
import { ResponseEntity } from 'app/_models/ResponseEntity';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class ArquivosService {

    baseUrl: string = environment.baseUrl+'cerc/registros/files';

    constructor(private http: HttpClient, private localService: LocalService){ }

    getArquivos(direction, linesPerPage, orderBy, page) : Observable<ResponseEntity> {
        return this.http.get<ResponseEntity>(
            this.baseUrl+ '?direction='+direction+'&linesPerPage='+linesPerPage+'&orderBy='+orderBy+'&page='+page);
    }
}