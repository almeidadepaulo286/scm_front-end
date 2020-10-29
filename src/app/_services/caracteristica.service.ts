import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Caracteristica } from '../_models/caracteristica';
import { DataService } from 'app/_services/data.service';

@Injectable()
export class CaracteristicaService {

    baseUrl: string = environment.baseUrl + '/api/caracteristicas/'

    constructor(private http: HttpClient,
                private dataService: DataService) {}

    getCaracteristicaById(id: number): Observable<Caracteristica> {
      const caracteristica : Caracteristica = this.dataService.getCaracteristica(id);

      return of(caracteristica);
    }

    getCaracteristicas(): Observable<Caracteristica[]> {
      const caracteristicas: Caracteristica[] = this.dataService.getTableCaracteristica()

      return of(caracteristicas);
    }
}