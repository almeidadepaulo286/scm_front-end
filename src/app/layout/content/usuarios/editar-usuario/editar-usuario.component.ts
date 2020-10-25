import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'app/_services/usuario.service';
import { PerfilService } from 'app/_services/perfil.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'app/_models/usuario';

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
		idPerfil: ['', Validators.required]
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
		this.perfilService.listarPerfis().subscribe(
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
			(ret) => {
				if (ret) {
					this.montaUsuarioForm(ret)
				} else {
					this.toastr.error('Não foi possível localizar o usuário selecionado')
				}
			},
			(err) => {
				console.log(err)
			}
		);
	}

	// Cria form preenchido
	montaUsuarioForm(usuario) {
		this.usuarioForm = this.fb.group({
			nome: [usuario.nome, Validators.required],
			login: [usuario.login, Validators.required],
			email: [usuario.email, Validators.required],
			situacao: [usuario.situacao, Validators.required],
			idPerfil: [usuario.listaPerfil[0].id]
		});
	}

	// Cadastra Usuário
	onSubmit() {
		this.alteraUsuario();
	}

	// Atualiza informações do usuário
	alteraUsuario(){
		const stUsuario = {
			nome: this.usuarioForm.value.nome,
			login: this.usuarioForm.value.login,
			email: this.usuarioForm.value.email,
			situacao: this.usuarioForm.value.situacao,
			listaPerfil: [
				this.usuarioForm.value.idPerfil
			]
		}
		this.usuarioService.updateUsuarioById(this.idUsuario, stUsuario).subscribe(
			(ret) => {
				this.toastr.success('Usuário atualizado com sucesso')
			},
			(err) => {
				this.toastr.warning('Não foi possível atualizar o usuário, tente novamente mais tarde')
			}
		)
	}

}