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
		ativo: ['', Validators.required],
		senha: [''],
		perfilId: ['', Validators.required],
		data_atualizacao: [''],
		data_criacao: ['']
	});
	usuarioSubmit;

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
		this.getUsuarioById();
	}

	// Lista Perfis
	listarPerfis() {
		this.usuarioService.listarPerfis().subscribe(
			res => {
				if (res.length > 0) {
					this.listaPerfis = res
				}
			},
			err => {
				this.toastr.error('Erro inesperado ao listar Perfis, tente novamente mais tarde.')
			}
		)
	}

	// Recupera dados do usuário por Id
	getUsuarioById() {
		const id = +this.route.snapshot.paramMap.get('id');
		this.usuarioService.getUsuarioById(id).subscribe(res => {
				this.montaUsuarioForm(res)
			},
			err => {
				console.log(err)
			}
		);
	}

	// Cria form preenchido
	montaUsuarioForm(usuario) {
		this.usuarioForm = this.fb.group({
			id: [usuario.id],
			nome: [usuario.nome, Validators.required],
			login: [usuario.login, Validators.required],
			email: [usuario.email, Validators.required],
			senha: [''],
			ativo: [usuario.ativo, Validators.required],
			perfilId: [usuario.perfis[0].perfilId],
			data_atualizacao: [''],
			data_criacao: ['']
		});
	}

	// Cadastra Usuário
	onSubmit() {
		this.updateUser();
	}

	// Atualiza informações do usuário
	updateUser(){
		this.usuarioSubmit = {
			id: this.usuarioForm.value.id,
			nome: this.usuarioForm.value.nome,
			login: this.usuarioForm.value.login,
			email: this.usuarioForm.value.email,
			senha: "1234",
			ativo: this.usuarioForm.value.ativo,
			perfis: [{
				perfilId: this.usuarioForm.value.perfilId,
			}]
		}		
		console.table(this.usuarioSubmit)
		this.usuarioService.updateUser(this.usuarioSubmit).subscribe(
			res => {
				this.toastr.success('Usuário atualizado com sucesso')
			},
			err => {
				this.toastr.warning('Não foi possível atualizar o usuário, tente novamente mais tarde')
			}
		)
	}

}
