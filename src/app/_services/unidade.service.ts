import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Unidade } from '../_models/unidade';
import { Area } from '../_models/area';
import { Sop } from '../_models/sop';
import { DataService } from 'app/_services/data.service';

@Injectable()
export class UnidadeService {

    baseUrl: string = environment.baseUrl + '/api/unidades/'

    constructor(private http: HttpClient,
                private dataService: DataService) {}

    addUnidade(stUnidade : any): Observable<Unidade>{
      const maxId = this.dataService.getTableUnidade().reduce((a, b) => a.id > b.id ? a : b).id;

      const newItem = new Unidade()
      newItem.id = (maxId) ? (maxId + 1) : 1
      newItem.codigo = stUnidade.codigo
      newItem.descricao = stUnidade.descricao
      newItem.prefixo = stUnidade.prefixo
      newItem.idContrato = stUnidade.idContrato
      newItem.idUnidadePai = stUnidade.idUnidadePai
      newItem.dataInclusao = new Date()

      this.dataService.addUnidade(newItem)

      return of(newItem)
    }

    getUnidadeById(id: number): Observable<Unidade> {
      const unidade : Unidade = this.dataService.getUnidade(id);

      return of(unidade);
    }

    setUnidadeById(id: number, stUnidade: any): Observable<Unidade> {
      const unidade : Unidade = this.dataService.getUnidade(id);
      if (unidade) {
          unidade.codigo = stUnidade.codigo
          unidade.descricao = stUnidade.descricao
          unidade.prefixo = stUnidade.prefixo
          unidade.dataAlteracao = new Date()

          this.dataService.setUnidade(unidade);
        }

      return of(unidade);
    }

    setAreasById(id: number, areas: Area[]): Observable<Unidade> {
        const unidade : Unidade = this.dataService.getUnidade(id);
        if (unidade) {
            unidade.areas = areas
            unidade.dataAlteracao = new Date()

            this.dataService.setUnidade(unidade);
          }

        return of(unidade);
    }

    setSopsById(id: number, sops: Sop[]): Observable<Unidade> {
        const unidade : Unidade = this.dataService.getUnidade(id);
        if (unidade) {
            unidade.sops = sops
            unidade.dataAlteracao = new Date()

            this.dataService.setUnidade(unidade);
        }

        return of(unidade);
    }

    getUnidades(): Observable<Unidade[]> {
      const unidades: Unidade[] = this.dataService.getTableUnidade()

      return of(unidades);
    }

    findUnidadesByParent(idPai: number) : Observable<Unidade[]>{
        const listUnidades : Unidade[] = this.dataService.getTableUnidade()
                                                         .filter(item => item.idUnidadePai == idPai);
        return of(listUnidades);
    }
}