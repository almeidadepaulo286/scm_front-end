import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UnidadeMedida } from '../_models/unidade-medida';
import { DataService } from 'app/_services/data.service';

@Injectable()
export class UnidadeMedidaService {

    baseUrl: string = environment.baseUrl + '/api/unidades-medida/'

    constructor(private http: HttpClient,
                private dataService: DataService) {}

    getUnidadeMedidaById(id: number): Observable<UnidadeMedida> {
      const unidadeMedida: UnidadeMedida = this.dataService.getUnidadeMedida(id)

      return of(unidadeMedida)
    }

    getUnidadesMedida(): Observable<UnidadeMedida[]> {
      const unidadesMedida: UnidadeMedida[] = this.dataService.getTableUnidadeMedida()

      return of(unidadesMedida)
    }
}