import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Sop } from '../_models/sop';
import { DataService } from 'app/_services/data.service';

@Injectable()
export class SopService {

    baseUrl: string = environment.baseUrl + '/api/sops/'

    constructor(private http: HttpClient,
                private dataService: DataService) {}

    addSop(stSop : any): Observable<Sop>{
      const maxId = this.dataService.getTableSop().reduce((a, b) => a.id > b.id ? a : b).id;

      const newItem = new Sop()
      newItem.id = (maxId) ? (maxId + 1) : 1
      newItem.codigo = stSop.codigo
      newItem.descricao = stSop.descricao
      newItem.idUnidade = stSop.idUnidade
      newItem.idSopPai = stSop.idSopPai
      newItem.dataInclusao = new Date()

      this.dataService.addSop(newItem)

      return of(newItem)
    }

    getSopById(id: number): Observable<Sop> {
      const sop : Sop = this.dataService.getSop(id);

      return of(sop);
    }

    setSopById(id: number, stSop: any): Observable<Sop> {
      const sop : Sop = this.dataService.getSop(id);
      if (sop) {
          sop.codigo = stSop.codigo
          sop.descricao = stSop.descricao
          sop.dataAlteracao = new Date()

          this.dataService.setSop(sop);
        }

      return of(sop);
    }

    setSubSopsById(id: number, subSops: Sop[]): Observable<Sop> {
        const sop : Sop = this.dataService.getSop(id);
        if (sop) {
            sop.subSops = subSops
            sop.dataAlteracao = new Date()

            this.dataService.setSop(sop);
          }

        return of(sop);
    }

    getSops(): Observable<Sop[]> {
      const sops: Sop[] = this.dataService.getTableSop()

      return of(sops);
    }

    findSopsByParent(idPai: number) : Observable<Sop[]>{
        const listSops : Sop[] = this.dataService.getTableSop()
                                                         .filter(item => item.idSopPai == idPai);
        return of(listSops);
    }
}