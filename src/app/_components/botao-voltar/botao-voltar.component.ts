import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'botao-voltar',
  templateUrl: './botao-voltar.component.html',
  styleUrls: ['./botao-voltar.component.css']
})
export class BotaoVoltarComponent implements OnInit {

  faLongArrowAltLeft = faLongArrowAltLeft;

  constructor(
    private location: Location,
  ){}

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

}