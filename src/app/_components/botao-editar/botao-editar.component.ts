import { Component, OnInit } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'botao-editar',
  templateUrl: './botao-editar.component.html',
  styleUrls: ['./botao-editar.component.css']
})
export class BotaoEditarComponent implements OnInit {

  faPen = faPen;

  constructor() { }

  ngOnInit() {
  }

}
