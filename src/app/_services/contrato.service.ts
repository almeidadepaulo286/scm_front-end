import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import { ResponseEntity } from 'app/_models/ResponseEntity';
import { environment } from '../../environments/environment';
import { Contrato } from '../_models/contrato';
import { DataService } from 'app/_services/data.service';

@Injectable()
export class ContratoService {

    baseUrl: string = environment.baseUrl + '/api/contratos/'

    constructor(private http: HttpClient,
                private dataService: DataService) {}

    addContrato(stContrato : any): Observable<Contrato>{
      const maxId = this.dataService.getTableContrato().reduce((a, b) => a.id > b.id ? a : b).id;

      const newItem = new Contrato()
      newItem.id = (maxId) ? (maxId + 1) : 1
      newItem.codigo = stContrato.codigo
      newItem.descricao = stContrato.descricao
      newItem.codigoProjeto = stContrato.codigoProjeto
      newItem.valor = stContrato.valor
      newItem.dataInicial = stContrato.dataInicial
      newItem.dataFinal = stContrato.dataFinal
      newItem.dataInclusao = new Date()

      this.dataService.addContrato(newItem)

      return of(newItem)
    }

    getContratoById(id: number): Observable<Contrato> {
      const contrato : Contrato = this.dataService.getContrato(id);

      return of(contrato);
    }

    setContratoById(id: number, stContrato: any): Observable<Contrato> {
      const contrato : Contrato = this.dataService.getContrato(id);
      if (contrato) {
          contrato.codigo = stContrato.codigo
          contrato.descricao = stContrato.descricao
          contrato.codigoProjeto = stContrato.codigoProjeto
          contrato.valor = stContrato.valor
          contrato.dataInicial = stContrato.dataInicial
          contrato.dataFinal = stContrato.dataFinal
          contrato.arranjoFisico = stContrato.arranjoFisico
          contrato.dataAlteracao = new Date()

          this.dataService.setContrato(contrato);
        }

      return of(contrato);
    }

    setArranjoFisicoById(id: number, stArranjoFisico: any): Observable<Contrato> {
      const contrato : Contrato = this.dataService.getContrato(id);
      if (contrato) {
          contrato.arranjoFisico = stArranjoFisico
          contrato.dataAlteracao = new Date()

          this.dataService.setContrato(contrato);
        }

      return of(contrato);
    }

    findContratosByFilter(codigo: string,
                          descricao: string,
                          codigoProjeto: string,
                          valor: number,
                          page: string,
                          pageSize: string,
                          sort: string,
                          sortDirection: string) : Observable<ResponseEntity>{

        const listContratos : Contrato[] = this.dataService.getTableContrato()
                                                         .filter(Item => (!codigo || Item.codigo.toUpperCase().includes(codigo.toUpperCase()))
                                                                      && (!descricao || Item.descricao.toUpperCase().includes(descricao.toUpperCase()))
                                                                      && (!codigoProjeto || Item.codigoProjeto.toUpperCase().includes(codigoProjeto.toUpperCase()))
                                                                      && (!valor || Item.valor == valor));
        const respContratos : ResponseEntity = new ResponseEntity()
        respContratos.status = 0
        respContratos.mensagem = null
        respContratos.retorno = listContratos
        respContratos.totalPages = 1
        respContratos.totalElements = 2

        return of(respContratos);
    }

}