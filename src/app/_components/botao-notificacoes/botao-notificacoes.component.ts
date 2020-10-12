import { Component, OnInit } from '@angular/core';
import { faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'botao-notificacoes',
  templateUrl: './botao-notificacoes.component.html',
  styleUrls: ['./botao-notificacoes.component.css']
})
export class BotaoNotificacoesComponent implements OnInit {

  faBell = faBell;
  nNotificacoes: Number;

  constructor() { }

  ngOnInit() {
    this.nNotificacoes = 5;
  }

}
