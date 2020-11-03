import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Area } from '../_models/area';
import { DataService } from 'app/_services/data.service';

@Injectable()
export class AreaService {

    baseUrl: string = environment.baseUrl + '/api/areas/'

    constructor(private http: HttpClient,
                private dataService: DataService) {}

    addArea(stArea : any): Observable<Area>{
      const maxId = this.dataService.getTableArea().reduce((a, b) => a.id > b.id ? a : b).id;

      const newItem = new Area()
      newItem.id = (maxId) ? (maxId + 1) : 1
      newItem.codigo = stArea.codigo
      newItem.descricao = stArea.descricao
      newItem.idUnidade = stArea.idUnidade
      newItem.idAreaPai = stArea.idAreaPai
      newItem.dataInclusao = new Date()

      this.dataService.addArea(newItem)

      return of(newItem)
    }

    getAreaById(id: number): Observable<Area> {
      const area : Area = this.dataService.getArea(id);

      return of(area);
    }

    setAreaById(id: number, stArea: any): Observable<Area> {
      const area : Area = this.dataService.getArea(id);
      if (area) {
          area.codigo = stArea.codigo
          area.descricao = stArea.descricao
          area.dataAlteracao = new Date()

          this.dataService.setArea(area);
        }

      return of(area);
    }

    setSubAreasById(id: number, subAreas: Area[]): Observable<Area> {
        const area : Area = this.dataService.getArea(id);
        if (area) {
            area.subAreas = subAreas
            area.dataAlteracao = new Date()

            this.dataService.setArea(area);
          }

        return of(area);
    }

    getAreas(): Observable<Area[]> {
      const areas: Area[] = this.dataService.getTableArea()

      return of(areas);
    }

    findAreasByParent(idPai: number) : Observable<Area[]>{
        const listAreas : Area[] = this.dataService.getTableArea()
                                                         .filter(item => item.idAreaPai == idPai);
        return of(listAreas);
    }
}