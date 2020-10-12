import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from "@angular/router";
import { LocalService } from './local.service';
import { ResponseEntity } from 'app/_models/ResponseEntity';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' }) 
export class RegistroService {
    
    
    baseRegistrosUrl: string = environment.baseUrl+'api/cerc/registros/page?page=';

    constructor(
        private router: Router,
        private http: HttpClient,
        private localService: LocalService) {
        
    }

    findAll(): Observable<ResponseEntity> {        
        return this.http.get<ResponseEntity>(this.baseRegistrosUrl);
    }

    login() {
        this.findAll().subscribe( r => {
           
            if(r.errors.length==0){
                localStorage.setItem('token', r.data.token);
            } 
        });
    }
}