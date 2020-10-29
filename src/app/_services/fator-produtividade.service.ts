import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import { ResponseEntity } from 'app/_models/ResponseEntity';
import { environment } from '../../environments/environment';
import { FatorProdutividade } from '../_models/fator-produtividade';
import { DataService } from 'app/_services/data.service';

@Injectable()
export class FatorProdutividadeService {

    baseUrl: string = environment.baseUrl + '/api/fatores-produtividade/'

    constructor(private http: HttpClient,
                private dataService: DataService) {}

    addFatorProdutividade(stFatorProdutividade : any): Observable<FatorProdutividade>{
      const maxId = this.dataService.getTableFatorProdutividade().reduce((a, b) => a.id > b.id ? a : b).id;

      const newItem = new FatorProdutividade()
      newItem.id = (maxId) ? (maxId + 1) : 1
      newItem.codigo = stFatorProdutividade.codigo
      newItem.indice = stFatorProdutividade.indice
      newItem.atividadeControle = stFatorProdutividade.atividadeControle
      newItem.caracteristica = stFatorProdutividade.caracteristica
      newItem.unidadeMedida = stFatorProdutividade.unidadeMedida
      newItem.dataInclusao = new Date()

      this.dataService.addFatorProdutividade(newItem)

      return of(newItem)
    }

    getFatorProdutividadeById(id: number): Observable<FatorProdutividade> {
      const fatorProdutividade : FatorProdutividade = this.dataService.getFatorProdutividade(id);

      return of(fatorProdutividade);
    }

    setFatorProdutividadeById(id: number, stFatorProdutividade: any): Observable<FatorProdutividade> {
      const fatorProdutividade : FatorProdutividade = this.dataService.getFatorProdutividade(id);
      if (fatorProdutividade) {
          fatorProdutividade.codigo = stFatorProdutividade.codigo
          fatorProdutividade.indice = stFatorProdutividade.indice
          fatorProdutividade.atividadeControle = stFatorProdutividade.atividadeControle
          fatorProdutividade.caracteristica = stFatorProdutividade.caracteristica
          fatorProdutividade.unidadeMedida = stFatorProdutividade.unidadeMedida
          fatorProdutividade.dataAlteracao = new Date()

          this.dataService.setFatorProdutividade(fatorProdutividade);
        }

      return of(fatorProdutividade);
    }

    findFatoresProdutividadeByFilter(codigo: string,
                                     indice: number,
                                     idAtividadeControle: number,
                                     idCaracteristica: number,
                                     page: string,
                                     pageSize: string,
                                     sort: string,
                                     sortDirection: string) : Observable<ResponseEntity>{

        const listFatoresProdutividade : FatorProdutividade[] = this.dataService.getTableFatorProdutividade()
                                                             .filter(item => (!codigo || item.codigo.toUpperCase().includes(codigo.toUpperCase()))
                                                                          && (!indice || item.indice == indice)
                                                                          && (!idAtividadeControle || item.atividadeControle.id == idAtividadeControle)
                                                                          && (!idCaracteristica || item.caracteristica.id == idCaracteristica));
        const respFatoresProdutividade : ResponseEntity = new ResponseEntity()
        respFatoresProdutividade.status = 0
        respFatoresProdutividade.mensagem = null
        respFatoresProdutividade.retorno = listFatoresProdutividade
        respFatoresProdutividade.totalPages = 1
        respFatoresProdutividade.totalElements = 2

        return of(respFatoresProdutividade);
    }
}