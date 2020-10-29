import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'app/_services/usuario.service';
import { PerfilService } from 'app/_services/perfil.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-editar-usuario',
	templateUrl: './editar-usuario.component.html',
	styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

	title = 'Editar Usuário';

	// Data
	idUsuario : number;

	// Form
	usuarioForm = this.fb.group({
		id: [''],
		nome: ['', Validators.required],
		login: ['', Validators.required],
		email: ['', Validators.required],
		situacao: [1, Validators.required],
		listaPerfil: [[], Validators.required]
	});

	// Select Perfis
	listaPerfis;

	constructor(private fb: FormBuilder,
				private usuarioService: UsuarioService,
				private perfilService: PerfilService,
				private toastr: ToastrService,
				private route: ActivatedRoute) {}

	ngOnInit() {
		this.idUsuario = +this.route.snapshot.paramMap.get('id');

		this.listarPerfis()
		this.getUsuarioById();
	}

	// Lista Perfis
	listarPerfis(){
		this.perfilService.getPerfis().subscribe(
			ret => {
				if (Array.isArray(ret) && ret.length > 0) {
					this.listaPerfis = ret
				}
			},
			err => {
				this.toastr.error('Erro inesperado ao listar Perfis, tente novamente mais tarde.')
			}
		)
	}

	// Recupera dados do usuário por Id
	getUsuarioById(): void {
		this.usuarioService.getUsuarioById(this.idUsuario).subscribe(
			(user) => {
				if (user) {
					// Cria form preenchido
					this.usuarioForm = this.fb.group({
						nome: [user.nome, Validators.required],
						login: [user.login, Validators.required],
						email: [user.email, Validators.required],
						situacao: [user.situacao, Validators.required],
						listaPerfil: [user.listaPerfil, Validators.required]
					});
				} else {
					this.toastr.error('Não foi possível localizar o usuário selecionado')
				}
			},
			(err) => {
				this.toastr.warning('Não foi possível localizar o usuário, tente novamente mais tarde')
			}
		);
	}

	// Atualiza informações do usuário
	onSubmit() {
		const stUsuario = {
			nome: this.usuarioForm.value.nome,
			login: this.usuarioForm.value.login,
			email: this.usuarioForm.value.email,
			situacao: this.usuarioForm.value.situacao,
			idioma: {},
			listaPerfil: this.usuarioForm.value.listaPerfil
		}
		this.usuarioService.setUsuarioById(this.idUsuario, stUsuario).subscribe(
			(ret) => {
				this.toastr.success('Usuário atualizado com sucesso')
			},
			(err) => {
				this.toastr.warning('Não foi possível atualizar o usuário, tente novamente mais tarde')
			}
		)
	}

}