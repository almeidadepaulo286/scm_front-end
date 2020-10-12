import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RegistroService }  from '../registro.service';
import { ActivatedRoute } from '@angular/router';

// Icones 
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';

 
@Component({
  selector: 'detalhes',
  templateUrl: './detalhes-do-registro.component.html',
  styleUrls: ['./detalhes-do-registro.component.css'],
})

export class DetalhesDoRegistroComponent implements OnInit {

  title = 'Detalhes da Inclusão do Ativo';
  registro;
  solicitacoesRegistro: [];

  // Icone
  faAddressCard = faSearch;
  faPen = faPen;

  // getParams botão editar
  btn_id_registro = this.route.snapshot.paramMap.get('id')
  btn_protocolo = this.route.snapshot.paramMap.get('protocolo')

  headElements = [  
		'Protocolo', 
    'Usuário',
    'Data',
    'Tipo',
    'Status',
  ];
  
  headParcelas = [
		'Nº da Parcela',
		'Id Parcela',
		'Valor da Parcela', 
		'Data de Vencimento',
		'Status',
  ];
  
  headGarantias = [
		'Tipo', 
		'Doc. Bem / Matrícula',
    'Doc. Detentor',
    'Valor Bem',
  ];
  
  constructor(
    private route: ActivatedRoute,
    private registroService: RegistroService, 
    private location: Location
  ){}

  ngOnInit(): void { 
    this.getRegistro();
    this.getSolicitacoesRegistro();
  }

  getRegistro(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.registroService.getRegistro(id).subscribe(
      r => { 
        this.registro = r.data
        // console.log(r.data)
      }  
    );
  }

  getSolicitacoesRegistro(): void {
   // const protocolo = +this.registro.protocolo;
    this.registroService.getSolicitacoesRegistro(this.route.snapshot.paramMap.get('protocolo'))
      .subscribe(r => {
        this.solicitacoesRegistro = r.data
      });
  }

  goBack(): void {
    this.location.back();
  }
}
