import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Disciplina } from '../_models/disciplina';
import { DataService } from 'app/_services/data.service';

@Injectable()
export class DisciplinaService {

    baseUrl: string = environment.baseUrl + '/api/disciplinas/'

    constructor(private http: HttpClient,
                private dataService: DataService) {}

    getDisciplinaById(id: number): Observable<Disciplina> {
      const disciplina : Disciplina = this.dataService.getDisciplina(id);

      return of(disciplina);
    }

    getDisciplinas(): Observable<Disciplina[]> {
      const disciplinas: Disciplina[] = this.dataService.getTableDisciplina()

      return of(disciplinas);
    }

}