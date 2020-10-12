import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Arquivo } from './arquivo';
import { ARQUIVOS } from './mock';

@Injectable({ providedIn: 'root' })
export class ArquivoService {

  constructor() { }

  getArquivos(): Observable<Arquivo[]> {
    // TODO: send the message _after_ fetching the heroes
    // this.messageService.add('HeroService: fetched heroes');
    return of(ARQUIVOS);
  }

  getArquivo(id: number): Observable<Arquivo> {
    // TODO: send the message _after_ fetching the hero
    // this.messageService.add(`ArquivoService: fetched arquivo id=${id}`);
    return of(ARQUIVOS.find(arquivo => arquivo.id === id));
  }
}