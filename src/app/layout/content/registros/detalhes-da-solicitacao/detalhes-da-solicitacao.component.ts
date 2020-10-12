import { Component, OnInit } from '@angular/core';
import { SolicitacaoRegistro } from '../solicitacao-registro';
import { RegistroService }  from '../registro.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalhes-da-solicitacao',
  templateUrl: './detalhes-da-solicitacao.component.html',
  styleUrls: ['./detalhes-da-solicitacao.component.css']
}) 
export class DetalhesDaSolicitacaoComponent implements OnInit {

  title = 'Detalhes da Solicitação de Inclusão de Ativo';

  solicitacaoRegistro: any;

  headGarantias = [
		'Garantia', 
		'Valor',
		'Placa',
  ];
  
  headParcelas = [
		'Número',
		'Valor', 
		'Data de Vencimento',
	];


  constructor(
    private route: ActivatedRoute,
    private registroService: RegistroService, 
    private location: Location
  ){}

  ngOnInit(): void { 
    this.getSolicitacaoRegistroPorId();
  }

  getSolicitacaoRegistroPorId(): void {
    this.registroService.getSolicitacoesRegistroPorId(this.route.snapshot.paramMap.get('id')).subscribe(
      r => {
        this.solicitacaoRegistro = r.data
        console.log(this.solicitacaoRegistro)
      }
    );
  }


  goBack(): void {
    this.location.back();
  }
}
