import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { faPen, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { Usuario } from 'app/_models/usuario';
import { UsuarioService } from 'app/_services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'detalhes-usuario',
	templateUrl: './detalhes-usuario.component.html',
	styleUrls: ['./detalhes-usuario.component.css']
})

export class DetalhesUsuarioComponent implements OnInit {

	faPen = faPen;
	faMinusCircle = faMinusCircle;

	title = 'Detalhes do Usuário';
	usuario: Usuario = new Usuario();

	constructor(
		private route: ActivatedRoute,
		private usuarioService: UsuarioService,
		private toastr: ToastrService,
		private location: Location
	  ){}

	  ngOnInit(): void {
		this.getUsuarioById();
	  }
	 
	  getUsuarioById(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.usuarioService.getUsuarioById(id) .subscribe( res => {
			  this.usuario = res;
		  },
		  err => {
			  console.log(err)
		  }
		);
	}

	cancelarUsuario() : void {
		this.location.back();
		this.toastr.success('Usuário Cancelado com Sucesso')
	}

}
