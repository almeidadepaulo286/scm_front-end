import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Usuario } from 'app/_models/usuario';
import { UsuarioService } from 'app/_services/usuario.service';

import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'detalhes-usuario',
	templateUrl: './detalhes-usuario.component.html',
	styleUrls: ['./detalhes-usuario.component.css']
})

export class DetalhesUsuarioComponent implements OnInit {

	title = 'Detalhes do Usuário';
	usuario: Usuario;

	constructor(
		private route: ActivatedRoute,
		private usuarioService: UsuarioService,
		private location: Location
	  ){}

	  ngOnInit(): void {
		this.getUsuarioById();
	  }
	 
	  getUsuarioById(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.usuarioService.getUsuarioById(id)
		  .subscribe((usuario) => {
			this.usuario = usuario.result;
		  });
	  }
	 
	  goBack(): void {
		this.location.back();
	  }

}
