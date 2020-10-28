import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Perfil } from '../_models/perfil';
import { DataService } from 'app/_services/data.service';

@Injectable()
export class PerfilService {

    baseUrl: string = environment.baseUrl + '/api/perfis/'

    constructor(private http: HttpClient,
                private dataService: DataService) {}

    getPerfilById(id: number): Observable<Perfil> {
      const perfil : Perfil = this.dataService.getPerfil(id);

      return of(perfil);
    }

    getPerfis(): Observable<Perfil[]> {
      const perfis: Perfil[] = this.dataService.getTablePerfil()

      return of(perfis);
    }

}