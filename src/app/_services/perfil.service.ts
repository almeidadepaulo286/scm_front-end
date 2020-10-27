import { Injectable } from '@angular/core';
import { Perfil } from '../_models/perfil';
import { Observable, of } from 'rxjs/index';
import { ApiResponse } from '../_models/api.response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseEntity } from 'app/_models/ResponseEntity';
import { environment } from '../../environments/environment';
import { DataService } from 'app/_services/data.service';

@Injectable()
export class PerfilService {

    baseUrl: string = environment.baseUrl + '/api/perfis/'

    constructor(private http: HttpClient,
                private dataService: DataService) {}

    getPerfilById(id: number): Observable<Perfil> {
      const perfil : Perfil = this.dataService.getTablePerfil().find(perf => perf.id == id);

      return of(perfil);
    }

    listarPerfis():Observable<Perfil[]>{
      const perfis: Perfil[] = this.dataService.getTablePerfil()

      return of(perfis);
    }

}