import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'botao-novo',
  templateUrl: './botao-novo.component.html',
  styleUrls: ['./botao-novo.component.css']
})
export class BotaoNovoComponent implements OnInit {

  faPlus = faPlus;

  constructor() { }

  ngOnInit() {
  }

}
