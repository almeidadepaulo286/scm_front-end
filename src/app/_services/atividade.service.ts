import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import { ResponseEntity } from 'app/_models/ResponseEntity';
import { environment } from '../../environments/environment';
import { Atividade } from '../_models/atividade';
import { DataService } from 'app/_services/data.service';

@Injectable()
export class AtividadeService {

    baseUrl: string = environment.baseUrl + '/api/atividades/'

    constructor(private http: HttpClient,
                private dataService: DataService) {}

    addAtividade(stAtividade : any): Observable<Atividade>{
      const maxId = this.dataService.getTableAtividade().reduce((a, b) => a.id > b.id ? a : b).id;

      const newItem = new Atividade()
      newItem.id = (maxId) ? (maxId + 1) : 1
      newItem.codigo = stAtividade.codigo
      newItem.prefixo = stAtividade.prefixo
      newItem.descricao = stAtividade.descricao
      newItem.disciplinas = stAtividade.disciplinas
      newItem.dataInclusao = new Date()

      this.dataService.addAtividade(newItem)

      return of(newItem)
    }

    getAtividadeById(id: number): Observable<Atividade> {
      const atividade : Atividade = this.dataService.getAtividade(id);

      return of(atividade);
    }

    setAtividadeById(id: number, stAtividade: any): Observable<Atividade> {
      const atividade : Atividade = this.dataService.getAtividade(id);
      if (atividade) {
          atividade.codigo = stAtividade.codigo
          atividade.prefixo = stAtividade.prefixo
          atividade.descricao = stAtividade.descricao
          atividade.disciplinas = stAtividade.disciplinas
          atividade.dataAlteracao = new Date()

          this.dataService.setAtividade(atividade);
        }

      return of(atividade);
    }

    findAtividadesByFilter(codigo: string,
                           prefixo: string,
                           idDisciplina: number,
                           page: string,
                           pageSize: string,
                           sort: string,
                           sortDirection: string) : Observable<ResponseEntity>{

        const listAtividades : Atividade[] = this.dataService.getTableAtividade()
                                                             .filter(item => (!codigo || item.codigo.toUpperCase().includes(codigo.toUpperCase()))
                                                                          && (!prefixo || item.prefixo.toUpperCase().includes(prefixo.toUpperCase()))
                                                                          && (!idDisciplina || item.disciplinas.find(subitem => subitem.id == idDisciplina)));
        const respAtividades : ResponseEntity = new ResponseEntity()
        respAtividades.status = 0
        respAtividades.mensagem = null
        respAtividades.retorno = listAtividades
        respAtividades.totalPages = 1
        respAtividades.totalElements = 2

        return of(respAtividades);
    }

}