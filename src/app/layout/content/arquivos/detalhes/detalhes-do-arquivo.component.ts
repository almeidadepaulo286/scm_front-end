import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Arquivo }         from '../arquivo';
import { ArquivoService }  from '../arquivo.service';
import { ActivatedRoute } from '@angular/router';

// Icones
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

 
@Component({
  selector: 'detalhes', 
  templateUrl: './detalhes-do-arquivo.component.html',
  styleUrls: ['./detalhes-do-arquivo.component.css'],
})

export class DetalhesDoArquivoComponent implements OnInit {

  title = 'Detalhes do Arquivo';
  arquivo: Arquivo;

  // Icone
  faAddressCard = faInfoCircle;

  constructor(
    private route: ActivatedRoute,
    private arquivoService: ArquivoService,
    private location: Location
  ){}

  ngOnInit(): void {
    this.getArquivo();
  }
 
  getArquivo(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.arquivoService.getArquivo(id)
      .subscribe(arquivo => this.arquivo = arquivo);
  }

  goBack(): void {
    this.location.back();
  }
}
