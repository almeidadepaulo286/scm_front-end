import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'app/_services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { ValidaDocumentoHelper } from 'app/_helpers/validaDocumento';

@Component({
	selector: 'criar-usuario',
	templateUrl: './criar-usuario.component.html',
	styleUrls: ['./criar-usuario.component.css']
})
export class CriarUsuarioComponent implements OnInit {

	title = 'Novo Usuário';

	// Form
	usuarioForm = this.fb.group({
		login: ['', Validators.required],
		data_atualizacao: [''],
		data_criacao: [''],
		email: ['', Validators.required],
		id: [''],
		nome: ['', Validators.required],
		perfilId: ['', Validators.required],
		role: [''],
		senha: [''],
		ativo: [1, Validators.required]
	});

	usuarioFormNew;

	// Select Perfis
	listaPerfis;

	constructor(
		private fb: FormBuilder,
		private usuarioService: UsuarioService,
		private toastr: ToastrService,
	){}

	ngOnInit() {
		// console.log(this.usuarioForm);
		this.listarPerfis()
	}

	// Cadastra Usuário
	onSubmit() {
		this.criarUsuario();
	}

	// Reseta Formulário
	limpaForm() {
		this.usuarioForm.reset();
	}

	// Lista Perfis
	listarPerfis(){
		this.usuarioService.listarPerfis().subscribe(
			res => {
				this.listaPerfis = res
			},
			err => this.toastr.error('Erro inesperado ao listar Perfis, tente novamente mais tarde')
		)
	}

	// Cria usuario
	criarUsuario(){
		this.usuarioFormNew = {
			nome: this.usuarioForm.value.nome,
			login: this.usuarioForm.value.login,
			email: this.usuarioForm.value.email,
			perfis: [{
				perfilId: this.usuarioForm.value.perfilId,
			}],
			ativo: this.usuarioForm.value.ativo,
		}
		this.usuarioService.criarUsuario(this.usuarioFormNew).subscribe(
			res => {
				this.toastr.success('Usuário Cadastrado com Sucesso')
				this.limpaForm()
			},
			err => this.toastr.error('Não foi possível cadastrar o usuário, tente novamente mais tarde')
		)
	}
}
