import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'app/_services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'editar-usuario',
	templateUrl: './editar-usuario.component.html',
	styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

	title = 'Editar Usuário';

	// Form
	usuarioForm = this.fb.group({
		id: [''],
		nome: ['', Validators.required],
		login: ['', Validators.required],
		email: ['', Validators.required],
		perfis: ['', Validators.required],
		ativo: ['', Validators.required],
		data_atualizacao: [''],
		data_criacao: [''],
		role: [''],
		senha: [''],
	});
	usuarioInfo;

	// Select Perfis
	listaPerfis;

	constructor(
		private fb: FormBuilder,
		private usuarioService: UsuarioService,
		private toastr: ToastrService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.listarPerfis()
		this.getUserById();
	}

	// Cadastra Usuário
	onSubmit() {
		this.updateUser();
	}

	// Reseta Formulário
	limpaForm() {
		this.usuarioForm.reset();
	}

	// Lista Perfis
	listarPerfis() {
		this.usuarioService.listarPerfis().subscribe(
			res => {
				this.listaPerfis = res.content
			},
			err => this.toastr.error('Erro inesperado ao listar Perfis, tente novamente mais tarde')
		)
	}

	// Cria form preenchido
	montaUsuarioForm(usuario) {
		this.usuarioForm = this.fb.group({
			id: [usuario.id],
			nome: [usuario.nome, Validators.required],
			login: [usuario.login, Validators.required],
			email: [usuario.email, Validators.required],
			perfis: [usuario.perfis[0].perfilId],
			ativo: [usuario.ativo, Validators.required]
			// data_atualizacao: [usuario.data_atualizacao],
			// data_criacao: [usuario.data_criacao],
			// role: [usuario.role],
			// senha: [usuario.senha],
		});
		// console.log(this.usuarioForm.value)
	}

	// Recupera dados do usuário por Id
	getUserById() {
		const id = +this.route.snapshot.paramMap.get('id');
		this.usuarioService.getUserById(id).subscribe(
			res => {
				this.usuarioInfo = res;
				this.montaUsuarioForm(this.usuarioInfo)
			},
			err => {
				// console.log(err)
			}
		);
	}

	// Atualiza informações do usuário
	updateUser(){
		const perfil = this.usuarioForm.value.perfis
		this.usuarioForm.value.perfis = [{perfilId: perfil}]
		// console.log(this.usuarioForm.value)
		this.usuarioService.updateUser(this.usuarioForm.value).subscribe(
			res => {
				this.toastr.success('Usuário atualizado com sucesso')
			},
			err => {
				this.toastr.warning('Não foi possível atualizar o usuário, tente novamente mais tarde')
			}
		)
	}

}
